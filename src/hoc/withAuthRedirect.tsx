import React from "react";
import {Navigate} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";

type StateType = {
    auth: {
        isAuth: boolean;
    }
}

const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth
});

const connector = connect(mapStateToProps);
type AuthRedirectProps = ConnectedProps<typeof connector>;

export const withAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
    const RedirectComponent: React.FC<P & AuthRedirectProps> = (props) => {
        if (!props.isAuth) {
            return <Navigate to="/login" replace/>;
        }
        return <Component {...props} />;
    }

    return connector(RedirectComponent as any);
};
