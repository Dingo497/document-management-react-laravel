import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {alertDataType} from "../types/globalTypes";


/**
 * @param type
 * @param title
 * @param messages - Konkretne hlasky pre Alert. Avsak je to zatial prisposobene len nato, co mi pride z backendu
 */
export default function Alert({type, title, messages}: alertDataType) {
    const alert = document.getElementById('alert');
    const [arrayMessages, setArrayMessages] = useState([]);

    // Sluzi na zobrazenie chybovych hlasok z backendu
    useEffect(() => {
        if (type && title && messages) {
            alert.classList.remove('hide');
            alert.classList.add('show');
            const updatedMessages = [];

            // @ts-ignore cosi ze nepozna Object.values...
            Object.values(messages).forEach(arrayMessage => {
                arrayMessage.forEach(message => {
                    updatedMessages.push(message);
                })
            });

            setArrayMessages(updatedMessages);
        }
    }, [type, title, messages]);

    const closeAlert = () => {
        alert.classList.remove('show');
        alert.classList.add('hide');
    }

    return (
        <>
            <div id='alert' className={'alert alert-' + type}>
                <h3 className="alert-title">{title}</h3>
                {arrayMessages.map((msg, index) => (
                    <p key={index} className="alert-content">- {msg}</p>
                ))}
                <AiOutlineClose className='alert-close' onClick={closeAlert}/>
            </div>
        </>
    )
}
