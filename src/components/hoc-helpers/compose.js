const compose =
    (...funcs) =>
    (comp) => {
        funcs.reduceRight((prevResult, f) => {
            return f(prevResult);
        }, comp);
    };

export default compose;
