import '../../css/components/HeaderComponent.scss';
import { useSelector } from "react-redux";
import { AppStateTypes } from "../redux/constants/appStateTypes";

import HeaderComponent from "../components/HeaderComponent";


export default function Dashboard() {
    const name = useSelector((state: AppStateTypes) => state.auth.user.name);

    return (
        <HeaderComponent />
    );
};

