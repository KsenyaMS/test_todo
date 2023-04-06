import { Button } from 'antd';

const CancelButtonAntd = ({key, value, onClick}) => {
    return (
        <Button
            key={key}
            onClick={onClick}
            style={{borderRadius: 15, background: "#F4F4F9", borderColor: "#435ebf", color: "#435ebf", margin: 5, marginBottom: 10}}
        >
        {value}
        </Button>
    );
}
export default CancelButtonAntd;