import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import {
  createBooking,
  getBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getRinkBookings
} from '../../controllers/bookingController';
import BookingModel from '../../models/Booking';
import { Booking } from '../../../shared/types/booking';

describe('Booking Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createBooking', () => {
    it('should create a new booking successfully', async () => {
      const mockBooking: Booking = {
        id: '1',
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
        status: 'confirmed',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req.body = {
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
      };

      const createBookingStub = sinon.stub(BookingModel, 'createBooking').resolves(mockBooking);

      await createBooking(req as Request, res as Response, next);

      expect(createBookingStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ booking: mockBooking });
    });

    it('should handle errors when creating a booking', async () => {
      req.body = {
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
      };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'createBooking').rejects(error);

      await createBooking(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getBooking', () => {
    it('should retrieve a booking successfully', async () => {
      const mockBooking: Booking = {
        id: '1',
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
        status: 'confirmed',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req.params = { id: '1' };

      const findByIdStub = sinon.stub(BookingModel, 'findById').resolves(mockBooking);

      await getBooking(req as Request, res as Response, next);

      expect(findByIdStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ booking: mockBooking });
    });

    it('should handle not found scenario', async () => {
      req.params = { id: '999' };

      sinon.stub(BookingModel, 'findById').resolves(null);

      await getBooking(req as Request, res as Response, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Booking not found' });
    });

    it('should handle errors when retrieving a booking', async () => {
      req.params = { id: '1' };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'findById').rejects(error);

      await getBooking(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('updateBooking', () => {
    it('should update a booking successfully', async () => {
      const mockUpdatedBooking: Booking = {
        id: '1',
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
        status: 'confirmed',
        price: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req.params = { id: '1' };
      req.body = { price: 60 };

      const updateBookingStub = sinon.stub(BookingModel, 'updateBooking').resolves(mockUpdatedBooking);

      await updateBooking(req as Request, res as Response, next);

      expect(updateBookingStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ booking: mockUpdatedBooking });
    });

    it('should handle errors when updating a booking', async () => {
      req.params = { id: '1' };
      req.body = { price: 60 };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'updateBooking').rejects(error);

      await updateBooking(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('cancelBooking', () => {
    it('should cancel a booking successfully', async () => {
      const mockCancelledBooking: Booking = {
        id: '1',
        userId: '123',
        rinkId: '456',
        startTime: new Date(),
        endTime: new Date(),
        status: 'cancelled',
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      req.params = { id: '1' };

      const cancelBookingStub = sinon.stub(BookingModel, 'cancelBooking').resolves(mockCancelledBooking);

      await cancelBooking(req as Request, res as Response, next);

      expect(cancelBookingStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Booking cancelled successfully' });
    });

    it('should handle booking not found scenario', async () => {
      req.params = { id: '999' };

      sinon.stub(BookingModel, 'cancelBooking').resolves(null);

      await cancelBooking(req as Request, res as Response, next);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Booking not found' });
    });

    it('should handle errors when cancelling a booking', async () => {
      req.params = { id: '1' };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'cancelBooking').rejects(error);

      await cancelBooking(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getUserBookings', () => {
    it('should retrieve user bookings successfully', async () => {
      const mockUserBookings: Booking[] = [
        {
          id: '1',
          userId: '123',
          rinkId: '456',
          startTime: new Date(),
          endTime: new Date(),
          status: 'confirmed',
          price: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: '123',
          rinkId: '789',
          startTime: new Date(),
          endTime: new Date(),
          status: 'confirmed',
          price: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      req.params = { userId: '123' };
      req.query = { page: '1', limit: '10' };

      const findBookingsByUserStub = sinon.stub(BookingModel, 'findBookingsByUser').resolves({
        bookings: mockUserBookings,
        total: 2,
        page: 1,
        limit: 10,
      });

      await getUserBookings(req as Request, res as Response, next);

      expect(findBookingsByUserStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        bookings: mockUserBookings,
        total: 2,
        page: 1,
        limit: 10,
      });
    });

    it('should handle errors when retrieving user bookings', async () => {
      req.params = { userId: '123' };
      req.query = { page: '1', limit: '10' };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'findBookingsByUser').rejects(error);

      await getUserBookings(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });

  describe('getRinkBookings', () => {
    it('should retrieve rink bookings successfully', async () => {
      const mockRinkBookings: Booking[] = [
        {
          id: '1',
          userId: '123',
          rinkId: '456',
          startTime: new Date(),
          endTime: new Date(),
          status: 'confirmed',
          price: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: '789',
          rinkId: '456',
          startTime: new Date(),
          endTime: new Date(),
          status: 'confirmed',
          price: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      req.params = { rinkId: '456' };
      req.query = { startDate: '2023-01-01', endDate: '2023-01-31', page: '1', limit: '10' };

      const findBookingsByRinkStub = sinon.stub(BookingModel, 'findBookingsByRink').resolves({
        bookings: mockRinkBookings,
        total: 2,
        page: 1,
        limit: 10,
      });

      await getRinkBookings(req as Request, res as Response, next);

      expect(findBookingsByRinkStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        bookings: mockRinkBookings,
        total: 2,
        page: 1,
        limit: 10,
      });
    });

    it('should handle invalid date range', async () => {
      req.params = { rinkId: '456' };
      req.query = { startDate: '2023-01-31', endDate: '2023-01-01', page: '1', limit: '10' };

      await getRinkBookings(req as Request, res as Response, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: 'Invalid date range' });
    });

    it('should handle errors when retrieving rink bookings', async () => {
      req.params = { rinkId: '456' };
      req.query = { startDate: '2023-01-01', endDate: '2023-01-31', page: '1', limit: '10' };

      const error = new Error('Database error');
      sinon.stub(BookingModel, 'findBookingsByRink').rejects(error);

      await getRinkBookings(req as Request, res as Response, next);

      expect(next).to.have.been.calledWith(error);
    });
  });
});

// Human tasks:
// TODO: Implement integration tests for booking controller
// TODO: Add more edge case scenarios to unit tests
// TODO: Implement performance tests for booking operations