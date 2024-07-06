// this is to establish connection with database in our case mongodb
import mongoose from "mongoose";

export async function connect(){
    try {
        //creating connection object
        mongoose.connect(process.env.MONGO_URI!)// this exclamation is important for ts here we mean when we send link we will check it so it is verified
        const connection = mongoose.connection;

        // establishing connection
        connection.on('connection',()=>{
            console.log('MongoDB connected successfully')
        })
        //handling error if any
        connection.on('error',(err)=>{
            console.log('MongoDB connection error. please make sure mongoDB is running '+err)
            process.exit();
        })


    } catch (error) {
        console.log('something goes wrong')
        console.log(error)
    }
}




