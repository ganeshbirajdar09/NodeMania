"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = require("./app/app");
const populateDb_1 = require("./app/utility/populateDb");
(0, app_1.startServer)();
(0, populateDb_1.populateDB)();
