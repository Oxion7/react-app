// Login.jsx
import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {connect, ConnectedProps} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/auth-reducer";
import styles from "./../common/FormsControls/FormsControls.module.css";
import {RootState} from "../../redux/redux-store";

type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
}
type LoginFormPropsType = {
    onSubmit: (values: LoginFormValuesType) => void;
    error: string | null;
}
type LoginPropsType = ConnectedProps<typeof connector>
const LoginForm: React.FC<LoginFormPropsType> = ({onSubmit, error}) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.formControl}>
                <input
                    className={`${styles.formInput} ${
                        formik.touched.email && formik.errors.email ? styles.error : ''
                    }`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className={styles.error}>{formik.errors.email}</span>
                ) : null}
            </div>

            <div className={styles.formControl}>
                <input
                    className={`${styles.formInput} ${
                        formik.touched.password && formik.errors.password ? styles.error : ''
                    }`}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <span className={styles.error}>{formik.errors.password}</span>
                ) : null}
            </div>

            <div className={styles.checkboxContainer}>
                <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    className={styles.checkboxInput}
                />
                <label htmlFor="rememberMe">remember me</label>
            </div>

            {error && (
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            )}

            <div>
                <button type="submit" className={styles.submitButton}>
                    Login
                </button>
            </div>
        </form>
    );
};

const Login: React.FC<LoginPropsType> = (props) => {
    const navigate = useNavigate();
    const handleSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    React.useEffect(() => {
        if (props.isAuth) {
            navigate("/profile");
        }
    }, [props.isAuth, navigate]);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Login</h1>
                <LoginForm onSubmit={handleSubmit} error={props.error}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error
});
const connector = connect(mapStateToProps, {login});
export default connector(Login);
