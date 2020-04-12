function toDecimalNumber(number) {

  const hexDigitsToDecimal = (arr) =>{
  let arrNumber = [];
  arr.forEach(digit =>{
    if(typeof digit == 'string'){
      digit = digit.toUpperCase();
      let number = digit;
      switch(digit){
        case 'A':
         number = 10;
         arrNumber.push(number)
         break;
        case 'B':
          number = 11;
          arrNumber.push(number)
          break;
        case 'C':
          number = 12;
          arrNumber.push(number)
          break;
        case 'D':
          number = 13;
          arrNumber.push(number)
          break;
        case 'E':
          number = 14;
          arrNumber.push(number)
          break;
        case 'F':
          number = 15;
          arrNumber.push(number)
          break; 
        default:
          arrNumber.push(number) 
      }
    }
    else{
      arrNumber.push(digit)
    }
  })
  
  return arrNumber;
  }
  const digitsToDecimal = (digits) => {
  let base = null;
  switch(typeOfNumber){
    case 'binary':
      base = 2;
      break;
    case 'hexadecimal':
      base = 16;
      break;
  }
  // Aqui se realiza la conversion 
  {
     //  numeros que van a ser sumados 
     const numbers = [];
     // exponente de la base 
     let exp = 0;
    //  Multiplica los digitos por la base y el exponente 
    (digits.reverse()).forEach( num =>{
     num = num * Math.pow(base,exp);
     numbers.push(num);
     exp++
   })
   if((isNumber(digits))){
    decimalNumber = numbers.reduce((a,b)=> a+b);
   }
  } 
   return decimalNumber;
  }
  // Convierte el numero (parametro) en un array de strings 
  let numberStr = [...number.toString()]; 
  let isHexNumber = includesHexLetter(numberStr);
  let typeOfNumber = null;
  isHexNumber ? typeOfNumber = 'hexadecimal' : typeOfNumber = 'binary'
  let decimalNumber = '';
  let splitedNumbers = splitElements(numberStr);
  if(typeOfNumber == 'hexadecimal'){
    splitedNumbers = hexDigitsToDecimal(splitedNumbers)
  }
  decimalNumber = digitsToDecimal(splitedNumbers);
  return decimalNumber;  
}
function isNumber (value){
  value = Number (deleteArrayComma(value))
  let isNaNNumber = true; 
  if(!value){
    isNaNNumber = false;
  }
 return isNaNNumber;
}
const verifySystem = (number) => { 
  let arr = [...number.toString()]
  let typeOfDigit  = 'binary';
    // para verificar si es una cifra binaria 
    arr.forEach( dig =>{
      if((dig !==1 || dig !==0) && (dig > 1)){ 
         typeOfDigit = 'decimal';
      }
    }) 
    if(includesHexLetter(arr)){
      typeOfDigit = `hexadecimal`
    }
    return typeOfDigit;
}
const includesHexLetter = (arr)=>{
  let isIncludes = false;
  if(arr.includes('A') || arr.includes('B') || arr.includes('C') ||
  arr.includes('D') || arr.includes('E') ||arr.includes('F') || arr.  includes('a') || arr.includes('b') || arr.includes('c') ||
  arr.includes('d') || arr.includes('e') ||arr.includes('f')){
  isIncludes = true;
}
return isIncludes;
}
const replaceComma = (str)=>{
  str.replace(',','.')
  return (Number(str))
}