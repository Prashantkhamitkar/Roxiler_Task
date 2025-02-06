import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 400 },
  { field: "price", headerName: "Price", type: "number", width: 120 },
  { field: "dateOfSale", headerName: "Date of Sale", width: 150 },
  {
    field: "sold",
    headerName: "Sold",
    width: 120,
    valueGetter: (params) => (params.value ? "Yes" : "No"),
  },
  { field: "category", headerName: "Category", width: 150 },
];

export default function TransactionsTable({ transactions, loading }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
        checkboxSelection
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      />
    </div>
  );
}
