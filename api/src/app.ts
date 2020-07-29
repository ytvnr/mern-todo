import express, { Express } from 'express';
import cors from "cors";
import todoRoutes from "./routes";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(todoRoutes)

// here we are using a local mongodb
const uri: string = `mongodb://localhost:27017?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
