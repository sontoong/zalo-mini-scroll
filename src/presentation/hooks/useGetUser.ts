import { useCallback } from "react";
import { IUserRepository } from "../../core/repositories/IUserRepository";
import { createLoginUseCase } from "../../core/usecases/LoginUsecase";

export const useGetUser = (userRepository: IUserRepository) => {
  const loginUseCase = createLoginUseCase(userRepository);

  const login = useCallback(
    async (username: string, password: string) => {
      return loginUseCase.execute(username, password);
    },
    [loginUseCase]
  );

  return { login };
};
