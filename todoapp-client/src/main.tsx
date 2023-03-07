import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./common/auth/auth.context";
import { TasksProvider } from "./features/tasks/tasks.context";
import { Layout } from "./layouts/layout.component";
import { AlertProvider } from "./components/alert/alert.context";
import { ProgressProvider } from "./components/progress/progress.context";
import RequireAuth from "./components/require-auth/require-auth.component";
import LoginPage from "./pages/login/login";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import BuildProviderTree from "./common/utils/buildProviderTree";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

const Providers = BuildProviderTree([AuthProvider, TasksProvider, AlertProvider, ProgressProvider]);
const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientID}>
            <Providers>
                <BrowserRouter>
                    <Routes>
                        <Route element={<LoginPage />} path="/login" />

                        <Route
                            element={
                                <Layout>
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route element={<RequireAuth />}>
                                <Route path="/" element={<HomePage />} />
                            </Route>
                            <Route element={<NotFoundPage />} path="*" />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Providers>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
