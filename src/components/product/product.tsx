import { getProductDetail } from "@/api/product/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  ProductBrandImageStyle,
  ProductBrandStyle,
  ProductInfoContainerStyle,
  ProductImageStyle,
  ProductInfoStyle,
  ProductNameStyle,
  ProductPriceStyle,
} from "@/components/product/ProductDetail.style";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const theme = useTheme();

  const {
    data: product,
    error,
    isError,
  } = useQuery({
    queryKey: ["productData", productId],
    queryFn: () => {
      if (!productId) {
        return;
      }
      return getProductDetail(productId);
    },
    enabled: !!productId,
    select: (data) => data?.data.data,
  });

  return (
    <>
      <div css={ProductInfoContainerStyle(theme)}>
        <img src={product?.imageURL} css={ProductImageStyle} />

        <div css={ProductInfoStyle(theme)}>
          <h4 css={ProductNameStyle(theme)}>{product?.name}</h4>
          <h4 css={ProductPriceStyle(theme)}>
            {product?.price.sellingPrice}원
          </h4>
          <div css={ProductBrandStyle(theme)}>
            <img
              src={product?.brandInfo.imageURL}
              css={ProductBrandImageStyle}
            />
            <span>{product?.brandInfo.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
