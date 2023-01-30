import expressAsyncHandler from 'express-async-handler';
import { User } from '../db-models/AuthUserModel.js';
import { generateToken } from '../token-config/JWT.js';
import finnhub from 'finnhub';

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.json({
      message: 'Invalid user credentials, check email and passwoord again...',
    });
  }
});

const random = expressAsyncHandler(async (req, res) => {
  /**
   * Individual stock - normal
   */
  // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  // api_key.apiKey = 'cfb9km9r01qqlprlinu0cfb9km9r01qqlprlinug';
  // const finnhubClient = new finnhub.DefaultApi();

  // finnhubClient.quote('AAPL', (error, data, response) => {
  //   res.json(data);
  // });

  /**
   * Individual stock - candle
   */

  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = 'cfb9km9r01qqlprlinu0cfb9km9r01qqlprlinug';
  const finnhubClient = new finnhub.DefaultApi();

  finnhubClient.stockCandles(
    'AAPL',
    'D',
    parseInt(Date.now().toString().slice(0, 10)),
    parseInt(Date.now().toString().slice(0, 10)),
    (error, data, response) => {
      res.json(data);
    },
  );
});

export { authUser, random };
