import { StatusCodes } from "http-status-codes";
import {BadRequestError,UnauthenticatedError} from "../error/index.js";
import asyncHandler from "../middleware/async-handler.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
import { 
    findById,
    find,
    findOne,
    create,
    deleteById,
    updateById 
  } from "./methods.js";

const table = 'User';


export const signup = asyncHandler(async (req, res) => {

  const { firstName, lastName, userName ,email, password ,phoneNumber,address} = req.body;
  if(!userName || !email || !password)
    throw new BadRequestError('Please provide credentials')
  
  const saltRounds = 10;
  
  const salt =await bcrypt.genSalt(saltRounds);
  // Generate a hash password 
  const hashPassword =await bcrypt.hash(password, salt);
  
  const user = await create({ firstName, lastName, userName ,email , password:hashPassword,phoneNumber,address}, table);
  if (!user) {
    throw new BadRequestError('User already exists')
  }
  generateToken(res,user._id);
  res.status(StatusCodes.CREATED).json({ success:true });

});

export const signin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password)
    throw new UnauthenticatedError("Invalid Credentials");
  
  const user = await findOne(username, table);
  if(!user)
    throw new UnauthenticatedError('Invalid Credentials');  
  const isMatched = await bcrypt.compare(password,user.password);

  if(!isMatched)
    throw new UnauthenticatedError('Invalid Credentials');

  const token = generateToken(res,user._id);
  const {password:pass, ...rest } = user;
  res.status(StatusCodes.OK).json({
    rest,
    token
  });
});


export const signOut = asyncHandler(async (req, res) => {
  res.cookie("token",'logout', {
    expires:new Date(Date.now()+1000),
    httpOnly:true
  });
  res.status(200).json({ 
    success:true,
    message: "User has been logged out" });
});

export const resetPassword = asyncHandler(async(req, res) => {
  
})
export const getAllBookings = asyncHandler(async(req, res) => {
  const bookings = await find('booking');

  res.status(StatusCodes.OK).json({ bookings})
})

