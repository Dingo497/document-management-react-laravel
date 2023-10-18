import { DocumentType } from "../types/documentTypes";
import TableRow from "./TableRow";


export default function Table(props: {documents: DocumentType[]}) {
    const {documents} = props;

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
            {documents?.map((document: DocumentType) => (
                <TableRow
                    key={ document.id }
                    documentID={ document.id }
                    name={ document.name }
                    tags={ document.tags ?? [] }
                />
            ))}
            </tbody>
        </table>
    )
}
