import ActionButton from "./ActionButton";
import {TagType} from "../redux/constants/appStateTypes";
import Tag from "./Tag";

export default function TableRow(props: {name: string, tags: TagType[]}) {
    const {name, tags} = props;

    return (
        <tr>
            <td>{ name }</td>
            <td>
                <div className="tags">
                    {tags.map((tag: TagType) => (
                        <Tag
                            key={ tag.id }
                            name={ tag.name }
                        />
                    ))}
                </div>
            </td>
            <td>
                <ActionButton type='edit'></ActionButton>
                <ActionButton type='download'></ActionButton>
                <ActionButton type='remove'></ActionButton>
            </td>
        </tr>
    );
}
