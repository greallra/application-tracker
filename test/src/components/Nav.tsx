import { useNavigate } from "react-router-dom";

const container = {
    display: 'flex',
    justifyContent: 'space-evenly'
}

export default function () {
    const navigate = useNavigate();
    return (
        <div style={container} className="nav-cont">
            <div onClick={() => navigate('/exchanges')}> Exchanges</div>
            <div onClick={() => navigate('/profile')}>Profile</div>
            <div onClick={() => navigate('/settings')}>Settings</div>
        </div>
    )
}