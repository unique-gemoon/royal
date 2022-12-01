import React, { createContext, useContext, useState, useEffect } from "react";

const DurationContext = createContext({
    updateSeconds: () => {},
    getSeconds: () => {},
});

export const useDurationContext = () => {
    return useContext(DurationContext);
};

export const DurationProvider = ({ ...props }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateSeconds = (s) => {
        setSeconds(s);
    }

    const getSeconds = () => {
        return seconds;
    }

    const value = { updateSeconds, getSeconds  };

    return <DurationContext.Provider value={value}>{props.children}</DurationContext.Provider>;
};
