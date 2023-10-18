import { TagType } from "../types/globalTypes";


/**
 * Sluzi na zobrazenie listu vsetkych tagov. Nachadza sa napr pri vytvarani/uprave dokumentu
 * alebo pri filtrovani dokumentov
 */
export default function TagList(props: {tags: TagType[], checkedTags: number[]|null, onChangeCheckbox}) {
    const {tags, checkedTags, onChangeCheckbox} = props;

    return (
        <div className='document-checkboxes'>
            {tags?.map((tag: TagType) => (
                <div key={tag.id} className='documment-checkbox'>
                    <input
                        id={'tag-list-' + tag.id}
                        type='checkbox'
                        value={tag.id}
                        // @ts-ignore nevie co je includes
                        checked={checkedTags?.includes(tag.id)}
                        onChange={(e) => onChangeCheckbox(e.target.value, e.target.checked, e)}
                    />
                    <label>{tag.name}</label>
                </div>
            ))}
        </div>
    )
}
