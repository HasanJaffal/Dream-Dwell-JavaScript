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

const table = 'serviceplan';


//get rooms 
export const getPlans = asyncHandler(async (req, res) =>{
    const plans = await find(table);
    res.status(StatusCodes.OK).json({plans})
} )
//get room by id
export const getServicePlan = asyncHandler(async(req, res) => {
    const { 
        params:{ id : planId },
    } = req
    const plan = await findById(planId, table);
    if(!plan)
        throw new NotFoundError(`No service with id:${planId}`)

    res.status(StatusCodes.OK).json({plan});
})

//create room
export const createServicePlan = asyncHandler(async(req, res) => {
    const data = req.body;
    const Plan = await create(data,table);

    res.status(StatusCodes.CREATED).json({Plan})
})

//update room
export const updatePlan = asyncHandler(async(req, res) => {
    const { params: { id : planId } } = req
    const plan = await updateById(planId, req.body,table)
    if(!plan)
       throw new NotFoundError(`No service with id:${planId}`)

    res.status(StatusCodes.OK).json({plan})
})

export const deletePlan = asyncHandler(async(req, res) => {
    const { params : {id : planId}} = req;

    const plan = await deleteById(planId, table);
    if(!plan)
       throw new NotFoundError(`No service with id:${planId}`)

    res.status(StatusCodes.OK).send()
})
