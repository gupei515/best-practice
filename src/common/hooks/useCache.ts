export const cache =  <T extends unknown>(promiseFunc: () => Promise<T>) => {
    let result: T;
    let reject: any;
    let promiseCalledOnce = 0;
    const f = () => {
        if(promiseCalledOnce === 1)
        return result && Promise.resolve(result) || reject && Promise.reject(reject);
        promiseCalledOnce = 1;
        return  promiseFunc().then(rlt => result = rlt).catch(err => reject = err);
    }
    return f;
}