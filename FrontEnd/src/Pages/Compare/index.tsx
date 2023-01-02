import { Typography } from "@mui/material";
import { useContext } from "react";
import { LineChartMultiple } from "../../components/LineChartMultiple/Index";
import { CompareContext } from "../../context/CompareContext";

export function Compare() {
  let { arrayOfPhonePrices } = useContext(CompareContext);
  return (
    <>
      <Typography variant="h1" textAlign="center">
        Compare phones
      </Typography>
      <LineChartMultiple
        devaluationData={
          arrayOfPhonePrices !== undefined ? arrayOfPhonePrices : []
        }
      />
    </>
  );
}
