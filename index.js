const express = require("express"); //includes express in this app
const path = require("path"); //module to help with file paths
const dotenv = require("dotenv"); //to connect .env file
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || "1998";
const cors = require("cors");

dotenv.config(); //load local environment variables from .env files
app.use(cors());

//DB Values
const dbUrl = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PWD}@${process.env.DB_URL}/`;
console.log(dbUrl);
const client = new MongoClient(dbUrl);


//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//PAGE ROUTES
app.get("/portfolio", async (request, response) => {
  let projects = await getProjects();
  console.log("Data:", projects);
  response.json(projects)
});

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("portfolio"); //if there is a default db in the connection, this can be left blank
  return db;
}
//Function to select all documents in the userReviews collection
async function getProjects() {
  db = await connection();
  let results = db.collection("project").find({});
  let res = await results.toArray();
  return res;
}

