import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import Dashboard
from "./Dashboard";

describe(
  "Dashboard Component",

  () => {

    test(
      "renders dashboard heading",

      () => {

        render(
          <Dashboard />
        );

        const heading =
          screen.getByText(
            "Dashboard"
          );

        expect(heading)
          .toBeInTheDocument();
      }
    );

    test(
      "renders Show Users button",

      () => {

        render(
          <Dashboard />
        );

        const button =
          screen.getByText(
            "Show Users"
          );

        expect(button)
          .toBeInTheDocument();
      }
    );

    test(
      "renders Show Orders button",

      () => {

        render(
          <Dashboard />
        );

        const button =
          screen.getByText(
            "Show Orders"
          );

        expect(button)
          .toBeInTheDocument();
      }
    );


    test(
  "shows users after button click",

  async () => {

    render(
      <Dashboard />
    );

    const button =
      screen.getByText(
        "Show Users"
      );

    fireEvent.click(
      button
    );

    const userText =
      await screen.findByText(
        "Raj"
      );

    expect(userText)
      .toBeInTheDocument();
  }
);
  }
);