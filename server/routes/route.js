import express from 'express';
import { authUser, random } from '../controllers/controller.js';

// using express's Router for routing the requests
const router = express.Router();

// creating the endpoints
router.route('/user/login').post(authUser);
router.route('/stockdata').get(random);

export { router };
