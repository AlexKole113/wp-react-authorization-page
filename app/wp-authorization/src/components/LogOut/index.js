const LogOut = ({logout}) => {
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        logout();
    }

    return (
        <div>
            <a onClick={logoutHandler} href="#">log out</a>
        </div>
    )
}

export default LogOut;
