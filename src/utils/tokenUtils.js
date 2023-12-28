import jwt from 'jsonwebtoken';
import { JWTsecret } from '../config/config.js';
export const createToken = async(payload) => {

  const signedToken = jwt.sign(payload, JWTsecret, {
    expiresIn: '1h'
  })

  return signedToken;

};

export const verifyToken = (signedToken, callback) => {
  const token = signedToken.split(' ')[1]
  const decodeToken = jwt.verify(token, JWTsecret, callback)
 
  return decodeToken;

};