import './Header.css';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { Outlet, Link } from "react-router-dom";



export default function Header() {
    const helmetContext = {};
    return (
       <HelmetProvider context={helmetContext}>

        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PassionIT</title>
          <meta name="description" content="Digital solutions, guided by innovation, with a passion for IT" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Helmet>

        <div id='#header'>
            <header>
                <div>
                    <img/>
                </div>
                <div>
                    <Link to={'/Inbox'}>
                        <button id="b_profile_sideMenu" className="IconBtn">
                            <i id="ic_mail" className="material-icons large">mail</i>
                        </button>
                    </Link>

                    <button id="b_profile_sideMenu" className="IconBtn">
                        <i id="ic_settings" className="material-icons large">settings</i>
                    </button>
                </div>
            </header>
        </div>
       </HelmetProvider>
    )
}