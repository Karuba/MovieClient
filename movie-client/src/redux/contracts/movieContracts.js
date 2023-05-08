export const noWhiteSpace = {
   validator: (_, value) =>
      !value?.includes("  ")
         ? Promise.resolve()
         : Promise.reject(new Error("Удалите пробелы"))
}

export const movieNameValidation =
   [
      {
         required: true,
         message: "Требуется название для фильма",
      },
      {
         whitespace: true,
         message: "Это поле не может быть пустым!",
      },
      {
         min: 3,
         max: 50,
         message: "Название фильма должно быть длинной 3-50 символов",
      },
      noWhiteSpace,
   ]


export const validateDescription =
   [
      {
         max: 500,
         message: "Описание максимум длиной в 500 символов",
      },
      noWhiteSpace
   ]

export const descriptionAutoSize = {
   minRows: 3,
   maxRows: 10,
}

//POSTER:
export const uploadImgValidator = (setFinish) => [
   {
      validator(_, fileList) {
         return new Promise((resolve, reject) => {
            if (fileList && fileList[0]?.size > 2000000) {
               reject('Превышен размер постера');
               setFinish(false);
            }
            else {
               setFinish(true);
               resolve("Успешно!")
            }
         });
      }
   }]
export const uploadCharacters = {
   maxCount: 1,
   accept: ".webp,.jpg,.jpeg,.png"
}
