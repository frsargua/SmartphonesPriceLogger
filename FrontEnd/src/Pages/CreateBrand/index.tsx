import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandsContext } from "../../context/BrandsContext";
import { createBrand } from "../../utils/URIs";
import axios from "axios";
import { ErrorText } from "../../components/ErrorText/index";

export function CreateBrand() {
  let [newBrand, setNewBrand] = useState("");
  let [error, setError] = useState<string | boolean>(false);
  let { fetchBrands } = React.useContext(BrandsContext);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<any>) => {
    setNewBrand(event.target.value);
  };

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();

    try {
      await axios.post(createBrand(), { brand: newBrand.toLowerCase() });
      fetchBrands();
      setError(false);
      navigate(`/`, { replace: true });
    } catch (err) {
      if (err.response.status === 422) {
        setError(err.response.data.message);
      }
    }
  }
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
          Add a new brand
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <TextField
            label="New Brand"
            variant="filled"
            margin="normal"
            data-testid="add-brand-text-field"
            required
            aria-label="brand-input"
            InputProps={{ inputProps: { min: "3", max: "15", step: "1" } }}
            onChange={handleChange}
          />
          {error ? <ErrorText errorMessage={error} /> : ""}
          <Button aria-label="add-brand-btn" type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
}
