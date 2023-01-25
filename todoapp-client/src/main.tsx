import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import BuildProviderTree from "./utils/buildProviderTree";
import { TasksProvider } from "./features/tasks/tasks.context";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Layout } from "./layouts/layout.component";
import { AlertProvider } from "./components/alert/alert.context";
import "./main.css";

const Providers = BuildProviderTree([TasksProvider, AlertProvider]);

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
                        <Route path="/" element={<Home />} />
                        <Route element={<NotFound />} path="*" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Providers>
    </React.StrictMode>
);
