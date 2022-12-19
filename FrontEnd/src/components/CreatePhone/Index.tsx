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

export function CreatePhone() {
  let { brands } = useContext(BrandsContext);
  const [brand, setBrand] = React.useState<string>("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h3">Add phone</Typography>
      <Box
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
          margin="normal"
        />
        <TextField
          label="Price"
          variant="filled"
          size="small"
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            // minDate={dayjs()}
            label="Date mobile"
            inputFormat="YYYY/MM/DD"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField variant="filled" size="small" {...params} />
            )}
          />
        </LocalizationProvider>
        <Button size="large">Add</Button>
      </Box>
    </>
  );
}
