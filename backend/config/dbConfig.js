import mongoose from "mongoose";
// export const  userDataUrl="mongodb+srv://abrahamisaiah129:vRadOq1EVEjpuiCc@userdata.pqfbr.mongodb.net/?retryWrites=true&w=majority&appName=userdata";
// for user data and  products and other data fields
//  this userDataUrl goes to the dotenv file


    // my datatbase connection
   const connnectDb= async()=>{ 
    try{
        const connect=await  mongoose.connect(`${process.env.CONNECTION_STRING}`)
        console.log("Database connected :",connect.connection.host,connect.connection.name)
        
    } 
    catch(error){
        
                console.log(error);
                process.exit();
}
   }
    export default connnectDb;