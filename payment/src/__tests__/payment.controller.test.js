import axios from 'axios';
import { createOrder } from '../controllers/payment.controller.js';

jest.mock('axios');

describe('createOrder', () => {
  it('should create an order and return a response', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        access_token: 'mock_access_token',
      },
    });
    axios.post.mockResolvedValueOnce({
      data: {
        id: 'mock_order_id',
      },
    });
    const req = {};
    const res = {
      json: jest.fn(),
    };

    await createOrder(req, res);

    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(res.json).toHaveBeenCalledWith('Captured Order');
  });
});
