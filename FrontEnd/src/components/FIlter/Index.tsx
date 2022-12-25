import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";
import { PhonesCollectionContextProps } from "../../types";
import { BrandsContext } from "../../context/BrandsContext";

export function Filter() {
  let { filter } = useContext(
    CollectionOfPhonesContext
  ) as PhonesCollectionContextProps;
  let { brands } = useContext(BrandsContext);

  const [brand, setBrand] = React.useState<string>("clear");
  const [price, setPrice] = React.useState<string>("clear");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
    let newBrand = event.target.value;

    if (price != "clear") {
      filter(newBrand, parseInt(price));
    } else if (price == "clear") {
      filter(newBrand, "clear");
    } else {
      filter("clear", "clear");
    }
  };

  const handleChangeSelectPrice = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
    let newPrice = parseInt(event.target.value);

    if (brand != "clear") {
      filter(brand, newPrice);
    } else if (brand == "clear" && price != "clear") {
      filter("clear", newPrice);
    } else {
      filter("clear", "clear");
    }
  };

  const clearStates = () => {
    setBrand("clear");
    setPrice("clear");
    filter("clear", "clear");
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          mx: "auto",
        }}
      >
        <Typography variant="h4" component={"h1"} mb={5} gutterBottom>
          Filter
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              label="Brand"
              onChange={handleChangeSelect}
            >
              {brands.map((el) => (
                <MenuItem value={el.brand}>{el.brand}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={price}
              label="Brand"
              onChange={handleChangeSelectPrice}
            >
              <MenuItem value={100}> {"< 100"}</MenuItem>
              <MenuItem value={200}>{"< 200"}</MenuItem>
              <MenuItem value={400}>{"< 400"}</MenuItem>
              <MenuItem value={1000}>{"< 1000"}</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={clearStates} variant="outlined">
            Clear
          </Button>
        </Box>
      </Box>
    </>
  );
}
