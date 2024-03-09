const throttle = function mainFunction<T extends (...args: any[]) => any>(
    mainFunction: T,
    delay: number
) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function (...args: Parameters<T>) {
        if (timeout === null) {
            mainFunction(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
};

export default throttle;
