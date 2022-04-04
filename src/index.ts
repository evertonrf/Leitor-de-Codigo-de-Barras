import { readBarCodes } from "./modules/barCode/barCode";
import { getAll } from "./repository/barCodeRepository";

const barCodes = readBarCodes(getAll())

console.log(JSON.stringify(barCodes, null, 2))