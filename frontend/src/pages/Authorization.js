import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import World from '../components/World';

const validationSchema = Yup.object().shape({
  userName: Yup.string().trim().min(
    3,
    'Nickname must be at least 3 characters',
  )
    .max(15, 'Nickname must be no more than 15 characters')
    .required('Required field'),
  password: Yup.string().trim().min(
    6,
    'Password must be at least 6 characters',
  )
    .max(20, 'Password must be no more than 20 characters')
    .required('Required field'),
});

const BuildForms = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5 justify-content-center ">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <World />
                </div>
                <div className="card-body row p-5 justify-content-center ">
                  <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 ">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="mb-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="login" />
                      <input
                        className="form-control"
                        required=""
                        id="userName"
                        name="userName"
                        onChange={formik.handleChange}
                        placeholder="Ваш ник"
                      />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div>{formik.errors.userName}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label htmlFor="pass" />
                      <input
                        className="form-control"
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
                    <button type="submit" className="btn third">Войти</button>
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
export default BuildForms;
