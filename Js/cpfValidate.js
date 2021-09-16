class cpfValidate {
  constructor(cpf) {
    this.cpf = cpf;
  }

  get sentCPF() {
    if (!this.cpf) return false;
    return this.cpf.replace(/\D+/g, "");
  }

  validate() {
    if (this.sentCPF.length !== 11) return false;
    if (this.sentCPF === "undefined") return false;
    if (this.checkRepeatedNumbers()) return false;
    const sentCPF = this.sentCPF.slice(0, -2);
    const digit1 = cpfValidate.createDigit(sentCPF);
    const digit2 = cpfValidate.createDigit(sentCPF + digit1);
    const verifiedCPF = sentCPF + digit1 + digit2;

    return verifiedCPF !== this.sentCPF ? false : true;
  }

  /* Quando eu não utilizo a palavra "this" em um método, significa que
       ele pode se tornar static */
  static createDigit(sentCPF) {
    const cpfArray = Array.from(sentCPF);
    let countdown = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, value) => {
      ac += Number(value) * countdown--;
      return ac;
    }, 0);

    const digit = 11 - (total % 11);

    return digit > 9 ? "0" : String(digit);
  }

  checkRepeatedNumbers() {
    return this.sentCPF[0].repeat(11) === this.sentCPF;
  }
}
