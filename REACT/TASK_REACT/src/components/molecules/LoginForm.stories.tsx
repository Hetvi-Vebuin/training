import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom"; // Add MemoryRouter
import i18n from "../../translation/I18nConfig";
import store from "../../redux/store/Store";
import { LoginForm } from "./LoginForm";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../organisms/NavBar";
import { toast, ToastContainer } from "react-toastify";
import { userEvent, within } from "@storybook/testing-library";
import { t } from "i18next";

export default {
  title: "Molecules/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <ToastContainer />
            <UserProvider>
              <Navbar></Navbar>
              <div style={{ marginTop: "100px", marginLeft: "30px" }}>
                <Story />
              </div>
            </UserProvider>
          </MemoryRouter>
        </I18nextProvider>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn<{
  onSubmit: (email: string, password: string) => void;
}> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulate typing email and password
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.EMAIL_PLACEHOLDER")),
    "test@example.com"
  );
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.PASSWORD_PLACEHOLDER")),
    "password123"
  );

  // Simulate clicking the login button
  await userEvent.click(
    canvas.getByRole("button", { name: t("LOGIN.LOGIN_BUTTON") })
  );

  // Wait for toast notification (if applicable)
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

export const SuccessfulLogin = Template.bind({});
SuccessfulLogin.args = {
  onSubmit: async (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 2000,
      closeButton: false,
    });
  },
};
SuccessfulLogin.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.EMAIL_PLACEHOLDER")),
    "user@example.com"
  );
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.PASSWORD_PLACEHOLDER")),
    "password123"
  );
  await userEvent.click(canvas.getByRole("button", { name: /login/i }));
};

export const FailedLogin = Template.bind({});
FailedLogin.args = {
  onSubmit: async (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
    toast.error("Login failed. Please try again.", {
      position: "top-right",
      autoClose: 2000,
      closeButton: false,
    });
  },
};
FailedLogin.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.EMAIL_PLACEHOLDER")),
    "wrong@example.com"
  );
  await userEvent.type(
    canvas.getByPlaceholderText(t("LOGIN.PASSWORD_PLACEHOLDER")),
    "wrongpassword"
  );
  await userEvent.click(canvas.getByRole("button", { name: /login/i }));
};
