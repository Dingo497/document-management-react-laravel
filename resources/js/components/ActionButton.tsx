import '../../css/components/ActionButtonComponent.scss';
import { ButtonProps } from "../types/components/ActionButton";
import {AiOutlineDownload, AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";

export default function ActionButton({type}: ButtonProps) {
    const icon = () => {
        if (type === 'edit') {
            return <AiOutlineEdit />;
        } else if (type === 'download') {
            return <AiOutlineDownload />;
        } else {
            return <AiOutlineDelete />;
        }
    }

    return (
        <button
            className={'action-button action-button-' + type}
        >
            { icon() }
        </button>
    )
}
