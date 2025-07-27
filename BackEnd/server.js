const express= require("express");
const cors =require("cors");
 const app = express();
app.use(cors())
 app.use(express.json());

 const router =require("./routes");
 app.use("/api" ,router);



 const connectDB =require("./connectDb");

const port = 5000;

 const startServer = async () => {
    await connectDB();
    app.listen(port, ()=>{
        console.log(`server is listening on http://localhost:${port}`)
    });
 };

 startServer();


