import { Schema } from "mongoose";

export interface IWord {
    name: string,
    categories: string[] ,
    level: string 
}