import React, { useEffect, useState } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';
import logo from '../../Assets/logo.png'
import background from '../../Assets/chatsbackground.png'
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import classes from './navbar.module.css'

const Navbar = () => {
    const [login, setLogin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('email')) setLogin(true)
    }, [])
    return (
        <>
            <Nav style={{
                backgroundImage: `url(${background})`, height: "fitContent", position: "fixed", width: "100wh"
            }}>
                <NavLink to='/'>
                    <img style={{ width: "3rem", height: "3rem" }} src={logo} alt='logo' />
                    <h1 style={{ marginBottom: "2rem", margin: "auto", marginLeft: "1rem",color: "white" }}>DevelUp</h1>

                </NavLink>
                <Bars />
                <NavMenu>
                    {/* <NavLink to='/' activeStyle>
                        <div className={classes.navLinks}>
                            Rooms
                        </div>
                    </NavLink> */}
                    <NavLink to='/search' activeStyle>
                        Skill Search
                    </NavLink>
                    <NavLink to='/studygroups' activeStyle>
                        Study Groups
                    </NavLink>
                    {!login && <NavLink to='/register' activeStyle>
                        Register Now
                    </NavLink>}
                    {login && <NavLink to={`/profile/${localStorage.getItem('user')}/${localStorage.getItem('email')}`} activeStyle>
                        Profile
                    </NavLink>}
                    {/* Second Nav */}
                    {!login ? <NavBtnLink to='/login'>Sign In</NavBtnLink> : <NavBtnLink to='/login' onClick={() => localStorage.clear()}>logout</NavBtnLink>}
                </NavMenu>
                <NavBtn>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;