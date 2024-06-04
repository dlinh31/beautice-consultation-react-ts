import { useNavigate } from "react-router-dom"

const Logout =() => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token')


}

export default Logout