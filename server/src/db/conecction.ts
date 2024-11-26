import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export const connection = async() => {

    try{
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined");
        }
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connection established")
    }catch(error){
        console.log(error);
        throw new Error("Could not connect to the database")
    }
}

