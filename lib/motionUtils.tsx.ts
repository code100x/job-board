export const textVariant = (delay: number, opacity: number) => ({
    hidden: {
        y: 100,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: opacity,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay,
        },
    },
});
