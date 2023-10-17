import '../../css/components/PaginationDocumentsComponent.scss';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateTypes} from "../redux/constants/appStateTypes";
import {getDocumentsPaginationAction, getUserDocumentsAction} from "../redux/actions/documentActions";

export default function PaginationDocuments() {
    const dispatch = useDispatch();

    const token = useSelector((state: AppStateTypes) => state.auth.token);
    const documentsPagination = useSelector((state: AppStateTypes) => state.document.documentsPagination);

    useEffect(() => {
        // @ts-ignore
        dispatch(getDocumentsPaginationAction(token));
    }, [])

    // Podla mna by funkcia mala robit len jednu vec a to nacitat dalsiu stranku strankovania alebo predchadzajucu
    // alebo nasledujucu. Avsak mi to prislo takto lepsie kedze by sa mi vela kodu opakovalo a stale to robi
    // prakticky jednu vec a to ze meni stranky dokumentov
    const handleChangePagination = (e, type?: 'next'|'previous') => {
        e.preventDefault();
        let nextPage = parseInt(e.target.innerText);
        const parentElement = e.target.parentElement.parentElement;
        const activeLink = parentElement.querySelector('a.active').innerText;
        const currentPage = parseInt(activeLink);
        let nextPageElement = e.target;

        if (type === 'next') {
            if (currentPage === documentsPagination) {
                return;
            }
            nextPage = currentPage + 1;
        } else if (type === 'previous') {
            if (currentPage === 1) {
                return;
            }
            nextPage = currentPage - 1;
        }

        // Vymazem predchadzajuci active na linku
        const links = parentElement.getElementsByTagName('a');
        for (const link of links) {
            link.classList.remove('active');
        }

        // Nastavim active na dalsi link
        nextPageElement = document.getElementById('page-' + nextPage);
        nextPageElement.classList.add('active');

        // Nastavenie aktualnej nastavenej dokument stranky - kvoli refresh webu
        localStorage.setItem('pagination', JSON.stringify(nextPage));

        // @ts-ignore
        dispatch(getUserDocumentsAction(token, nextPage));
    }

    const setDefaultActiveElement = (i: number): string => {
        let classActive = '';
        const currentPagination = JSON.parse(localStorage.getItem('pagination'));

        if (currentPagination) {
            if (i === (currentPagination - 1)) {
                classActive = 'active';
            }
        } else if (i === 0) {
            classActive = 'active';
        }
        return classActive;
    }

    return (
        <ul className="pagination">
            <li>
                <a
                    onClick={(e) => handleChangePagination(e, 'previous')}
                >
                    {'<'}
                </a>
            </li>
            {[...Array(documentsPagination)].map((x, i) =>
                <li key={i + 1}>
                    <a
                        id={'page-' + (i + 1)}
                        className={setDefaultActiveElement(i)}
                        onClick={handleChangePagination}
                    >
                        {i + 1}
                    </a>
                </li>
            )}
            <li>
                <a
                    onClick={(e) => handleChangePagination(e, 'next')}
                >
                    {'>'}
                </a>
            </li>
        </ul>
    );
}
