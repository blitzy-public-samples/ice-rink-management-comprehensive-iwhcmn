import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { createUser, getUser, updateUser, deleteUser, listUsers, changeUserRole } from '../../controllers/userController';
import { UserModel } from '../../models/User';
import { ApiResponse, PaginatedResponse, ErrorResponse, UserRole } from '../../types/index';
import { User } from '../../../shared/types/user';

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let userModelStub: sinon.SinonStubbedInstance<typeof UserModel>;

  beforeEach(() => {
    // Create stub for UserModel methods
    userModelStub = sinon.stub(UserModel);

    // Create mock Request and Response objects
    req = {
      params: {},
      body: {},
      query: {}
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  });

  afterEach(() => {
    // Restore all stubbed methods
    sinon.restore();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.Customer
      };

      userModelStub.createUser.resolves(mockUser);

      req.body = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123'
      };

      await createUser(req as Request, res as Response);

      expect(userModelStub.createUser.calledOnce).to.be.true;
      expect(userModelStub.createUser.calledWith(req.body)).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: mockUser }))).to.be.true;
    });
  });

  describe('getUser', () => {
    it('should retrieve a user by ID', async () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.Customer
      };

      userModelStub.findById.resolves(mockUser);

      req.params = { id: '1' };

      await getUser(req as Request, res as Response);

      expect(userModelStub.findById.calledOnce).to.be.true;
      expect(userModelStub.findById.calledWith('1')).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: mockUser }))).to.be.true;
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const mockUser: User = {
        id: '1',
        email: 'updated@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        role: UserRole.Customer
      };

      userModelStub.updateUser.resolves(mockUser);

      req.params = { id: '1' };
      req.body = {
        email: 'updated@example.com',
        firstName: 'Jane',
        lastName: 'Doe'
      };

      await updateUser(req as Request, res as Response);

      expect(userModelStub.updateUser.calledOnce).to.be.true;
      expect(userModelStub.updateUser.calledWith('1', req.body)).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: mockUser }))).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      userModelStub.deleteUser.resolves(true);

      req.params = { id: '1' };

      await deleteUser(req as Request, res as Response);

      expect(userModelStub.deleteUser.calledOnce).to.be.true;
      expect(userModelStub.deleteUser.calledWith('1')).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({ message: 'User deleted successfully' }))).to.be.true;
    });
  });

  describe('listUsers', () => {
    it('should retrieve a paginated list of users', async () => {
      const mockPaginatedResponse: PaginatedResponse<User> = {
        data: [
          {
            id: '1',
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
            role: UserRole.Customer
          },
          {
            id: '2',
            email: 'user2@example.com',
            firstName: 'User',
            lastName: 'Two',
            role: UserRole.Customer
          }
        ],
        total: 2,
        page: 1,
        limit: 10
      };

      userModelStub.findAll.resolves(mockPaginatedResponse);

      req.query = { page: '1', limit: '10' };

      await listUsers(req as Request, res as Response);

      expect(userModelStub.findAll.calledOnce).to.be.true;
      expect(userModelStub.findAll.calledWith({ page: 1, limit: 10 })).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match(mockPaginatedResponse))).to.be.true;
    });
  });

  describe('changeUserRole', () => {
    it('should change the role of a user', async () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.Staff
      };

      userModelStub.updateUser.resolves(mockUser);

      req.params = { id: '1' };
      req.body = { role: UserRole.Staff };

      await changeUserRole(req as Request, res as Response);

      expect(userModelStub.updateUser.calledOnce).to.be.true;
      expect(userModelStub.updateUser.calledWith('1', { role: UserRole.Staff })).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: mockUser }))).to.be.true;
    });
  });
});

// TODO: Implement error case tests for each controller function
// TODO: Add tests for input validation in controller functions
// TODO: Implement tests for authorization checks in controller functions
// TODO: Add tests for edge cases and boundary conditions