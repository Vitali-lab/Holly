import { Button, Input } from "..";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import { closeModal } from "../../utils/closeModal";
import { auth } from "../../bff/api/back-end/auth";
import { notifySuccess, notifyError } from "../../func/notification";
import styled from "styled-components";
import { getUserToken } from "../../bff/api/back-end/get-user-token";

const AuthForm = styled.div`
  position: relative;
  width: min(460px, 92vw);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 20px;
  padding: clamp(28px, 5vw, 44px);
  background-color: var(--surface);
  border: 1px solid var(--line);
  border-radius: 0;
  box-shadow: 0 30px 80px rgba(23, 21, 15, 0.16);

  & .title {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & h3 {
      margin: 0;
      font-size: 30px;
      line-height: 1.15;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.7;
    }

    & button {
      padding: 0;
      border: none;
      background: none;
      color: var(--ink);
      font-size: 13px;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  & .inputs {
    display: flex;
    flex-direction: column;
    gap: 18px;

    & label {
      width: 100%;
    }
  }

  & .button {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & > div {
      width: 100%;
    }
  }

  & .demo-hint {
    margin: 0;
    padding: 10px 12px;
    border: 1px dashed var(--line-strong);
    color: var(--grey-color);
    font-size: 11px;
    letter-spacing: 0.02em;
  }
`;

const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Введите e-mail")
    .email("Введите корректный e-mail")
    .max(50, "Email должен содержать максимум 50 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(/^[\w]+$/, "Пароль должен состоять только из букв и цифр")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(30, "Пароль должен содержать максимум 30 символов"),
});

const AuthContainer = ({ className, setIsAuthOpen, setIsRegistrationOpen }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(authFormSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await auth(email, password);
      if (user.error === null) {
        setIsAuthOpen(false);
        setError("");
        dispatch(getUserToken());
        notifySuccess(
          `Авторизация прошла успешно! Добро пожаловать ${user.user.name}!`,
        );
      } else {
        throw new Error(user.error);
      }
    } catch (err) {
      notifyError(err.message || "Ошибка авторизации");
    }
  };

  const formError = errors?.email?.message || errors?.password?.message;
  const errorMessage = formError || error;

  const portalRoot = document.getElementById("portal");
  if (!portalRoot) return null;

  return createPortal(
    <div
      className={className}
      onClick={(e) =>
        closeModal({ target: e.target }, setIsAuthOpen, false, ".auth")
      }
    >
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <AuthForm>
          <div className="title">
            <h3>Добро пожаловать в интернет магазин Holly</h3>
            <p>
              Впервые здесь?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegistrationOpen(true);
                  setIsAuthOpen(false);
                }}
              >
                Зарегистрируйтесь
              </button>
            </p>
          </div>

          <div className="inputs">
            <Input
              text="E-mail"
              width="600px"
              type="email"
              {...register("email")}
            />
            <Input
              text="Пароль"
              width="600px"
              type="password"
              {...register("password")}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            {import.meta.env.VITE_DEMO === "true" && (
              <p className="demo-hint">
                Демо-доступ: demo@holly.by / demo1234
              </p>
            )}
          </div>

          <div className="button">
            <Button type="submit" disabled={!!formError}>
              Войти
            </Button>
          </div>
        </AuthForm>
      </form>
    </div>,
    portalRoot,
  );
};
export const Auth = styled(AuthContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(23, 21, 15, 0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: animation 0.3s ease-in-out;
  @keyframes animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & .error {
    margin: 0;
    padding: 10px 12px;
    border: 1px solid var(--red-color);
    color: var(--red-color);
    font-size: 12px;
  }

  & .title {
    text-align: left;
  }

  & span {
    cursor: pointer;
  }
`;
