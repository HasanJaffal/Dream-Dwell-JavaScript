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

const table = 'booking';

export const getAllBooking =asyncHandler(async (req, res) =>{
    const booking = await find(table);
    res.status(StatusCodes.OK).json({booking})
} )

export const getBookingById = asyncHandler(async(req, res) => {
    const { 
        params:{ id : bookingId },
    } = req
    const booking = await findById(bookingId, table);
    if(!booking)
        throw new NotFoundError(`No booking with id:${bookingId}`)

    res.status(StatusCodes.OK).json({booking});
})

//create booking
// ...
export const BookingRoom = asyncHandler(async (req, res) => {
    const data = req.body;
    const currentDate = new Date(Date.now());

    // Extract day, month, and year from checkInDate and checkOutDate
    const checkInDate = new Date(req.body.checkInDate);
    const checkOutDate = new Date(req.body.checkOutDate);
    const formattedCheckInDate = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
    const formattedCheckOutDate = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());

    // Convert dates to strings and remove time zone information
    const isoFormattedCheckInDate = formattedCheckInDate.toISOString().slice(0, 10);
    const isoFormattedCheckOutDate = formattedCheckOutDate.toISOString().slice(0, 10);

    if (currentDate <= formattedCheckInDate && currentDate <= formattedCheckOutDate) {
        if (formattedCheckInDate < formattedCheckOutDate) {
            const booking = await create({ ...data, checkInDate: isoFormattedCheckInDate, checkOutDate: isoFormattedCheckOutDate }, table);
            return res.status(StatusCodes.CREATED).json({ message: 'Booking successful', booking });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Check-out date should be greater than check-in date' });
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid check-in or check-out dates' });
    }
});
// ...

//update booking
export const updateBooking = asyncHandler(async(req, res) => {
    const { params: { id : bookingId } } = req
    const booking = await updateById(bookingId, req.body,table)
    if(!booking)
       throw new NotFoundError(`No booking with id:${bookingId}`)

    res.status(StatusCodes.OK).json({booking})
})

export const deleteBooking = asyncHandler(async(req, res) => {
    const { params : {id : bookingId}} = req;

    const booking = await deleteById(bookingId, table);
    if(!booking)
       throw new NotFoundError(`No booking with id:${bookingId}`)

    res.status(StatusCodes.OK).send()
})
