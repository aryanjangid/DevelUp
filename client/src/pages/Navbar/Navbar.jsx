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

    }, [])
    return (
        <>
            <Nav style={{
                backgroundImage: `url(${background})`, height: "fitContent"
            }}>
                <NavLink to='/'>
                    <img style={{ width: "3rem", height: "3rem" }} src={logo} alt='logo' />
                    <h1 style={{ marginBottom: "2rem", margin: "auto", marginLeft: "1rem" }}>DevelUp</h1>

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
                    <NavLink to='/register' activeStyle>
                        Register Now
                    </NavLink>
                    <NavLink to='/profile' activeStyle>
                        Profile
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/login'>Login</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;