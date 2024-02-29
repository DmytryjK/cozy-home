import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFoundPage.scss';

const NotFoundPage = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.3,
                    delay: 0.2,
                },
            }}
            className="not-found"
        >
            <div className="flex-container">
                <div className="text-center">
                    <h1>
                        <span className="fade-in" id="digit1">
                            4
                        </span>
                        <span className="fade-in" id="digit2">
                            0
                        </span>
                        <span className="fade-in" id="digit3">
                            4
                        </span>
                    </h1>
                    <h3 className="fadeIn">Сторінку не знайдено</h3>
                    <div className="button-wrapper">
                        <NavLink to="/">На головну</NavLink>
                        <NavLink to="/catalog">В каталог</NavLink>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default NotFoundPage;
