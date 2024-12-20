import express , {Application} from "express";
// import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import cors  from 'cors';
import mongoose from "mongoose";
import {config} from "./config/config";
import { error } from "console";
import { nextTick } from "process";
import chalk from "chalk";
import Logging from "./library/Logging";

const router  = express();

dotenv.config();
const app = express();
export const PORT  = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "http://example.com"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));


app.use(express.json());




// Start Server
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server is running on http://localhost:${PORT}`));
});

// connect DB 
mongoose.connect(config.mongo.url , {retryWrites : true , w : 'majority'}).
then(() => { 
    console.log('connected to server database mongodb with port is ');
    startServer();
}).catch(( error) => {
    console.log(Logging.error("Error to connecting to server Database MongoDb "+ error));
})

// start  server 
const startServer = () => {
    router.use((req ,res , next) => { 
        Logging.info(`incoming - METHOD : [${req.method}] - URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`)

             res.on("finish", () => {
               /** Log the res */
               Logging.info(
                 `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
               )
             });

             next();
    })

       router.use(express.urlencoded({ extended: true }));
       router.use(express.json());

   

}
