const express = require('express');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(express.json());
const pass = 'Shr123yash#';
const uri = "mongodb://http://localhost:27017/coffeproject";
var dbURI = "mongodb://127.0.0.1:27017/loc9r";
const coffeRoutes = require("./routes/coffeRoutes");
// const dataRoute = require("./routes/dataRoute");
// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


  app.use(
    coffeRoutes
    )
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
