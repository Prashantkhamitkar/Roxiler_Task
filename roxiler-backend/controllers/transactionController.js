const db = require("../config/db");
const { seedDatabase } = require("../services/transactionService");

const initializeDatabase = async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error initializing database" });
  }
};

const listTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;

  try {
   
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    const monthNumber = monthMap[month];

    if (!monthNumber) {
      return res.status(400).json({ error: "Invalid month name" });
    }

    
    const offset = (page - 1) * perPage;

    
    let query = `
            SELECT * FROM transactions 
            WHERE MONTH(dateOfSale) = ? 
            AND (title LIKE ? OR description LIKE ? OR price LIKE ?)
            LIMIT ? OFFSET ?
        `;

    
    const [transactions] = await db.execute(query, [
      monthNumber,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `${perPage}`,
      `${offset}`,
    ]);

   
    let countQuery = `
            SELECT COUNT(*) as total FROM transactions 
            WHERE MONTH(dateOfSale) = ? 
            AND (title LIKE ? OR description LIKE ? OR price LIKE ?)
        `;

    const [total] = await db.execute(countQuery, [
      monthNumber,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    ]);

    res.status(200).json({
      transactions,
      total: total[0].total,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

module.exports = { initializeDatabase, listTransactions };
