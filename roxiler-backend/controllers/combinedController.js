const axios = require("axios");

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {

    const [statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/api/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:5000/api/pie-chart?month=${month}`),
    ]);

 
    const combinedData = {
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Error fetching combined data" });
  }
};

module.exports = { getCombinedData };
