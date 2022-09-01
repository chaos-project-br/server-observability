import { mem } from "systeminformation";

export class Memory{
  public async getUsage(): Promise<number>{
    const memInfo = await mem()
    const usedPercent = (memInfo.used/memInfo.total) * 100
    return usedPercent
  }
}