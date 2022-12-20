import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, TableHead, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PricesContext } from "../../context/PricesContext";

export default function DisplayTableForPrices() {
  let { prices } = React.useContext(PricesContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prices.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25px" }} align="right">
              Index
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Date
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Price
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Depreciation&nbsp;(%)
            </TableCell>
            <TableCell sx={{ width: "100px" }} align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : prices
          ).map((row, i, arr) => (
            <TableRow key={row.price}>
              <TableCell align="center">{i}</TableCell>
              <TableCell align="center">{row.date_added}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">
                {Math.floor((row.price / arr[0].price) * 100)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Button>Delete</Button>
                <Button>
                  <Link to={"/update-price/:id"}>Update</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={prices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
