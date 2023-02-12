// /*
// Loading the .env file and creates environment variables from it
// */
require("dotenv").config();
const mongoose = require("mongoose");
const colorNames = require("./colors.json");

const colorModel = require("../db/colorModel.model");
// const fructModel = require("../db/fruct.model")
// const fructe = require("./fructe.json");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}


const colorSchema = async () => {
  await colorModel.deleteMany({});

  const colors = colorNames.map((name) => ({
    name,
  }));

  await colorModel.create(...colors);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await colorSchema()

  // await populateFructe();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
