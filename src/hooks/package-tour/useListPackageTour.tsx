import { useState } from "react";

const useListPackageTour = () => {
  const [data, setData] = useState([]);

  return {
    data,
    setData,
    // Add additional methods for handling data here
  };
};

export default useListPackageTour;
