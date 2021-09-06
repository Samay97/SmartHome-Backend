export enum LEDTYPE {
  SL = 0,             // Switched or On/Off lights
  DL = 1,             // 1 Channel - dimmable lights
  CCT = 2,            // 2 Channels - dimmable and color temperature
  RGB = 3,            // 3 Channels - Red Green and Blue
  RGBW = 4,           // 4 Channels - RGBW Lights Red, Green, Blue and white
  RGBCCT = 5,         // 5 Channels - 3 Channel RGB light and an additional 2 channel CCT light.
}
