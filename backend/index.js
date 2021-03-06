const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const port = 5000 || process.env.PORT;

require("dotenv").config();

const session = require("express-session");
const passport = require("passport");

//MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Database successfully"))
  .catch((err) => console.log(err));

//Models
let User = require("./model");

//Local Strategy to use passport authentication via id and password
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Logged in user's details will be stored in this till the time he is logged in
//req.user

//Routes
app.get("/api/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "Authorized",
      type: req.user.type,
      user: req.user,
    });
  } else {
    res.status(200).json({ success: false, message: "Unauthorized" });
  }
});

app.post("/api/addAdmin", (req, res) => {
  if (req.isAuthenticated() && req.user.type == "admin") {
    let newAdmin = new User({
      username: req.body.username,
      type: "admin",
    });
    User.register(newAdmin, req.body.password, (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: ",
          err,
        });
      } else {
        res.json({ success: true, message: "Your account has been saved" });
      }
    });
  } else {
    res.json({ success: false, message: "Authentication Failed" });
  }
});

app.post("/api/admin/addCollege", (req, res) => {
  if (req.isAuthenticated() && req.user.type === "admin") {
    let newCollege = new User({
      username: req.body.username,
      name: req.body.name,
      type: "college",
    });
    User.register(newCollege, req.body.password, (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: ",
          err,
        });
      } else {
        res.json({ success: true, message: "Your account has been saved" });
      }
    });
  } else {
    res.json({ success: false, message: "Authentication failed" });
  }
});

app.post("/api/student/register", (req, res) => {
  let details = new User({
    username: req.body.username,
    name: req.body.name,
    course_name: req.body.course_name,
    academic_year: req.body.academic_year,
    college_name: req.body.college_name,
    department_name: req.body.department_name,
    type: "student",
  });
  User.find({ name: req.body.college_name }, (err, res) => {
    details.college_id = res[0].username;
  }).catch((err) => console.log(err));

  User.register(details, req.body.password, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: "Your account could not be saved. Error: ",
        err,
      });
    } else {
      passport.authenticate("local")(req, res, () => {
        res
          .status(200)
          .json({ success: true, message: "Authenticated Successfully" });
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  passport.authenticate("local")(req, res, () => {
    res
      .status(200)
      .json({ success: true, message: "Authenticated Successfully" });
  });
});

app.get("/api/getColleges", (req, res) => {
  User.find({ type: "college" }, (err, result) => {
    if (!err) {
      res.status(200).json(result);
    }
  });
});

app.post("/api/addComplaint", (req, res) => {
  if (req.isAuthenticated() && req.user.type == "student") {
    newComplaint = {
      level: req.body.level,
      category: req.body.category,
      complaintDetail: req.body.complaintDetail,
      status: "In Progress",
    };
    User.updateOne(
      { _id: req.user._id },
      {
        $push: { complaints: newComplaint },
      }
    ).catch((err) => console.log(err));
    res.json({ success: true, message: "Submitted Successfully" });
  } else {
    res.json({ success: false, message: "Authentication Failed" });
  }
});

app.get("/api/getComplaints", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.type == "student") {
      console.log("getComplaintsStudent");
      User.find({ _id: req.user._id }, (err, result) => {
        if (!err) {
          res.status(200).json({
            success: true,
            type: req.user.type,
            id: req.user._id,
            complaints: result[0].complaints,
          });
        }
      }).catch((err) => console.log(err));
    } else if (req.user.type == "college") {
      console.log("getComplaintsCollege");
      User.find({ college_id: req.user.username }, (err, result) => {
        var toSend = [];
        if (!err) {
          result.forEach((resu) => {
            resu.complaints.forEach((com) => {
              if (com.level !== "University Level") {
                toSend.push(com);
              }
            });
          });
        }
        res.status(200).json({
          success: true,
          type: req.user.type,
          id: req.user._id,
          complaints: toSend,
        });
      }).catch((err) => console.log(err));
    } else {
      console.log("getComplaintsAdmin");
      User.find({}, (err, result) => {
        var toSend = [];
        if (!err) {
          result.forEach((resu) => {
            resu.complaints.forEach((com) => {
              toSend.push(com);
            });
          });
        }
        res.status(200).json({
          success: true,
          type: req.user.type,
          id: req.user._id,
          complaints: toSend,
        });
      }).catch((err) => console.log(err));
    }
  } else {
    res.status(200).json({ success: false, message: "Authentication failed" });
  }
});

app.post("/api/setComplaintStatus", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.type === "college") {
      const complaintId = req.body.complaintId;
      const complaintStatus = req.body.complaintStatus;
      User.findOneAndUpdate(
        {
          college_id: req.user.username,
          "complaints._id": complaintId,
        },
        { "complaints.$.status": complaintStatus },
        { new: true },
        (err, doc) => {
          if (err || doc === null) {
            console.log(err);
            res.json({ success: true, message: "Complaint Id not found" });
          } else {
            console.log("Here");
            res.json({ success: true, message: "Complaint Status Changed" });
          }
        }
      );
    } else if (req.user.type === "admin") {
      const complaintId = req.body.complaintId;
      const complaintStatus = req.body.complaintStatus;
      User.findOneAndUpdate(
        {
          "complaints._id": complaintId,
        },
        { "complaint.$.status": complaintStatus },
        { new: true },
        (err, doc) => {
          if (err || doc === null) {
            console.log(err);
            res.json({ success: true, message: "Complaint Id not found" });
          } else {
            console.log("Here");
            res.json({ success: true, message: "Complaint Status Changed" });
          }
        }
      );
    }
  } else {
    res.json({ success: false, message: "Unauthenticated" });
  }
});

app.get("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: "Log out successfully" });
});

app.use(express.static("./build"));

app.get("*", (req, res) => {
  res.redirect("/");
});

//Connection
app.listen(port, () => {
  console.log("Connected at port: ", port);
});
