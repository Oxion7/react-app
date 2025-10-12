type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
}
type LoginFormPropsType = {
    onSubmit: (values: LoginFormValuesType) => void;
    error: string | null;
}