import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export function UpdatePrice() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
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
          Change Prices
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField label="Price" variant="filled" margin="normal" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              // minDate={dayjs()}
              label="Date mobile"
              inputFormat="YYYY/MM/DD"
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  size="small"
                  margin="normal"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <Button variant="contained">Change</Button>
        </Box>
      </Box>
    </>
  );
}
