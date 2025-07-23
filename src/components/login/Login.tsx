import type { Theme } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/login/Input";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useValidate } from "@/components/login/useValidate";
import { STORAGE_KEYS } from "@/constants/storageKyes";
import { ROUTE_PATHS } from "@/constants/routePath";
import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

const LOGIN = "/login";

const Login = () => {
  const { setUser } = useUserInfo();
  const theme = useTheme();
  const navigate = useNavigate();
  const { MYPAGE } = ROUTE_PATHS;

  const validateEmail = (email: string) => {
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Boolean(EMAIL_REGEXP.test(email));
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const email = useValidate(validateEmail, "이메일 형식을 지켜주세요.");
  const password = useValidate(validatePassword, "비밀번호는 8자 이상입니다.");
  const isFormValid = email.isValid && password.isValid;

  const mutation = useMutation({
    mutationFn: () =>
      api.post(
        LOGIN,
        {
          email: email.string,
          password: password.string,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: (response) => {
      const logUserInfo = {
        email: response.data.data.email,
        name: response.data.data.name,
        authToken: response.data.data.authToken,
      };

      setUser(logUserInfo);
      sessionStorage.setItem(
        STORAGE_KEYS.USER_INFO,
        JSON.stringify(logUserInfo)
      );

      navigate(MYPAGE);
    },
  });

  return (
    <div css={containerStyle()}>
      <h1 css={textStyle(theme)}>로그인</h1>
      <div css={inputContainerStyle(theme)}>
        <Input
          onChange={email.onChange}
          onBlur={email.onBlur}
          css={inputStyle(theme, email.isValid)}
          type="email"
          placeholder="이메일"
          message={email.message}
        ></Input>
        <Input
          onChange={password.onChange}
          onBlur={password.onBlur}
          css={inputStyle(theme, password.isValid)}
          type="password"
          placeholder="패스워드"
          message={password.message}
        ></Input>
      </div>

      <button
        onClick={async () => {
          if (isFormValid) {
            mutation.mutate();
          }
        }}
        css={buttonStyle(theme, isFormValid)}
        disabled={!isFormValid}
      >
        로그인
      </button>
    </div>
  );
};

export default Login;

const buttonStyle = (theme: Theme, enabled: boolean) => css`
  background-color: ${enabled
    ? theme.colors.semantic.kakaoYellow
    : "rgba(255, 230, 0, 0.5)"};
  border: 1px solid
    ${enabled ? theme.colors.semantic.kakaoYellow : "rgba(255, 230, 0, 0.5)"};
  color: ${enabled ? "inherit" : theme.colors.gray.gray500};
  align-items: center;
  width: 80%;
  height: 48px;
  cursor: ${enabled ? "pointer" : "not-allowed"};
  transition: background-color 0.3s ease;
`;

const textStyle = (theme: Theme) => css`
  font-size: ${theme.typography.title1Regular.size};
  font-weight: ${theme.typography.title1Regular.weight};
  line-height: ${theme.typography.title1Regular.lineHeight};
  text-align: center;
  margin-bottom: 20px;
`;

const inputContainerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: ${theme.spacing.spacing8};
  padding: ${theme.spacing.spacing6};
`;

const inputStyle = (theme: Theme, isFormValid: boolean) => css`
  width: 100%;
  padding: ${theme.spacing.spacing8};
  border: none;
  border-bottom: 1px solid ${theme.colors.gray.gray500};
  font-size: ${theme.typography.body1Regular.size};
  font-weight: ${theme.typography.body1Regular.weight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  outline: none;
  border-color: ${!isFormValid ? "red" : theme.colors.gray.gray500};
`;

const containerStyle = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height : 100vh;
  width: 100%; : 
`;
