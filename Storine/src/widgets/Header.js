import './Header.css';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';



export default function Header() {
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById('header').style.visibility = "hidden";
    }
    
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById('header').style.visibility = "visible";
    }

    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

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
                    <button id="b_profile_sideMenu" onClick={openNav} className="IconBtn">
                        <i id="ic_mail" className="material-icons large">mail</i>
                    </button>
                </div>
            </header>
        </div>
       </HelmetProvider>
    )
}