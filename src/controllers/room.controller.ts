import { CreateRoomDto } from "@dtos/room.dto";
import RoomService from "@services/room.service";
import { NextFunction, Request, Response } from "express";

class RoomController {

  private roomService = new RoomService();

  public getRooms = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: 'dev', message: 'found' });
    } catch (error) {
      next(error);
    }
  }

  public getRoomById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: 'dev', message: 'found' });
    } catch (error) {
      next(error);
    }
  }

  public createRoom = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roomData: CreateRoomDto = req.body;
      const createRoomData: any = await this.roomService.createRoom(roomData);

      res.status(201).json({ data: createRoomData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public getDevicesInRoom = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).json({ data: 'dev', message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public addDeviceToRoom = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).json({ data: 'dev', message: 'created' });
    } catch (error) {
      next(error);
    }
  }

}

export default RoomController;
