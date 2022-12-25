import { Typography } from "@mui/material";

type errorProps = {
  errorMessage: string | boolean;
};

export function ErrorText({ errorMessage }: errorProps) {
  return (
    <>
      <Typography gutterBottom variant="body1" sx={{ color: "red" }}>
        {errorMessage}
      </Typography>
    </>
  );
}
