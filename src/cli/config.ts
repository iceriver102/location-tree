import { DataSource } from "typeorm";
import {config} from "dotenv"
import { parseConfig } from "~core/utils/database-config";
config({path:[".env", "local/.env"]})
const AppDataSource = new DataSource(parseConfig()); 
export default AppDataSource