import kyiv from '../../../assets/images/contacts/kyiv.png';
import kharkiv from '../../../assets/images/contacts/kharkiv.jpg';
import lviv from '../../../assets/images/contacts/lviv.jpg';
import './Showrooms.scss';

const Showrooms = () => {
    const shopsInfo = [
        {
            id: 1,
            img: kyiv,
            alt: 'фото магазину в Києві',
            adress: 'м.Київ, вул. Лятошинського 4а',
            adressLink:
                'https://www.google.com.ua/maps/place/4A,+%D1%83%D0%BB.+%D0%9B%D1%8F%D1%82%D0%BE%D1%88%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE,+4%D0%90,+%D0%9A%D0%B8%D0%B5%D0%B2,+02000/@50.3762472,30.4504884,17z/data=!3m1!4b1!4m6!3m5!1s0x40d4c8fe0c6068ab:0x6a92bc3e436573ae!8m2!3d50.3762472!4d30.4530633!16s%2Fg%2F1tt1r68c?hl=ru&entry=ttu',
            phones: ['+380937241094', '+380687241094'],
            schedule: [
                {
                    'Пн-пт': '10:00-20:00',
                },
                {
                    Субота: '10:00-20:00',
                },
                {
                    Неділя: '10:00-20:00',
                },
            ],
        },
        {
            id: 2,
            img: kharkiv,
            adress: 'м.Харків, вул. Перемоги 2б',
            adressLink:
                'https://www.google.com.ua/maps/place/%D0%BF%D1%80%D0%BE%D1%81%D0%BF.+%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B,+62%2F2,+%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2,+%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+61000/@50.0601088,36.2005667,17z/data=!3m1!4b1!4m6!3m5!1s0x4127a419b3d825b3:0xc506be5c8d01648c!8m2!3d50.0601088!4d36.2031416!16s%2Fg%2F11nnsbxbd7?hl=ru&entry=ttu',
            phones: ['+380937508096', '+380677508096'],
            schedule: [
                {
                    'Пн-пт': '10:00-20:00',
                },
                {
                    Субота: '10:00-20:00',
                },
                {
                    Неділя: '10:00-20:00',
                },
            ],
        },
        {
            id: 3,
            img: lviv,
            adress: 'м.Львів, вул. Богдана Хмельницького 10',
            adressLink:
                'https://www.google.com.ua/maps/place/%D1%83%D0%BB.+%D0%91%D0%BE%D0%B3%D0%B4%D0%B0%D0%BD%D0%B0+%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%BA%D0%BE%D0%B3%D0%BE,+10,+%D0%9B%D1%8C%D0%B2%D0%BE%D0%B2,+%D0%9B%D1%8C%D0%B2%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+79000/@49.8457566,24.029412,17z/data=!3m1!4b1!4m6!3m5!1s0x473add0d4a7c3317:0xac9b90d73878a196!8m2!3d49.8457566!4d24.029412!16s%2Fg%2F1tddwjqc?hl=ru&entry=ttu',
            phones: ['+380933502016', '+380683502016'],
            schedule: [
                {
                    'Пн-пт': '10:00-20:00',
                },
                {
                    Субота: '10:00-20:00',
                },
                {
                    Неділя: '10:00-20:00',
                },
            ],
        },
    ];
    return (
        <section className="showrooms">
            <div className="container">
                <h2 className="contacts__title_h2">Наші магазини</h2>
                <ul className="showrooms__list">
                    {shopsInfo.map((shop) => {
                        const {
                            id,
                            img,
                            alt,
                            adress,
                            adressLink,
                            phones,
                            schedule,
                        } = shop;
                        return (
                            <li className="showrooms__item" key={id}>
                                <address className="showrooms__item-address-wrapper">
                                    <a
                                        className="showrooms__item-photo-wrapper"
                                        href={adressLink}
                                        title="Подивитись на карті"
                                        target="blank"
                                    >
                                        <img
                                            className="showrooms__item-photo"
                                            src={img}
                                            alt={alt}
                                        />
                                    </a>
                                    <div className="showrooms__item-text">
                                        <div className="showrooms__item-block1">
                                            <h3 className="showrooms__item-title">
                                                Адреса:
                                            </h3>
                                            <a
                                                className="showrooms__item-shop-address"
                                                href={adressLink}
                                                title="Подивитись на карті"
                                                target="blank"
                                            >
                                                {adress}
                                            </a>
                                        </div>
                                        <div className="showrooms__item-block2">
                                            <h3 className="showrooms__item-title">
                                                Телефони:
                                            </h3>
                                            <ul className="showrooms__item-phones">
                                                {phones.map((phone) => {
                                                    return (
                                                        <li
                                                            className="showrooms__item-phones-item"
                                                            key={phone}
                                                        >
                                                            <a
                                                                className="showrooms__item-phones-link"
                                                                href={`tel:${phone.replace(
                                                                    '+',
                                                                    ''
                                                                )}`}
                                                            >
                                                                {phone}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        <div className="showrooms__item-block3">
                                            <h3 className="showrooms__item-title">
                                                Графік роботи
                                            </h3>
                                            <ul className="showrooms__item-schedule">
                                                {schedule.map((item) => {
                                                    const [key] =
                                                        Object.entries(item);
                                                    return (
                                                        <li
                                                            className="showrooms__item-schedule-item"
                                                            key={key[0]}
                                                        >
                                                            {`${key[0]}: ${key[1]}`}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </address>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Showrooms;
