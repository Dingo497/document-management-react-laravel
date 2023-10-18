import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserDocumentsAction} from "../redux/actions/documentActions";
import {getUserTagsAction} from "../redux/actions/tagActions";
import { AppStateTypes } from "../redux/constants/appStateTypes";
import {Document} from '../types/documentTypes';

import Header from "../components/Header";
import Table from "../components/Table";
import TagList from "../components/TagList";
import PaginationDocuments from "../components/PaginationDocuments";


export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const tags = useSelector((state: AppStateTypes) => state.tag.tags);
    const documents = useSelector((state: AppStateTypes) => state.document.documents);

    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documents);
    const [tagsToFilter, setTagsToFilter] = useState<number[]>([]);

    const selectedTags = JSON.parse(localStorage.getItem('selectedTags'));

    useEffect(() => {
        // @ts-ignore
        if (!documents[0].id) {
            // @ts-ignore
            dispatch(getUserDocumentsAction(token));
        }
        // @ts-ignore
        dispatch(getUserTagsAction(token));

        // Nastavenie filtrov po obnoveni stranky
        if (selectedTags) {
            selectedTags.forEach(tag => handleChangeCheckbox(tag, true));
        }
    }, []);

    useEffect(() => {
        setFilteredDocuments(documents);

        // Vzdy ked sa dokumnety zmenia tak znova nacitam filtre podla tagov, napriklad pri zmene strankovania
        if (selectedTags) {
            selectedTags.forEach(tag => handleChangeCheckbox(tag, true));
        }
    }, [documents]);

    const handleChangeCheckbox = (value, checked) => {
        if (checked) {
            filterDocuments(value, 'add');
        } else {
            filterDocuments(value, 'remove');
        }
    }

    // @ts-ignore
    const filterDocuments = async (value: string, type: 'add'|'remove') => {
        const localStorageSelectedTags = JSON.parse(localStorage.getItem('selectedTags'));
        let updatedTagsToFilter;

        let mergedTagsToFilter = tagsToFilter;
        if (localStorageSelectedTags) {
            mergedTagsToFilter = [...tagsToFilter, ...localStorageSelectedTags];
        }

        // Pridanie alebo odobratie filtra
        if (type === 'add') {
            updatedTagsToFilter = [
                ...mergedTagsToFilter,
                parseInt(value)
            ];
        } else {
            updatedTagsToFilter = mergedTagsToFilter.filter((tagId) => tagId !== parseInt(value));
        }

        // Vymazanie duplicitnych hodnot
        // @ts-ignore
        updatedTagsToFilter = Array.from(new Set(updatedTagsToFilter));

        // Nastavenie local storage a state
        localStorage.setItem('selectedTags', JSON.stringify(updatedTagsToFilter));
        await setTagsToFilter(updatedTagsToFilter);

        const filteredDocs = documents.filter((document) => {
            return updatedTagsToFilter.every((tagId) => {
                // @ts-ignore
                return document.tags.some((tag) => tag.id === tagId);
            });
        });
        setFilteredDocuments(filteredDocs);
    }

    return (
        <>
            <Header />
            <button
                className='create-new-document'
                onClick={() => navigate('/create-document')}
            >
                Create new document
            </button>
            <div className="filter-container">
                <TagList
                    tags={tags}
                    checkedTags={tagsToFilter}
                    onChangeCheckbox={handleChangeCheckbox}
                />
            </div>
            <div className='container'>
                <Table documents={filteredDocuments} />
            </div>
            <div className="container">
                <PaginationDocuments />
            </div>
        </>
    );
};

