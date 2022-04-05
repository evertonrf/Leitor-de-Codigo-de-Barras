import { BarCode } from "../barCode/barCode";
import { getTotalByRegion } from "./getTotalByRegion";

export interface TotalByRegionType {
  totalProduct: number
  regionCode: number
  barCodes: BarCode[]
}


export function report(barCodes: BarCode[]) {
  let totalByRegion: TotalByRegionType[] = []
  const totalBarCodesInvalid: BarCode[] = []
  const totalSouthToys: BarCode[] = []
  let totalByRegionValid: TotalByRegionType[] = []

  for (const barCode of barCodes) {
    totalByRegion = getTotalByRegion(totalByRegion, barCode)
    if (barCode.isInvalid) {
      totalBarCodesInvalid.push(barCode)
    }
    if (barCode.origin?.regionCode == 2 && barCode.product?.type == 888) {
      totalSouthToys.push(barCode)
    }
  }

  for (const region of totalByRegion) {
    const newRegion: TotalByRegionType = {
      regionCode: region.regionCode,
      totalProduct: 0,
      barCodes: []
    }

    for (const regionBarCode of region.barCodes) {
      if (!regionBarCode.isInvalid) {
        newRegion.totalProduct++
        newRegion.barCodes.push(regionBarCode)
      }
    }

    totalByRegionValid.push(newRegion)
  }

  console.log(totalByRegionValid)
  console.log('----')

  console.log(totalByRegion)
} 