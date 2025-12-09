import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Button, Icon, Input } from '../';
import { auth } from '../../api/auth';
import { closeModal } from '../../utils/closeModal';
import { notifySuccess, notifyError } from '../../lib/notification';
import { fetchUser } from '../../../features/user/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Введите e-mail')
    .email('Введите корректный e-mail')
    .max(50, 'Email должен содержать максимум 50 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .matches(/^[\w]+$/, 'Пароль должен состоять только из букв и цифр')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(30, 'Пароль должен содержать максимум 30 символов'),
});

const AuthContainer = ({ className, setIsAuthOpen, setIsRegistrationOpen }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(authFormSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await auth(email, password);
      if (user.error === null) {
        setIsAuthOpen(false);
        setError('');
        dispatch(fetchUser());
        notifySuccess(`Авторизация прошла успешно! Добро пожаловать ${user.user.name}!`);
      } else {
        throw new Error(user.error);
      }
    } catch (err) {
      notifyError(err.message || 'Ошибка авторизации');
    }
  };

  const formError = errors?.email?.message || errors?.password?.message;
  const errorMessage = formError || error;

  const portalRoot = document.getElementById('portal');

  if (!portalRoot) return null;

  return createPortal(
    <div
      className={className}
      onClick={(e) => closeModal({ target: e.target }, setIsAuthOpen, false, '.auth')}
    >
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form">
          <div className="auth-title">
            <h3>Добро пожаловать в интернет магазин Holly</h3>
            <p>
              Впервые здесь?{' '}
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

          <div className="auth-inputs">
            <h3>Вход</h3>
            <Input placeholder="E-mail" type="email" {...register('email')} />
            <div className="auth-password">
              <Input
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <Icon
                id={showPassword ? 'eye-slash' : 'eye'}
                color="var(--main-color)"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorMessage && <p className="auth-error">{errorMessage}</p>}
          </div>

          <div className="button-auth">
            <Button type="submit" disabled={!!formError}>
              Войти
            </Button>
          </div>
        </div>
      </form>
    </div>,
    portalRoot
  );
};
export const Auth = styled(AuthContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.2); /* полупрозрачный слой */
  backdrop-filter: blur(40px) saturate(180%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  

  & .auth-form{
   position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 0px;
  background-color: var(--white-color);
  padding: 20px;
  border-radius: 10px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* лёгкая окантовка */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25); /* мягкая тень */
  background: rgba(255, 255, 255, 0.55);

  & .inputs {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
    & input {
      width: 100%;
    }
  }
  & .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;
  }

  }

  & .auth-title {
    text-align: center;
    font-size: 19px;
     & button {
      text-decoration: underline;
      color: var(--main-color);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      
    }
  }
  }

  & .auth-inputs{
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 40px 20px;
    
    border-radius: 10px;
    font-size: 20px;
    color: #868585ff;
    font-weight: 700;
    & h3 {
      margin: 10px 0 0 0;
    }
  } 

  & .auth-password{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    & i{
      position: absolute;
      right: 10px;
      cursor: pointer;
      top: -1px;
    }  
  }

  & .auth-error {
  position: absolute;
    color: red;
    padding: 10px;
    font-size: 15px;
    margin: 0;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);  
  }

  & .auth-title {
    text-align: left;
  }

  & span {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    & .auth-form {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    & .auth-form {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 480px) {

    & .inputs {
      width: min(390px, 100%); 
  }
  }
`;
