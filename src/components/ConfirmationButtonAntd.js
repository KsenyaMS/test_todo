import { Button } from 'antd';

const ConfirmationButtonAntd = ({key, value, onClick}) => {
    return (
        <Button
            key={key}
            onClick={onClick}
            style={{borderRadius: 15, background: "#435ebf", color: "#FFFFFF", margin: 5, marginBottom: 10}}
        >
            {value}
        </Button>
    );
}
export default ConfirmationButtonAntd;