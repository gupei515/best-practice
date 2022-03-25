export const cache = <T>(promiseFunc: () => Promise<T>) => {
    let result: T;
    let reject: any;
    let promiseCalledOnce = 0;
    const f = async () => {
        if (promiseCalledOnce === 1) return (result && Promise.resolve(result)) || (reject && Promise.reject(reject));
        promiseCalledOnce = 1;
        return promiseFunc()
            .then((rlt) => (result = rlt))
            .catch((err) => (reject = err));
    };
    return f;
};
