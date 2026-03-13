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

const Company = mongoose.model("Company", {
  symbol: String,
  security: String,
  gicsSector: String,
  gicsSubIndustry: String,
  headquartersLocation: String,
  dateAdded: String,
  cik: Number,
  founded: String
})
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Company.deleteMany()

    data.forEach((item) => {
      new Company({
        symbol: item.Symbol,
        security: item.Security,
        gicsSector: item["GICS Sector"],
        gicsSubIndustry: item["GICS Sub-Industry"],
        headquartersLocation: item["Headquarters Location"],
        dateAdded: item["Date added"],
        cik: item.CIK,
        founded: item.Founded
      }).save()

    })
  }
  seedDatabase()
}
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
  res.json({
    message: "Welcome to the US500 API",
    endpoints: [
      {
        endpoint: "/companies",
        description: "Get all companies"
      },
      {
        endpoint: "/companies/:symbol",
        description: "Get one company by stock symbol"
      },
      {
        endpoint: "/companies/sector/:sector",
        description: "Get all companies in a specific sector"
      }
    ]
  })
});


//Defining routes
app.get("/companies", async (req, res) => {
  const limit = Number(req.query.limit) || 20
  const sortBy = req.query.sortBy || "security"

  const filter = {}

  if (req.query.sector) {
    filter.gicsSector = req.query.sector
  }

  const companies = await Company.find(filter).sort(sortBy).limit(limit)
  res.json(companies)
})

//Add endpoint for companies
app.get("/companies/:symbol", async (req, res) => {
  const company = await Company.findOne({
    symbol: req.params.symbol.toUpperCase()
  })

  if (!company) {
    res.status(404).json({ message: "Company not found" })
    return
  }

  res.json(company)
})

//Add endpoint for sector
app.get("/companies/sector/:sector", async (req, res) => {

  const filteredCompanies = await Company.find({
    gicsSector: req.params.sector
  })

  if (!sector) {
    res.status(404).json({ message: "Sector not found" })
    return
  }

  res.json(filteredCompanies)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
