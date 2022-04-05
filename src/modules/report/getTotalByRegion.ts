import { BarCode } from "../barCode/barCode"
import { TotalByRegionType } from "./report"

export function getTotalByRegion(totalByRegion: TotalByRegionType[], barCode: BarCode): TotalByRegionType[] {
  if (!barCode.destiny) {
    return totalByRegion
  }

  if (totalByRegion.length == 0) {
    totalByRegion.push({
      regionCode: barCode.destiny?.regionCode,
      totalProduct: 1,
      barCodes: [barCode]
    })
  } else {
    let totalExist = false

    for (const regionKey in totalByRegion) {
      if (totalByRegion[regionKey].regionCode == barCode.destiny.regionCode) {
        totalExist = true
        totalByRegion[regionKey].totalProduct++
        totalByRegion[regionKey].barCodes.push(barCode)
      }
    }

    if (!totalExist) {
      totalByRegion.push({
        regionCode: barCode.destiny?.regionCode,
        totalProduct: 1,
        barCodes: [barCode]
      })
    }
  }

  return totalByRegion
}