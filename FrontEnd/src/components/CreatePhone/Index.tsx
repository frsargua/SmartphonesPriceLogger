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
import axios from "axios";
import { createPhone, createPriceById } from "../../utils/URIs";
import { ErrorText } from "../ErrorText/index";

export function CreatePhone() {
  let { brands } = useContext(BrandsContext);
  let { fetchPhones } = useContext(CollectionOfPhonesContext);
  //There is a nicer way to do it. However, i could not recall how to do it on time.
  const [brand, setBrand] = React.useState<string>("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [model, setModel] = React.useState<string>();
  const [price, setPrice] = React.useState<Number | null>();
  let [error, setError] = React.useState<string | boolean>(false);

  const clearStates = (): void => {
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
      brand_name: brand,
      model: model,
      release_date: date?.format("YYYY-MM-DD"),
      release_price: price,
    };

    try {
      let response = await axios.post(createPhone(), { ...body });

      let newPriceObj = {
        model_id: response.data.id,
        date_added: response.data.release_date,
        price: response.data.release_price,
      };

      let newPrice = await axios.post(createPriceById(), { ...newPriceObj });

      fetchPhones();
      clearStates();
    } catch (err) {
      if (err.response.status === 422) {
        console.log(err);
        setError(err.response.data.message);
      }
    }
  }

  return (
    <>
      <Typography variant="h4">Add phone</Typography>
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
            label="Brand"
            required
            onChange={handleChangeSelect}
          >
            {brands.map((el) => (
              <MenuItem aria-label="brand-selectors" value={el.brand}>
                {el.brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Model"
          required
          value={model}
          onChange={handleModelChange}
          margin="normal"
          type={"text"}
        />
        <TextField
          label="Price"
          required
          type="number"
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
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit" variant="outlined" size="large">
          Add
        </Button>
      </Box>
      {error ? <ErrorText errorMessage={error} /> : ""}
    </>
  );
}
