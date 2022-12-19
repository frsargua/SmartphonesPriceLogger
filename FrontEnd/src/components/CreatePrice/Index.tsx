import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function CreatePrice() {
  return (
    <>
      <Typography variant="h3">Add phone</Typography>
      <Box
        sx={{
          mb: "2rem",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          label="New Brand"
          variant="filled"
          size="small"
          margin="normal"
        />
        <TextField
          label="New Brand"
          variant="filled"
          size="small"
          margin="normal"
        />
        <TextField
          label="New Brand"
          variant="filled"
          size="small"
          margin="normal"
        />
        <Button>Add</Button>
      </Box>
    </>
  );
}
