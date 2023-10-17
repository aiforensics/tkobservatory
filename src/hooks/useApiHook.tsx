import { useState, useEffect } from "react";

export type TApiResponse = {
  status: Number;
  statusText: String;
  data: any;
  error: any;
  loading: Boolean;
  execute: () => void;
};

export const useApiGet = (
  url: string,
  dates: any = null,
  fromSearch: boolean = false
): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toCallApi, setApiExecution] = useState(false);

  const execute = () => {
    setApiExecution(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(url);
      const json = await apiResponse.json();
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(json);
      setError("");
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (fromSearch) {
      if (toCallApi) {
        getAPIData();
        setApiExecution(false);
      }
    } else {
      getAPIData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCallApi, dates, fromSearch]);

  return { status, statusText, data, error, loading, execute };
};
