import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export function CreateBrand() {
  let [newBrand, setNewBrand] = useState("");

  const handleChange = (event: React.ChangeEvent<any>) => {
    setNewBrand(event.target.value);
  };

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
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            label="New Brand"
            variant="filled"
            margin="normal"
            onChange={handleChange}
          />
          <Button variant="contained">Add</Button>
        </Box>
      </Box>
    </>
  );
}
