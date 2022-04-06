import { readBarCodes } from "./modules/barCode/barCode";
import { report } from "./modules/report/report";
import { getAll } from "./repository/barCodeRepository";

const barCodes = readBarCodes(getAll())
const {
  totalByRegion,
  totalSouthToys,
  totalByRegionValid,
  totalSentBySeller,
  loggiTruck,
  totalBarCodesInvalid
} = report(barCodes)

console.log(`EX. 1: Total de pacotes separado por destino`)
for (const region of totalByRegion) {
  console.log(`A Região ${region.region?.description} possui ${region.totalProduct} procutos.`)
}

console.log(`
-----
`)

console.log(`EX. 2: Codigos de barras Validos ou Invalidos`)
for (const barCode of barCodes) {
  if (barCode.isInvalid) {
    console.log(`Invalido: ${barCode.original}`)
  } else {
    console.log(`Valido:   ${barCode.original}`)
  }
}

console.log(`
-----
`)

console.log(`EX. 3: Pacotes com brinquedos para região Sul`)
if (totalSouthToys.length == 0) {
  console.log(`Não possui brinquedos para região SuL`)
}
for (const barCode of totalSouthToys) {
  console.log(`${barCode.original}`)
}

console.log(`
-----
`)

console.log(`EX. 4: Pacotes validos agrupados por região de destino.`)
for (const region of totalByRegionValid) {
  console.log(`${region.region.description} total de: ${region.totalProduct}`)

  for (const barCode of region.barCodes) {
    console.log(`    ${barCode.original}, ${barCode.product?.description}`)
  }
}

console.log(`
-----
`)

console.log(`EX. 5: Quantidade de pacotes enviados por vendedor.`)
for (const sentBySeller of totalSentBySeller) {
  console.log(`O vendedor ${sentBySeller.sellerCode} enviou ${sentBySeller.totalProduct} produtos.`)
}

console.log(`
-----
`)

console.log(`EX. 6: Pacotes separados por destino e tipo.`)
console.log(`Não processado`)

console.log(`
-----
`)

console.log(`EX. 7, 8, 9: Despachando pacotes para o Norte passando pelo Centro-Oeste, tendo como prioridade entrega de joias.`)
console.log(`Carga para o caminhão ${loggiTruck.name}`)
for (const key in loggiTruck.locales) {
  const locale = loggiTruck.locales[key]
  console.log(`Pacotes para a região ${locale.region.description}: `)

  if (locale.packages.length == 0) {
    console.log(`   Não ha pacotes para esta região`)
  }
  for (const barCode of locale.packages) {
    console.log(`   ${barCode.original}, ${barCode.product?.description}`)
  }
}

console.log(`
-----
`)

console.log(`EX. 10: Pacotes inválidos.`)
for (const barCode of totalBarCodesInvalid) {
  console.log(`${barCode.original}:`)
  for (const key in barCode.invalidDetails) {
    const detail = barCode.invalidDetails[key]
    console.log(`   ${detail.description}`)
  }
}
