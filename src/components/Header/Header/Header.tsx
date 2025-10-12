import React from 'react';
import s from './css/Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderProps} from "./types/Header";

const Header: React.FC<HeaderProps> = (props) => {
    const getUserInitials = (login: string | null): string => {
        return login ? login.charAt(0).toUpperCase() : 'U';
    };

    return (
        <header className={s.header}>
            <NavLink to="/profile" className={s.logo}>
                <img
                    src='https://www.freelogodesign.org/Content/img/logo-ex-7.png'
                    alt="Social Network Logo"
                    className={s.logoImage}
                />
                <span className={s.logoText}>SocialNetwork</span>
            </NavLink>

            <div className={s.loginBlock}>
                {props.isAuth ? (
                    <div className={s.userMenu}>
                        <div className={s.userInfo}>
                            <div className={s.userWelcome}>
                                <div className={s.userAvatar}>
                                    {getUserInitials(props.login)}
                                </div>
                                <span className={s.userName}>Hello, {props.login}!</span>
                            </div>
                            <button
                                onClick={props.logout}
                                className={s.logoutButton}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <NavLink to={'/login'} className={s.loginLink}>
                        Sign In
                    </NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;
