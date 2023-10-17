export default function Tag(props: {name: string, tagID: string}) {
    const {name, tagID} = props

    return (
        <div className='tag' id={tagID}>
            { name }
        </div>
    );
}
