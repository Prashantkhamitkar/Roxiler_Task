const express = require("express");
const { initializeDatabase, listTransactions } = require("../controllers/transactionController");
const { getStatistics } = require("../controllers/statsController");
const { getBarChartData } = require("../controllers/barChartController");
const { getPieChartData } = require("../controllers/pieChartController");
const { getCombinedData } = require("../controllers/combinedController");

const router = express.Router();

router.get("/initialize-database", initializeDatabase);
router.get("/transactions", listTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChartData);
router.get("/pie-chart", getPieChartData);
router.get("/combined-data", getCombinedData);
module.exports = router;
