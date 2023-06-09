import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingServices from '@/services/booking-service';

export async function getBook(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const book = await bookingServices.showBook(userId);
    res.send(book);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function postBook(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const { roomId } = req.body;
    const newBook = await bookingServices.addBook(userId, roomId);
    res.status(httpStatus.OK).send({ bookingId: newBook.id });
  } catch (error) {
    res.status(error.status).send(error.message);
  }
}

export async function putBook(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.userId;
    const bookId = Number(req.params.bookingId);
    const { roomId } = req.body;
    const book = await bookingServices.changeBook(userId, bookId, roomId);
    res.send({ bookingId: book.id });
  } catch (error) {
    res.status(error.status).send(error.message);
  }
}
