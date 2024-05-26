export function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

export function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

export function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

export function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const randomFunc: any = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  export function generatePassword(
    lower: number,
    upper: number,
    number: number,
    symbol: number,
    length: number
  ) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
  }

export function calculatePasswordStrength(password: string) {
  let score = 0;

  // Scoring criteria
  const lengthCriteria = [
    { min: 8, max: 10, score: 1 },
    { min: 11, max: 14, score: 2 },
    { min: 15, max: 20, score: 3 },
  ];
  const characterTypes = [
    { regex: /[a-z]/, score: 1 }, // Lowercase letters
    { regex: /[A-Z]/, score: 1 }, // Uppercase letters
    { regex: /\d/, score: 1 }, // Numbers
    { regex: /[\W_]/, score: 1 }, // Symbols
  ];

  // Calculate length score
  const passwordLength = password.length;
  lengthCriteria.forEach((criteria) => {
    if (passwordLength >= criteria.min && passwordLength <= criteria.max) {
      score += criteria.score;
    }
  });

  // Calculate character type score
  characterTypes.forEach((type) => {
    if (type.regex.test(password)) {
      score += type.score;
    }
  });

  // Determine strength based on total score
  let strength;
  if (score >= 6) {
    strength = "Strong";
  } else if (score >= 5) {
    strength = "Medium";
  } else if (score >= 3) {
    strength = "Weak";
  } else {
    strength = "Too Weak";
  }

  return strength;
}