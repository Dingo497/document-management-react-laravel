import ActionButton from "./ActionButton";
import {TagType} from "../redux/constants/appStateTypes";
import Tag from "./Tag";

export default function TableRow(props: {documentID: string, name: string, tags: TagType[]}) {
    const {documentID, name, tags} = props;

    return (
        <tr>
            <td>{ name }</td>
            <td>
                <div className="tags">
                    {tags.map((tag: TagType) => (
                        <Tag
                            key={ tag.id }
                            tagID={ tag.id }
                            name={ tag.name }
                        />
                    ))}
                </div>
            </td>
            <td>
                <ActionButton documentID={documentID} type='edit'/>
                <ActionButton documentID={documentID} type='download'/>
                <ActionButton documentID={documentID} type='remove'/>
            </td>
        </tr>
    );
}
