
const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);


  try {
    await db.execute("SELECT 1");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
