import { useState } from "react";

export const useApiCall = request => {
  const [state, setState] = useState({
    isLoading: false
  });

  const doRequest = () => {
    setState({ isLoading: true });
    request().then(data => {
      setState({
        isLoading: false,
        data
      });
    });
  };

  return [state, doRequest];
};
