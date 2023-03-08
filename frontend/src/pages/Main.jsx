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
          <div className="d-flex h-100 fx">
            <NavBar />
            <div className="container h-100 my-5 overflow-hidden rounded ">
              <div className="row h-75 bg-white flex-md-row indent rounded-2">
                <div className="col-4 rounded-2 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="cn d-flex bg-light shadow-sm rounded-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b className="text2">Каналы</b>
                    <button type="button" className="p-0 btn btn-group-vertical ">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      <span className="visually-hidden">+</span>
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
                        <b className="text2"> - Hello blua! </b>
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
                          <button type="submit" id="right" className="btn px-5 btn-group-vertical rounded-1 col-0 third">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                            <span className="visually-hidden">Отправить</span>
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
