export function useFormValidation(studentInfo, setEmptyForm) {
  return function validateForm() {
    const newEmptyFields = {
      firstName: !studentInfo.firstName?.trim(),
      lastName: !studentInfo.lastName?.trim(),
      birthDate: !studentInfo.birthDate?.trim(),
      groupNumber: !studentInfo.groupNumber?.trim(),
    };

    setEmptyForm(newEmptyFields);

    if (Object.values(newEmptyFields).some((isEmpty) => isEmpty))
      return "Заповніть всі поля.";

    if (/\d/.test(studentInfo.firstName) || /\d/.test(studentInfo.lastName))
      return "Невірно введене ім'я або прізвище.";

    if (
      !/^\d+$/.test(studentInfo.groupNumber) ||
      studentInfo.groupNumber > 999 ||
      studentInfo.groupNumber < 0
    )
      return "Невірно введений номер групи.";

    return null;
  };
}
