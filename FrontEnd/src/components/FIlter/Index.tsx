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
    let { value: brandOption } = event.target;
    setBrand(brandOption as string);
    filter(brandOption, price);
  };
  const handleChangeInput = (event: React.ChangeEvent<any>) => {
    let { value: PriceInputted } = event.target;
    setPrice(PriceInputted);
    filter(brand, PriceInputted);
  };

  const handleChangeSelectPrice = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
    let newPrice = parseInt(event.target.value);

    filter(brand, newPrice);
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
        <Typography variant="h4" component={"h1"} mb={5}>
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
            <InputLabel>Brand</InputLabel>
            <Select value={brand} label="Brand" onChange={handleChangeSelect}>
              {brands.map((el) => (
                <MenuItem value={el.brand}>{el.brand}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Price select</InputLabel>
            <Select
              value={price}
              label="Price select"
              onChange={handleChangeSelectPrice}
            >
              <MenuItem value={"clear"}> {""}</MenuItem>
              <MenuItem value={100}> {"< 100"}</MenuItem>
              <MenuItem value={200}>{"< 200"}</MenuItem>
              <MenuItem value={400}>{"< 400"}</MenuItem>
              <MenuItem value={1000}>{"< 1000"}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Price input bar"
            required
            type="number"
            value={price}
            onChange={handleChangeInput}
            margin="normal"
          />
          <Button onClick={clearStates} variant="outlined">
            Clear
          </Button>
        </Box>
      </Box>
    </>
  );
}
