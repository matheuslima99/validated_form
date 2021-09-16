class ValidateForm {
  constructor() {
    this.form = document.querySelector(".form");
    this.inputs = document.querySelectorAll("input");
    this.wrapperInput = document.querySelectorAll(".input");
    this.sla = document.querySelectorAll(".error-text");
    this.events();
  }

  events() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const valid = this.isValid();
    if (valid) {
      alert("Submitted form");
      this.form.submit();
      this.clearInputValue();
    }
  }

  isValid() {
    let valid = true;
    this.clearInputValue();
    this.inputs.forEach((element, index) => {
      let label = element.parentElement.previousElementSibling.innerText; // pega o irmão anterior do elemento.
      if (!element.value.trim()) {
        this.msgError(this.wrapperInput[index], `${label} cannot be empty.`);
      }

      if (element.classList.contains("cpf-")) {
        if (!this.cpfValidate(element)) valid = false;
      }

      if (element.classList.contains("password-")) {
        if (!this.validPassword(element)) valid = false;
      }
    });

    return valid;
  }

  cpfValidate(element) {
    const cpf = new cpfValidate(element.value);

    if (!cpf.validate()) {
      this.msgErrorRight(element.parentElement, "Inválid CPF");
      return false;
    }
    return true;
  }

  validPassword(element) {
    if (element.value.length < 6 || element.value.length > 12) {
      this.msgErrorRight(
        element.parentElement,
        "Password must be between 6 and 12 characters"
      );
      return false;
    }
    return true;
  }

  msgError(field, msg) {
    const span = document.createElement("span");
    span.innerText = msg;
    span.classList.add("error-txt");
    field.appendChild(span);
  }

  msgErrorRight(field, msg) {
    const span = document.createElement("span");
    span.innerText = msg;
    span.classList.add("error-txt", "error-text2");
    field.appendChild(span);
  }

  clearInputValue() {
    for (let errorText of this.form.querySelectorAll(".error-txt")) {
      errorText.remove();
    }
  }
}

const validate = new ValidateForm();
