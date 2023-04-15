import React, { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, authenticateAccountStatus, firestore } from './server/FirebaseConfig.js';

//libraries
import QRCode from "react-qr-code";

import AlertBox from './widgets/AlertBox';
import FileListItem from './widgets/FileListItem.js';
import './Profile.css';
import './index.css';

function Profile() {
    const emailMaxLength = 320;
    const passwordMaxLength = 100;
    const pageSize = 6;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [abIsInUse, setAbIsInUse] = useState(false);
    const [user, setUser] = useState(sessionStorage.getItem('UID'));
    const [sortValue, setSortValue] = useState("date_newest");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    authenticateAccountStatus();

    useEffect(() => {
        if (searchQuery !== '') {
            firestore.collection('Files')
            .where('title', '>=', searchQuery)
            .where('title', '<=', searchQuery + '\uf8ff')
            .get()
            .then((snapshot) => {
                const results = snapshot.docs.map((doc) => doc.data());
                setSearchResults(results);
            });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    //Profile
    function handleSearchKeyUp(event) {
        const query = event.target.value.trim();
        setSearchQuery(query);
    }

    function handleCopyClick() {
        var currentLocation = window.location.toString();
        navigator.clipboard.writeText(currentLocation).then(() => {
            alert("successfully copied");
        }).catch(() => {
            alert("something went wrong");
        });
    }

    function handleSearchKeyUp() {
        
    }

    function handleSortChange(e) {
        setSortValue(e.target.value);
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
            alert('Password must be > 8 characters, contain one special character, and contain both letters and numbers.');
        } else if (email.trim().length > emailMaxLength || password.trim().length > passwordMaxLength) {
            alert('Email must be < 320. Password must be < 100')
        } else {
            fetchSignInMethodsForEmail(auth, email).then((signInMethods) => {
                if (signInMethods.length > 0) {
                    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                        setUser(userCredential.user);
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("Sorry an error occurred");
                        console.log(errorMessage);
                    });
                } else {
                    setAbIsInUse(true);
                }
            })
            .catch((error) => {
                alert("Sorry an error occurred");
                console.log(error);
            });
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
            {user &&
                <div>
                    <div id='div_profile_top' className='divMainStylized'>
                        <QRCode size={200} value={window.location.toString()}/>
                        <button className='BtnSubmit' onClick={handleCopyClick} style={{marginTop: "1%"}}>Copy</button>
                    </div>

                    <div id='divProfileHeader' className='divMainStylized'>
                        <form>
                            <input type="search" onKeyUp={handleSearchKeyUp} placeholder='Search files here...' />
                            <input type="reset" value="X" alt="Clear the search form"/>
                        </form>
                        <select id='dl_profile_sortFiles' value={sortValue} onChange={handleSortChange}>
                            <option value="date_newest">Date (recent)</option>
                            <option value="date_oldest">Date (oldest)</option>
                            <option value="popularity_most">Popularity (most)</option>
                            <option value="popularity_least">Popularity (least)</option>
                            <option value="size_largest">Size (largest)</option>
                            <option value="size_smallest">Size (smallest)</option>
                            <option value="title_az">Title (A-Z)</option>
                            <option value="title_za">Title (Z-A)</option>
                        </select>
                    </div>

                    <div id='div_profile_content'>
                        <ul id='ul_profile_content' className='contentGrid'>
                            {searchResults.map((result) => (
                                <FileListItem
                                    fileURL={result.fileLocation}
                                    title={result.title}
                                    description={result.description}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            }


            {!user && <form id='form_body' onSubmit={handleSubmit}>
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
                    <input className='inputLoginOrSignUp' type="password" id="input_password" value={password} onChange={handlePasswordChange} />
                </div>
                <button id='b_submit' onClick={handleSubmit} className='BtnSubmit' type='submit'>Submit</button>
            </form>}
        </div>
    )
}

export default Profile;