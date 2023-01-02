import "chartjs-adapter-date-fns";
import randomColor from "randomcolor";
//this sets the display language. In the documentation it uses "de", which will display dates in German.

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";
import { CompareStateProps } from "../../types";

ChartJS.register(
  TimeScale, //Register timescale instead of category for X axis
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,

  Title,
  Tooltip,
  Legend
);

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   scales
// );

export const options: ChartOptions<"line"> = {
  scales: {
    y: {
      title: { display: true, text: "Percentage" },
    },
    x: {
      type: "linear",
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};

interface Props {
  devaluationData?: CompareStateProps[];
}

export const LineChartMultiple: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { devaluationData } = props;
  let data = {
    datasets: [
      ...(devaluationData
        ? devaluationData.map((el) => {
            let color = randomColor({ format: "rgb" });
            return {
              label: el?.model,
              data: el?.prices,
              borderColor: color,
              backgroundColor: color,
            };
          })
        : []),
    ],
  };
  return (
    <Box sx={{ maxWidth: "700px", margin: "0 auto" }}>
      <Line options={options} data={data} />;
    </Box>
  );
};
