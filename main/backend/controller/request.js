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

const table = 'requests';


//get rooms 
export const getRequests= asyncHandler(async (req, res) =>{
    const request = await find(table);
    res.status(StatusCodes.OK).json({request})
} )
//get room by id
export const geteRequestById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : requestId },
    } = req
    const request = await findById(requestId, table);
    if(!request)
        throw new NotFoundError(`No service with id:${request}`)

    res.status(StatusCodes.OK).json({request});
})

//create room
export const createRequest = asyncHandler(async(req, res) => {
    const data = req.body;
    const request = await create(data,table);

    res.status(StatusCodes.CREATED).json({request})
})

//update room
export const updateRequest = asyncHandler(async(req, res) => {
    const { params: { id : requestId } } = req
    const request = await updateById(requestId, req.body,table)
    if(!request)
       throw new NotFoundError(`No service with id:${requestId}`)

    res.status(StatusCodes.OK).json({request})
})

export const deleteRequest = asyncHandler(async(req, res) => {
    const { params : {id : requestId}} = req;

    const request = await deleteById(requestId, table);
    if(!request)
       throw new NotFoundError(`No service with id:${requestId}`)

    res.status(StatusCodes.OK).send()
})
