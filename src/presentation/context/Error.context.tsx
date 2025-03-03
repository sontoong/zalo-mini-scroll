import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
// import { createLogger } from "../usecases/logger.usecase";

// Định nghĩa kiểu cho ErrorContext
interface ErrorContextType {
  error: any;
  throwError: (error: any) => void;
  clearError: () => void;
  setEventCode: React.Dispatch<React.SetStateAction<string>>;
  setPageError: React.Dispatch<React.SetStateAction<string>>;
}

// Tạo ErrorContext với giá trị mặc định
const ErrorContext = createContext<ErrorContextType>({
  error: null,
  throwError: () => {},
  clearError: () => {},
  setEventCode: () => {},
  setPageError: () => {},
});

// Định nghĩa kiểu cho các props của ErrorProvider
interface ErrorProviderProps {
  children: ReactNode;
}

export const useError = () => useContext(ErrorContext);

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<any | null>(null);
  const [eventCode, setEventCode] = useState<string>("");
  const [pageError, setPageError] = useState<string>("");

  const throwError = (error: any) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (error) {
      const sendLogger = async () => {
        // await createLogger(error, pageError, eventCode);
      };
      setError(null);
      setPageError("");
      setEventCode("");
      console.log(">>Error in Logger", error, pageError, eventCode);

      sendLogger();
    }
  }, [error]);

  return (
    <ErrorContext.Provider
      value={{ error, throwError, clearError, setEventCode, setPageError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
