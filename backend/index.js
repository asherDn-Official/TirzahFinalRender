const express = require("express");
const homeRouter = require("./routers/HomeRouter");
const feedbackRouter = require("./routers/FeedbackRouter");
const serviceRouter = require("./routers/ServiceRouter");
const aboutUsRouter = require("./routers/AboutUsRouter");
const contactUsRouter = require("./routers/ContactUsRouter");
const path = require("path");

const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const imgur = require("imgur");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// connect to DB
try {
  mongoose.connect(process.env.mongoUrl);
  console.log("connected to mongoDB");
} catch (err) {
  console.log(err);
}

// setup routes
app.use("/uploads", express.static("uploads"));
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  let sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    // Save the buffer to a temporary file
    fs.writeFileSync(uploadPath, sampleFile.data);

    // Upload to Imgur
    imgur.uploadFile(uploadPath).then((urlObject) => {
      fs.unlinkSync(uploadPath);
      console.log(urlObject.data.link);
      res.send({ link: urlObject.data.link });
    });
  });
});
app.post("/uploadMultiple", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let uploadPromises = [];

  // Iterate over each uploaded file
  Object.values(req.files).forEach((file) => {
    let uploadPath = __dirname + "/uploads/" + file.name;

    uploadPromises.push(
      new Promise((resolve, reject) => {
        file.mv(uploadPath, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(uploadPath);
          }
        });
      })
    );
  });

  Promise.all(uploadPromises)
    .then((uploadPaths) => {
      let uploadUrls = [];

      // Upload each file to Imgur
      let imgurPromises = uploadPaths.map((path) =>
        imgur.uploadFile(path).then((urlObject) => {
          fs.unlinkSync(path);
          uploadUrls.push({
            name: path.split("/").pop(),
            link: urlObject.data.link,
          });
        })
      );

      return Promise.all(imgurPromises).then(() => {
        res.json(uploadUrls);
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred during file upload.");
    });
});

app.use("/home", homeRouter);
app.use("/service", serviceRouter);
app.use("/feedback", feedbackRouter);
app.use("/aboutUs", aboutUsRouter);
app.use("/contactUs", contactUsRouter);
app.listen(PORT, () => {
  console.log(`server started on port :${PORT}`);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
