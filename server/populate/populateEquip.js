/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

const equipName = require("./equipmentName.json");
const type = require("./equipmentType.json");
const amount = require("./equipmentAmount.json");

const EquipModel = require("../db/equip.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquip = async () => {
  await EquipModel.deleteMany({});

  const equip = equipName.map((name) => ({
    name,
    type: pick(type),
    amount: pick(amount),
  }));

  await EquipModel.create(...equip);
  console.log("Equip created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquip();
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
