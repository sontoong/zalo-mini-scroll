/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimationRoutes, App, Box, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { ToastContainer } from "react-toastify";
import HomePage from "./presentation/pages/HomePage";

import { AppProvider } from "./presentation/context/AppContext";

const AppRoutes = () => {
  return (
    <AnimationRoutes>
      <Route path="/" element={<HomePage />}></Route>
    </AnimationRoutes>
  );
};

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AppProvider>
              <Box flex flexDirection="column" className="h-screen">
                <Box className="flex-1 flex flex-col overflow-hidden">
                  <AppRoutes />
                  <ToastContainer style={{ marginTop: "48px" }} />
                </Box>
              </Box>
            </AppProvider>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
