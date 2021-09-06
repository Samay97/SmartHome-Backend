import { DEVICETYPE, LEDTYPE } from "@models/enums";
import { LedDevice, LedDeviceModel } from "@models/smart-home-devices/led";
import { NextFunction, Request, Response } from "express";

class InfoController {

  public getDeviceInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {


      res.status(200).json({ data: 'dev', message: 'found' });
    } catch (error) {
      next(error);
    }
  };

}

export default InfoController;
