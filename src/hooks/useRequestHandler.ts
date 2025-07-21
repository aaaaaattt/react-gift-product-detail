import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  fetcher: () => Promise<any>;
  onSuccess: (data: any) => void;
  onError?: (error: any) => void;
};

export const useRequestHandler = () => {
  const fetchData = async ({ fetcher, onSuccess, onError }: Props) => {
    try {
      const response = await fetcher();
      onSuccess(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) {
          const message =
            error.response?.data?.message || "요청이 잘못되었습니다.";
          toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
        onError?.(error);
      }
    }
  };
  return { fetchData };
};
