const request = require('supertest');
const app = require('../index');

describe('GET /api/tree', () => {
  it('responds with array', async () => {
    const res = await request(app).get('/api/tree');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
