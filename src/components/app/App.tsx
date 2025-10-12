import React, {Suspense} from 'react';
import './css/App.css';
import Navbar from '../Navbar/Navbar';
import {HashRouter, Route, Routes} from "react-router-dom";
import UsersContainer from "../Users/UsersContainer/UsersContainer";
import HeaderContainer from "../Header/HeaderContainer/HeaderContainer";
import LoginPage from "../Login/Login";
import {connect, ConnectedProps} from "react-redux";
import {initializeApp} from "../../redux/app/app-reducer";
import {RootState} from "../../redux/store/redux-store";
import Preloader from "../common/Preloader/Preloader";

const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer/DialogsContainer"));

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <HashRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route
                                path='/dialogs/*'
                                element={
                                    <Suspense fallback={<Preloader/>}>
                                        <DialogsContainer/>
                                    </Suspense>
                                }
                            />
                            <Route
                                path='/profile/:userId?'
                                element={
                                    <Suspense fallback={<Preloader/>}>
                                        <ProfileContainer/>
                                    </Suspense>
                                }
                            />
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/' element={<ProfileContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.initialized
});

const connector = connect(mapStateToProps, {initializeApp});
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
