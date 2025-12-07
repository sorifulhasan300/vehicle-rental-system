import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const getSingleVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const vehicle = await vehicleService.getSingleVehicle(id as string);
    if (!vehicle) {
      res.status(200).json({
        success: true,
        message: "Vehicle Not Found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle get successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle get unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles get successfully",
      data: vehicles,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicles get unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle create successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle create unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const vehicle = await vehicleService.updateVehicle(id as string, req.body);

    if (vehicle.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No vehicle found to update",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle update successfully",
      data: vehicle.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle update unsuccessfully",
      error: (error as Error).message,
    });
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const vehicle = await vehicleService.deleteVehicle(id as string);
    res.status(200).json({
      success: true,
      message: "Vehicle delete successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle delete unsuccessfully",
      error: (error as Error).message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getSingleVehicle,
  getAllVehicles,
};
