import { config } from "dotenv";
config();

import { startServer } from "./app/app";
import { populateDB } from "./app/utility/populateDb";
startServer();

populateDB()

