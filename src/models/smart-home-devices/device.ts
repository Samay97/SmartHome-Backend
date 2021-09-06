import { DEVICETYPE } from "@models/enums";
import { prop, getModelForClass } from '@typegoose/typegoose';

declare interface IDevice {
  name: string;
  ip: string;
  type: DEVICETYPE;
  data: any; // Every DEVICETYPE implements their model here
}

export class Device implements IDevice {
  @prop({ unique: true })
  public name: string;

  @prop({ required: true, unique: true})
  ip: string;

  @prop({  required: false })
  data: any;

  @prop({  default: DEVICETYPE.UNKNOWN, enum: DEVICETYPE, type: Number })
  type: DEVICETYPE;
}

export const DeviceModel = getModelForClass(Device);
