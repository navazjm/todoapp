import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Layout } from "./layouts/layout";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
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
    </React.StrictMode>
);
