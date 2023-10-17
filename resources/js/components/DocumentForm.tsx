import {useDispatch, useSelector} from "react-redux";
import {alertDataType, AppStateTypes, Document} from "../redux/constants/appStateTypes";
import {createUserDocumentAction, editUserDocumentAction} from "../redux/actions/documentActions";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {documentFormDataType} from "../types/document/documentTypes";

import Alert from "./Alert";
import TagList from "./TagList";


export default function DocumentForm(props: {editDocument ?:Document|null}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {editDocument} = props;

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const tags = useSelector((state: AppStateTypes) => state.tag.tags);
    const [formData, setFormData] = useState<documentFormDataType>({
        name: '',
        tags: [],
        image: null
    });
    const [stringTags, setStringTags] = useState<string[]>([]);
    const [alert, setAlert] = useState<alertDataType>({
        type: 'danger',
        title: '',
        messages: []
    });

    useEffect(() => {
        if (editDocument) {
            setFormData({
                name: editDocument.name,
                tags: editDocument.tags.map(tag => parseInt(tag.id)),
                image: null
            });
            setStringTags(editDocument.tags.map(tag => tag.name));
        }
    }, []);

    const handleChangeCheckbox = (value, checked, e) => {
        if (checked) {
            setStringTags([...stringTags, e.target.nextElementSibling.innerText]);
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: [...formData.tags, parseInt(value)]
            }));
        } else {
            setStringTags(stringTags.filter(tag => tag !== e.target.nextElementSibling.innerText));
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: formData.tags.filter(tagID => tagID !== parseInt(value))
            }));
        }
    }

    const handleUploadFileButton = () => document.getElementsByName('document')[0].click();

    const handleChangeUploadedFile = (e) => {
        if (e.target.files.length > 0) {
            setFormData(prevFormData => ({
                ...prevFormData,
                image: e.target.files[0]
            }));
            const fileNameParts = e.target.value.split(/[\\/]/);
            const fileNameSpan = document.querySelector('#upload-file-name');
            fileNameSpan.innerHTML = fileNameParts[fileNameParts.length - 1];
            fileNameSpan.classList.remove('hidden');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.image) {
            if (editDocument) {
                editCurrentDocument();
            } else {
                createNewDocument();
            }
        } else {
            if (editDocument) {
                // lebo pre edit to nieje povinne potom prepisat
                editCurrentDocument();
            } else {
                // Len kvoli vypisaniu chyby, kedze nemam cas na upravu Alert komponentu...
                createNewDocument();
            }
        }
    }

    // @ts-ignore
    const createNewDocument = async () => {
        // @ts-ignore
        const response = await dispatch(createUserDocumentAction(token, formData));
        if (!response.errors) {
            navigate('/dashboard');
        } else {
            setAlert({
                type: 'danger',
                title: 'ERROR',
                messages: response.errors
            });
        }
    }

    // @ts-ignore
    const editCurrentDocument = async () => {
        const editFormData = {
            _method: 'PATCH',
            id: editDocument.id,
            ...formData,
        }

        // @ts-ignore
        const response = await dispatch(editUserDocumentAction(token, editFormData));
        if (!response.errors) {
            navigate('/dashboard');
        } else {
            setAlert({
                type: 'danger',
                title: 'ERROR',
                messages: response.errors
            });
        }
    }

    return (
        <>
        <form className='document-form' onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                type='text'
                className='document-input'
                name='name'
                placeholder='Name of document'
                value={formData.name}
                onChange={(e) =>
                   setFormData(prevFormData => ({ ...prevFormData, name: e.target.value }))
                }
            />
            <input
                type='text'
                className='document-input'
                readOnly
                name='tags'
                placeholder='Tags'
                value={stringTags ?? ''}
            />
            <TagList
                tags={tags}
                checkedTags={formData.tags}
                onChangeCheckbox={handleChangeCheckbox}
            />
            <div className='btn' onClick={handleUploadFileButton}>
                Click to upload file
            </div>
            <span id='upload-file-name' className='hidden'></span>
            <div className='hidden'>
                <input name="document" type="file" onChange={handleChangeUploadedFile}/>
            </div>
            <hr/>
            <button type='submit' className='btn'>Submit</button>
        </form>
            <Alert
                type={alert.type}
                title={alert.title}
                messages={alert.messages}
            />
        </>
    );
}
