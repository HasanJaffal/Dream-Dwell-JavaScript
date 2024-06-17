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

const table = 'room';


//get rooms 
export const getRooms = asyncHandler(async (req, res) =>{
    const rooms = await find(table);
    res.status(StatusCodes.OK).json({rooms})
} )
//get rooms by id
export const getRoomById = asyncHandler(async(req, res) => {
    const { params:{ id :roomId } } = req.body
    const connection = await pool.getConnection();
    try{
        const [room] = await connection.execute(`select Room.* from ${table} JOIN RoomType ON Room.roomTypeId = RoomType._id where  Room._id = ${id} `);
        if (!room || room.length === 0) {
            throw new NotFoundError(`No room with id: ${roomId}`);
        }
        res.status(StatusCodes.OK).json({room})
    }catch(err){
        console.log('Error retrieving elements'.err);
    }finally{
        connection.release();
    }
})
//create room
export const createRoom = asyncHandler(async(req, res) => {
    const data = req.body;
    const room = await create(data,table);

    res.status(StatusCodes.CREATED).json({room})
})

//update room
export const updateRoom = asyncHandler(async(req, res) => {
    const { params: { id : roomId } } = req
    const room = await updateById(roomId, req.body,table)
    if(!room)
       throw new NotFoundError(`No room with id:${roomId}`)

    res.status(StatusCodes.OK).json({room})
})

export const deleteRoom = asyncHandler(async(req, res) => {
    const { params : {id : roomId} } = req;

    const room = await deleteById(roomId, table);
    if(!room)
       throw new NotFoundError(`No room with id:${roomId}`)

    res.status(StatusCodes.OK).send()
})
