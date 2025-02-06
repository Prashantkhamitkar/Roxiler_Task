const db = require("../config/db");

const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    console.log("Fetching statistics for month:", month);

    
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

   
    const [totalSaleAmount] = await db.execute(
      `SELECT COALESCE(SUM(price), 0) as totalSaleAmount FROM transactions 
             WHERE MONTH(dateOfSale) = ? AND sold = true`,
      [monthNumber]
    );

  
    const [totalSoldItems] = await db.execute(
      `SELECT COUNT(*) as totalSoldItems FROM transactions 
             WHERE MONTH(dateOfSale) = ? AND sold = true`,
      [monthNumber]
    );

  
    const [totalNotSoldItems] = await db.execute(
      `SELECT COUNT(*) as totalNotSoldItems FROM transactions 
             WHERE MONTH(dateOfSale) = ? AND sold = false`,
      [monthNumber]
    );

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0].totalSaleAmount,
      totalSoldItems: totalSoldItems[0].totalSoldItems,
      totalNotSoldItems: totalNotSoldItems[0].totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Error fetching statistics" });
  }
};
module.exports = { getStatistics };
