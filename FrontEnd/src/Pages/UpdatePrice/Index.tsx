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
  const { id, model, phoneId } = useParams<keyof MyParams>() as MyParams;
  let { fetchPrices } = useContext(PricesContext);
  const [newDate, setNewDate] = React.useState<Dayjs | string>(dayjs());
  const [price, setPrice] = React.useState<Number>(100);
  let [error, setError] = React.useState<string | boolean>(false);

  const selectDate = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setNewDate(newValue.format("YYYY-MM-DD"));
    }
  };

  function handlePriceChange(event: React.ChangeEvent<any>) {
    setPrice(event.target.value as Number);
  }

  async function getSinglePrice(id: string) {
    let data = await fetchData(getAllPriceById(id));
    let { price, date_added } = data[0];
    setPrice(price);
    setNewDate(date_added);
  }

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();

    try {
      await axios.put(updatePriceById(String(id), String(model)), {
        date_added: newDate,
        price: price,
      });

      fetchPrices(String(id));
      setError(false);
      navigate(`/prices/${model}/${phoneId}`, { replace: true });
    } catch (err) {
      if (err.response.status === 422) {
        setError(err.response.data.message);
      }
    }
  }

  React.useEffect(() => {
    getSinglePrice(String(id));
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
              label="Date mobile"
              inputFormat="YYYY/MM/DD"
              value={newDate}
              onChange={selectDate}
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
