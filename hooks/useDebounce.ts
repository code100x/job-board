import { useState, useEffect } from "react";

export const useDebounce = <T>(input: T, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(input)
        }, delay ?? 500);

        return () => {
            clearTimeout(timer);
        }
    }, [input, delay]);

    return debouncedValue;
}