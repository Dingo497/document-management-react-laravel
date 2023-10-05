import '../../css/components/TagComponent.scss';

export default function Tag(props: {name: string}) {
    const {name} = props

    return (
        <div className='tag'>
            { name }
        </div>
    );
}
