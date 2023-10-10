import '../../css/components/DocumentForm.scss';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserTagsAction} from "../redux/actions/tagActions";
import {
    AppStateTypes,
    Document,
    TagType
} from "../redux/constants/appStateTypes";
import {createUserDocumentAction, editUserDocumentAction} from "../redux/actions/documentActions";
import {useNavigate} from "react-router-dom";
import {documentFormDataType} from "../types/document/documentTypes";


export default function DocumentForm(props: {editDocument :Document|null}) {
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

    useEffect(() => {
        if (editDocument) {
            setFormData({
                name: editDocument.name,
                tags: editDocument.tags.map(tag => parseInt(tag.id)),
                image: null
            });
            setStringTags(editDocument.tags.map(tag => tag.name));
        }
        // @ts-ignore
        dispatch(getUserTagsAction(token));
    }, []);

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            setStringTags([...stringTags, e.target.nextElementSibling.innerText]);
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: [...formData.tags, parseInt(e.target.value)]
            }));
        } else {
            setStringTags(stringTags.filter(tag => tag !== e.target.nextElementSibling.innerText));
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: formData.tags.filter(tagID => tagID !== parseInt(e.target.value))
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
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (
                formData.image.type === 'application/pdf'
                ||
                formData.image.size <= maxSizeInBytes
            ) {
                if (editDocument) {
                    editCurrentDocument();
                } else {
                    createNewDocument();
                }
            } else {
                // TODO chybu vypisat ze len pdf
            }
        } else {
            if (editDocument) {
                // lebo pre edit to nieje povinne potom prepisat
                editCurrentDocument();
            } else {
                // TODO chybu vypisat ze neni file
            }
        }
    }

    // @ts-ignore
    const createNewDocument = async () => {
        // @ts-ignore
        const response = await dispatch(createUserDocumentAction(token, formData));
        if (response) {
            navigate('/dashboard');
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
        if (response) {
            navigate('/dashboard');
        }
    }

    return (
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
            <div className='document-checkboxes'>
                {tags?.map((tag: TagType) => (
                    <div key={tag.id} className='documment-checkbox'>
                        <input
                            type='checkbox'
                            value={tag.id}
                            // @ts-ignore includes nemozna ci co...
                            checked={formData.tags.includes(tag.id)}
                            onChange={handleChangeCheckbox}
                        />
                        <label>{tag.name}</label>
                    </div>
                ))}
            </div>
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
    );
}
