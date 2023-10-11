import '../../css/components/HeaderComponent.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppStateTypes} from "../redux/constants/appStateTypes";
import {logoutAction} from "../redux/actions/authActions";

export default function Header() {
    const dispatch = useDispatch();
    const name = useSelector((state: AppStateTypes) => state.auth.user.name);
    const token = useSelector((state: AppStateTypes) => state.auth.token);

    const handleLogout = () => {
        // @ts-ignore
        dispatch(logoutAction(token));
    }

    return (
        <header>
            <ul>
                <li><a onClick={handleLogout}>Logout</a></li>
                <li><span>@{ name }</span></li>
            </ul>
        </header>
    );
}
