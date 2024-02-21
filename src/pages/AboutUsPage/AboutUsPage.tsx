import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import AboutUs from './AboutUs/AboutUs';
import OurValues from './OurValues/OurValues';
import OurServices from './OurServices/OurServices';
import OurGuarantees from './OurGuarantees/OurGuarantees';
import ContactUs from './ContactUs/ContactUs';
import './AboutUsPage.scss';

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <Breadcrumbs />
            <AboutUs />
            <OurValues />
            <OurServices />
            <OurGuarantees />
            <ContactUs />
        </div>
    );
};

export default AboutUsPage;
