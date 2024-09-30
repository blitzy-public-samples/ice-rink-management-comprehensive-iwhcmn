import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Table, Button, Modal, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import { Rink, RinkSchedule, IceSlot } from '../../types/rink';
import { getRinks, createRink, updateRink, deleteRink, createIceSlot, updateIceSlot, deleteIceSlot } from '../../lib/api/rinks';
import useRinks from '../../hooks/useRinks';

const { Option } = Select;

const RinkManagement: React.FC = () => {
  const [rinks, setRinks] = useState<Rink[]>([]);
  const [selectedRink, setSelectedRink] = useState<Rink | null>(null);
  const [isRinkModalVisible, setIsRinkModalVisible] = useState(false);
  const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { rinks: fetchedRinks, loading, error } = useRinks();

  useEffect(() => {
    if (fetchedRinks) {
      setRinks(fetchedRinks);
    }
  }, [fetchedRinks]);

  const handleAddRink = async (rinkData: Omit<Rink, 'id'>) => {
    try {
      const newRink = await createRink(rinkData);
      setRinks([...rinks, newRink]);
      setIsRinkModalVisible(false);
      reset();
    } catch (error) {
      console.error('Error adding rink:', error);
      // TODO: Implement error handling
    }
  };

  const handleUpdateRink = async (updatedRinkData: Rink) => {
    try {
      const updatedRink = await updateRink(updatedRinkData);
      setRinks(rinks.map(rink => rink.id === updatedRink.id ? updatedRink : rink));
      setIsRinkModalVisible(false);
      setSelectedRink(null);
      reset();
    } catch (error) {
      console.error('Error updating rink:', error);
      // TODO: Implement error handling
    }
  };

  const handleDeleteRink = async (rinkId: string) => {
    try {
      await deleteRink(rinkId);
      setRinks(rinks.filter(rink => rink.id !== rinkId));
    } catch (error) {
      console.error('Error deleting rink:', error);
      // TODO: Implement error handling
    }
  };

  const handleAddIceSlot = async (rinkId: string, slotData: Omit<IceSlot, 'id'>) => {
    try {
      const newSlot = await createIceSlot(rinkId, slotData);
      const updatedRink = rinks.find(rink => rink.id === rinkId);
      if (updatedRink) {
        updatedRink.schedule.push(newSlot);
        setRinks([...rinks]);
      }
      setIsSlotModalVisible(false);
      reset();
    } catch (error) {
      console.error('Error adding ice slot:', error);
      // TODO: Implement error handling
    }
  };

  const handleUpdateIceSlot = async (rinkId: string, updatedSlotData: IceSlot) => {
    try {
      const updatedSlot = await updateIceSlot(rinkId, updatedSlotData);
      const updatedRink = rinks.find(rink => rink.id === rinkId);
      if (updatedRink) {
        updatedRink.schedule = updatedRink.schedule.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot);
        setRinks([...rinks]);
      }
      setIsSlotModalVisible(false);
      setSelectedRink(null);
      reset();
    } catch (error) {
      console.error('Error updating ice slot:', error);
      // TODO: Implement error handling
    }
  };

  const handleDeleteIceSlot = async (rinkId: string, slotId: string) => {
    try {
      await deleteIceSlot(rinkId, slotId);
      const updatedRink = rinks.find(rink => rink.id === rinkId);
      if (updatedRink) {
        updatedRink.schedule = updatedRink.schedule.filter(slot => slot.id !== slotId);
        setRinks([...rinks]);
      }
    } catch (error) {
      console.error('Error deleting ice slot:', error);
      // TODO: Implement error handling
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Rink) => (
        <span>
          <Button onClick={() => {
            setSelectedRink(record);
            setIsRinkModalVisible(true);
          }}>Edit</Button>
          <Button onClick={() => handleDeleteRink(record.id)}>Delete</Button>
          <Button onClick={() => {
            setSelectedRink(record);
            setIsSlotModalVisible(true);
          }}>Manage Ice Slots</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Rink Management</h1>
      <Button onClick={() => setIsRinkModalVisible(true)}>Add Rink</Button>
      <Table dataSource={rinks} columns={columns} rowKey="id" />

      <Modal
        title={selectedRink ? "Edit Rink" : "Add Rink"}
        visible={isRinkModalVisible}
        onCancel={() => {
          setIsRinkModalVisible(false);
          setSelectedRink(null);
          reset();
        }}
        footer={null}
      >
        <Form onFinish={handleSubmit(selectedRink ? handleUpdateRink : handleAddRink)}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input {...register('name')} defaultValue={selectedRink?.name} />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input {...register('address')} defaultValue={selectedRink?.address} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedRink ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Manage Ice Slots"
        visible={isSlotModalVisible}
        onCancel={() => {
          setIsSlotModalVisible(false);
          setSelectedRink(null);
          reset();
        }}
        footer={null}
      >
        {selectedRink && (
          <div>
            <h3>Ice Slots for {selectedRink.name}</h3>
            <Form onFinish={handleSubmit((data) => handleAddIceSlot(selectedRink.id, data))}>
              <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
                <DatePicker showTime />
              </Form.Item>
              <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
                <DatePicker showTime />
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <Input type="number" {...register('price')} />
              </Form.Item>
              <Button type="primary" htmlType="submit">Add Ice Slot</Button>
            </Form>
            <Table
              dataSource={selectedRink.schedule}
              columns={[
                { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
                { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
                { title: 'Price', dataIndex: 'price', key: 'price' },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: (text: string, record: IceSlot) => (
                    <span>
                      <Button onClick={() => handleUpdateIceSlot(selectedRink.id, record)}>Edit</Button>
                      <Button onClick={() => handleDeleteIceSlot(selectedRink.id, record.id)}>Delete</Button>
                    </span>
                  ),
                },
              ]}
              rowKey="id"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RinkManagement;

// TODO: Implement error handling for all API calls
// TODO: Add form validation for rink and ice slot input fields
// TODO: Implement pagination for the rinks table if there are many rinks
// TODO: Add confirmation dialogs for delete actions
// TODO: Implement search and filter functionality for rinks
// TODO: Add a visual calendar component for managing ice slots