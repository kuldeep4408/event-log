import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
import fs from "fs";
import { config } from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());
config();
mongoose.connect(process.env.DB_URI);

const schema = new Schema(
  {
    event: String,
    triggerTime: Date,
  },
  {
    collection: "events",
  }
);

const EventModel = mongoose.model("event", schema);

app.post("/submit", async (req, res) => {
  const eventName = req.body.event;
  fs.readFile("app.log", (err, data) => {
    if (err) {
      fs.writeFile(
        "app.log",
        `event --> ${eventName} ${new Date()}\n`,
        async () => {
          await EventModel.create({
            event: eventName,
            triggerTime: req.body.time,
          });
        }
      );
    } else {
      fs.appendFile(
        "app.log",
        `event --> ${eventName} ${new Date()}\n`,
        async () => {
          await EventModel.create({
            event: eventName,
            triggerTime: req.body.time,
          });
        }
      );
    }
  });
});

const port = 4848;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
