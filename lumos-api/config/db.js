const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
