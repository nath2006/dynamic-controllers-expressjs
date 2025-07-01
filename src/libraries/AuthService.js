import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const env = dotenv.config().parsed;

class AuthService {
  //Hash a password
  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  //compare a password 
  comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
  }

  //generate a JWT token
  generateToken = async (user, secretKey, tokenExpiration) => {
    return jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
        roleId: user._roleId,
      },secretKey, {
        expiresnIn: tokenExpiration,
      }
    );
  }

  //verify a JWT token
  verifyToken = async (token, secretKey) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return error;
    }
  }

  //EmailExists
}

export default new AuthService();
