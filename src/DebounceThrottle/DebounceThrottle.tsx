import { useState } from "react";
import { Input } from "reactstrap";

export const DebounceThrottle = () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [debounceValue, setDebounceValue] = useState("");
    const [throttleValue, setThrottleValue] = useState("");

    // 等input结束了以后一下子，想象一下点菜的过程
    const debounce = (cb, delay = 5000) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb(...args), delay); // setTimeout call for once
        };
    };

    const throttle = (cb, delay = 5000) => {
        let shouldWait = false;
        let waitingArgs;
        const timeoutFunc = () => {
            if (waitingArgs === null) {
                shouldWait = false;
            } else {
                cb(...waitingArgs);
                waitingArgs = null;
                setTimeout(timeoutFunc, delay);
            }
        };

        return (...args) => {
            if (shouldWait) {
                waitingArgs = args;
                return;
            }

            cb(...args);
            shouldWait = true;

            setTimeout(timeoutFunc, delay);
        };
    };

    const updateDebounceText = debounce((text) => setDebounceValue(text));
    const updateThrottleText = throttle((text) => setThrottleValue(text));

    const onChange = (e) => {
        setDefaultValue(e.target.value);
        updateDebounceText(e.target.value);
        updateThrottleText(e.target.value);
    };

    return (
        <div>
            <Input onChange={(e) => onChange(e)}></Input>
            <div>
                <span>Default:&nbsp;</span>
                <span>{defaultValue}</span>
            </div>
            <div>
                <span>Debounce:&nbsp;</span>
                <span>{debounceValue}</span>
            </div>
            <div>
                <span>Throttle:</span>
                <span>{throttleValue}</span>
            </div>
        </div>
    );
};
