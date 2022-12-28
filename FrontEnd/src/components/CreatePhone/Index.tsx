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
import { newPhoneProps } from "../../types/index";
import { ErrorText } from "../ErrorText/index";

export function CreatePhone() {
  let { brands } = useContext(BrandsContext);
  let { fetchPhones } = useContext(CollectionOfPhonesContext);
  let emptyPhoneObject = {
    brand_name: "",
    release_date: dayjs().format("YYYY-MM-DD"),
    model: "",
    release_price: null,
  };

  const [newPhone, setNewPhone] = React.useState<newPhoneProps>({
    ...emptyPhoneObject,
  });
  let [error, setError] = React.useState<string | boolean>(false);

  const clearStates = (): void => {
    setNewPhone({
      ...emptyPhoneObject,
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    let { value, name } = event.target;
    setNewPhone((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const selectDate = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setNewPhone((prev) => {
        return { ...prev, release_date: newValue.format("YYYY-MM-DD") };
      });
    }
  };

  function handleChange(event: React.ChangeEvent<any>) {
    let { value, name } = event.target;
    setNewPhone((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();

    try {
      let response = await axios.post(createPhone(), { ...newPhone });
      let { id, release_date, release_price } = response.data;

      await axios.post(createPriceById(), {
        model_id: id,
        date_added: release_date,
        price: release_price,
      });

      fetchPhones();
      clearStates();
      setError(false);
    } catch (err) {
      if (err.response.status === 422) {
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
          <InputLabel>Brand</InputLabel>
          <Select
            value={newPhone.brand_name}
            name="brand_name"
            required
            onChange={handleChangeSelect}
          >
            {brands.map((el) => (
              <MenuItem data-testid="brand-selectors" value={el.brand}>
                {el.brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Model"
          required
          name="model"
          value={newPhone.model}
          onChange={handleChange}
          margin="normal"
          type={"text"}
        />
        <TextField
          label="Price"
          required
          type="number"
          value={newPhone.release_price}
          onChange={handleChange}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Release Date"
            inputFormat="YYYY-MM-DD"
            value={newPhone.release_date}
            onChange={selectDate}
            renderInput={(params) => (
              <TextField name="release_date" required {...params} />
            )}
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
