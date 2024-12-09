import { useState, useEffect } from "react";
import { TourPackage } from "../../__interface/tourpackage.interface";
import axios from "axios";
import useListPackageTour from "./useListPackageTour";

interface FetchTourPackagesResponse {
  data: TourPackage[];
}

interface FetchTourPackageById {
  data: TourPackage;
  message: string;
}

interface UseFetchTourPackagesResult {
  tourPackages: TourPackage[];
  loading: boolean;
  error: string | null;
}

export const useFetchTourPackages = (
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

export const fetchTourPackageById = async (
  id: string
): Promise<TourPackage | null> => {
  try {
    const response = await axios.get<FetchTourPackageById>(
      `http://localhost:3001/tour-package/${id}`
    );
    const { data } = response.data;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed to fetch tour package:", err);
    return null;
  }
};
