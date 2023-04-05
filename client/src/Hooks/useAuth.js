import { useContext } from 'react'
import AuthContext from '../Context/Auth/AuthContext';

const useAuth = () => {
    return (
        useContext(AuthContext)
    );
};

export default useAuth;