import { useState, createContext, useContext } from "react";
const CountContext = createContext(null);
const CountProvider = ({ children }) => {
    const value = useState<number>(0);
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
};

const Foo = () => {
    const [count, setCount] = useContext(CountContext);
    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount((count) => count + 1)}>Click Me!</button>
        </>
    );
};

const Bar = () => {
    const [count] = useContext(CountContext);
    return <h2>{count % 2 ? "Even" : "Odd"}</h2>;
};

const Buz = () => {
    <CountProvider>
        <Foo />
        <Bar />
    </CountProvider>;
};

export default Buz;
