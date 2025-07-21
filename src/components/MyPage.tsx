import { useUserInfo } from "@/hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import type { Theme } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { STORAGE_KEYS } from "@/constants/storageKyes";
import { ROUTE_PATHS } from "@/constants/routePath";

const MyPage: React.FC = () => {
  const { user } = useUserInfo();
  const { LOGIN } = ROUTE_PATHS;

  const theme = useTheme();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div css={spinnerWrapperStyle}>
        <ClipLoader color="#333" size={40} />
      </div>
    );
  }

  return (
    <div css={ContainerStyle(theme)}>
      <header css={HeaderStyle(theme)}>마이 페이지</header>
      <div>
        <div>{(user?.email || "").split("@")[0]}님 안녕하세요</div>
        <div>이메일 주소는 {user?.email}입니다.</div>
      </div>
      <button
        onClick={() => {
          sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
          navigate(LOGIN);
        }}
        css={buttonStyle(theme)}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;

const buttonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.gray.gray200};
  width: 15%;
  height: ${theme.spacing.spacing10};
  cursor: pointer;
`;
const ContainerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing5};
`;
const HeaderStyle = (theme: Theme) => css`
  font-size: ${theme.typography.label1Bold.size};
`;
const spinnerWrapperStyle = css`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;
