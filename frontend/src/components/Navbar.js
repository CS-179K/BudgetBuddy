import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className = "container">
                <Link to = "/">
                    <h1> Budget Buddy </h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick = {handleClick}>
                                Log Out
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <div className="jumbotron text-center text-primary">
                                <a href="https://github.com/login/oauth/authorize?client_id=<%= client_id %>"
                               className="btn btn-danger"><span className="fa fa-github"></span> Github Login</a>
                            </div>
                            {/*<a href="/github/login">Login With Github</a>*/}
                            {/*<Link to = "/github/login">Login With Github</Link>*/}
                            <Link to = "/login">Login</Link>
                            <Link to = "/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar