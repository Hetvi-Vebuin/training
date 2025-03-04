import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom"; // Add MemoryRouter
import i18n from "../../translation/I18nConfig";
import store from "../../redux/store/Store";
import { LoginForm } from "./LoginForm";

export default {
  title: "Molecules/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter> {/* Wrap Story with MemoryRouter */}
            <Story />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn<{ onSubmit: (email: string, password: string) => void }> = (args) => (
  <LoginForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
  },
};
