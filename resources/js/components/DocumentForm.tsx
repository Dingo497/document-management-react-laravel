import '../../css/components/DocumentForm.scss';
import {useState} from "react";
import {documentFormDataType} from "../types/document/documentTypes";


export default function DocumentForm() {
    const [formData, setFormData] = useState<documentFormDataType>({
       name: '',
       tags: [],
       image: null
    });
    const [stringTags, setStringTags] = useState<string[]>([]);

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
                <div className='documment-checkbox'>
                    <input type='checkbox' value='1' onChange={handleChangeCheckbox}/>
                    <label>tag1</label>
                </div>
                <div className='documment-checkbox'>
                    <input type='checkbox' value='2' onChange={handleChangeCheckbox}/>
                    <label>tag2</label>
                </div>
                <div className='documment-checkbox'>
                    <input type='checkbox' value='3' onChange={handleChangeCheckbox}/>
                    <label>tag3</label>
                </div>
                <div className='documment-checkbox'>
                    <input type='checkbox' value='4' onChange={handleChangeCheckbox}/>
                    <label>tag4</label>
                </div>
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
