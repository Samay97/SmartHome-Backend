import { DEVICETYPE, LEDTYPE } from "@models/enums";
import { LEDCONFIG } from "@models/enums/LEDCONFIG";
import { LedDevice, LedDeviceModel } from "@models/smart-home-devices/led";
import DeviceService from "@services/device.service";
import { NextFunction, Request, Response } from "express";

class DeviceController {

  private deviceService = new DeviceService();

  public createDevice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const device: LedDevice = {
        name: 'Led Arbeitsplatz',
        ip: '192.168.0.110',
        type: DEVICETYPE.LIGHT,
        data: {
          ledType: LEDTYPE.RGBW,
          ledConfiguration: LEDCONFIG.RGB
        }
      };


      const createdDevice = await this.deviceService.createDevice(device);

      res.status(201).json({ data: createdDevice, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

}

export default DeviceController;
