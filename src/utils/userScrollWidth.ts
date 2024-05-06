const userScrollWidth = () => {
    const { clientWidth } = document.body;
    const { innerWidth } = window;
    return innerWidth - clientWidth;
};

export default userScrollWidth;
