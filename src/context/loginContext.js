import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';


const API = process.env.API_URL || 'https://lab32-401.herokuapp.com';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            login: this.login,
            logout: this.logout,
            sigup: this.signup,
            user: {},
        }
    }

    signup = async (username, password, email, role) => {
        
        try {
            const results = await fetch(`${API}/signup`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({ username, password, email, role })
            });
            let res = await results.json();
            this.validateToken(res.token);
        } catch (ex) {
            console.log('ERROR SIGNUP');
            
        }
    }


    login = async (username, password) => {

        try {
            const results = await fetch(`${API}/signin`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: new Headers({
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
                })
            });
            let res = await results.json();
            this.validateToken(res.token);
        } catch (ex) {
            console.log('ERROR SIGNIN');

        }
    }

    logout = () => {
        this.setLoginState(false, null, {});
    }

    validateToken = token => {

        try {
            let user = jwt.verify(token, 'supersecret');
            this.setLoginState(true, token, user);

        } catch (ex) {
            this.logout();
            console.log("token Validation error")
        }
    }

    setLoginState = (loggedIn, token, user) => {
        cookie.save('auth', token);
        this.setState({ loggedIn, user, token });
    }

    componentDidMount() {
        const cookieToken = cookie.load('auth');
        const token = cookieToken || null;
        this.validateToken(token);
    }

    render() {
        return (
            <LoginContext.Provider value={this.state}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginProvider;