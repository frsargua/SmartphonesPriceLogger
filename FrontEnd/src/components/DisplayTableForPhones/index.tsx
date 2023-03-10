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
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";
import { CompareContext } from "../../context/CompareContext";
import { TableColumn } from "../../types";
import { deletePhoneById } from "../../utils/URIs";
import { cp } from "fs";

export default function DisplayTableForPhones() {
  let { phones, fetchPhones, sortBy, getSortDirection } = React.useContext(
    CollectionOfPhonesContext
  );
  let { removeFromList } = React.useContext(CompareContext);
  let { listOfIds } = React.useContext(CompareContext);
  let { fetchPrices } = React.useContext(CompareContext);
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
      let response = await fetch(deletePhoneById(String(id)), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        fetchPhones();
      }
    } catch (error) {
      console.error("Error in POST request:", error);
      return;
    }
  }

  const tableColumn = [
    { label: "Brand", property: "brand_name" },
    { label: "Price", property: "release_price" },
  ] as TableColumn[];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "100px" }} align="center">
              date
            </TableCell>
            {tableColumn.map((el) => (
              <TableCell
                onClick={() => sortBy(el.property)}
                sx={{ width: "100px" }}
                align="center"
              >
                <span>
                  {el.label}
                  {getSortDirection(el.property)}
                </span>
              </TableCell>
            ))}

            <TableCell sx={{ width: "100px" }} align="center">
              Model
            </TableCell>

            <TableCell sx={{ width: "80px" }} align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? phones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : phones
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">
                {row.release_date.toString()}
              </TableCell>
              <TableCell align="center">
                <Link to={`/news/${row.brand_name}`}>{row.brand_name}</Link>
              </TableCell>
              <TableCell align="center">
                {row.release_price.toString()}
              </TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                }}
              >
                <Button type="button" onClick={() => deletePhone(row.id)}>
                  Delete
                </Button>
                <Button>
                  <Link to={`/update-phone/${row.id}`}>Update</Link>
                </Button>
                <Button>
                  <Link to={`/prices/${row.model}/${row.id}`}>Stats</Link>
                </Button>
                <Button
                  onClick={() => {
                    listOfIds.includes(row.id)
                      ? removeFromList(String(row.id))
                      : fetchPrices(String(row.id));
                  }}
                >
                  {listOfIds.includes(row.id) ? "-" : "+"}
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
