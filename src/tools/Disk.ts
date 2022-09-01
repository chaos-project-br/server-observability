import {fsSize} from "systeminformation"

export class Disk{
	public async getUsage():Promise<number>{
		const diskInfo = await fsSize();
		const total = diskInfo.reduce((acc, currentValue) => acc + currentValue.size, 0 )
		const used = diskInfo.reduce((acc, currentValue) => acc + currentValue.used, 0)

		return (used/total) * 100
	}
}