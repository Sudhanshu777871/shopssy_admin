const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config");
require("dotenv").config();
// applying the middleware
app.use(express.json());
app.use(cors());

// CREATING THE LOGIN API
app.post("/login", (req, res) => {
  if (req.body.Academic_Id && req.body.Password) {
    const { Academic_Id, Password } = req.body;
    // code for SQL query
    config.query(
      "SELECT * FROM academic_credentials WHERE Academic_Id = ? AND Password = ?",
      [Academic_Id, Password],
      (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  } else {
    res.send("Please Enter All The Fields");
  }
});

// CREATING THE API FRO FETCHING THE NUMBER OF USERS
app.get("/user_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Phone) as user_no FROM account",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING THE NUMBER OF TEACHERS
app.get("/teacher_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Teacher_Id) as teacher_no FROM teacher_credentials",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING NUMBER OF WORKERS
app.get("/worker_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Worker_Id) as worker_no FROM worker_data",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR INSERING THE EXPENSE DATA
app.post("/coupon", (req, res) => {
  const { information, amount } = req.body;
  config.query(
    "INSERT INTO academic_expenses (Expense_Information,Amount) VALUES (?,?)",
    [information, amount],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING ALL EXPENSES
app.get("/all_users", (req, res) => {
  config.query(
    "SELECT * FROM account",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO DELETING THE ITEMS
app.delete("/user_del", (req, res) => {
  if (req.body.userId) {
    const { userId } = req.body;
    config.query(
      "DELETE FROM account WHERE S_No = ?",
      [userId],
      (error, result) => {
        if (error) throw error;
        res.send({ status: true });
      }
    );
  }
  else {
    res.send({ status: "Please Send The User Id" })
  }
});

// API FOR SEARCHING THE STUDNETS
app.post('/serach_users', (req, res) => {
  if (req.body.userName) {
    const { userName } = req.body
    config.query(`SELECT * FROM account WHERE Name LIKE ?`, [userName], (error, result) => {
      if (error) throw error

      /// sending the result if no error is occured
      res.send(result)
    })
  }
  else {
    res.send("Please Enter All The Field First...")
  }

})

// CREATING THE API FRO FETCHING REWARD POINTS
app.get("/reward_points", (req, res) => {
  config.query(
    "SELECT * FROM admin_reward",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR UPPDATING REWARD POINTS
app.put("/update_points", (req, res) => {
  if (req.body.rewardPoint) {
    const { rewardPoint } = req.body;
    config.query(
      "UPDATE `admin_reward` SET `Points`= ?, `DateTime` = 'current_timestamp()' WHERE `adminId`='admin'", [rewardPoint],
      (error, result) => {
        if (error) throw error;
        res.send(true);
      }
    );
  }
  else {
    res.send({ message: "Please Send The Reward Point" })
  }
});
// Listening The App
app.listen(process.env.RUNNING_PORT);
