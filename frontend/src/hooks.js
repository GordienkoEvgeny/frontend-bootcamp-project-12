import { useContext } from 'react';
import LoginContext from './contexts';

const useAuthorization = () => useContext(LoginContext);

export default useAuthorization;
