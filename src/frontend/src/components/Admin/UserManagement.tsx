import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// TODO: Import these types and components once they are implemented
import { User, UserFormData } from '../../types/user';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';
import { Button, Input, Modal, LoadingSpinner } from '../../components';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { user: currentUser } = useAuth();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await api.get('/users');
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data: UserFormData) => {
    try {
      const newUser = await api.post('/users', data);
      setUsers([...users, newUser]);
      toast.success('User created successfully');
      setModalVisible(false);
      reset();
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!editingUser) return;
    try {
      const updatedUser = await api.put(`/users/${editingUser.id}`, data);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      toast.success('User updated successfully');
      setModalVisible(false);
      setEditingUser(null);
      reset();
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const openModal = (user: User | null = null) => {
    setEditingUser(user);
    setModalVisible(true);
    if (user) {
      reset(user);
    } else {
      reset();
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <Button onClick={() => openModal()}>Create New User</Button>
      <UserList users={users} onEdit={openModal} onDelete={handleDeleteUser} />
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

const UserList: React.FC<{
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}> = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button onClick={() => onEdit(user)}>Edit</Button>
              <Button onClick={() => onDelete(user.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UserForm: React.FC<{
  user: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}> = ({ user, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues: user || undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="First Name"
        {...register('firstName', { required: 'First name is required' })}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register('lastName', { required: 'Last name is required' })}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password', { required: !user, minLength: 8 })}
        error={errors.password?.message}
      />
      <select {...register('role', { required: 'Role is required' })}>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <Button type="submit">{user ? 'Update' : 'Create'} User</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </form>
  );
};

export default UserManagement;

// TODO: Implement proper error handling for API calls
// TODO: Add input validation for user form fields
// TODO: Implement pagination for user list if there are many users
// TODO: Add confirmation dialog before deleting a user
// TODO: Implement role-based access control to ensure only admins can access this component