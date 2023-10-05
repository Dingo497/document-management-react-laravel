import '../../css/components/DocumentForm.scss';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserTagsAction} from "../redux/actions/tagActions";
import {AppStateTypes, TagType} from "../redux/constants/appStateTypes";
import {documentFormDataType} from "../types/document/documentTypes";
import {createUserDocumentAction} from "../redux/actions/documentActions";
import {useNavigate} from "react-router-dom";


export default function DocumentForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const tags = useSelector((state: AppStateTypes) => state.tag.tags);
    const [formData, setFormData] = useState<documentFormDataType>({
       name: '',
       tags: [],
       image: null
    });
    const [stringTags, setStringTags] = useState<string[]>([]);

    useEffect(() => {
        // @ts-ignore
        dispatch(getUserTagsAction(token));
    }, []);

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            setStringTags([...stringTags, e.target.nextElementSibling.innerText]);
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: [...formData.tags, e.target.value]
            }));
        } else {
            setStringTags(stringTags.filter(tag => tag !== e.target.nextElementSibling.innerText));
            setFormData(prevFormData => ({
                ...prevFormData,
                tags: formData.tags.filter(tagID => tagID !== e.target.value)
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
                createNewDocument();
            } else {
                // TODO chybu vypisat ze len pdf
            }
        } else {
            // TODO chybu vypisat ze neni file
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
