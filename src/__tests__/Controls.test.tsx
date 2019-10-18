import React from "react";
import { Controls, Props } from "../components/Features/Controls/Controls";
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("groups", () => {
  const defaultProps = {
    properties: {
      on: {
        link: "/on",
        title: "on",
        minimum: 0,
        maximum: 100,
        ["@type"]: "OnOffProperty"
      }
    },
    values: {
      on: false
    },
    updateThing: () => null
  };
  const renderGroups = (props: Props) => {
    const { queryByText, ...rest } = render(
      <MockedProvider addTypename={false}>
        <Controls {...props} />
      </MockedProvider>
    );
    return {
      queryByText,
      deleteButton: queryByText("delete"),
      ...rest
    };
  };

  it("shows message when @type not implemented", () => {
    const { getByText } = renderGroups({
      ...defaultProps,
      properties: {
        on: {
          ...defaultProps.properties.on,
          ["@type"]: "smup"
        }
      }
    });
    expect(getByText("Not implemented")).toBeInTheDocument();
  });

  it("shows controls when @type is implemented", () => {
    const { queryByText } = renderGroups(defaultProps);
    expect(queryByText("Not implemented")).not.toBeInTheDocument();
  });
});
