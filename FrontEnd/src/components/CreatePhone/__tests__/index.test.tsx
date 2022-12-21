import "@testing-library/jest-dom";
// import * as faker from "@faker-js/faker";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { CreateBrand } from "../../../Pages/CreateBrand/index";
import { CreatePhone } from "../Index";

describe("Add new brand", () => {
  it("show add a new brand", async () => {
    let newName = "apples";
    console.log(newName);
    const renderApp = render(<CreateBrand />);
    const renderPhoneCreate = render(<CreatePhone />);
    const brandsLength = await renderPhoneCreate.findByLabelText(
      "brand-selectors"
    ).length;
    const input = await renderApp.findByLabelText("brand-input");
    user.type(input, newName);
    const addBrandButton = await renderApp.findByLabelText("add-brand-btn");
    user.click(addBrandButton);
    expect(brandsLength).toEqual(brandsLength + 1);
  });
});
