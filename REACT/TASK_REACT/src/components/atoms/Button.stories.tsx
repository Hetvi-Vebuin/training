import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";


const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"], 
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Click Me",
  },
};

export const Submit: Story = {
  args: {
    text: "Submit",
    type: "submit",
  },
};

export const WithClickHandler: Story = {
  args: {
    text: "Click Me",
    onClick: () => alert("Button Clicked!"),
  },
};
