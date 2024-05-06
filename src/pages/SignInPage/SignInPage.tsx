import SignInForm from './SignInForm/SignInForm';
import './SignInPage.scss';

const SignInPage = () => {
    return (
        <section className="signin">
            <div className="container">
                <h2 className="signin__title">Реєстрація нового користувача</h2>
                <SignInForm />
            </div>
        </section>
    );
};

export default SignInPage;
