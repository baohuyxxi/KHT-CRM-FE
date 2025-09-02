// src/hooks/usePublic.js
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  fetchHomeData,
  getIntroduce,
  fetchProducts,
  searchProductsbyKeyword,
  getAllService,
  getServiceByKeyword,
  getNewsList,
  getCompanyProfile,
  getEventPast,
  getEventUpcoming,
  getCareerList
} from "~/services/publicAPI";
import { getCategories } from "~/services/categorieAPI";

// Trang chủ
export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Giới thiệu
export const useIntroduce = () => {
  return useQuery({
    queryKey: ["introduce"],
    queryFn: getIntroduce,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2,
  });
};

export const useProducts = ({ page, limit, categoryId, keyword }) => {
  const queryClient = useQueryClient(); // ⚡ cần khai báo ở đây

  return useQuery({
    queryKey: ["products", { page, categoryId, keyword }],
    queryFn: async () => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page, limit });
      }
      return fetchProducts(page, limit, categoryId);
    },
    keepPreviousData: true, // giữ data cũ khi page đổi
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 60, // 1 giờ
    initialData: () => {
      // lấy cache từ queryClient nếu có
      const cached = queryClient.getQueryData([
        "products",
        { page, categoryId, keyword },
      ]);
      return cached || undefined;
    },
  });
};

export const useServices = ({ keyword, page, limit = 12 }) => {
  return useQuery({
    queryKey: ["services", { keyword, page, limit }],
    queryFn: async () => {
      if (!keyword || keyword.trim() === "") {
        const data = await getAllService();
        const totalPages = Math.ceil((data.services?.length || 0) / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        return { services: data.services.slice(start, end), totalPages };
      }
      return getServiceByKeyword(keyword, page, limit);
    },
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 10, // 10 phút
  });
};
export const useNews = ({ page, limit }) => {
  return useQuery({
    queryKey: ["news", page, limit],
    queryFn: () => getNewsList(page, limit),
    keepPreviousData: true, // giữ dữ liệu cũ khi chuyển trang
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 1,
  });
};

export const useProductsInfinite = ({ limit = 8, categoryId, keyword }) => {
  return useInfiniteQuery({
    queryKey: ["products", { categoryId, keyword }],
    queryFn: async ({ pageParam = 1 }) => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page: pageParam, limit });
      }
      return fetchProducts(pageParam, limit, categoryId);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < limit) return undefined;
      return allPages.length + 1;
    },
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 60,
  });
};

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 60, // cache 1 giờ
  });
};
export const useCompanyInfo = () => {
  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: getCompanyProfile,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 10,
  });
};

// Trang chủ
export const useEventUpcoming = () => {
  return useQuery({
    queryKey: ["eventUpComing"],
    queryFn: getEventUpcoming,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Trang chủ
export const useEventPast = () => {
  return useQuery({
    queryKey: ["eventPast"],
    queryFn: getEventPast,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Trang chủ
export const useCareerList = (currentPage, jobsPerPage) => {
  return useQuery({
    queryKey: ["careerList", { currentPage, jobsPerPage }],
    queryFn: () => getCareerList(currentPage, jobsPerPage),
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};