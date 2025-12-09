import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Icon, Button } from '../';
import { registration } from '../../api/registration';
import { fetchUser } from '../../../features/user/user';
import { notifyError } from '../../lib/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

const registrationFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Введите e-mail')
    .email('Введите корректный e-mail')
    .max(50, 'Email должен содержать максимум 50 символов'),
  name: yup
    .string()
    .required('Введите имя')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(30, 'Имя должно содержать максимум 30 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .matches(/^[\w]+$/, 'Пароль должен состоять только из букв и цифр')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(30, 'Пароль должен содержать максимум 30 символов'),
  passcheck: yup
    .string()
    .required('Введите пароль повторно')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className, setIsRegistrationOpen, setIsAuthOpen }) => {
  const closeModal = ({ target }) => {
    const registration = document.querySelector('.registration');
    const isClickInside = registration.contains(target);
    if (!isClickInside) {
      setIsRegistrationOpen(false);
    }
  };

  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasscheck, setShowPasscheck] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(registrationFormSchema),
  });

  const onSubmit = async ({ name, email, password }) => {
    try {
      const regOk = await registration(name, email, password);
      if (regOk.error) {
        notifyError(regOk.error.text || 'Ошибка регистрации');
      } else {
        reset();
        setError('');
        navigate('/catalog');
        dispatch(fetchUser());
        setIsRegistrationOpen(false);
      }
    } catch (err) {
      notifyError(err.message || 'Ошибка регистрации');
    }
  };

  const formError =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.name?.message ||
    errors?.passcheck?.message;

  const errorMessage = formError || error;

  const portalRoot = document.getElementById('portal');
  if (!portalRoot) return null;

  return createPortal(
    <div className={className} onClick={closeModal}>
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration-header">
          <h2>Регистрация</h2>
          <div className="registration-auth">
            <p>Уже есть аккаунт?</p>
            <button
              type="button"
              onClick={() => {
                setIsRegistrationOpen(false);
                setIsAuthOpen(true);
              }}
            >
              Войти
            </button>
          </div>
        </div>
        {errorMessage && <p className="registration-error">{errorMessage}</p>}
        <div className="registration-block">
          <Input
            placeholder={'Ваше имя'}
            fontSize={'17px'}
            {...register('name', {
              onChange: () => setError(null),
            })}
          />

          <Input
            placeholder={'Ваша почта'}
            type={'email'}
            fontSize={'17px'}
            {...register('email', {
              onChange: () => setError(null),
            })}
          />
          <div className="registration-password">
            <Input
              placeholder={'Ваш пароль'}
              type={showPassword ? 'text' : 'password'}
              fontSize={'17px'}
              {...register('password', {
                onChange: () => setError(null),
              })}
            />
            <Icon
              id={showPassword ? 'eye-slash' : 'eye'}
              color="var(--main-color)"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="registration-password">
            <Input
              placeholder={'Повторите пароль'}
              type={showPasscheck ? 'text' : 'password'}
              fontSize={'17px'}
              {...register('passcheck', {
                onChange: () => setError(null),
              })}
            />
            <Icon
              id={showPasscheck ? 'eye-slash' : 'eye'}
              color="var(--main-color)"
              onClick={() => setShowPasscheck(!showPasscheck)}
            />
          </div>
        </div>
        <Button type="submit" width="200px">
          Зарегистрироваться
        </Button>
      </form>
    </div>,
    portalRoot
  );
};

export const Registration = styled(RegistrationContainer)`
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

  & .registration {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    height: 700px;
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
  }

  & .registration-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    & h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 30px;
    }
  }

  & .registration-auth {
    display: flex;
    align-items: center;
    & p {
      text-align: center;
      margin: 0px;
      font-size: 15px;
    }
    & button {
      text-decoration: underline;
      color: var(--main-color);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
    }
  }

  & .registration-block {
    display: flex;
    flex-direction: column;
    gap: 30px;

    margin-bottom: 40px;
  }

  & .about-user {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }

  & .title {
    text-align: left;
  }

  & .registration-error {
    position: absolute;
    top: 200px;
    color: red;
    padding: 10px;

    border-radius: 5px;
  }

  & .registration-password {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    & i {
      cursor: pointer;
      position: absolute;
      top: -5px;
      right: 10px;
    }
  }
`;
