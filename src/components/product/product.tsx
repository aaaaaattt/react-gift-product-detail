import {
  getProductDetail,
  getProductExtraInfo,
  getProductReview,
} from "@/api/product/product";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  ProductBrandImageStyle,
  ProductBrandStyle,
  ProductInfoContainerStyle,
  ProductImageStyle,
  ProductInfoStyle,
  ProductNameStyle,
  ProductPriceStyle,
  TabButtonStyle,
  TabButtonContainer,
  productAnnouncementsStyle,
  TabPanelContainerStyle,
  TabContentAreaStyle,
  ReviewStyle,
} from "@/components/product/ProductDetail.style";
import { useMemo, useState } from "react";
import { fixedBottomStyle, SubmitStyle } from "@/components/order/Order.style";
import { useWishPost } from "@/hooks/useWishPost";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("상품설명");

  const tabs = ["상품설명", "선물후기", "상세정보"];

  // 상품 정보
  const { data: product } = useSuspenseQuery({
    queryKey: ["productInfo", productId],
    queryFn: () => {
      if (!productId) {
        return;
      }
      return getProductDetail(productId);
    },
    // enabled: !!productId,
    select: (data) => data?.data.data,
  });

  // 상품 부가 정보
  const { data: productExtraInfo } = useSuspenseQuery({
    queryKey: ["productExtraInfo", productId],
    queryFn: () => {
      if (!productId) {
        return;
      }
      return getProductExtraInfo(productId);
    },
    // enabled: !!productId,
    select: (data) => data?.data.data,
  });

  // 상품 리뷰
  const { data: productReview } = useQuery({
    queryKey: ["productReview", productId],
    queryFn: () => {
      if (!productId) {
        return;
      }
      return getProductReview(productId);
    },
    enabled: !!productId,
    select: (data) => data?.data.data,
  });

  //리뷰 목록 10개
  const reviewList = useMemo(() => {
    return productReview?.reviews.slice(0, 10);
  }, [productReview]);

  const mutation = useWishPost();

  return (
    <div css={TabPanelContainerStyle}>
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
        <div css={fixedBottomStyle(theme)}>
          <div
            onClick={() => {
              if (productId) {
                mutation.mutate(productId);
              }
            }}
          >
            <p>{productReview?.totalCount ?? 0}❤️</p>
          </div>
          <div onClick={() => navigate(`/order/${product?.id}`)}>
            <p css={SubmitStyle(theme)}>주문하기</p>
          </div>
        </div>
      </div>

      {/* 상품 부가 정보 */}
      <div>
        <div css={TabButtonContainer(theme)}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              css={TabButtonStyle(theme, activeTab === tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div css={TabContentAreaStyle}>
          {activeTab === tabs[0] && (
            <div
              dangerouslySetInnerHTML={{
                __html: productExtraInfo?.description ?? "",
              }}
            />
          )}

          {activeTab === tabs[1] && (
            <div>
              {reviewList?.map((review) => (
                <div key={review.id} css={ReviewStyle(theme)}>
                  <strong>{review.authorName}</strong>
                  <div>{review.content}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === tabs[2] && (
            <div>
              {productExtraInfo?.announcements.map((d) => (
                <div key={d.name} css={productAnnouncementsStyle}>
                  <strong>{d.name}</strong>
                  <div>{d.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
