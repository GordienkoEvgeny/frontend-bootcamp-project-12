import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import paths from '../paths';

const responceChat = async (token) => {
  try {
    const res = await axios.get(paths.usersPath(), { headers: { Authorization: `Bearer ${token.token}` } });
    console.log(res.data.channels);
    console.log(res.data.message);
  } catch (err) {
    if (err.response.status === 401) {
      console.log(err);
    }
  }
};
// eslint-disable-next-line consistent-return
const BuildChatPage = () => {
  const [isToken, setToken] = useState(false);
  const redirect = useNavigate();
  const token = JSON.parse(localStorage.getItem('admin'));
  console.log(token);
  useEffect(() => {
    // console.log('useEffect');
    if (!token) {
      setToken(false);
      redirect(paths.loginPagePath());
    } else {
      setToken(true);
    }
  });
  if (isToken) {
    responceChat(token);
    return (
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex h-100 ">
            <NavBar />
            <div className="container h-100 my-4 overflow-hidden rounded ">
              <div className="row h-75 bg-white flex-md-row indent rounded-2">
                <div className="col-4 rounded-2 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="cn d-flex bg-light-channels shadow-sm rounded-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b className="text2">Каналы</b>
                    <button type="button" className="p-0 m-0 btn col-3 text3 third">
                      <span className="">+</span>
                    </button>
                  </div>
                  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    <li className="nav-item w-100">1 chat</li>
                    <li className="nav-item w-100">2 chat</li>
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="cn bg-light mb-4 p-3 shadow-sm small rounded-2">
                      <p className="m-0">
                        <b className="text2">Test</b>
                        <button type="button" className="btn btn-outline-danger button1">Выйти</button>
                      </p>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                      <div className="text-break mb-2">
                        <b className="text2"> - Hello! </b>
                      </div>
                    </div>
                    <div className="mt-auto px-5 py-3">
                      <form noValidate className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                          <input
                            name="body"
                            aria-label="Новое сообщение"
                            placeholder="Введите сообщение..."
                            className="border-0 p-0 ps-2 form-control"
                            value=""
                          />
                          <button type="submit" id="right" className="btn rounded-1 col-2 text2 third">
                            <span>Отправить</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default BuildChatPage;
