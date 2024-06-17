import express from 'express';
import {getInvoices, getInvoiceById, createInvoice, deleteInvoice} from '../controller/Invoice.js';
const router = express.Router();

router.route('/').get(getInvoices);
router.route('/:id').get(getInvoiceById);
router.post('/', createInvoice)
router.delete('/:id',deleteInvoice)
export default router;