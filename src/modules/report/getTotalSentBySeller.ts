import { BarCode } from "../barCode/barCode"
import { TotalSentBySellerType } from "./report"

export function getTotalSentBySeller(totalBySeller: TotalSentBySellerType[], barCode: BarCode): TotalSentBySellerType[] {

  if (totalBySeller.length == 0) {
    totalBySeller.push({
      sellerCode: barCode.sellerCode,
      totalProduct: 1,
      barCodes: [barCode]
    })
  } else {
    let totalExist = false

    for (const regionKey in totalBySeller) {
      if (totalBySeller[regionKey].sellerCode == barCode.sellerCode) {
        totalExist = true
        totalBySeller[regionKey].totalProduct++
        totalBySeller[regionKey].barCodes.push(barCode)
      }
    }

    if (!totalExist) {
      totalBySeller.push({
        sellerCode: barCode.sellerCode,
        totalProduct: 1,
        barCodes: [barCode]
      })
    }
  }

  return totalBySeller
}