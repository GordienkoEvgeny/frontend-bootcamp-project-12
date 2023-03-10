import cn from 'classnames';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import World from '../components/World';
import paths from '../paths';
import useAuthorization from '../hooks';

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().min(
    3,
    'Nickname must be at least 3 characters',
  )
    .max(15, 'Nickname must be no more than 15 characters')
    .required('Required field'),
  password: Yup.string().trim().min(
    5,
    'Password must be at least 5 characters',
  )
    .max(20, 'Password must be no more than 20 characters')
    .required('Required field'),
});
const BuildAuthPage = () => {
  const [successAuth, setSuccessAuth] = useState(false);
  const [error, setError] = useState(null);
  const formState = cn('form-control', { 'is-invalid': successAuth });
  const formAlert = cn({ 'alert-danger': successAuth, alert: successAuth });
  const auth = useAuthorization();
  const redirect = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(paths.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        redirect(paths.chatPath());
      } catch (err) {
        if (err.response.status === 401) {
          setSuccessAuth(true);
          setError('Неверные имя пользователя или пароль');
        }
      }
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid indent">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm indent">
              <div className="card-body row justify-content-center indent2">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <World />
                </div>
                <div />
                <div className="card-body row p-4 justify-content-center ">
                  <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 ">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="mb-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="login" />
                      <input
                        className={formState}
                        required=""
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        placeholder="Ваш ник"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div>{formik.errors.username}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="pass" />
                      <input
                        className={formState}
                        required=""
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        placeholder="Пароль"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </div>
                    <div className={formAlert} role="alert">
                      {error}
                    </div>
                    <button onSubmit={formik.handleSubmit} type="submit" className="btn third">Войти</button>
                  </form>
                </div>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuildAuthPage;
