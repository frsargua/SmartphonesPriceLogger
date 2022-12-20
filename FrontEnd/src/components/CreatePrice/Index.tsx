import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { MyParams } from "../../types";
import { createPriceById } from "../../utils/URIs";
import { PricesContext } from "../../context/PricesContext";

export function CreatePrice() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  let { fetchPrices } = useContext(PricesContext);

  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [price, setPrice] = React.useState<Number | null>();

  const selectDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  function handlePriceChange(event: React.ChangeEvent<any>) {
    setPrice(event.target.value as Number);
  }

  const clearStates = (): void => {
    setDate(dayjs());
    setPrice(0);
  };

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();
    let body = {
      model_id: id,
      date_added: date?.format("YYYY-MM-DD"),
      price: price,
    };

    try {
      let response = await fetch(createPriceById(), {
        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: { "Content-Type": "application/json" },
      });

      if (response) {
        fetchPrices(id);
        clearStates();
      }
    } catch (error) {
      console.error("Error in POST request:", error);
      return;
    }
  }

  return (
    <>
      <Typography variant="h3">Add phone</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: "2rem",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Date mobile"
            inputFormat="YYYY-MM-DD"
            value={date}
            onChange={selectDate}
            renderInput={(params) => (
              <TextField required variant="filled" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <TextField
          label="Price"
          variant="filled"
          onChange={handlePriceChange}
          size="small"
          type="number"
          margin="normal"
        />
        <Button type="submit">Add</Button>
      </Box>
    </>
  );
}
