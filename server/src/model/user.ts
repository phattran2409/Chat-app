import { create } from "domain";
import mongoose , {Schema , Document , Model} from "mongoose";
// create interface
export interface IUser extends Document  { 
    name : String;
    email : String;
    password : String;
    CreatedAt : Date; 
    UpdateAt : Date;
}
// create schema
const userSchema : Schema  = new Schema<IUser> (
   {
    name : {
        type : String, 
        required : true,
        trim : true
    } , 
    email : {
        type : String,
        required : true, 
        unique : true,
        lowercase : true,
        
    } ,  
    password : { 
        type :String, 
        required : true,
    } 
   } ,{
    timestamps : true
   }
)

// create user model 
const user : Model<IUser> = mongoose.model<IUser>('user' , userSchema )

export default user 