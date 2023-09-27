import '../../css/components/TableComponent.scss';
import ActionButton from "./ActionButton";

export default function Table() {

    // @ts-ignore
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
                <tr>
                    <td>Nazov suboru 1</td>
                    <td>[pdf] [doc]</td>
                    <td>
                        <ActionButton type='edit'></ActionButton>
                        <ActionButton type='download'></ActionButton>
                        <ActionButton type='remove'></ActionButton>
                    </td>
                </tr>
                <tr>
                    <td>Nazov suboru 1</td>
                    <td>[pdf] [doc]</td>
                    <td>[edit] [download] [remove]</td>
                </tr>
                <tr>
                    <td>Nazov suboru 1</td>
                    <td>[pdf] [doc]</td>
                    <td>[edit] [download] [remove]</td>
                </tr>
                <tr>
                    <td>Nazov suboru 1</td>
                    <td>[pdf] [doc]</td>
                    <td>[edit] [download] [remove]</td>
                </tr>
            </tbody>
        </table>
    )
}
