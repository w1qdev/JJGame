const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateKey = () => {
    const nums = '123456789'
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let result = ''

    for (let i = 0; i <= letters.length; i++) {
        result += `${letters[getRandomNumber(0, letters.length - 1)]}${nums[getRandomNumber(0, nums.length - 1)]}`
    }

    return result
}

export default generateKey;