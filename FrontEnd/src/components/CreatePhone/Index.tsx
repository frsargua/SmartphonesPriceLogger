import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";
import { useNavigate } from "react-router-dom";

export function CreatePhone() {
  let { brands } = useContext(BrandsContext);
  let { fetchPhones } = useContext(CollectionOfPhonesContext);
  //There is a nicer way to do it. However, i could not recall how to do it on time.
  const [brand, setBrand] = React.useState<string>("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [model, setModel] = React.useState<string>();
  const [price, setPrice] = React.useState<Number | null>();

  const clearStates = (event: SelectChangeEvent): void => {
    setBrand("");
    setDate(dayjs());
    setModel("");
    setPrice(0);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  const selectDate = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  function handleModelChange(event: React.ChangeEvent<any>) {
    setModel(event.target.value as string);
  }
  function handlePriceChange(event: React.ChangeEvent<any>) {
    setPrice(event.target.value as Number);
  }

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();
    let body = {
      brand_id: 1,
      model: model,
      release_date: date?.format("YYYY-MM-DD"),
      release_price: price,
    };

    try {
      let response = await fetch("http://127.0.0.1:8000/api/phones", {
        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: { "Content-Type": "application/json" },
      });

      if (response) {
        fetchPhones();
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={brand}
            variant="filled"
            size="small"
            label="Brand"
            required
            onChange={handleChangeSelect}
          >
            {brands.map((el) => (
              <MenuItem value={el.brand}>{el.brand}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Model"
          variant="filled"
          size="small"
          required
          value={model}
          onChange={handleModelChange}
          margin="normal"
        />
        <TextField
          label="Price"
          variant="filled"
          size="small"
          required
          value={price}
          onChange={handlePriceChange}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            // minDate={dayjs()}
            label="Date mobile"
            inputFormat="YYYY-MM-DD"
            value={date}
            onChange={selectDate}
            renderInput={(params) => (
              <TextField required variant="filled" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <Button type="submit" size="large">
          Add
        </Button>
      </Box>
    </>
  );
}
