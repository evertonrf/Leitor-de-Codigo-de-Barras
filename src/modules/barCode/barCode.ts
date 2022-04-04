import { ALL } from "dns"
import { productMap, regionMap } from "./detailsMap"

type Detail = {
  code: number,
  description: string
}

type Region = Detail

type Product = Detail

type BarCode = {
  origin: Region
  destiny: Region
  loggiCode: Number
  sellerCode: Number
  product: Product
}

export function barCodeDetails(barCodes: string[]): BarCode[] {

  const codes = barCodes.map(barCode => {
    const split = barCode.match(/.{3}/g)
    if (!split) return {}

    const origin = getRegion(parseInt(split[0]))
    const destiny = getRegion(parseInt(split[1]))
    const loggiCode = parseInt(split[2])
    const sellerCode = parseInt(split[3])
    const productMap = getProdutc(parseInt(split[4]))

    console.log(productMap)

  })

  return []
}

function getRegion(code: number): Region | null {
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
function getProdutc(code: number): Product | null {
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
