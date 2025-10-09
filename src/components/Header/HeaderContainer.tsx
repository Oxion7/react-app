import React from 'react';
import Header from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {logout} from "../../redux/auth/auth-reducer";
import {RootState} from "../../redux/store/redux-store";

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


const connector = connect(mapStateToProps, {logout});
type HeaderContainerPropsType = ConnectedProps<typeof connector>;

const HeaderContainer: React.FC<HeaderContainerPropsType> = (props) => {
    return <Header {...props} />
}

export default connector(HeaderContainer);
