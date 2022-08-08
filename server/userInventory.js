const mongoose = require("mongoose");

const UserInventoryScehma = new mongoose.Schema(
  {
    category: String,
    item_name: String,
    price: Number,
    owner: String,
  },
  {
    collection: "UserInventory",
  }
);

mongoose.model("UserInventory", UserInventoryScehma);
