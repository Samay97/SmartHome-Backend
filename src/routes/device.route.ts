import { Router } from 'express';
import DeviceController from "@controllers/device.controller";
import { Routes } from '@interfaces/routes.interface';


class DeviceRoute implements Routes {
  public path = '/device';
  public router = Router();
  public deviceController = new DeviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.deviceController.createDevice);
  }
}

export default DeviceRoute;
