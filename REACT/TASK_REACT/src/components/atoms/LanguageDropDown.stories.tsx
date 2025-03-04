import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { LanguageDropdown } from "./LanguageDropDown";

export default {
  title: "Atoms/LanguageDropdown",
  component: LanguageDropdown,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedLanguage, setSelectedLanguage] = useState(args.value);

  return (
    <LanguageDropdown
      languages={[]} {...args}
      value={selectedLanguage}
      onChange={setSelectedLanguage}    />
  );
};

export const Default = Template.bind({});
Default.args = {
  languages: [
    { code: "en", lang: "English" },
    { code: "Hi", lang: "Hindi" },
  ],
  value: "en",
};
