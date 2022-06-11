import { useState } from "react";
import { Input } from "reactstrap";

export const DebounceThrottle = () => {
    const [defaultValue, setDefaultValue] = useState("");
    const [debounceValue, setDebounceValue] = useState("");

    // 等input结束了以后一下子，想象一下点菜的过程
    const debounce = (cb, delay = 5000) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => cb(...args), delay);
        };
    };

    const updateDebounceText = debounce((text) => setDebounceValue(text));

    const onChange = (e) => {
        setDefaultValue(e.target.value);
        updateDebounceText(e.target.value);
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
            {/* <div>
                <span>Throttle:</span>
                <span>{throttle}</span>
            </div> */}
        </div>
    );
};
