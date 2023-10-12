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

        // @ts-ignore
        dispatch(getUserDocumentsAction(token, nextPage));
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
                        className={i === 0 ? 'active' : ''}
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
