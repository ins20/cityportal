const regexDataAuth = {
    fio: {
        pattern: /^[а-яА-ЯёЁ\s-]+$/,
        message: "Только кириллические буквы, дефис и пробелы"
    },
    login: {
        pattern: /[a-zA-Z]/,
        message: "Только латиница"
    },
    email: {
        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Не валидный email"
    }
}

export const validationAuth = (values) => {
    const handleValidationErrors = {}
    for (const key in values) {
        const value = values[key]
        const regex = regexDataAuth[key]
        handleValidationErrors[key] = !regex.pattern.test(value) ? regex.message : true
    }
    return handleValidationErrors
}


