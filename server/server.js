require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipModel = require("./db/equip.model")
const colorModel = require("./db/colorModel.model")
const cors = require("cors")

const { MONGO_URL, PORT = 8080 } = process.env;
// console.log(MONGO_URL);
// console.log(PORT);
if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//Ruta culori
app.use("/api/colors/:id", async (req, res, next) => {
  let color = null;

  try {
    color = await colorModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!color) {
    return res.status(404).end("color not found");
  }

  req.color = color;
  next();
});

app.get("/api/colors/", async (req, res) => {
  const colors = await colorModel.find().sort({ created: "desc" });
  return res.json(colors);
});

app.get("/api/colors/:id", (req, res) => {
  return res.json(req.color);
});

app.post("/api/colors/", async (req, res, next) => {
  const color = req.body;

  try {
    const saved = await colorModel.create(color);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

//Equipment
app.use("/api/equipment/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/equipment/", async (req, res) => {
  const equipment = await EquipModel.find();
  return res.json(equipment);
});

app.get("/api/equipment/:id", (req, res) => {
  return res.json(req.equipment);
});

app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//missing
app.patch("api/missing/:id", async (req, res, next) => {
  try {
    let emp = await EmployeeModel.findById(req.params.id);
    const updated = await EmployeeModel.updateOne(
      { _id: req.params.id },
      { $set: { present: !emp.present } }
    );
    emp = await EmployeeModel.findById(req.params.id);
    return res.json(emp);
  } catch (err) {
    return next(err)
  }
})

app.get("api/missing", async (req, res, next) => {
  const missing = await EmployeeModel.find({ present: false });
  res.json(missing)
})

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const updated = await EmployeeModel.updateOne(
      { _id: req.params.id },
      { $set: { present: !employee.present } }
    );
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
