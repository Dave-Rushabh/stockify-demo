import expressAsyncHandler from 'express-async-handler';
import { User } from '../db-models/AuthUserModel.js';
import { generateToken } from '../token-config/JWT.js';

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

export { authUser };
