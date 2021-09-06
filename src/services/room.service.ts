import { Room, RoomModel } from "@/models";
import { CreateRoomDto } from "@dtos/room.dto";

class RoomService {

  public async createRoom(room: CreateRoomDto): Promise<Room> {
    const { _id: id} = await RoomModel.create(room);
    return await RoomModel.findById(id).exec();
  }

}

export default RoomService;
