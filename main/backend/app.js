import express from "express";
import roomRoute from "./routes/roomRoute.js";
import roomTypeRoutes from "./routes/roomTypeRoute.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";
import invoiceRoute from "./routes/invoiceRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import servicePlanRoute from './routes/servicePlanRoute.js'
import reviewRoute from './routes/reviewRoutes.js'
import requestRoute from './routes/requestRoute.js'
import userRoutes from './routes/userRoutes.js'
import additionalSPRoute from './routes/additionalSPRoute.js'
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import cors from "cors"


dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());


//Routes
app.get('/', (req, res) => {
    res.send('<h1>Hotel API</h1><a href="/api/v1">products route</a>');
});

app.use("/api/rooms", roomRoute);
app.use("/api/roomtype", roomTypeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoute);
app.use("/api/invoice", invoiceRoute);
app.use('/api/serviceplan',servicePlanRoute)
app.use('/api/reviews',reviewRoute)
app.use('/api/requests',requestRoute)
app.use('/api/guest',userRoutes)
app.use('/api/additionalSP',additionalSPRoute)
//Error handler
app.use(errorHandlerMiddleware);

const port = 4000;

app.listen(port, () => console.log(`Server is listing on port ${port}...`));
