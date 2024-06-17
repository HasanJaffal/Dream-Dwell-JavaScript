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

const table = 'review';


//get rooms 
export const getReviews = asyncHandler(async (req, res) =>{
    const reviews = await find(table);
    res.status(StatusCodes.OK).json({reviews})
} )
//get room by id
export const getReviewById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : reviewId },
    } = req
    const review = await findById(reviewId, table);
    if(!review)
        throw new NotFoundError(`No review with id:${reviewId}`)

    res.status(StatusCodes.OK).json({review});
})

//create room
export const createReview = asyncHandler(async(req, res) => {
    const data = req.body;
    const review = await create(data,table);
    res.status(StatusCodes.CREATED).json({review})
    console.log(res)
})

//update room
export const updateReview = asyncHandler(async(req, res) => {
    const { params: { id : reviewId } } = req
    const review = await updateById(reviewId, req.body,table)
    if(!review)
       throw new NotFoundError(`No review with id:${reviewId}`)

    res.status(StatusCodes.OK).json({room})
})

export const deleteReview = asyncHandler(async(req, res) => {
    const { params : {id : reviewId}} = req;

    const review = await deleteById(reviewId, table);
    if(!review)
       throw new NotFoundError(`No review with id:${reviewId}`)

    res.status(StatusCodes.OK).send()
})
