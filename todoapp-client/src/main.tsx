import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { TasksProvider } from "./features/tasks/tasks.context";
import { Layout } from "./layouts/layout.component";
import { AlertProvider } from "./components/alert/alert.context";
import { ProgressProvider } from "./components/progress/progress.context";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import BuildProviderTree from "./utils/buildProviderTree";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

const Providers = BuildProviderTree([TasksProvider, AlertProvider, ProgressProvider]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Providers>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route path="/" element={<HomePage />} />
                        <Route element={<NotFoundPage />} path="*" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Providers>
    </React.StrictMode>
);
