import { Typography } from "@mui/material";
import { CreatePrice } from "../../components/CreatePrice/Index";
import DisplayTableForPrices from "../../components/DisplayTableForPrices";

export function Prices() {
  return (
    <>
      <Typography variant="h1">Prices</Typography>
      <CreatePrice />
      <DisplayTableForPrices />
    </>
  );
}
