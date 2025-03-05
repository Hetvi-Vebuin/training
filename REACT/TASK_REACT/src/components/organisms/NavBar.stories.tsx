import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./NavBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/features/AuthSlice";
import i18n from "../../translation/I18nConfig";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import languageSlice, { setLanguage } from "../../redux/features/LanguageSlice";

const createTestStore = (initialState: {
  auth: { token: string | null };
  language: { lng: string };
}) =>
  configureStore({
    reducer: {
      language: languageSlice,
      auth: authReducer,
    },
    preloadedState: initialState,
  });

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { lng: "en" },
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { lng: "en" },
      });

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <UserContext.Provider
                value={{
                  user: null,
                  clearUser: () => {},
                  loading: false,
                  fetchUser: () => {},
                }}
              >
                <Story />
              </UserContext.Provider>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: "mockAccessToken" },
        language: { lng: "en" },
      });
      const mockUser = {
        id: 1,
        username: "JohnDoe",
        email: "johndoe@example.com",
        role: "admin" as "admin",
      };
      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <UserContext.Provider
                value={{
                  user: mockUser,
                  clearUser: () => {},
                  loading: false,
                  fetchUser: () => {},
                }}
              >
                <Story />
              </UserContext.Provider>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

export const LanguageChange: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: "mockAccessToken" },
        language: { lng: "en" },
      });
      const mockUser = {
        id: 1,
        username: "JohnDoe",
        email: "johndoe@example.com",
        role: "admin" as "admin",
      };

      store.dispatch(setLanguage("hi"));

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <UserContext.Provider
                value={{
                  user: mockUser,
                  clearUser: () => {},
                  loading: false,
                  fetchUser: () => {},
                }}
              >
                <Story />
              </UserContext.Provider>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

export const NoUserRedirect: Story = {
  decorators: [
    (Story) => {
      const store = createTestStore({
        auth: { token: null },
        language: { lng: "en" },
      });

      return (
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <UserContext.Provider
                value={{
                  user: null,
                  clearUser: () => {},
                  loading: false,
                  fetchUser: () => {},
                }}
              >
                <Story />
              </UserContext.Provider>
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};
