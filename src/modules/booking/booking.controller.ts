import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const addBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.addBookingsIntoDb(req.body);
    if (result === false) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookingFromDb();
    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  addBooking,
  getAllBooking,
};
