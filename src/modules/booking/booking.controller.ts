import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

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
    const loggedInUser = req.user as JwtPayload;
    let result;
    if (loggedInUser.role === "admin") {
      result = await bookingServices.getAllBookingFromDb();
    } else if (loggedInUser.role === "customer") {
      result = await bookingServices.getCustomerBookings(loggedInUser.id);
    }
    if (result === false) {
      return res.status(404).json({
        success: false,
        message: "No booking found",
      });
    }
    res.status(200).json({
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

const updateBooking = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const loggedInUser = req.user as JwtPayload;
    if (loggedInUser.role === "admin") {
      const result = await bookingServices.updateForAdmin(
        req.params.bookingId!,
        status
      );
      if (result === false) {
        return res.status(404).json({
          success: false,
          message: "No booking found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: result,
      });
    } else if (loggedInUser.role === "customer") {
      const result = await bookingServices.updateForCustomer(
        loggedInUser.id,
        req.params.bookingId!,
        status
      );
      if (result === false) {
        return res.status(404).json({
          success: false,
          message: "No booking found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result,
      });
    }
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
  updateBooking,
};
