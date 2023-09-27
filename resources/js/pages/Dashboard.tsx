import '../../css/components/HeaderComponent.scss';
import { useSelector } from "react-redux";
import { AppStateTypes } from "../redux/constants/appStateTypes";

import Header from "../components/Header";
import Table from "../components/Table";


export default function Dashboard() {
    const name = useSelector((state: AppStateTypes) => state.auth.user.name);

    return (
        <>
        <Header />
        <div className='container'>
            <Table />
        </div>
        </>
    );
};

