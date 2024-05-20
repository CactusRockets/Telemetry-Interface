import styles from './index.module.css';
import Itens from '../Itens';
import { HTMLAttributes, ReactElement } from 'react';

type ItensType = typeof Itens;

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    title: string
    children: ReactElement<ItensType> | Array<ReactElement<ItensType>>;
}

const Container = ({ title, children, ...rest }: ContainerProps) => {
    return (
        <div className={ `${styles['border-container']} ${rest.className}` } >
            <h3 className={ styles['title'] }>{ title }</h3>
            { children }
        </div>
    )
}

export default Container;