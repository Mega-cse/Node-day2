import express from 'express'
import { createRooms,Bookings,roomsBooked,customersBooked,booked, getRooms, getBookings} from '../Controller/data.js';

const router = express.Router();
router.post('/rooms',createRooms);
router.get('/getrooms',getRooms);
router.post('/bookings',Bookings);
router.get('/getbookings',getBookings);
router.get('/room-booked',roomsBooked);
router.get('/customers-booked',customersBooked)
router.get('/customers/:customerName/bookings',booked)



export default router;