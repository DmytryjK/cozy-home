import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useFormik, FormikErrors } from 'formik';
import { EmailInput } from '../../../shared-components/FormComponents/Inputs';
import formValidation from '../../../utils/formValidation';
import './ContactUs.scss';

type FormValues = {
    [key: string]: string | boolean;
    email: string;
};

const ContactUs = ({ offset }: { offset: string }) => {
    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
        hidden: { opacity: 0, y: 50 },
    };
    const formikContactUs = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = ['email'];

            validationFields.forEach((fieldName: string) => {
                if (typeof values[fieldName] === 'boolean') return;
                const error = formValidation(
                    fieldName,
                    values[fieldName] as string,
                    false
                );
                if (error) {
                    errors[fieldName] = error;
                }
            });

            return errors;
        },
        onSubmit: (values) => {
            if (values.email) {
                alert(JSON.stringify(values, null, 2));
            }
        },
    });
    return (
        <section className="contact-us">
            <div className="container">
                <LazyMotion features={domAnimation} strict>
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="contact-us__wrapper"
                    >
                        <h2 className="contact-us__title about-title">
                            Зв'яжіться з нами
                        </h2>
                        <p className="contact-us__descr about-descr">
                            Ми завжди готові допомогти вам зробити вашу оселю ще
                            зручнішою та красивішою. Зв'яжіться з нами для
                            консультації, замовлення або будь-яких питань.
                            Робіть свій дім комфортним разом з нами!
                        </p>
                        <form
                            className="contact-us__form contact-form"
                            onSubmit={formikContactUs.handleSubmit}
                        >
                            <EmailInput
                                formik={formikContactUs}
                                required={false}
                                isLabelShow={false}
                            />
                            <button
                                className="contact-form__btn"
                                type="submit"
                                aria-label="відправити пошту"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.1753 7.19887L21.7437 11.5199C22.0854 11.785 22.0854 12.215 21.7437 12.4801L16.1753 16.8011C15.8335 17.0663 15.2795 17.0663 14.9378 16.8011C14.5961 16.536 14.5961 16.1061 14.9378 15.8409L19.0126 12.679L1 12.679L1 11.321L19.0126 11.321L14.9378 8.15909C14.5961 7.89394 14.5961 7.46403 14.9378 7.19887C15.2795 6.93371 15.8335 6.93371 16.1753 7.19887Z"
                                        fill="#FFFFFE"
                                    />
                                </svg>
                            </button>
                        </form>
                    </m.div>
                </LazyMotion>
            </div>
        </section>
    );
};

export default ContactUs;
