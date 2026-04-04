import { useState, useCallback } from "react";
import api from "@/lib/axios";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

interface FetchParams extends Record<string, unknown> {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
}

interface UsePaginationOptions {
  initialPage?: number;
  perPage?: number;
}

interface UsePaginationResult<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  hasNext: boolean;
  hasPrev: boolean;
  fetchData: (endpoint: string, params?: FetchParams) => Promise<void>;
  goToPage: (page: number) => void;
  goNext: () => void;
  goPrev: () => void;
  setPerPage: (perPage: number) => void;
}

export function usePagination<T = unknown>(
  options: UsePaginationOptions = {}
): UsePaginationResult<T> {
  const { initialPage = 1, perPage: initialPerPage = 10 } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const fetchData = useCallback(
    async (url: string, params: FetchParams = {}) => {
      const { onSuccess = () => {}, onError = (err) => {}, onFinally = () => {}, ...queryParams } = params;
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await api.get<PaginatedResponse<T>>(
          url,
          { params: { page, perPage, ...queryParams } }
        );
        setData(response.data);
        setTotal(response.total);
        onSuccess();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al cargar los datos";
        setError(message);
        onError(err);
      } finally {
        setLoading(false);
        onFinally();
      }
    },
    [page, perPage]
  );

  const goToPage = useCallback(
    (target: number) => {
      const clamped = Math.max(1, Math.min(target, totalPages));
      setPage(clamped);
    },
    [totalPages]
  );

  const goNext = useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleSetPerPage = useCallback((value: number) => {
    setPerPage(value);
    setPage(1);
  }, []);

  return {
    data,
    page,
    perPage,
    total,
    totalPages,
    loading,
    error,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    fetchData,
    goToPage,
    goNext,
    goPrev,
    setPerPage: handleSetPerPage,
  };
}
