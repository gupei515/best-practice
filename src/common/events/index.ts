/**
 * understand inversion of control
 * you tell me what you want my function to do and i will do it
 * https://kentcdodds.com/blog/inversion-of-control
 * 当我创建这个store的时候我知道当createStore被call, 一个scope的
 * store被创建出来，当useStore被call的时候我知道，每一次call useStore
 * 都指向同一个store，这就是我想要的
 */

import { useEffect, useState } from "react";

const createEmitter = () => {
    const subscripitons = new Map();
    return {
        emit: (v) => subscripitons.forEach((fn) => fn(v)),
        subscribe: (fn) => {
            const key = Symbol();
            subscripitons.set(key, fn);
            return () => subscripitons.delete(key);
        },
    };
};

const createStore = (init) => {
    const emitter = createEmitter();
    let store = null;

    const get = () => store;
    const set = (op) => {
        store = op(store);
        emitter.emit(store);
    };

    store = init(get, set);

    const useStore = () => {
        const [localStore, setLocalStore] = useState(get());
        useEffect(() => emitter.subscribe(setLocalStore), []);
        return localStore;
    };
    return useStore;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useCountStore = createStore((get, set) => ({
    count: 0,
    increment: () => set((store: any) => ({ ...store, count: store.count + 1 })), // invesion of control
    decrement: () => set((store: any) => ({ ...store, count: store.count - 1 })), // invesion of control
}));
