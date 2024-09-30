import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../server';
import { BookingModel } from '../../models/Booking';
import { UserModel } from '../../models/User';
import { RinkModel } from '../../models/Rink';
import { ApiResponse, PaginatedResponse } from '../../types/index';

describe('Booking API Integration Tests', () => {
  let testUser: any;
  let testRink: any;
  let testBooking: any;

  before(async () => {
    await setupTestData();
  });

  after(async () => {
    await cleanupTestData();
  });

  describe('GET /api/bookings', () => {
    it('Should return a list of bookings', async () => {
      const response = await request(app).get('/api/bookings');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });

    it('Should return paginated results', async () => {
      const response = await request(app).get('/api/bookings?page=1&limit=10');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
      expect(response.body.page).to.equal(1);
      expect(response.body.limit).to.equal(10);
      expect(response.body.total).to.be.a('number');
    });

    it('Should filter bookings by date range', async () => {
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
      const response = await request(app).get(`/api/bookings?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((booking: any) => {
        expect(new Date(booking.startTime)).to.be.at.least(startDate);
        expect(new Date(booking.endTime)).to.be.at.most(endDate);
      });
    });

    it('Should filter bookings by user', async () => {
      const response = await request(app).get(`/api/bookings?userId=${testUser.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((booking: any) => {
        expect(booking.userId).to.equal(testUser.id);
      });
    });

    it('Should filter bookings by rink', async () => {
      const response = await request(app).get(`/api/bookings?rinkId=${testRink.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((booking: any) => {
        expect(booking.rinkId).to.equal(testRink.id);
      });
    });
  });

  describe('POST /api/bookings', () => {
    it('Should create a new booking', async () => {
      const newBooking = {
        userId: testUser.id,
        rinkId: testRink.id,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(newBooking);

      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      expect(response.body.userId).to.equal(newBooking.userId);
      expect(response.body.rinkId).to.equal(newBooking.rinkId);
      expect(new Date(response.body.startTime)).to.deep.equal(new Date(newBooking.startTime));
      expect(new Date(response.body.endTime)).to.deep.equal(new Date(newBooking.endTime));
    });

    it('Should return an error for invalid booking data', async () => {
      const invalidBooking = {
        userId: testUser.id,
        rinkId: testRink.id,
        startTime: 'invalid-date',
        endTime: 'invalid-date',
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(invalidBooking);

      expect(response.status).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for conflicting bookings', async () => {
      const conflictingBooking = {
        userId: testUser.id,
        rinkId: testRink.id,
        startTime: testBooking.startTime,
        endTime: testBooking.endTime,
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(conflictingBooking);

      expect(response.status).to.equal(409);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for unauthorized users', async () => {
      const unauthorizedBooking = {
        userId: 'unauthorized-user-id',
        rinkId: testRink.id,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(unauthorizedBooking);

      expect(response.status).to.equal(401);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('Should return a specific booking', async () => {
      const response = await request(app).get(`/api/bookings/${testBooking.id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(testBooking.id);
    });

    it('Should return an error for non-existent booking', async () => {
      const response = await request(app).get('/api/bookings/non-existent-id');
      expect(response.status).to.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for unauthorized access', async () => {
      // Assuming there's an authentication middleware
      const response = await request(app)
        .get(`/api/bookings/${testBooking.id}`)
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).to.equal(401);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('Should update an existing booking', async () => {
      const updatedBooking = {
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
      };

      const response = await request(app)
        .put(`/api/bookings/${testBooking.id}`)
        .send(updatedBooking);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(new Date(response.body.startTime)).to.deep.equal(new Date(updatedBooking.startTime));
      expect(new Date(response.body.endTime)).to.deep.equal(new Date(updatedBooking.endTime));
    });

    it('Should return an error for invalid update data', async () => {
      const invalidUpdate = {
        startTime: 'invalid-date',
        endTime: 'invalid-date',
      };

      const response = await request(app)
        .put(`/api/bookings/${testBooking.id}`)
        .send(invalidUpdate);

      expect(response.status).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for non-existent booking', async () => {
      const response = await request(app)
        .put('/api/bookings/non-existent-id')
        .send({ startTime: new Date().toISOString() });

      expect(response.status).to.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for unauthorized access', async () => {
      // Assuming there's an authentication middleware
      const response = await request(app)
        .put(`/api/bookings/${testBooking.id}`)
        .set('Authorization', 'Bearer invalid-token')
        .send({ startTime: new Date().toISOString() });

      expect(response.status).to.equal(401);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('Should cancel an existing booking', async () => {
      const response = await request(app).delete(`/api/bookings/${testBooking.id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.a('string');
    });

    it('Should return an error for non-existent booking', async () => {
      const response = await request(app).delete('/api/bookings/non-existent-id');
      expect(response.status).to.equal(404);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for unauthorized access', async () => {
      // Assuming there's an authentication middleware
      const response = await request(app)
        .delete(`/api/bookings/${testBooking.id}`)
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).to.equal(401);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });

    it('Should return an error for bookings that can\'t be cancelled', async () => {
      // Assuming there's a business rule that bookings can't be cancelled within 24 hours
      const unCancellableBooking = await BookingModel.create({
        userId: testUser.id,
        rinkId: testRink.id,
        startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      });

      const response = await request(app).delete(`/api/bookings/${unCancellableBooking.id}`);
      expect(response.status).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body.error).to.be.a('string');
    });
  });
});

async function setupTestData() {
  // Create test users
  testUser = await UserModel.create({
    email: 'testuser@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  });

  // Create test rinks
  testRink = await RinkModel.create({
    name: 'Test Rink',
    address: '123 Test St, Test City, TS 12345',
    capacity: 50,
  });

  // Create test bookings
  testBooking = await BookingModel.create({
    userId: testUser.id,
    rinkId: testRink.id,
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
  });
}

async function cleanupTestData() {
  // Delete test bookings
  await BookingModel.deleteMany({});

  // Delete test rinks
  await RinkModel.deleteMany({});

  // Delete test users
  await UserModel.deleteMany({});
}

// Human tasks:
// TODO: Implement additional edge case tests for booking conflicts
// TODO: Add tests for booking reminder notifications
// TODO: Implement tests for recurring bookings once the feature is added