import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Navbar } from "../components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "../store/store";

describe("Navbar component", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  });

  test('An Input is rendered', () => {
    const input = screen.getByPlaceholderText("Search for Topics");
  });
});
