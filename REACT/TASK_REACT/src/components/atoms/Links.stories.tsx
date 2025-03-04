import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Link from "./Links";

export default {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
} as Meta;

const Template: StoryFn = (args) => <Link to={""} text={""} {...args} />;

export const Default = Template.bind({});
Default.args = {
  to: "/home",
  text: "Go to Home",
  className: "font-bold",
};
