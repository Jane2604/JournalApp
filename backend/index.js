require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journal"); 

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes); 

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
