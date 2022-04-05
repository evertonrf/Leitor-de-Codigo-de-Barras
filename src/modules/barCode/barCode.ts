import { ALL } from "dns"
import { Interface } from "readline"
import { productMap, regionMap } from "./detailsMap"

interface Detail {
  code: number,
  description: string
}

export interface Region extends Detail {
  regionCode: number
}

interface Product {
  description: string
  type: number
}

interface InvalidDetails extends Detail { }

export type BarCode = {
  origin: Region | null
  destiny: Region | null
  loggiCode: Number
  sellerCode: Number
  product: Product | null
  original: string
  isInvalid: boolean
  invalidDetails: {
    [key: string]: InvalidDetails
  }
}

export function readBarCodes(barCodes: string[]): BarCode[] {

  const barCodesReturn: BarCode[] = []

  for (const barCode of barCodes) {
    const split = barCode.match(/.{3}/g)
    if (!split) continue

    const origin = getRegionByCode(parseInt(split[0]))
    const destiny = getRegionByCode(parseInt(split[1]))
    const loggiCode = parseInt(split[2])
    const sellerCode = parseInt(split[3])
    const product = getProdutcByCode(parseInt(split[4]))
    let isInvalid = false
    const invalidDetails: {
      [key: string]: InvalidDetails
    } = {}

    if (!origin) {
      isInvalid = true
      invalidDetails['1'] = {
        code: 1,
        description: 'Origem Invalida'
      }
    }

    if (!destiny) {
      isInvalid = true
      invalidDetails['2'] = {
        code: 2,
        description: 'Destino Invalida'
      }
    }

    if (!product) {
      isInvalid = true
      invalidDetails['3'] = {
        code: 3,
        description: 'Produto Invalido'
      }
    }

    if (sellerCode == 367) {
      isInvalid = true
      invalidDetails['4'] = {
        code: 4,
        description: 'Vendedor Inativo'
      }
    }

    if (destiny?.regionCode == 3 && product?.type == 1) {
      isInvalid = true
      invalidDetails['5'] = {
        code: 5,
        description: product.description + ' não podem ser despachadas para ' + destiny.description
      }
    }

    barCodesReturn.push({
      origin: origin,
      destiny: destiny,
      loggiCode: loggiCode,
      sellerCode: sellerCode,
      product: product,
      original: barCode,
      isInvalid: isInvalid,
      invalidDetails: invalidDetails
    })

  }

  return barCodesReturn
}

function getRegionByCode(code: number): Region | null {
  for (const region of regionMap) {
    if (code >= region.range[0] && code <= region.range[1]) {
      return {
        code: code,
        description: region.description,
        regionCode: region.regionCode

      }
    }
  }

  return null
}

function getProdutcByCode(code: number): Product | null {
  for (const product of productMap) {
    if (code == product.type) {
      return {
        type: code,
        description: product.description
      }
    }
  }
  return null
}
