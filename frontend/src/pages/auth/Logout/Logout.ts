const Logout =() => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token')


}

export default Logout