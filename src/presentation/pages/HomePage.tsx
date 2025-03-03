import React, { FC, useContext, useState } from "react";
import { Page } from "zmp-ui";
import LoginSection from "../components/Homepage/LoginSection";
import { createUserRepository } from "../../data/repositories/UserRepositoryImpl";
import { useGetUser } from "../hooks/useGetUser";
import { AppContext } from "../context/AppContext";

const HomePage: FC = () => {
  const { user, setUser } = useContext(AppContext);
  const userRepository = createUserRepository();
  const { login } = useGetUser(userRepository);

  const handleLoginClick = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Page className="relative flex-1 flex flex-col bg-white items-center justify-center h-sceen">
      {user ? (
        <div>Welcome, {user.username}!</div>
      ) : (
        <LoginSection onLogin={handleLoginClick} />
      )}
    </Page>
  );
};

export default HomePage;
