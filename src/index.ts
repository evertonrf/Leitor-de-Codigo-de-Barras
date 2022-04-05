import { readBarCodes } from "./modules/barCode/barCode";
import { report } from "./modules/report/report";
import { getAll } from "./repository/barCodeRepository";

const barCodes = readBarCodes(getAll())
report(barCodes)

//console.log(JSON.stringify(barCodes, null, 2))