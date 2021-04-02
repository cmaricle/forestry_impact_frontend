import React from "react";
import { shallow } from "enzyme";
import MainPage from "./MainPage";

describe("MainPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
