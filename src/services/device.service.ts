import { DEVICETYPE } from "@models/enums";
import { Device, DeviceModel } from "@models/smart-home-devices";
import { LedDeviceModel } from "@models/smart-home-devices/led";

class DeviceService {

  public async createDevice(device: Device): Promise<Device> {
    let id = null;

    switch (device.type) {
      case DEVICETYPE.LIGHT:
        const { _id: idLight } = await LedDeviceModel.create(device);
        id = idLight;
        break;
      case DEVICETYPE.UNKNOWN:
        const { _id: idDevice } = await DeviceModel.create(device);
        id = idDevice;
        break;
    }

    return await DeviceModel.findById(id).exec();
  }

}

export default DeviceService;
