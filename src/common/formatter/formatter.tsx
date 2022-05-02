const formatter = Intl.NumberFormat(undefined, {
    style: "currency",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    notation: "compact",
    compactDisplay: "short",
    currency: "USD",
});

export default formatter;

// how to use it
export const formatLargeUSD = (num: number) => (num === null ? "-" : formatter.format(num));
