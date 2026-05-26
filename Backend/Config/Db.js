import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDb = async ()=>{
   
        
    try {
         await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB connected");
    
    } catch (error) {
          console.error("❌ DB connecting issues:", error.message);
        
    }

}
export default connectDb
