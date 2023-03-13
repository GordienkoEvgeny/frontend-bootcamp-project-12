import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import paths from '../paths';
import icon8 from '../components/images/icon8.svg';
import chat2 from '../components/images/chat2.svg';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';
import useAuthorization from '../hooks';

// eslint-disable-next-line consistent-return
const BuildChatPage = () => {
  const [primaryChannelId, setPrimaryChannelId] = useState(null);
  const classChanels = cn('w-100 rounded-0 text-start btn', { 'btn-secondary': false });
  const [, setMessages] = useState(null);
  const [currentText, setText] = useState('');
  const [, setToken] = useState(false);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('user'));
  const auth = useAuthorization();
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const submitMessage = (e) => { //! !!!!
    e.preventDefault();
    // console.log(e);
    setMessages(currentText);
  };//! !!!!

  useEffect(() => {
    if (!token) {
      setToken(false);
      redirect(paths.loginPagePath());
    } else {
      setToken(true);
      const responceChat = async (data) => {
        try {
          const res = await axios.get(paths.usersPath(), { headers: { Authorization: `Bearer ${data.token}` } });
          dispatch(channelsActions.addChannels(res.data.channels));
          dispatch(messagesActions.addMessages(res.data.messages));
          setPrimaryChannelId(res.data.currentChannelId);
          // console.log(res.data);
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      };
      responceChat(token);
    }
  }, []);
  const { channels } = useSelector((state) => {
    const allChannels = channelsSelectors.selectAll(state);
    return { channels: allChannels };
  });
  const { activeChannel } = useSelector((state) => {
    const channel = channelsSelectors.selectById(state, primaryChannelId);
    return { activeChannel: channel };
  });
  const { currentMessages } = useSelector((state) => {
    const activeMessages = messagesSelectors.selectAll(state)
      .filter(({ id }) => id === primaryChannelId);
    return { currentMessages: activeMessages };
  });
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex h-100 fx">
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
                  {channels && channels.map((item) => (
                    <li key={item.id} className="nav-item w-100">
                      <button type="button" onClick={() => setPrimaryChannelId(item.id)} className={classChanels}>
                        <span className="me-1">
                          <img src={icon8} alt="icon" />
                        </span>
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small rounded-2">
                    <button type="button" onClick={auth.logOut} className="btn btn-outline-danger button1">Выйти</button>
                    <p className="text2 fw-bolder fs-6">
                      <img src={chat2} alt="chat" />
                      {` ${activeChannel && activeChannel.name}`}
                    </p>
                    <b className="text2">
                      {` ${currentMessages.length} сообщений`}
                    </b>
                  </div>
                  <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                    <div className="text-break mb-2">
                      {currentMessages && currentMessages.map((message) => <b key="1" className="text2">{message}</b>)}
                    </div>
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <form noValidate className="py-1 border rounded-2">
                      <div className="input-group has-validation">
                        <input
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder="Введите сообщение..."
                          className="border-0 mr p-0 x-1 ps-2 form-control"
                          onChange={handleChange}
                          value={currentText}
                        />
                        <button type="submit" onSubmit={submitMessage} id="right" className="btn px-5 btn-group-vertical rounded-1 col-0 third">
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
};
export default BuildChatPage;
