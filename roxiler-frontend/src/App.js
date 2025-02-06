import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  fetchBarChartData,
  fetchPieChartData,
  setMonth,
  setSearch,
  setPage,
  fetchStatistics,
} from "./redux/transactionsSlice";
import TransactionsTable from "./TransactionsTable";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Grid,
  
} from "@mui/material";
import StatisticsBox from "./StatisticsBox";

const App = () => {
  const dispatch = useDispatch();
  const {
    transactions,
    barChartData,
    statistics,
    pieChartData,
    loading,
    error,
    total,
    page,
    perPage,
    search,
    month,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions({ month, search, page, perPage }));
    dispatch(fetchBarChartData(month));
    dispatch(fetchPieChartData(month));
     dispatch(fetchStatistics(month));
  }, [month, search, page, perPage, dispatch]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Transactions Dashboard
      </Typography>

      {/* Month Dropdown */}
      <Box sx={{ marginBottom: "20px" }}>
        <Select
          value={month}
          onChange={(e) => dispatch(setMonth(e.target.value))}
          sx={{ minWidth: "150px", marginRight: "10px" }}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Search Input */}
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          sx={{ minWidth: "300px" }}
        />
      </Box>

      {/* Transactions Table */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      <TransactionsTable transactions={transactions} loading={loading} />

      {/* Pagination Controls */}
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
          sx={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Typography variant="body1" component="span">
          Page {page}
        </Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page * perPage >= total}
          sx={{ marginLeft: "10px" }}
        >
          Next
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item={true} xs={12} md={6} lg={4}>
          <Typography variant="h6" gutterBottom>
            Transctions Statistics
          </Typography>
          <StatisticsBox statistics={statistics} />
        </Grid>
        <Grid item={true} xs={12} md={6} lg={4}>
          <Typography variant="h6" gutterBottom>
            Price Range Distribution (Bar Chart)
          </Typography>
          <BarChart data={barChartData} />
        </Grid>
        <Grid item={true} xs={12} md={6} lg={4}>
          <Typography variant="h6" gutterBottom>
            Category Distribution (Pie Chart)
          </Typography>
          <PieChart data={pieChartData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
