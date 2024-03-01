import { useEffect, useRef, Dispatch, SetStateAction, memo } from 'react';
import { motion } from 'framer-motion';
import nextId from 'react-id-generator';
import LazyLoad from 'react-lazy-load';
import delivery1 from '../../../assets/images/delivery/delivery1.png';
import delivery2 from '../../../assets/images/delivery/delivery2.png';
import delivery3 from '../../../assets/images/delivery/delivery3.png';
import np from '../../../assets/images/delivery/np_icon.png';
import up from '../../../assets/images/delivery/up_icon.png';
import me from '../../../assets/images/delivery/me_icon.png';
import './DeliveryContent.scss';

type Props = {
    setActiveLinkIndex: Dispatch<SetStateAction<number>>;
    offset: string;
};

const DeliveryContent = (props: Props) => {
    const { setActiveLinkIndex, offset } = props;
    const section1 = useRef<HTMLTableSectionElement>(null);
    const section2 = useRef<HTMLTableSectionElement>(null);
    const section3 = useRef<HTMLTableSectionElement>(null);
    const section4 = useRef<HTMLTableSectionElement>(null);
    const refs = [section1, section2, section3, section4];

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.8,
                delay: custom * 0.1,
            },
        }),
    };

    const deliveryConditions = [
        {
            title: 'Терміни доставки.',
            description:
                'Ми намагаємося забезпечити доставку вашого замовлення якнайшвидше. Зазвичай, терміни доставки становлять 14 робочих днів з моменту оформлення замовлення.',
            ref: useRef<HTMLLIElement>(null),
        },
        {
            title: 'Вартість доставки.',
            description: 'Доставка всіх товарів БЕЗКОШТОВНА',
            ref: useRef<HTMLLIElement>(null),
        },
        {
            title: 'Місце доставки.',
            description:
                'Ми доставляємо меблі до ваших дверей або, за вашим бажанням, до конкретної кімнати у вашому будинку або офісі.',
            ref: useRef<HTMLLIElement>(null),
        },
        {
            title: 'Складання та встановлення.',
            description:
                'За вашим бажанням, ми можемо забезпечити послуги складання і встановлення при доставці. Ця послуга може бути додатково оплачена і потребує попередньої узгодження.',
            ref: useRef<HTMLLIElement>(null),
        },
        {
            title: 'Документація та приймання.',
            description:
                'При доставці ви отримаєте всю необхідну документацію та можливість перевірити стан товарів. Будь ласка, перевірте меблі на предмет будь-яких дефектів чи пошкоджень під час прийому.',
            ref: useRef<HTMLLIElement>(null),
        },
        {
            title: 'Гарантія.',
            description:
                'Наші товари мають 12 місяців гарантію. Якщо виникають проблеми після придбання, ми готові надати необхідну підтримку та вирішити питання гарантійного обслуговування.',
            ref: useRef<HTMLLIElement>(null),
        },
    ];
    const paymentConditions = [
        {
            description:
                'Ваше замовлення буде зберігатися в поштовому відділенні безкоштовно протягом 5 робочих днів(можливе лише для негабаритних речей), після чого, у разі його неотримання воно автоматично повертається на наш склад. Повторна відправка буде можлива за рахунок одержувача.',
        },
        {
            description:
                'Наш магазин робить все можливе, проте не несе відповідальності за неотримання покупцем повідомлення від транспортної компанії стосовно відправлення.',
        },
        {
            description:
                "Для замовлень кур'єром обов'язково роботи передоплату.",
        },
        {
            description:
                'Просимо Вас уважно перевіряти посилки при отриманні на предмет комплектації замовлення і цілісності упаковки. Ми не гарантуємо вирішення спорів на користь Покупця якщо цілісність та комплектність товару не була перевірена в присутності працівника компанії-перевізника та про це не був складений відповідний акт.',
        },
    ];
    const deliveryStatusConditions = [
        {
            description:
                'Увійдіть в обліковий запис: зайдіть в "Мій обліковий запис". Потім увійдіть в свій обліковий запис, використовуючи електронну пошту та пароль, які ви вказали під час оформлення замовлення.',
        },
        {
            description:
                'Знайдіть вкладку "Мої замовлення". Після входу в обліковий запис, перейдіть до розділу, де ви зможете перевірити статус свого замовлення. ',
        },
        {
            description:
                'Якщо вам вже прийшла смс з ТТН замовленням, то ви можете перевірити його на сайті перевізника:',
        },
    ];
    const refundOrdersConditions = [
        {
            title: 'Термін обміну та повернення.',
            description:
                'Термін обміну або повернення товару може бути визначений у магазинних правилах і зазвичай становить від 7 до 30 днів з моменту покупки. Переконайтеся, що ви докладно ознайомилися з цим терміном.',
        },
        {
            title: 'Стан товару.',
            description:
                'Товар повинен бути в початковому стані, без слідів використання або пошкодження. Зазвичай товар повинен мати всі заводські етикетки, ярлики і упаковку.',
        },
        {
            title: 'Причина повернення.',
            description:
                'Багато магазинів можуть вимагати від вас вказати причину повернення товару. Це допомагає їм зрозуміти, чому ви не задоволені товаром і вдосконалювати свої послуги.',
        },
        {
            title: 'Доказ покупки.',
            description:
                "Ви повинні пред'явити доказ покупки, такий як чек або квитанція, щоб підтвердити, що товар був куплений в нашому магазині.",
        },
        {
            title: 'Можливість обміну чи повернення грошей.',
            description:
                'Можливий обмін товару на інший або повернення грошей на ваш банківський рахунок. ',
        },
        {
            title: 'Вартість повернення.',
            description:
                'Вартість повернення, якщо це не брак, оплачує клієнт згідно з тарифами перевізника. ',
        },
        {
            title: 'Винятки.',
            description:
                'У деяких випадках, товари, такі як спеціально виготовлені на замовлення або розпродажі, можуть бути виключені з політики повернення або обміну. Перевірте ці винятки перед покупкою.',
        },
    ];

    useEffect(() => {
        const scrolledContent = () => {
            refs.forEach((item, index) => {
                if (item.current) {
                    const { top } = item.current.getBoundingClientRect();
                    if (top < window.innerHeight / 4) {
                        setActiveLinkIndex(index);
                    }
                }
            });
        };
        window.addEventListener('scroll', scrolledContent);

        return () => window.removeEventListener('scroll', scrolledContent);
    }, []);

    return (
        <div className="delivery-content">
            <motion.section
                className="delivery-content__conditions"
                id="delivery-conditions"
                ref={section1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: `-${offset} 0px` }}
                variants={variants}
                custom={1}
            >
                <h2 className="delivery-content__title">Умови доставки</h2>
                <ul className="delivery-content__conditions-list delivery-content__conditions-list_counter1">
                    {deliveryConditions.map((item, index) => {
                        const { title, description, ref } = item;
                        return (
                            <li
                                key={nextId('condition')}
                                className="delivery-content__conditions-item"
                            >
                                <h3 className="delivery-content__conditions-title">
                                    {title}
                                </h3>
                                <p className="delivery-content__conditions-descr">
                                    {description}
                                </p>
                            </li>
                        );
                    })}
                    <li className="delivery-content__conditions-item delivery-content__conditions-item_warning">
                        <p className="delivery-content__conditions-warning">
                            У випадку порушення цілісності упаковки або її
                            деформації складіть акт-претензію в транспортній
                            компанії, відмовтесь від отримання та повідомте нам
                            про проблему якнайшвидше зручним для Вас способом!
                        </p>
                    </li>
                    <li className="delivery-content__conditions-item delivery-content__conditions-item_img">
                        <LazyLoad>
                            <img src={delivery1} alt="delivery process" />
                        </LazyLoad>
                    </li>
                </ul>
            </motion.section>
            <motion.section
                className="delivery-content__conditions delivery-content__conditions_mgt"
                id="payment"
                ref={section2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: `-${offset} 0px` }}
                variants={variants}
                custom={1}
            >
                <h2 className="delivery-content__title">
                    Важливі положення щодо доставки та оплати
                </h2>
                <ul className="delivery-content__conditions-list">
                    {paymentConditions.map((item) => {
                        const { description } = item;
                        return (
                            <li
                                key={nextId('condition')}
                                className="delivery-content__conditions-item delivery-content__conditions-item_circle"
                            >
                                <p className="delivery-content__conditions-descr">
                                    {description}
                                </p>
                            </li>
                        );
                    })}
                    <li className="delivery-content__conditions-item delivery-content__conditions-item_img">
                        <LazyLoad>
                            <img src={delivery2} alt="delivery process" />
                        </LazyLoad>
                    </li>
                </ul>
            </motion.section>
            <motion.section
                className="delivery-content__delivery-status delivery-content__conditions_mgt"
                id="delivery-status"
                ref={section3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: `-${offset} 0px` }}
                variants={variants}
                custom={1}
            >
                <h2 className="delivery-content__title">
                    Перевірка статусу замовлення
                </h2>
                <ul className="delivery-content__conditions-list delivery-content__conditions-list_counter2">
                    {deliveryStatusConditions.map((item) => {
                        const { description } = item;
                        return (
                            <li
                                key={nextId('condition')}
                                className="delivery-content__conditions-item delivery-content__conditions-item_descr"
                            >
                                <p className="delivery-content__conditions-descr delivery-content__conditions-descr_counter">
                                    {description}
                                </p>
                            </li>
                        );
                    })}
                    <li className="delivery-content__conditions-item delivery-content__conditions-item_icons">
                        <ul className="delivery-content__postal-list">
                            <li className="delivery-content__postal-item">
                                <a
                                    className="delivery-content__postal-link"
                                    href="https://tracking.novaposhta.ua/"
                                    target="blank"
                                >
                                    <h4 className="delivery-content__postal-title">
                                        Нова пошта
                                    </h4>
                                    <img src={np} alt="" />
                                </a>
                            </li>
                            <li className="delivery-content__postal-item">
                                <a
                                    className="delivery-content__postal-link"
                                    href="https://track.ukrposhta.ua/"
                                    target="blank"
                                >
                                    <h4 className="delivery-content__postal-title">
                                        Укрпошта
                                    </h4>
                                    <img src={up} alt="" />
                                </a>
                            </li>
                            <li className="delivery-content__postal-item">
                                <a
                                    className="delivery-content__postal-link"
                                    href="https://ua.meest.com/parcel-track?gad_source=1&gclid=CjwKCAiArfauBhApEiwAeoB7qIZXyKqIKhzAcxfRAa9JkTjFW_zyOZGXra0TOJH6zxaTliHWVGJ6JhoCl70QAvD_BwE"
                                    target="blank"
                                >
                                    <h4 className="delivery-content__postal-title">
                                        Meest
                                    </h4>
                                    <img src={me} alt="" />
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </motion.section>
            <motion.section
                className="delivery-content__conditions delivery-content__conditions_mgt"
                id="refund-orders"
                ref={section4}
                initial="hidden"
                whileInView="visible"
                variants={variants}
                custom={1}
                viewport={{ amount: 0.3, once: true }}
            >
                <h2 className="delivery-content__title">
                    Обмін на повернення товарів
                </h2>
                <ul className="delivery-content__conditions-list delivery-content__conditions-list_counter3">
                    {refundOrdersConditions.map((item) => {
                        const { title, description } = item;
                        return (
                            <li
                                key={nextId('condition')}
                                className="delivery-content__conditions-item"
                            >
                                <h3 className="delivery-content__conditions-title">
                                    {title}
                                </h3>
                                <p className="delivery-content__conditions-descr">
                                    {description}
                                </p>
                            </li>
                        );
                    })}
                    <li className="delivery-content__conditions-item delivery-content__conditions-item_img">
                        <LazyLoad>
                            <img src={delivery3} alt="delivery process" />
                        </LazyLoad>
                    </li>
                </ul>
            </motion.section>
        </div>
    );
};

export default memo(DeliveryContent);
