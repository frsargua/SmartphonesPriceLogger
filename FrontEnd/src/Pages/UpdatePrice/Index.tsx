import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { getAllPriceById, updatePriceById } from "../../utils/URIs";
import { MyParams, PricesProps } from "../../types";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils";
import { PricesContext } from "../../context/PricesContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorText } from "../../components/ErrorText";

export function UpdatePrice() {
  const navigate = useNavigate();
  const { id, phoneId, model } = useParams<keyof MyParams>() as MyParams;
  let { fetchPrices } = useContext(PricesContext);
  let [error, setError] = React.useState<string | boolean>(false);
  const [value, setValue] = React.useState<String>("");
  const [price, setPrice] = React.useState<Number>(100);

  const handleChange = (newValue: Dayjs) => {
    setValue(newValue.format("YYYY-MM-DD"));
  };

  function handlePriceChange(event: React.ChangeEvent<any>) {
    setPrice(event.target.value as Number);
  }

  async function getSinglePrice(id: string) {
    let data = await fetchData(getAllPriceById(id));

    setPrice(data[0].price);
    setValue(data[0].date_added);
  }

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();

    let body = {
      date_added: value,
      price: price,
    };
    try {
      await axios.put(updatePriceById(String(id), String(phoneId)), {
        ...body,
      });
      fetchPrices(String(id));
      navigate(`/prices/${model}/${id}`, { replace: true });
    } catch (err) {
      if (err.response.status === 422) {
        setError(err.response.data.message);
      }
    }
  }

  React.useEffect(() => {
    getSinglePrice(String(id));
    console.log(value);
    return;
  }, []);

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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            label="Price"
            value={price}
            onChange={handlePriceChange}
            variant="filled"
            margin="normal"
          />{" "}
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
          {error ? <ErrorText errorMessage={error} /> : ""}
          <Button type="submit" variant="contained">
            Change
          </Button>
        </Box>
      </Box>
    </>
  );
}
