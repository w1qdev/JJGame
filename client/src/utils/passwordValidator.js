const passwordValidator = (password) => {
    const passwordLength = password.length

    return passwordLength >= 8 ? true : false
}

export default passwordValidator