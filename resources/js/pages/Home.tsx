import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/actions/AuthActions";
import {AppStateTypes} from "../redux/constants/appStateTypes";

export default function Home() {
    const dispatch = useDispatch();

    const user = useSelector((state: AppStateTypes) => state.auth.user);
    const handleInput = () => {
        dispatch(setUser('user1'));
    }

    return (
        <button onClick={handleInput}>
            user: {user}
        </button>
    );
}
