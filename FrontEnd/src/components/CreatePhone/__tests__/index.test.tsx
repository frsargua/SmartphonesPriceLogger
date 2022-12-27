import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";
import { render, fireEvent } from "@testing-library/react";
import { CreateBrand } from "../../../Pages/CreateBrand/index";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

describe("Add new brand", () => {
  it("Testing if a new brand is added to the database", async () => {
    let name = faker.name.firstName().toLowerCase();
    const renderApp = render(
      <BrowserRouter>
        <CreateBrand />
      </BrowserRouter>
    );
    const field = (await renderApp
      .getByTestId("add-brand-text-field")
      .querySelector("input")) as HTMLInputElement;

    fireEvent.change(field, { target: { value: name } });
    expect(field.value).toBe(name);
    const form = await renderApp.getByTestId("form");

    fireEvent.submit(form);

    let arrayOfBrands = await axios.get("http://127.0.0.1:8000/api/brand");
    let newArr = arrayOfBrands.data.map((el: { brand: string }) => el.brand);
    expect(newArr).toContain(name);
  });
});
