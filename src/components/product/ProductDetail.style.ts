import { css } from "@emotion/react";
import type { Theme } from "@emotion/react";

export const ProductDetailContainerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing6};
  padding: ${theme.spacing.spacing6};
`;

export const ProductImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProductInfoStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.spacing3};
`;

export const ProductNameStyle = (theme: Theme) => css`
  font-size: ${theme.typography.title1Bold.size};
  font-weight: ${theme.typography.title1Bold.weight};
  color: ${theme.colors.gray.gray1000};
`;

export const ProductPriceStyle = (theme: Theme) => css`
  font-size: ${theme.typography.title2Bold.size};
  font-weight: ${theme.typography.title2Bold.weight};
`;

export const ProductBrandStyle = (theme: Theme) => css`
  font-size: ${theme.typography.body2Regular.size};
  color: ${theme.colors.gray.gray700};
  margin-top: ${theme.spacing.spacing2};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing2};
`;
export const ProductBrandImageStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
