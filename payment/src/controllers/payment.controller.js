import axios from "axios";
import { HOST, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API } from "../config.js";

export const createOrder = async(req, res) => {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).send('Invalid amount');
    }
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount,
                },
            },
        ],
        application_context: {
            brand_name: "ECOVIDA",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-payment`,
        }
    };
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    try {
        const {
            data: { access_token },
        } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET,
                },
            }
        );

        console.log(access_token); // Aquí imprimimos el token de acceso

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });

       

        return res.json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating order');
    }
}

export const captureOrder = async(req, res) => {
    const {token} = req.query;

    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );
      console.log(response.data);
      return res.send("PAGADO");
}

export const cancelPayment = (req, res) => res.send("Payment canceled");
