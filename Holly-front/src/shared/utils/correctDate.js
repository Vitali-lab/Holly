

export const correctDate = (date) => {
    return date?.slice(0, 10).split("-").reverse().join(".")
}