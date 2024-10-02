
// export const  userDataUrl="mongodb+srv://abrahamisaiah129:vRadOq1EVEjpuiCc@userdata.pqfbr.mongodb.net/?retryWrites=true&w=majority&appName=userdata";
// for user data and  products and other data fields
//  this userDataUrl goes to the dotenv file

    // my datatbase connection
   const connnectDb=()=>{ mongoose.connect(`${process.env.CONNECTION_URL}`).then(
        ()=>{
        console.log("database is connected");

            }
    )
    .catch(
        
            (error)=>{
                console.log(error);
            }
        
    )}

    export default connnectDb;