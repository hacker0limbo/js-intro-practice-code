define(() => {
    const sum = (...args) => {
        let result = 0
        for (let i = 0; i < args.length; i++) {
            let arg = args[i]
            result += arg
        }
        return result
    }
    return {
        color: "black",
        size: "unisize",
        sum: sum
    }
})