
import { useState, useMemo } from "react";

interface PaginationData<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  itemsPerPage: number;
  totalItems: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const useTimeEntriesPagination = <T>(
  data: T[],
  itemsPerPage: number = 10
): PaginationData<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoPrevious,
    canGoNext,
  };
};
