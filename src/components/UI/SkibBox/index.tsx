import styles from './index.module.css';
import skibOnIcon from '../../../assets/icons/lightbulb.svg';
import skibOffIcon from '../../../assets/icons/light_off.svg';

type SkibBoxProps = {
    text: string
    activated?: boolean
}

const SkibBox = ({ text, activated }: SkibBoxProps) => {
    return (
        <div className={ styles['box-container'] }>
            <img src={ activated ? skibOnIcon : skibOffIcon } alt="" />
            <span className={ activated ? styles.on : styles.off }>{ text }</span>
        </div>
    )
}

export default SkibBox