import { Typography } from "@mui/material";
import DisplayTableForPhones from "../../components/DisplayTableForPhones";

export function Main() {
  return (
    <>
      <Typography
        variant="h2"
        component={"h1"}
        gutterBottom
        mb={6}
        fontWeight={"600"}
      >
        Table of phones from the database
      </Typography>
      <DisplayTableForPhones />
    </>
  );
}
