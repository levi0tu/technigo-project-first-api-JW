# First API

# US500 API

A RESTful API built with Express and Mongoose using data about 500 US companies.

## Features

- Get all companies
- Get one company by symbol
- Filter companies by sector
- Limit and sort results with query parameters
- Data is seeded into MongoDB

## Endpoints

- `/`
- `/companies`
- `/companies/:symbol`
- `/companies/sector/:sector`

## Query params

For `/companies`:

- `limit`
- `sortBy`

Example:

`/companies?limit=10&sortBy=symbol`

## Tech stack

- Express
- Mongoose
- MongoDB

## How to run locally

```bash
npm install
npm run dev


## View it live
