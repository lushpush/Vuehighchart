const request = require('supertest');
const app = require('../index');

describe('GET /api/tree', () => {
  it('responds with array', async () => {
    const res = await request(app).get('/api/tree');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('includes root node with null parent', async () => {
    const res = await request(app).get('/api/tree');
    expect(res.statusCode).toBe(200);
    const root = res.body.find(item => item.name === 'Root');
    expect(root).toBeDefined();
    expect(root.parent_id).toBeNull();
  });

  it('returns the expected number of entries', async () => {
    const res = await request(app).get('/api/tree');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(101);
  });
});

describe('Unknown routes', () => {
  it('responds with 404 for non-existent route', async () => {
    const res = await request(app).get('/not-found');
    expect(res.statusCode).toBe(404);
  });
});
