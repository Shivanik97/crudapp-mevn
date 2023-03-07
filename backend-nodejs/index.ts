import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user from "./routes/user.routes";
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(
  morgan("common", {
    stream: fs.createWriteStream(
      "./" + new Date().toISOString().substr(0, 10) + ".log",
      { flags: "a" }
    ),
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/", user);
const port = process.env.PORT || 3000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("App listening on port,!", port);
});
