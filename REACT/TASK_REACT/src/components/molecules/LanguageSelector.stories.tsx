import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/I18nConfig";
import store from "../../redux/store/Store";
import LanguageSelector from "./LanguageSelector";

export default {
  title: "Molecules/LanguageSelector",
  component: LanguageSelector,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <LanguageSelector />;

export const Default = Template.bind({});
