import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getRoomsFromHotel } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getRoomsFromHotel);

export { hotelsRouter };
