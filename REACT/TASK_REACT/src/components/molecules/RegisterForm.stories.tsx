import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom"; // Needed for NavLink
import i18n from "../../translation/I18nConfig";
import store from "../../redux/store/Store";
import { RegisterForm } from "./RegisterForm";
import { RegisterFormProps } from "../../data/model/type/User";

export default {
  title: "Components/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn<RegisterFormProps> = (args) => <RegisterForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (username, email, password, role) => {
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Role: ${role}`);
  },
};
