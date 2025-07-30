import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import theme from "@/styles/theme";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePath";
import type { Theme } from "@emotion/react";
import {
  getThemeInfo,
  getThemeProductByThemeId,
  getThemeProducts,
} from "@/api/theme/theme";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const ThemePage = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const { MAIN } = ROUTE_PATHS;
  const observerRef = useRef<HTMLDivElement | null>(null);

  //테마 상품들 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getThemeProducts"],
      queryFn: ({ pageParam = 0 }) => {
        if (!themeId) {
          return Promise.reject("themeId값이 존재하지 않습니다.");
        }
        return getThemeProducts(themeId, pageParam);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { cursor, hasMoreList } = lastPage.data.data;
        return hasMoreList ? cursor + 10 : undefined;
      },
    });

  //상품 목록을 평탄화하여 사용
  const productList = useMemo(
    () => data?.pages.flatMap((page) => page?.data.data.list) || [],
    [data]
  );

  //무한 스크롤
  useEffect(() => {
    const targetNode = observerRef.current;
    if (!targetNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(targetNode);

    return () => {
      observer.unobserve(targetNode);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: themeInfo, error } = useSuspenseQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => {
      if (!themeId) {
        return Promise.reject("themeId값이 존재하지 않습니다.");
      }
      return getThemeInfo(themeId);
    },
    // enabled: !!themeId,
    select: (data) => data.data.data,
  });

  // 테마 정보와 상품 정보를 불러오기
  const { data: productInfo } = useSuspenseQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => {
      if (!themeId) {
        return Promise.reject("themeId값이 존재하지 않습니다.");
      }
      return getThemeProductByThemeId(themeId);
    },
    // enabled: !!themeId,
    select: (data) => data.data.data,
  });

  // 에러 발생 시 메인 페이지로 리다이렉트
  useEffect(() => {
    if (error && axios.isAxiosError(error)) {
      navigate(MAIN);
    }
  }, [error, navigate, MAIN, themeId]);

  if (!themeInfo || !productInfo) {
    return (
      <div css={spinnerWrapperStyle}>
        <ClipLoader color="#333" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div css={themeHeroAreaStyle(themeInfo.backgroundColor)}>
        <h3>{themeInfo.name}</h3>
        <h2>{themeInfo.title}</h2>
        <p>{themeInfo.description}</p>
      </div>
      <div css={themeProductListStyle(theme)}>
        {productList.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.imageURL} alt={product.name} />
            <h4 css={brandTextStyle(theme)}>{product.brandInfo.name}</h4>
            <h4 css={productNameStyle(theme)}>{product.name}</h4>
            <strong css={priceTextStyle(theme)}>
              {product.price.sellingPrice}원
            </strong>
          </div>
        ))}
        {hasNextPage && <div ref={observerRef} style={{ height: "1px" }} />}
      </div>
    </div>
  );
};

export default ThemePage;

const themeHeroAreaStyle = (backgroundColor: string) => css`
  background-color: ${backgroundColor};
  padding: 20px;
  color: #fff;
`;

const spinnerWrapperStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const themeProductListStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing4};

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const brandTextStyle = (theme: Theme) => css`
  font-size: ${theme.typography.label1Regular.size};
  font-weight: ${theme.typography.label1Regular.weight};
  line-height: ${theme.typography.label1Regular.lineHeight};
  color: ${theme.colors.semantic.text.sub};
`;

const productNameStyle = (theme: Theme) => css`
  font-size: ${theme.typography.body1Regular.size};
  font-weight: ${theme.typography.body1Regular.weight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.semantic.text.default};
`;

const priceTextStyle = (theme: Theme) => css`
  font-size: ${theme.typography.body1Bold.size};
  font-weight: ${theme.typography.body1Bold.weight};
  line-height: ${theme.typography.body1Bold.lineHeight};
  color: ${theme.colors.gray.gray1000};
`;
