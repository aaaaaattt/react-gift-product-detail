import { css } from "@emotion/react";
import type { Theme } from "@emotion/react";

export const ProductInfoContainerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const TabButtonContainer = (theme: Theme) => css`
  display: flex;
  gap: ${theme.spacing.spacing2};
  border-bottom: 1px solid ${theme.colors.gray.gray300};
`;

export const TabButtonStyle = (theme: Theme, isActive: boolean) => css`
  flex: 1;
  text-align: center;
  padding: ${theme.spacing.spacing4};
  font-size: ${theme.typography.body1Regular.size};
  font-weight: ${theme.typography.body1Bold.weight};

  height: 48px;

  color: ${isActive ? theme.colors.gray.gray1000 : theme.colors.gray.gray500};
  border: none;
  background: none;
  border-bottom: ${isActive
    ? `3px solid ${theme.colors.yellow.yellow500}`
    : "3px solid transparent"};
  cursor: pointer;
`;

export const productAnnouncementsStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  font-size: ${theme.typography.label1Regular.size};
  gap: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing3};
`;

export const TabPanelContainerStyle = css`
  width: 100%;
  min-height: 300px;
`;

export const TabContentAreaStyle = css`
  padding: 16px 0;

  * {
    max-width: 100%;
    word-break: break-word;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export const ReviewStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  font-size: ${theme.typography.label1Regular.size};
  gap: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing3};
`;
