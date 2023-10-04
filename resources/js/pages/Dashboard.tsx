import '../../css/components/HeaderComponent.scss';
import { useSelector } from "react-redux";
import { AppStateTypes } from "../redux/constants/appStateTypes";

import Header from "../components/Header";
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";


export default function Dashboard() {
    const navigate = useNavigate();

    const name = useSelector((state: AppStateTypes) => state.auth.user.name);

    return (
        <>
        <Header />
        <button
            className='create-new-document'
            onClick={() => navigate('/create-document')}
        >
            Create new document
        </button>
        <div className='container'>
            <Table />
        </div>
        </>
    );
};

