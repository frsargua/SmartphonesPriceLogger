import { useContext, useEffect } from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CreatePrice } from "../../components/CreatePrice/Index";
import DisplayTableForPrices from "../../components/DisplayTableForPrices";
import { LineChart } from "../../components/LineChart/Index";
import { PricesContext } from "../../context/PricesContext";
import { MyParams } from "../../types";
import { useParams } from "react-router-dom";

export function Prices() {
  const { id, model } = useParams<keyof MyParams>() as MyParams;
  let { prices, fetchPrices } = useContext(PricesContext);

  useEffect(() => {
    if (id) {
      fetchPrices(id);
    }

    return;
  }, []);

  return (
    <>
      <Typography variant="h1" textAlign="center" gutterBottom>
        {model} Prices
      </Typography>

      <Box sx={{ height: { xs: "200px", md: "500px" }, mb: "5rem" }}>
        <LineChart
          devaluationData={prices.map((el, i, arr) => {
            return {
              x: new Date(el.date_added),
              y: Math.floor((el.price / arr[0].price) * 100),
            };
          })}
        />
      </Box>
      <CreatePrice />
      <Typography variant="h3" mb={2}>
        Table of Prices
      </Typography>
      <DisplayTableForPrices model={model ? model : "unknown"} />
    </>
  );
}
