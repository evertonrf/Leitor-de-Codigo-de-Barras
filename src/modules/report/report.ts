import { BarCode, Region } from "../barCode/barCode";
import { getTotalByRegion } from "./getTotalByRegion";
import { getTotalSentBySeller } from "./getTotalSentBySeller";

export interface TotalByRegionType {
  totalProduct: number
  regionCode: number
  barCodes: BarCode[]
  region: Region
}

export interface TotalSentBySellerType {
  totalProduct: number
  sellerCode: number
  barCodes: BarCode[]
}

interface TruckType {
  name: string
  locales: {
    [key: string]: {
      region: Region
      packages: BarCode[]
    }
  }
}

interface ReportReturnType {
  totalByRegion: TotalByRegionType[]
  totalBarCodesInvalid: BarCode[]
  totalSouthToys: BarCode[]
  totalByRegionValid: TotalByRegionType[]
  totalSentBySeller: TotalSentBySellerType[]
  loggiTruck: TruckType
}

export function report(barCodes: BarCode[]): ReportReturnType {
  let totalByRegion: TotalByRegionType[] = []
  const totalBarCodesInvalid: BarCode[] = []
  const totalSouthToys: BarCode[] = []
  let totalByRegionValid: TotalByRegionType[] = []
  let totalSentBySeller: TotalSentBySellerType[] = []
  const loggiTruck: TruckType = {
    name: 'Loggi Truck',
    locales: {}
  }

  for (const barCode of barCodes) {
    totalByRegion = getTotalByRegion(totalByRegion, barCode)
    if (barCode.isInvalid) {
      totalBarCodesInvalid.push(barCode)
    }
    if (barCode.origin?.regionCode == 2 && barCode.product?.type == 888) {
      totalSouthToys.push(barCode)
    }
    if (!barCode.isInvalid) {
      totalSentBySeller = getTotalSentBySeller(totalSentBySeller, barCode)
    }

    if (barCode.destiny?.regionCode == 5 || barCode.destiny?.regionCode == 3) {
      if (!loggiTruck.locales[barCode.destiny.regionCode]) {
        loggiTruck.locales[barCode.destiny.regionCode] = {
          region: barCode.destiny,
          packages: []
        }
      }

      let dispatch = true
      if (barCode.destiny.regionCode == 3) {
        if (barCode.isInvalid && barCode.product?.type == 1) {
          dispatch = false
        }
      }
      if (dispatch == true) {
        loggiTruck.locales[barCode.destiny.regionCode].packages.push(barCode)
      }
    }
  }

  for (const region of totalByRegion) {
    const newRegion: TotalByRegionType = {
      regionCode: region.regionCode,
      totalProduct: 0,
      barCodes: [],
      region: region.region
    }

    for (const regionBarCode of region.barCodes) {
      if (!regionBarCode.isInvalid) {
        newRegion.totalProduct++
        newRegion.barCodes.push(regionBarCode)
      }
    }

    totalByRegionValid.push(newRegion)
  }

  for (const key in loggiTruck.locales) {
    loggiTruck.locales[key].packages.sort((a, b) => {
      if (b.product?.type == 1) {
        return 1
      } else {
        return -1
      }
    })
  }

  loggiTruck.locales = Object.fromEntries(
    Object.entries(loggiTruck.locales).sort(([, a], [, b]) => {
      if (b.region.regionCode == 3) {
        return 1
      } else {
        return -1
      }
    })
  );

  return {
    loggiTruck: loggiTruck,
    totalByRegion: totalByRegion,
    totalSouthToys: totalSouthToys,
    totalSentBySeller: totalSentBySeller,
    totalBarCodesInvalid: totalBarCodesInvalid,
    totalByRegionValid: totalByRegionValid
  }
} 