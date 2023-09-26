import { useSelector } from 'react-redux';
import { AppStateTypes } from "../redux/constants/appStateTypes";
import { Navigate} from 'react-router-dom';

export default function AuthRoute({ children }) {
    const token = useSelector((state: AppStateTypes) => state.auth.token);
    return token ? children : <Navigate to="/login" />;
};
