import { useRequestHandler } from "@/hooks/useRequestHandler";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import theme from "@/styles/theme";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routePath";
import type { Theme } from "@emotion/react";

type ThemeInfo = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

type ThemeProducts = {
  list: Array<{
    id: number;
    name: string;
    price: {
      basicPrice: number;
      sellingPrice: number;
      discountRate: number;
    };
    imageURL: string;
    brandInfo: {
      id: number;
      name: string;
      imageURL: string;
    };
  }>;
};

const ThemePage = () => {
  const { themeId } = useParams();
  const { fetchData } = useRequestHandler();
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [productInfo, setProductInfo] = useState<ThemeProducts | null>(null);
  const navigate = useNavigate();
  const { MAIN } = ROUTE_PATHS;
  const [productList, setProductList] = useState<ThemeProducts["list"]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadProducts(cursor);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [cursor, hasMore, isLoading]);

  const loadProducts = (cursor: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    fetchData({
      fetcher: () =>
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL_THEME}/${themeId}/products?cursor=${cursor}&limit=10`
        ),
      onSuccess: (data) => {
        const newProducts = data.data.data.list;
        setProductList((prev) => [...prev, ...newProducts]);

        if (newProducts.length < 10) {
          setHasMore(false);
        } else {
          setCursor(cursor + newProducts.length);
        }

        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchData({
      fetcher: () =>
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL_THEME}/${themeId}/info?cursor=${cursor}&limit=10`
        ),
      onSuccess: (data) => {
        setThemeInfo(data.data.data);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status == 404) {
            navigate(MAIN);
          }
        }
      },
    });

    fetchData({
      fetcher: () =>
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL_THEME}/${themeId}/products `
        ),
      onSuccess: (data) => {
        setProductInfo(data.data.data);
      },
    });
    loadProducts(0);
  }, [themeId]);

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
          <div key={product.id}>
            <img src={product.imageURL} alt={product.name} />
            <h4 css={brandTextStyle(theme)}>{product.brandInfo.name}</h4>
            <h4 css={productNameStyle(theme)}>{product.name}</h4>
            <strong css={priceTextStyle(theme)}>
              {product.price.sellingPrice}원
            </strong>
          </div>
        ))}
        {hasMore && <div ref={observerRef} style={{ height: "1px" }} />}
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
