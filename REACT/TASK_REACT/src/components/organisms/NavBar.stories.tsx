import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom"; // Needed for Link
import i18n from "../../translation/I18nConfig";
import store from "../../redux/store/Store";
import Navbar from "../organisms/NavBar";

// 👇 Mock the `useAuth()` hook
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser, // This will be updated per story
    loading: false,
    fetchUser: jest.fn(),
    clearUser: jest.fn(),
  }),
}));

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story, context) => {
      return (
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter>
              <Story />
            </MemoryRouter>
          </I18nextProvider>
        </Provider>
      );
    },
  ],
} as Meta;

// Template for Navbar
const Template: StoryFn = () => <Navbar />;

// Navbar for Logged-Out User (No Token)
export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};

// Navbar for Logged-In Regular User
export const LoggedInUser = Template.bind({});
LoggedInUser.args = {
  user: { username: "JohnDoe", role: "user" },
};

// Navbar for Logged-In Admin
export const LoggedInAdmin = Template.bind({});
LoggedInAdmin.args = {
  user: { username: "AdminUser", role: "admin" },
};
