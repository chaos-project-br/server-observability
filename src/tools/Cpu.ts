import { currentLoad } from "systeminformation";


export class Cpu {
  public async getUsage():Promise<number>{
    const cpuCurrentLoadInfo = await currentLoad()

    return cpuCurrentLoadInfo.currentLoad
  }
}