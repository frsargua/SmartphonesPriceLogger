import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandsContext } from "../../context/BrandsContext";
import { fetchData } from "../../utils/index";
import { parse } from "node:path/win32";

export function CreateBrand() {
  let [newBrand, setNewBrand] = useState("");
  let { fetchBrands } = React.useContext(BrandsContext);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<any>) => {
    setNewBrand(event.target.value);
  };

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();

    try {
      let response = await fetch("http://127.0.0.1:8000/api/brand", {
        method: "POST",
        body: JSON.stringify({ brand: newBrand }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        fetchBrands();
        navigate(`/`, { replace: true });
      }

      if (!response.ok) {
        let jsonResponse = await response.json();
        throw new Error(jsonResponse.message);
      }
    } catch (err) {
      console.error("Error in POST request:", err);
      return;
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
          Add a new phone
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="New Brand"
            variant="filled"
            margin="normal"
            required
            aria-label="brand-input"
            InputProps={{ inputProps: { min: "1", max: "10", step: "1" } }}
            onChange={handleChange}
          />
          <Button aria-label="add-brand-btn" type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
}
