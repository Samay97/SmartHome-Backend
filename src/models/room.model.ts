import { Device } from "@models/smart-home-devices";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

declare interface IRoom {
  name: string;
  devices: Ref<Device>[];
}

export class Room implements IRoom {
  @prop({ unique: true })
  public name: string;

  @prop({ ref: () => Device })
  public devices: Ref<Device>[];
}

export const RoomModel = getModelForClass(Room);
