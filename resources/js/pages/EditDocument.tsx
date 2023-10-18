import DocumentForm from "../components/DocumentForm";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateTypes} from "../types/globalTypes";

export default function EditDocument() {
    const { documentID } = useParams();
    const currentDocument = useSelector((state: AppStateTypes) =>
        // @ts-ignore - Lebo nepozna find kvoli kniznici
        state.document.documents.find(doc => doc.id === parseInt(documentID, 10))
    );


    return (
        <>
            <h1 className='document-form-title'>
                Edit <span>{currentDocument.name}</span> document
            </h1>
            <DocumentForm editDocument={currentDocument} />
        </>
    );
}
