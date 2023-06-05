const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { application } = require("express");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://newdoldol:new1212@cluster0.nfbfxqo.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
require("./userInventory");
require("./categories");

const User = mongoose.model("UserInfo");
const Inventory = mongoose.model("UserInventory");
const Category = mongoose.model("Categories");

//create base data

app.post("/createbasedata", async (req, res) => {
  try {
    const baseUser = await User.findOne({ email: "cprg352+admin@gmail.com" });
    const baseUser2 = await User.findOne({ email: "cprg352+admin2@gmail.com" });
    const baseUser3 = await User.findOne({ email: "cprg352+anne@gmail.com" });
    const baseUser4 = await User.findOne({ email: "cprg352+barb@gmail.com" });
    const baseCategory = await Category.findOne({ CategoryName: "Office" });
    const baseencryptedPassword = await bcrypt.hash("password", 10);
    if (!baseUser) {
      await User.create({
        fname: "admin",
        lname: "cprg352",
        email: "cprg352+admin@gmail.com",
        password: baseencryptedPassword,
        roll: "admin",
        status: true,
      });
    }
    if (!baseUser2) {
      await User.create({
        fname: "admin2",
        lname: "cprg352",
        email: "cprg352+admin2@gmail.com",
        password: baseencryptedPassword,
        roll: "admin",
        status: true,
      });
    }
    if (!baseUser3) {
      await User.create({
        fname: "user1",
        lname: "cprg352",
        email: "cprg352+anne@gmail.com",
        password: baseencryptedPassword,
        roll: "user",
        status: true,
      });
    }
    if (!baseUser4) {
      await User.create({
        fname: "user2",
        lname: "cprg352",
        email: "cprg352+barb@gmail.com",
        password: baseencryptedPassword,
        roll: "user",
        status: true,
      });

      if (!baseCategory) {
        await Category.create({
          categoryName: "Office",
        });
      }
      res.send({ status: "ok" });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});

//create a new user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, roll, status } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      roll,
      status,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Login user
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      if (user.status) {
        return res.json({ status: "ok", data: token, id: user._id });
      } else {
        return res.json({
          status: "error",
          error: "This user is not active. Please contact your administrator",
        });
      }
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

//Read login user
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Read user
app.post("/api/user/user/:id", async (req, res) => {
  const { id } = req.body;
  try {
    User.findOne({ _id: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Read All users
app.post("/api/user/getAll", async (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Delete user
app.delete("/api/user/delete/:id", async (req, res) => {
  const { _id, email } = req.body;
  try {
    User.findByIdAndDelete(_id)
      .then(Inventory.findOneAndDelete({ owner: email }))
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Edit user
app.post("/api/user/edit/:id", async (req, res) => {
  const { _id, newFname, newLname, newEmail, newPassword, newRoll, newStatus } =
    req.body;
  try {
    User.findByIdAndUpdate(_id, {
      fname: newFname,
      lname: newLname,
      email: newEmail,
      password: newPassword,
      roll: newRoll,
      status: newStatus,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

////////////////////////////////////////////////////////////////////////

//Create a new items
app.post("/api/inventory/create", async (req, res) => {
  const { category, item_name, price, owner } = req.body;

  try {
    const olditem = await Inventory.findOne({ item_name });

    if (olditem) {
      return res.json({ error: "Item Exists" });
    }

    await Inventory.create({
      category,
      item_name,
      price,
      owner,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//Read All items
app.post("/api/inventory/getAll", async (req, res) => {
  try {
    Inventory.find({})
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Read item
app.post("/api/inventory/item/:owner", async (req, res) => {
  const { useremail } = req.body;
  try {
    Inventory.find({ owner: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Delete item
app.delete("/api/inventory/delete/:id", async (req, res) => {
  const { _id } = req.body;
  try {
    Inventory.findByIdAndDelete(_id)
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Edit user
app.post("/api/inventory/edit/:id", async (req, res) => {
  const { _id, newCategory, newItem_name, newPrice, newOwner } = req.body;
  try {
    Inventory.findByIdAndUpdate(_id, {
      category: newCategory,
      item_name: newItem_name,
      price: newPrice,
      owner: newOwner,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

////////////////////////////////////////////////////////////////

//Create Category

app.post("/api/category/create", async (req, res) => {
  const { categoryName } = req.body;

  try {
    const oldcategory = await Category.findOne({ categoryName });

    if (oldcategory) {
      return res.json({ error: "Category Exists" });
    }

    await Category.create({
      categoryName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//Read All categories
app.post("/api/category/getAll", async (req, res) => {
  try {
    Category.find({})
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//Edit category
app.post("/api/category/edit/:id", async (req, res) => {
  const { _id, categoryName } = req.body;
  try {
    Category.findByIdAndUpdate(_id, {
      categoryName,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5001, () => {
  console.log("Server Started");
});
