import express from 'express';
import { createRequest, deleteRequest, getRequests, geteRequestById, updateRequest } from '../controller/request.js';

const router = express.Router();

router.get('/',getRequests);
router.get('/:id',geteRequestById)
router.post('/',createRequest);
router.put('/:id',updateRequest);
router.delete('/:id',deleteRequest)


export default router