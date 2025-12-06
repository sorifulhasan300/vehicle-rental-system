import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle create Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle create Unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const vehicle = await vehicleService.updateVehicle(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Vehicle update Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle update Unsuccessfully",
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
      message: "Vehicle delete Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle delete Unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  console.log(id);
  try {
    const vehicle = await vehicleService.getSingleVehicle(id as string);
    res.status(200).json({
      success: true,
      message: "Vehicle get Successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicle get Unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles get Successfully",
      data: vehicles,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Vehicles get Unsuccessfully",
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
