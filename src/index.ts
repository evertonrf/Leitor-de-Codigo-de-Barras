import { barCodeDetails } from "./modules/barCode/barCode";
import { getAll } from "./repository/barCodeRepository";

const barCodes = getAll()

barCodeDetails(barCodes)