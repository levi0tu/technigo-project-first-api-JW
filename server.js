import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import data from "./data/us500.json" with { type: "json" };

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json"
// import booksData from "./data/books.json"
// import goldenGlobesData from "./data/golden-globes.json"
// import netflixData from "./data/netflix-titles.json"
// import topMusicData from "./data/top-music.json"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-first-api"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


//Defining routes
app.get("/companies", (req, res) => {
  res.json(data)
})

//Add endpoint for companies
app.get("/companies/:symbol", (req, res) => {
  const company = data.find(
    (item) => item.Symbol.toLowerCase() === req.params.symbol.toLowerCase()
  )

  if (!company) {
    res.status(404).json({ message: "Company not found" })
    return
  }

  res.json(company)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
