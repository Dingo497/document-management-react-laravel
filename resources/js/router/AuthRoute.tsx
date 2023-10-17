import {useDispatch, useSelector} from 'react-redux';
import { AppStateTypes } from "../redux/constants/appStateTypes";
import { Navigate} from 'react-router-dom';
import {useLayoutEffect, useState} from "react";
import {getUserDocumentsAfterRefreshAction} from "../redux/actions/documentActions";

export default function AuthRoute({ children }) {
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);

    const [isDispatchComplete, setIsDispatchComplete] = useState(false);

    useLayoutEffect(() => {
        if (!token) {
            const pagination = JSON.parse(localStorage.getItem('pagination'));
            // @ts-ignore
            dispatch(getUserDocumentsAfterRefreshAction(pagination ? pagination : 1))
                .then(() =>{
                    setIsDispatchComplete(true);
                })
                .catch((err) => {
                    console.error('Dispatch failed...', err);
                    setIsDispatchComplete(true);
                })
        } else {
            setIsDispatchComplete(true);
        }
    }, [dispatch, token]);

    return isDispatchComplete ? (token ? children : <Navigate to="/login" />) : null;
};
