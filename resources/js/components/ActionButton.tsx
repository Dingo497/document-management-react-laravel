import { useNavigate } from "react-router-dom";
import { AiOutlineDownload, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentsPaginationAction, removeUserDocumentAction } from "../redux/actions/documentActions";

import { ButtonPropsType, AppStateTypes } from "../types/globalTypes";
import { downloadUserDocument } from "../http/documentApi";

/**
 * @param documentID - potrebne na edit a delete funkcionalitu
 * @param type - typ akcie
 */
export default function ActionButton({documentID, type}: ButtonPropsType) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const currentDocument = useSelector((state: AppStateTypes) =>
        // @ts-ignore - Lebo nepozna find kvoli kniznici
        state.document.documents.find(doc => doc.id === parseInt(documentID, 10))
    );

    // Zobrazenie ikony
    const icon = () => {
        if (type === 'edit') {
            return <AiOutlineEdit />;
        } else if (type === 'download') {
            return <AiOutlineDownload />;
        } else {
            return <AiOutlineDelete />;
        }
    }

    const handleClick = () => {
        if (type === 'edit') {
            return navigate('/edit-document/' + documentID);
        } else if (type === 'download') {
            return handleDownloadDocument();
        } else {
            return handleRemoveDocument();
        }
    }

    const handleDownloadDocument = () => {
        if (currentDocument.image) {
            downloadUserDocument({token: token}, currentDocument.image)
                .then((response) => {
                    console.log(response);
                    const fileURL =
                        window.URL.createObjectURL(response.data);

                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    alink.download = "something.pdf";
                    alink.click();
                });
        }
    }

    const handleRemoveDocument = () => {
        // @ts-ignore
        dispatch(removeUserDocumentAction(token, documentID));
        // @ts-ignore
        dispatch(getDocumentsPaginationAction(token));
    }

    return (
        <button
            className={'action-button action-button-' + type}
            onClick={handleClick}
        >
            { icon() }
        </button>
    )
}
