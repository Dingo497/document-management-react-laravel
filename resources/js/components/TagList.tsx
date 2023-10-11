import '../../css/components/TagListComponent.scss';
import {TagType} from "../redux/constants/appStateTypes";

export default function TagList(props: {tags: TagType[], checkedTags: number[]|null, onChangeCheckbox}) {
    const {tags, checkedTags, onChangeCheckbox} = props;

    return (
        <div className='document-checkboxes'>
            {tags?.map((tag: TagType) => (
                <div key={tag.id} className='documment-checkbox'>
                    <input
                        type='checkbox'
                        value={tag.id}
                        // @ts-ignore includes nemozna ci co...
                        checked={checkedTags?.includes(tag.id)}
                        onChange={onChangeCheckbox}
                    />
                    <label>{tag.name}</label>
                </div>
            ))}
        </div>
    )
}
