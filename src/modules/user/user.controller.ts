import { Request, Response } from "express";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getALLUsersFromDb();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user as JwtPayload;
    const targetUserId = Number(req.params.userId);
    let result: any;
    if (loggedInUser.role === "admin") {
      result = await userServices.updateUserIntoDb(targetUserId!, req.body);
    } else if (loggedInUser.role === "customer") {
      if (loggedInUser.id !== targetUserId) {
        return res.status(403).json({
          success: false,
          message: "Permission denied. You can update only your own profile.",
        });
      }
      result = await userServices.updateUserIntoDb(targetUserId!, req.body);
    }

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUserFromDb(req.params.userId!);
    if (result === false) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user.Active bookings exist.",
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
