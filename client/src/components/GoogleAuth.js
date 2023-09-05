//import { gapi } from "gapi-script";
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { connect } from 'react-redux';
import { logIn, logOut } from '../actions';
import Cookies from 'js-cookie';

function GoogleAuth(props) {
    const [ user, setUser ] = useState([]);
    //const [ profile, setProfile ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                
                if(user.access_token !== null && user.access_token !== undefined){
                    Cookies.set('token', user.access_token)
                }
                
                if(Cookies.get('token') !== 'null'){
                    axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Cookies.get('token')}`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        //setProfile(res.data);
                        onLogin(res.data);
                        Cookies.set('isLoggedIn', 'true')
                    })
                    .catch((err) => console.log(err));
                }         
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        props.logOut();
        Cookies.set('token', null)
        Cookies.set('isLoggedIn', 'false')
        //setProfile(null);
    };

    const onLogin = (data) =>{
        if (data) {
            props.logIn(data.id);
        }
    }

    return (
        <div>
            {props.isLoggedIn ? (
                <div>
                    <button className='ui red google button' onClick={logOut}>
                        <i className="google icon" />
                        Log out
                    </button>
                </div>
            ) : (
                <button className='ui google button' onClick={() => login()}>
                    <i className="google icon" />
                    Sign in with Google 🚀 
                </button>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {isLoggedIn : state.auth.isLoggedIn}
}

export default connect(
    mapStateToProps, 
    {logIn, logOut}
    ) (GoogleAuth);