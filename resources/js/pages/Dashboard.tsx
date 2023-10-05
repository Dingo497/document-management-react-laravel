import '../../css/components/HeaderComponent.scss';
import {useDispatch, useSelector} from "react-redux";
import { AppStateTypes } from "../redux/constants/appStateTypes";

import Header from "../components/Header";
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserDocumentsAction} from "../redux/actions/documentActions";


export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);

    useEffect(() => {
        // @ts-ignore
        dispatch(getUserDocumentsAction(token));
    }, []);

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

