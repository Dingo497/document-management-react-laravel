import { useLayoutEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppStateTypes } from "../types/globalTypes";
import { getUserDocumentsAfterRefreshAction } from "../redux/actions/documentActions";

/**
 * Je to taky middleware, ktory ak dam refresh stranky tak sa dolezite udaje obnovia do stavu aplikacie
 * @param children
 */
export default function AuthRoute({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            // Ak som prihlaseny a spravim refresh a nachadzam sa na create-document alebo edit-document tak nech
            // spravi redirect na dashboard, kvoli tomu ze tam nemam poriesene zapametanie udajov po refreshe stranky
            if (children.type.name === 'CreateDocument' || children.type.name === 'EditDocument') {
                return navigate('/dashbaord');
            }
            setIsDispatchComplete(true);
        }
    }, [dispatch, token]);

    return isDispatchComplete ? (token ? children : <Navigate to="/login" />) : null;
};
