import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const StatisticsBox = ({ statistics }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: "20px", borderRadius: "8px", marginBottom: "20px" }}
    >
      <Typography variant="h6" gutterBottom>
        Statistics for Selected Month
      </Typography>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box>
          <Typography variant="body1">Total Sale Amount:</Typography>
          <Typography variant="h6" color="primary">
            ${statistics.totalSaleAmount}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Total Sold Items:</Typography>
          <Typography variant="h6" color="primary">
            {statistics.totalSoldItems}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Total Not Sold Items:</Typography>
          <Typography variant="h6" color="primary">
            {statistics.totalNotSoldItems}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StatisticsBox;
