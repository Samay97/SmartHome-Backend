import { LEDTYPE } from "@models/enums";
import { LEDCONFIG } from "@models/enums/LEDCONFIG";
import { Device, DeviceModel } from "@models/smart-home-devices/device";
import { prop, getDiscriminatorModelForClass, modelOptions } from "@typegoose/typegoose";

declare interface ILed {
  ledType: LEDTYPE;
  ledConfiguration: LEDCONFIG;
}

@modelOptions({ schemaOptions:  { _id : false }})
export class LedData implements ILed {

  @prop({ required: true, enum: LEDTYPE, type: Number })
  public ledType: LEDTYPE;

  @prop({ default: LEDCONFIG.RGB, enum: LEDCONFIG, type: Number })
  public ledConfiguration: LEDCONFIG;

}

export class LedDevice extends Device {

  @prop({ required: true, type: () => LedData })
  public data: LedData;

}

export const LedDeviceModel = getDiscriminatorModelForClass(DeviceModel, LedDevice);
