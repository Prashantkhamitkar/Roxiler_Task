const db = require("../config/db");

const getBarChartData = async (req, res) => {
  const { month } = req.query;

  try {
    console.log("Fetching bar chart data for month:", month);

   
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


    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }, 
    ];

  
    const barChartData = [];
    for (const range of priceRanges) {
      const [count] = await db.execute(
        `SELECT COUNT(*) as count FROM transactions 
                 WHERE MONTH(dateOfSale) = ? AND price >= ? AND price <= ?`,
        [monthNumber, range.min, range.max]
      );

      console.log(`Price Range ${range.min}-${range.max}:`, count);

      barChartData.push({
        range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
        count: count[0].count,
      });
    }

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Error fetching bar chart data" });
  }
};
module.exports = { getBarChartData };
