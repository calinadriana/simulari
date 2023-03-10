/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const colors = require("./colors.json");
const EmployeeModel = require("../db/employee.model");
const colorModel = require("../db/colorModel.model");
// const fructModel = require("../db/fruct.model")
// const fructe = require("./fructe.json");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
    await EmployeeModel.deleteMany({});
    await colorModel.deleteMany({});

    await colorModel.create(...colors.map((c) => ({ name: c })));

    const culori = await colorModel.find({}).lean();

    const employees = names.map((name) => ({
        name,
        level: pick(levels),
        position: pick(positions),
        colors: pick(culori.map((c) => c._id)),
    }));

    await EmployeeModel.create(...employees);
    console.log("Employees created");
};
// const populateFructe = async () => {
//   await fructModel.deleteMany({});

//   const items = fructe.map((name) => ({
//     name

//   }));

//   await fructModel.create(...items);
//   console.log("Fructe created");
// };

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateEmployees();

    // await populateFructe();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
