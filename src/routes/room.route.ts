import { Router } from 'express';
import validationMiddleware from "@middlewares/validation.middleware";
import { CreateRoomDto } from "@dtos/room.dto";
import { Routes } from '@interfaces/routes.interface';
import RoomController from "@controllers/room.controller";


class RoomRoute implements Routes {
  public path = '/room';
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.roomController.getRooms);
    this.router.get(`${this.path}/:id(\\d+)`, this.roomController.getRoomById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRoomDto, 'body'), this.roomController.createRoom);
    this.router.post(`${this.path}/:id(\\d+)/devices`, this.roomController.getDevicesInRoom);
  }
}

export default RoomRoute;
