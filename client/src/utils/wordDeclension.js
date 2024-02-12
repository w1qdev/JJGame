

const wordDeclenision = (count, word) => {
    const stringCount = count.toString()
    const lastCountNum = parseInt(stringCount[stringCount.length - 1])

    if (lastCountNum === 1) return `${word}а`
    if (lastCountNum === 0) return `${word}`
    if (lastCountNum >= 2 && lastCountNum <= 4) return `${word}и`
    if (lastCountNum >= 5 && lastCountNum <= 9) return `${word}`
}   

export default wordDeclenision;