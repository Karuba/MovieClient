export const noWhiteSpace = {
   validator: (_, value) =>
      !value?.includes(" ")
         ? Promise.resolve()
         : Promise.reject(new Error("Удалите пробелы"))
}

export const requireDigit = {
   validator: (_, value) =>
      /\d/.test(value)
         ? Promise.resolve()
         : Promise.reject(new Error("Пароль должен содержать хотя бы одну цифру"))
}

export const userNameValidation =
   [
      {
         required: true,
         message: "Требуется имя пользователя",
      },
      {
         whitespace: true,
         message: "Это поле не может быть пустым!",
      },
      {
         min: 3,
         max: 20,
         message: "Имя пользователя должно быть длинной 3-20 символов",
      },
      noWhiteSpace,
   ]


export const passwordValidation =
   [
      {
         required: true,
         message: "Требуется пароль",
      },
      {
         whitespace: true,
         message: "Это поле не может быть пустым!",
      },
      {
         min: 4,
         max: 30,
         message: "Пароль должен быть длинной 4-30 символов",
      },
      noWhiteSpace,
      requireDigit,
   ]

export const passwordConfirm =
   [
      ({ getFieldValue }) => ({
         validator: (_, value) =>
            !value || getFieldValue('password') === value
               ? Promise.resolve()
               : Promise.reject('Пароли не совпадают!')
      })
   ]