import { ALL } from "dns"
import { Interface } from "readline"
import { productMap, regionMap } from "./detailsMap"

interface Detail {
  code: number,
  description: string
}

interface Region extends Detail { }

interface Product extends Detail { }

type BarCode = {
  origin: Region | null
  destiny: Region | null
  loggiCode: Number
  sellerCode: Number
  product: Product | null
  original: string
}

export function barCodeDetails(barCodes: string[]): BarCode[] {

  const barCodesReturn: BarCode[] = []

  for (const barCode of barCodes) {
    const split = barCode.match(/.{3}/g)
    if (!split) continue

    const origin = getRegionByCode(parseInt(split[0]))
    const destiny = getRegionByCode(parseInt(split[1]))
    const loggiCode = parseInt(split[2])
    const sellerCode = parseInt(split[3])
    const product = getProdutcByCode(parseInt(split[4]))

    barCodesReturn.push({
      origin: origin,
      destiny: destiny,
      loggiCode: loggiCode,
      sellerCode: sellerCode,
      product: product,
      original: barCode
    })

  }

  return barCodesReturn
}

function getRegionByCode(code: number): Region | null {
  for (const region of regionMap) {
    if (code >= region.range[0] && code <= region.range[1]) {
      return {
        code: code,
        description: region.description
      }
    }
  }

  return null
}

function getProdutcByCode(code: number): Product | null {
  for (const product of productMap) {
    if (code == product.type) {
      return {
        code: code,
        description: product.description
      }
    }
  }
  return null
}
