const express=require("express");
const planetsRouter=require("../src/routes/planets/planets.router")
const launchesRouter=require("../src/routes/launches/launches.router")

const path=require("path")
const cors=require("cors");
const morgan=require("morgan");
const app = express();
app.use(cors(
    {
        origin:"http://localhost:3000"
    }
));
app.use(morgan('combined'))
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))
app.use(planetsRouter);
app.use(launchesRouter);

module.exports=app;