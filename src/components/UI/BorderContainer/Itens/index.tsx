import { HTMLAttributes } from 'react';
import styles from './index.module.css';

interface ItensProps extends HTMLAttributes<HTMLDivElement> {
    field: string
    value: string | number
}

const Itens = ({ field, value, ...rest }: ItensProps) => {
    return (
        <div className={ `${styles['item-row']} ${rest.className}` }>
            <p className={ styles.field }>{ field }:</p>
            <p className={ styles.value }>{ value }</p>
        </div>       
    )
}

export default Itens;