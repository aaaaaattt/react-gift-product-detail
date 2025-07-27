import { css } from "@emotion/react";
import type { Theme } from "@emotion/react";
import theme from "./theme";

const outerWrapperStyle = (theme: Theme) => css`
  background-color: ${theme.colors.gray.gray100};
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const layoutStyle = css`
  width: 100%;
  max-width: 720px;
  background-color: white;
  padding: 0 16px;
`;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div css={outerWrapperStyle(theme)}>
      <div css={layoutStyle}>{children}</div>
    </div>
  );
};

export default Layout;
