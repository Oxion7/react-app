import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profileReducer from "../profile/profile-reducer";
import dialogsReducer from "../dialogs/dialogs-reducer";
import usersReducer from "../users/users-reducer";
import authReducer from "../auth/auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "../app/app-reducer";

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
