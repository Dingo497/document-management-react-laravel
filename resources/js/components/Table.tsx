import '../../css/components/TableComponent.scss';
export default function Table() {

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
                <tr>
                    <td>Nazov suboru 1</td>
                    <td>[pdf] [doc]</td>
                    <td>[edit] [download] [remove]</td>
                </tr>
            </tbody>
        </table>
    )
}
