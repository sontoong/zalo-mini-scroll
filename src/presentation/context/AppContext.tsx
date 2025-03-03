import React, { createContext, useEffect, useState } from "react";
import { Spinner } from "zmp-ui";

interface IUser {
  [key: string]: any;
}

export enum LoadingState {
  SignIn = "signin", // Loading while signin
  User = "user", // Loading user when enter the app
}

type ILoading = Record<LoadingState, boolean>;

interface ICalendarDetail {
  [key: string]: any;
}

interface IAppContext {
  loading: ILoading;
  setLoading: React.Dispatch<React.SetStateAction<ILoading>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const initializeLoadingState = (states: typeof LoadingState): ILoading => {
  return Object.values(states).reduce((acc, state) => {
    acc[state] = false;
    return acc;
  }, {} as ILoading);
};

export const AppContext = createContext<IAppContext>({
  loading: initializeLoadingState(LoadingState),
  setLoading: () => {},
  user: null,
  setUser: () => {},
});

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState<ILoading>(
    initializeLoadingState(LoadingState)
  );

  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {loading?.user ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};
