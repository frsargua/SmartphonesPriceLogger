import { Typography } from "@mui/material";
import { CreatePhone } from "../../components/CreatePhone/Index";
import DisplayTableForPhones from "../../components/DisplayTableForPhones";
import { Filter } from "../../components/FIlter/Index";

export function Main() {
  return (
    <>
      <Typography
        variant="h2"
        component={"h1"}
        mb={6}
        fontWeight={"600"}
        textAlign="center"
      >
        Table of phones models
      </Typography>
      <CreatePhone />
      <Filter />
      <Typography variant="h4" component={"h1"} mb={2}>
        Table
      </Typography>
      <DisplayTableForPhones />
    </>
  );
}
