import React from "react";
import { Group, Props } from "../components/Features/Group/Group";
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("groups", () => {
  const defaultProps = {
    name: "groupname",
    id: "123",
    things: [],
    loading: false
  };
  const renderGroups = (props: Props) => {
    const { queryByText, ...rest } = render(
      <MockedProvider addTypename={false}>
        <Group {...props} />
      </MockedProvider>
    );
    return {
      queryByText,
      title: queryByText(props.name),
      deleteButton: queryByText("delete"),
      ...rest
    };
  };

  it("shows loader", () => {
    const { getByTestId } = renderGroups({ ...defaultProps, loading: true });
    expect(getByTestId("loader")).toBeInTheDocument();
  });
  it("shows message when there are no devices available", () => {
    const { getByText } = renderGroups(defaultProps);
    expect(getByText("no devices")).toBeInTheDocument();
  });
  it("shows group if it has things and devices", () => {
    const { getByText } = renderGroups({
      ...defaultProps,
      things: [
        {
          id: "123",
          title: "thing123"
        } as any
      ],
      devices: ["123"]
    });
    expect(getByText("thing123")).toBeInTheDocument();
  });
});
