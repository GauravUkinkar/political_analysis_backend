import express from "express";
import cors from "cors";
import { connection, pool } from "./database/db.js";
import createAllTabels from "./tabels/Table.js";
import { candidateCountRoute } from "./routes/CandidateCount.js";
import { boothRoute } from "./routes/Booth.js";
import { candidateRoute } from "./routes/candidate.js";

const app =express();

app.use(cors());

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("hello world")
})

app.use("/candidateCount",candidateCountRoute);
app.use("/booth", boothRoute);
app.use("/candidate", candidateRoute)


try {

    await connection();
    await createAllTabels();
    


    app.listen(8080, ()=>{
        console.log("Server is running on port 8080");
    })
} catch (error) {
    
}
