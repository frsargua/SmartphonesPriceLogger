import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";
import { useParams } from "react-router-dom";
import { MyParams } from "../../types";
import { useNavigate } from "react-router-dom";

export function UpdatePhone() {
  const navigate = useNavigate();
  const { id } = useParams<keyof MyParams>() as MyParams;
  let { brands } = useContext(BrandsContext);
  let { phones, fetchPhones } = React.useContext(CollectionOfPhonesContext);
  const [brand, setBrand] = React.useState<string>("");
  const [model, setModel] = React.useState<string>();
  const [price, setPrice] = React.useState<Number>();

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
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
      release_price: price,
    };
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/phones/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...body }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log(body);
      console.log(response.json());

      if (response.ok) {
        fetchPhones();
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      console.error("Error in POST request:", error);
      return;
    }
  }

  React.useEffect(() => {
    console.log(phones);
    let singlePhone = phones.filter((el) => el.id == parseInt(id))[0];
    setBrand(singlePhone.brand_name);
    setModel(singlePhone.model);
    setPrice(singlePhone.release_price);
  }, []);

  return (
    <>
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          mx: "auto",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component={"h1"}
          mb={5}
          fontWeight={700}
          gutterBottom
        >
          Change Details
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
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
              {brands.map((el, i) => (
                <MenuItem key={i} value={el.brand}>
                  {el.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <TextField
            label="Model"
            value={model}
            onChange={handleModelChange}
            variant="filled"
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={handlePriceChange}
            variant="filled"
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Change
          </Button>
        </Box>
      </Box>
    </>
  );
}
