const axios = require("axios");
const db = require("../config/db");

const seedDatabase = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    for (const transaction of transactions) {
      const { title, description, price, dateOfSale, sold, category } =
        transaction;
      await db.execute(
        "INSERT INTO transactions (title, description, price, dateOfSale, sold, category) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, price, new Date(dateOfSale), sold, category]
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = { seedDatabase };
