import { StatusCodes } from "http-status-codes";
import {NotFoundError} from "../error/index.js";
import asyncHandler from "../middleware/async-handler.js";
import pool from "../config/connect.js";
import generateToken from '../utils/generateToken.js'
import { 
    findById,
    find,
    findOne,
    create,
    deleteById,
    updateById 
} from "./methods.js";

const table = 'user'

export const UpdateUser = asyncHandler(async(req, res) => {
    const { params: { id : userId } } = req
    const user = await updateById(userId, req.body,table)
    if(!user)
       throw new NotFoundError(`No user with id:${userId}`)

    res.status(StatusCodes.OK).json({user})
})

export const getAllUsers = asyncHandler(async(req, res) => {
    const users = await find(table);
    
    res.status(StatusCodes.OK).json(
      {
        users
      });
})

export const getUserById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : userId },
    } = req
    console.log(req.body)
    const user = await findById(userId, table);
    if(!user)
        throw new NotFoundError(`No user with id:${userId}`)

    res.status(StatusCodes.OK).json({user});
})

export const getBookingsForUser = asyncHandler(async(req, res) => {
    const { params: {id: userId} } =req

    const connection = await pool.getConnection();
    try{
        const [user] = await connection.execute(`SELECT b.*
        FROM booking 
        JOIN user  ON booking.userId = u._id
        WHERE user._id = ${userId};`)

        if(!user || user.length == 0 )
            throw new NotFoundError(`No user with id:${userId}`)
    
        res.status(StatusCodes.OK).json({user});
    }catch(err){
        console.log('Error retrieving elements'.err);
    }finally{
        connection.release();
    }
})


export const deleteUser = asyncHandler(async (req, res) => {

    const { params: { id: userId }, } = req;


    const connection = await pool.getConnection();
  
    try {
        // Start a transaction
        await connection.beginTransaction();
    
        await connection.query('DELETE FROM requests WHERE bookingId IN (SELECT _id FROM booking WHERE userId = ?) ;',[userId]);
        // Now, delete from 'booking'
        await connection.query('DELETE FROM booking WHERE userId = ? AND _id IS NOT NULL', [userId]);
    
        // Delete from 'user'
        await connection.query('DELETE FROM user WHERE _id = ? ', [userId]);
    
        // Commit the transaction
        await connection.commit();
    
        console.log('Transaction committed successfully.');
      } catch (error) {
        // If an error occurs, rollback the transaction
        await connection.rollback();
        throw error;
      } finally {
        // Release the connection back to the pool
        connection.release();
      }
  });
