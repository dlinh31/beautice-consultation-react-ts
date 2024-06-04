import { useNavigate } from "react-router-dom"

const Logout =() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');


}

export default Logout