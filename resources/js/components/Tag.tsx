
/**
 * Sluzi na zobrazenie tagu priradeny pre dokument. Cize v tabulke dokumentov
 */
export default function Tag(props: {name: string, tagID: string}) {
    const {name, tagID} = props

    return (
        <div className='tag' id={'table-tag-' + tagID}>
            { name }
        </div>
    );
}
