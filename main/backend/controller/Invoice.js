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

const table = 'invoice';

export const getInvoices =asyncHandler(async (req, res) =>{
    const inovice = await find(table);
    res.status(StatusCodes.OK).json({inovice})
} )

export const getInvoiceById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : invoiceId },
    } = req
    const invoice = await findById(invoiceId, table);
    if(!invoice)
        throw new NotFoundError(`No invoice with id:${invoiceId}`)

    res.status(StatusCodes.OK).json({invoice});
})

export const createInvoice = asyncHandler(async(req, res) => {
    const data = req.body;
    const invoice = await create(data,table);

    res.status(StatusCodes.CREATED).json({invoice})
})
export const deleteInvoice = asyncHandler(async(req, res) => {
    const { params : {id : invoiceId}} = req;

    const invoice = await deleteById(invoiceId, table);
    if(!invoice)
       throw new NotFoundError(`No review with id:${invoiceId}`)

    res.status(StatusCodes.OK).send()
})
