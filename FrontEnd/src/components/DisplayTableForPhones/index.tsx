import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, TableHead } from "@mui/material";
import { Link } from "react-router-dom";
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";

export default function DisplayTableForPhones() {
  let { phones, fetchPhones } = React.useContext(CollectionOfPhonesContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - phones.length) : 0;

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

  async function deletePhone(id: Number) {
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/phones/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response) {
        fetchPhones();
      }
    } catch (error) {
      console.error("Error in POST request:", error);
      return;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25px" }} align="right">
              Index
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Brand
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Model
            </TableCell>
            <TableCell sx={{ minWidth: "100px" }} align="center">
              Price&nbsp;(£)
            </TableCell>
            <TableCell sx={{ width: "100px" }} align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? phones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : phones
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">{row.release_date}</TableCell>
              <TableCell align="center">{row.brand_id}</TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell align="center">{row.release_price}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Button type="button" onClick={() => deletePhone(row.id)}>
                  Delete
                </Button>
                <Button>
                  <Link to={`/update-phone/${row.id}`}>Update</Link>
                </Button>
                <Button>
                  <Link to={`/prices/${row.id}`}>Stats</Link>
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
              count={phones.length}
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
