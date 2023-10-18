import { ButtonProps } from "../types/globalTypes";
import {AiOutlineDownload, AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {downloadUserDocument} from "../http/documentApi";
import {useDispatch, useSelector} from "react-redux";
import {AppStateTypes} from "../types/globalTypes";
import {removeUserDocumentAction} from "../redux/actions/documentActions";

export default function ActionButton({documentID, type}: ButtonProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const currentDocument = useSelector((state: AppStateTypes) =>
        // @ts-ignore - Lebo nepozna find kvoli kniznici
        state.document.documents.find(doc => doc.id === parseInt(documentID, 10))
    );

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
                    if (response.data) {
                        const blob = new Blob([response.data], { type: 'application/pdf' }); // Príklad pre PDF súbory
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', currentDocument.image);
                        document.body.appendChild(link);
                        link.click();
                    }
                });
        }
    }

    const handleRemoveDocument = () => {
        // @ts-ignore
        dispatch(removeUserDocumentAction(token, documentID));
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
