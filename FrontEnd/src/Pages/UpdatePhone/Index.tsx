import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CollectionOfPhonesContext } from "../../context/PhoneListContext";
import { useParams } from "react-router-dom";
import { MyParams, updatePhoneProps } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPhoneById, updatePhoneById } from "../../utils/URIs";
import { ErrorText } from "../../components/ErrorText";
import { fetchData } from "../../utils/index";

export function UpdatePhone() {
  const navigate = useNavigate();
  const { id } = useParams<keyof MyParams>() as MyParams;
  let { brands } = useContext(BrandsContext);
  let { fetchPhones } = React.useContext(CollectionOfPhonesContext);

  const [phoneFields, setPhoneFields] = React.useState<updatePhoneProps>({
    brand_name: "",
    model: "",
    release_price: 0,
  });

  let [error, setError] = React.useState<string | boolean>(false);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    let { value, name } = event.target;
    setPhoneFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function handleChange(event: React.ChangeEvent<any>) {
    let { value, name } = event.target;
    setPhoneFields((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();

    try {
      if (id) {
        await axios.put(updatePhoneById(id), { ...phoneFields });
        fetchPhones();
        navigate(`/`, { replace: true });
      } else {
        throw Error("id not provided");
      }
    } catch (err) {
      if (err.response.status === 422) {
        setError(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }

  async function getSinglePhone(id: string) {
    let { release_price, model, brand_name } = await fetchData(
      getPhoneById(id)
    );
    setPhoneFields({ release_price, model, brand_name });
  }

  React.useEffect(() => {
    getSinglePhone(String(id));
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
          Change Details
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={phoneFields.brand_name}
              variant="filled"
              name="brand_name"
              size="small"
              label="Brand"
              onChange={handleChangeSelect}
            >
              {brands.map((el, i) => (
                <MenuItem key={i} value={el.brand}>
                  {el.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Model"
            name="model"
            value={phoneFields.model}
            onChange={handleChange}
            variant="filled"
            margin="normal"
          />
          <TextField
            label="Price"
            name="release_price"
            value={phoneFields.release_price}
            onChange={handleChange}
            variant="filled"
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Change
          </Button>
          {error ? <ErrorText errorMessage={error} /> : ""}
        </Box>
      </Box>
    </>
  );
}
