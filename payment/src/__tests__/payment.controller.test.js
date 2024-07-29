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
        status: 'CREATED'
      },
    });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await createOrder(req, res);

    expect(axios.post).toHaveBeenCalledTimes(2);

    expect(axios.post).toHaveBeenCalledWith(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      expect.anything(),
      expect.objectContaining({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: expect.any(String),
          password: expect.any(String),
        },
      })
    );

    expect(axios.post).toHaveBeenCalledWith(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      expect.any(Object),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer mock_access_token`,
        },
      })
    );

    expect(res.json).toHaveBeenCalledWith({
      id: 'mock_order_id',
      status: 'CREATED'
    });
  });
});
