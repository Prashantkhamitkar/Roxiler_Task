const db = require("../config/db");

const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    console.log("Fetching pie chart data for month:", month);

   
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

 
    const [categories] = await db.execute(
      `SELECT category, COUNT(*) as count FROM transactions 
             WHERE MONTH(dateOfSale) = ? 
             GROUP BY category`,
      [monthNumber]
    );

    console.log("Pie Chart Query Result:", categories);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ error: "Error fetching pie chart data" });
  }
};

module.exports = { getPieChartData };
