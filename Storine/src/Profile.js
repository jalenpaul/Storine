import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './server/FirebaseConfig';
import AlertBox from './widgets/AlertBox';

import './Profile.css';
import './index.css';

function Profile() {
    const emailMaxLength = 320;
    const passwordMaxLength = 100;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [abIsInUse, setAbIsInUse] = useState(false);
    const [user, setUser] = useState(undefined);

    //Profile
    function handleSearchKeyUp() {

    }

    //Login Or Sign Up
    function handleABYesClick() {
        setAbIsInUse(false);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    function handleEmailChange(event) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            alert('Email or password is empty');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email');
        } else if (!validatePassword(password)) {
            alert('Password must be > 8 characters, contain one specil character, and contain both letters and numbers.');
        } else if (email.trim().length > emailMaxLength || password.trim().length > passwordMaxLength) {
            alert('Email must be < 320. Password must be < 100')
        } else {
            const emailExists = auth().getUserByEmail(email).then(() => true).catch(() => false);
            if (emailExists) {
                signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    setUser(userCredential.user);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });

            } else {
                setAbIsInUse(true);
            }
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .toLowerCase()
            .match(
                /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
            );
    };

    return (
        <div>
            {!user &&
                <div>
                    <div id='divProfileHeader'>
                        <input type="search" onKeyUp={handleSearchKeyUp} placeholder='Search files here...' />
                        <datalist id='dl_profile_sortFiles'>
                            <option value="date_newest">Date (recent)</option>
                            <option value="date_oldest">Date (oldest)</option>
                            <option value="popularity_most">Popularity (most)</option>
                            <option value="popularity_least">Popularity (least)</option>
                            <option value="size_largest">Size (largest)</option>
                            <option value="size_smallest">Size (smallest)</option>
                            <option value="title_az">Title (A-Z)</option>
                            <option value="title_za">Title (Z-A)</option>
                        </datalist>
                    </div>
                </div>
            }


            {user && <form id='form_body' onSubmit={handleSubmit}>
                <h1>Login Or Sign Up</h1>
                <h3>Enter an email and password to login, if no account exists you can sign up.</h3>
                <AlertBox
                    message="An account doesn't exist with this email, sign up with this information?"
                    yesClick={handleABYesClick}
                    isInUse={abIsInUse}
                />
                <div className='divTextInputs'>
                    <label htmlFor="input_email">Email</label>
                    <input className='inputLoginOrSignUp' type="text" id="input_email" value={email} onChange={handleEmailChange} />
                </div>
                <div className='divTextInputs'>
                    <label htmlFor="input_password">Password</label>
                    <input className='inputLoginOrSignUp' type="text" id="input_password" value={password} onChange={handlePasswordChange} />
                </div>
                <button id='b_submit' onClick={handleSubmit} className='BtnSubmit' type='submit'>Submit</button>
            </form>}
        </div>
    )
}

export default Profile;