import './AddToCartBtn.scss';

const AddToCartBtn = () => {
    return (
        <button className="cart-btn" type="button">
            <span className="cart-btn__text">До кошика</span>
            <svg
                className="cart-btn__icon"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="Vector"
                    d="M0.673684 2.8539e-05C0.303158 2.8539e-05 0 0.315028 0 0.700027C0 1.08503 0.303158 1.40003 0.673684 1.40003H2.16859L3.93701 8.75001C4.08657 9.37301 4.62417 9.80001 5.24194 9.80001H12.9684C13.5761 9.80001 14.0921 9.38141 14.2525 8.77171L16 2.10002H4.71579L5.05263 3.50002H14.2525L12.9684 8.40001H5.24194L3.47352 1.05003C3.40066 0.748544 3.23252 0.481196 2.99603 0.290815C2.75955 0.100433 2.46841 -0.00196401 2.16926 2.8539e-05H0.673684ZM12.1263 9.80001C11.0181 9.80001 10.1053 10.7485 10.1053 11.9C10.1053 13.0515 11.0181 14 12.1263 14C13.2345 14 14.1474 13.0515 14.1474 11.9C14.1474 10.7485 13.2345 9.80001 12.1263 9.80001ZM6.06316 9.80001C4.95495 9.80001 4.04211 10.7485 4.04211 11.9C4.04211 13.0515 4.95495 14 6.06316 14C7.17137 14 8.08421 13.0515 8.08421 11.9C8.08421 10.7485 7.17137 9.80001 6.06316 9.80001ZM6.06316 11.2C6.44244 11.2 6.73684 11.5066 6.73684 11.9C6.73684 12.2941 6.44177 12.6 6.06316 12.6C5.68387 12.6 5.38947 12.2934 5.38947 11.9C5.38947 11.5059 5.68455 11.2 6.06316 11.2ZM12.1263 11.2C12.5056 11.2 12.8 11.5066 12.8 11.9C12.8 12.2941 12.5049 12.6 12.1263 12.6C11.747 12.6 11.4526 12.2934 11.4526 11.9C11.4526 11.5059 11.7477 11.2 12.1263 11.2Z"
                />
            </svg>
        </button>
    );
};

export default AddToCartBtn;