import { useEffect, useRef } from 'react';
import styles from './index.module.css';

interface BorderBoxProps {
    title: string
    value: string | number
}

const BorderBox = ({ title, value }: BorderBoxProps) => {
    const titleElement = useRef<HTMLHRElement>(null);
    const boxElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(titleElement.current && boxElement.current) {
            const titleWidth = titleElement.current.offsetWidth;
            console.log(titleWidth);
            
            boxElement.current.style.minWidth = `${titleWidth+40}px`;
        }
    }, [titleElement, boxElement])

    return (
        <div ref={boxElement} className={styles["box-container"]}>
            <h3 ref={titleElement} className={ styles.title }>{ title }</h3>
            <p className={ styles.value }>{ value }</p>
        </div>
    )
}

export default BorderBox;