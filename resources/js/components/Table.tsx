import '../../css/components/TableComponent.scss';
import {useSelector} from "react-redux";
import {AppStateTypes, Document} from "../redux/constants/appStateTypes";
import TableRow from "./TableRow";

export default function Table() {

    const documents = useSelector((state: AppStateTypes) => state.document.documents);

    return (
        <table>
            <thead>
                <tr>
                    <th className='document-title'>Document title</th>
                    <th className='document-tags'>Tags</th>
                    <th className='document-actions'>Actions</th>
                </tr>
            </thead>
            <tbody>
            {documents?.map((document: Document) => (
                <TableRow
                    key={ document.id }
                    name={ document.name }
                    tags={ document.tags ?? [] }
                />
            ))}
            </tbody>
        </table>
    )
}
