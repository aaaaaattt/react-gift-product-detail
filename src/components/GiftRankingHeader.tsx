import { css } from "@emotion/react";
import type { Theme } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type GiftRankingHeaderProps = {
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  rankType: string;
  setRankType: React.Dispatch<React.SetStateAction<string>>;
};

const GiftRankingHeader: React.FC<GiftRankingHeaderProps> = ({
  target,
  setTarget,
  rankType,
  setRankType,
}) => {
  type RANK_TYPE = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initTarget = searchParams.get("target") || "ALL";
    const initRank = (searchParams.get("rankType") as RANK_TYPE) || "MANY_WISH";
    setTarget(initTarget);
    setRankType(initRank);
  }, [location.pathname, location.search, navigate, setRankType, setTarget]);

  const handleTargetClick = (newTarget: string) => {
    setTarget(newTarget);
    searchParams.set("target", newTarget);
    searchParams.set("rankType", rankType);
    setSearchParams(searchParams);
  };

  const handleRankClick = (newRank: string) => {
    setRankType(newRank);
    searchParams.set("target", target);
    searchParams.set("rankType", newRank);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div css={textStyle(theme)}>실시간 급상승 선물랭킹</div>
      <div css={containerStyle}>
        <div css={filterContainerStyle(theme)}>
          <div
            onClick={() => handleTargetClick("ALL")}
            css={[
              iconStyle(theme),
              target === "ALL" && selectedTargetStyle(theme),
            ]}
          >
            ALL
          </div>
          <p css={target === "ALL" ? selectedTargetStyle(theme) : undefined}>
            전체
          </p>
        </div>

        <div css={filterContainerStyle(theme)}>
          <div
            onClick={() => handleTargetClick("FEMALE")}
            css={[
              iconStyle(theme),
              target === "FEMALE" && selectedTargetStyle(theme),
            ]}
          >
            👩🏻
          </div>
          <p css={target === "FEMALE" ? selectedTargetStyle(theme) : undefined}>
            여성이
          </p>
        </div>

        <div css={filterContainerStyle(theme)}>
          <div
            onClick={() => handleTargetClick("MALE")}
            css={[
              iconStyle(theme),
              target === "MALE" && selectedTargetStyle(theme),
            ]}
          >
            👨🏻
          </div>
          <p css={target === "MALE" && selectedTargetStyle(theme)}>남성이</p>
        </div>
      </div>
      <div css={tabContainerStyle(theme)}>
        <div
          onClick={() => handleRankClick("MANY_WISH_RECEIVE")}
          css={[
            tabItemStyle(theme),
            rankType === "MANY_WISH_RECEIVE" && selectedRankStyle(theme),
          ]}
        >
          받고 싶어한
        </div>
        <div
          onClick={() => handleRankClick("MANY_RECEIVE")}
          css={[
            tabItemStyle(theme),
            rankType === "MANY_RECEIVE" && selectedRankStyle(theme),
          ]}
        >
          많이 선물한
        </div>
        <div
          onClick={() => handleRankClick("MANY_WISH")}
          css={[
            tabItemStyle(theme),
            rankType === "MANY_WISH" && selectedRankStyle(theme),
          ]}
        >
          위시로 받은
        </div>
      </div>
    </>
  );
};

export default GiftRankingHeader;

const textStyle = (theme: Theme) => css`
  padding: ${theme.spacing.spacing4};
  font-size: ${theme.typography.subtitle1Bold.size};
  font-weight: ${theme.typography.subtitle1Bold.weight};
  line-height: ${theme.typography.subtitle1Bold.lineHeight};
  color: ${theme.colors.semantic.text.default};
  height: 30px;
  text-align: left;
`;

const containerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${theme.spacing.spacing16};
  width: 100%;
  min-height: ${theme.spacing.spacing10};
  border-radius: ${theme.spacing.spacing2};
`;

const iconStyle = (theme: Theme) => css`
  width: ${theme.spacing.spacing10};
  height: ${theme.spacing.spacing10};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.title2Regular.size};
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${theme.colors.blue.blue100};
`;
const tabContainerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  border-radius: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing4};
  width: 100%;
  border: 1px solid ${theme.colors.semantic.border.default};
  background-color: ${theme.colors.blue.blue100};
`;

const tabItemStyle = (theme: Theme) => css`
  flex: 1;
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  text-align: center;
  border-radius: ${theme.spacing.spacing1};
  font-size: ${theme.typography.body2Regular.size};
  font-weight: ${theme.typography.body2Regular.weight};
  cursor: pointer;
`;

const selectedTargetStyle = (theme: Theme) => css`
  color: ${theme.colors.blue.blue700};
`;

const selectedRankStyle = (theme: Theme) => css`
  color: ${theme.colors.blue.blue500};
  font-weight: ${theme.typography.body1Bold.weight};
`;

const filterContainerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.spacing2}; // 8px
`;
