import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import GiftObject from "./GiftObject";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ProductRanking = {
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
};

type GiftRankingProps = {
  target: string;
  rankType: string;
};

const GiftRanking = ({ target, rankType }: GiftRankingProps) => {
  const theme = useTheme();
  const [productRankingData, setProductRankingData] = useState<
    ProductRanking[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const productsFiltered = `/products/ranking?targetType=${target}&rankType=${rankType}`;
  const navigate = useNavigate();

  const { data, error, isError } = useQuery({
    queryKey: ["productRanking", target, rankType],
    queryFn: () => api.get(productsFiltered),
    enabled: !!target && !!rankType,
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        return;
      }
    }

    if (data) {
      setProductRankingData(data);
      setIsLoading(false);
    }
  }, [target, rankType, data, error, isError]);

  return (
    <div css={giftRankingStyle(theme)}>
      {isError && <div>상품 목록이 없습니다.</div>}
      {isLoading && (
        <div css={spinnerWrapperStyle}>
          <ClipLoader color="#333" size={40} />
        </div>
      )}
      {!isError && !isLoading && (
        <>
          {productRankingData &&
            productRankingData.map((product) => (
              <GiftObject
                key={product.id}
                gift={product}
                onClick={() => navigate(`/order/${product.id}`)}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default GiftRanking;

const giftRankingStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background: ${theme.colors.semantic.background.fill};
`;

const spinnerWrapperStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;
