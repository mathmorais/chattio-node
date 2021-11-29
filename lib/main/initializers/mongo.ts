import { connect } from "mongoose";
import { databaseConfig } from "../configs/DatabaseConfig";

export const mongoClient = connect(databaseConfig.url, databaseConfig.options);
