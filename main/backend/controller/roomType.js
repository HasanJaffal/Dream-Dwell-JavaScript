import { StatusCodes } from "http-status-codes";
import asyncHandler from "../middleware/async-handler.js";
import { NotFoundError } from "../error/index.js";
import { 
    create,
    deleteById,
    find,
    findById,
    updateById
} from './methods.js';
import pool from "../config/connect.js";

const table = 'RoomType';


//get rooms 
export const getRoomTypes = asyncHandler(async (req, res) =>{
    const roomTypes = await find(table);
    res.status(StatusCodes.OK).json({roomTypes})
} )
//get room by id
export const getRoomTypeById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : roomTypeId },
    } = req
    const roomType = await findById(roomTypeId, table);
    if(!roomType)
        throw new NotFoundError(`No room type with id:${roomTypeId}`)

    res.status(StatusCodes.OK).json({roomType});
})

//create room
export const createRoomType = asyncHandler(async(req, res) => {
    const data = req.body;
    const roomType = await create(data,table);

    res.status(StatusCodes.CREATED).json({roomType})
})

//update room
export const updateRoomType = asyncHandler(async(req, res) => {
    const { params: { id : roomTypeId } } = req
    const roomType = await updateById(roomTypeId, req.body,table)
    if(!roomType)
       throw new NotFoundError(`No room type with id:${roomTypeId}`)

    res.status(StatusCodes.OK).json({room})
})

export const deleteRoomType = asyncHandler(async(req, res) => {
    const { params : {id : roomTypeId}} = req;
    console.log(req)
    // Get a connection from the pool
    const connection = await pool.getConnection();
  
    try {
      // Start a transaction
      await connection.beginTransaction();
  
      // Delete from 'booking' where roomTypeId = roomTypeId
      await connection.query('DELETE FROM booking WHERE roomTypeId = ? AND _id IS NOT NULL' , [roomTypeId]);
  
      // Delete from 'room' where roomTypeId = roomTypeId
      await connection.query('DELETE FROM room WHERE roomTypeId = ? AND _id IS NOT NULL', [roomTypeId]);
  
      // Delete from 'roomtype' where _id = roomTypeId
      await connection.query('DELETE FROM roomtype WHERE _id = ?', [roomTypeId]);
  
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
    res.status(StatusCodes.OK).send()
})
