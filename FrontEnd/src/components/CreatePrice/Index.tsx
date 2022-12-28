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
import { createPrice } from "../../utils/URIs";
import { PricesContext } from "../../context/PricesContext";
import axios from "axios";
import { ErrorText } from "../ErrorText/index";

export function CreatePrice() {
  const { id } = useParams<keyof MyParams>() as MyParams;
  let { fetchPrices } = useContext(PricesContext);

  const [newDate, setNewDate] = React.useState<Dayjs | string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [price, setPrice] = React.useState<Number>();
  let [error, setError] = React.useState<string | boolean>(false);

  const selectDate = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setNewDate(newValue.format("YYYY-MM-DD"));
    }
  };
  function handlePriceChange(event: React.ChangeEvent<any>) {
    setPrice(event.target.value as Number);
  }

  const clearStates = (): void => {
    setNewDate(dayjs());
    setPrice(0);
  };

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();

    try {
      await axios.post(createPrice(), {
        model_id: id,
        date_added: newDate,
        price: price,
      });

      fetchPrices(String(id));
      clearStates();
    } catch (err) {
      console.error("Error in POST request:", err);
      if (err.response.status === 422) {
        setError(err.response.data.message);
      }
    }
  }

  return (
    <>
      <Typography variant="h3">Add New Price</Typography>
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
            value={newDate}
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
      {error ? <ErrorText errorMessage={error} /> : ""}
    </>
  );
}
