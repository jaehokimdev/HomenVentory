const mongoose = require("mongoose");

const CategoryScehma = new mongoose.Schema(
  {
    categoryName: String,
  },
  {
    collection: "Categories",
  }
);

mongoose.model("Categories", CategoryScehma);
