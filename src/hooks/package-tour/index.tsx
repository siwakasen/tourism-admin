import { useState, useEffect } from "react";
import { TourPackage } from "../../__interface/tourpackage.interface";
import axios from "axios";

interface FetchTourPackagesResponse {
  data: TourPackage[];
}

interface UseFetchTourPackagesResult {
  tourPackages: TourPackage[];
  loading: boolean;
  error: string | null;
}

const useFetchTourPackages = (
  page: number = 1,
  limit: number = 10
): UseFetchTourPackagesResult => {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await axios.get<FetchTourPackagesResponse>(
          "http://localhost:3001/tour-package",
          {
            params: {
              page,
              limit,
            },
          }
        );
        setTourPackages(response.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { tourPackages, loading, error };
};

export default useFetchTourPackages;
