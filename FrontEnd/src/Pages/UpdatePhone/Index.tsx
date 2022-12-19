import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function UpdatePhone() {
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
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField label="Brand" variant="filled" margin="normal" />
          <TextField label="Model" variant="filled" margin="normal" />
          <TextField label="Price" variant="filled" margin="normal" />
          <Button variant="contained">Change</Button>
        </Box>
      </Box>
    </>
  );
}
