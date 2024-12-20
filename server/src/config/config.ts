import dotenv  from 'dotenv';
import { url } from 'inspector';
import mongoose from 'mongoose';
import { mongo } from 'mongoose';


dotenv.config();

const DB_UserName = process.env.DB_UserName || "";
const DB_Password = process.env.DB_Password || "";  
const URI_DB = `mongodb+srv://${DB_UserName}:${DB_Password}@cluster0.inp3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const config = {
    mongo : {
        url : URI_DB
    }
}