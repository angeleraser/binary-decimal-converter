const binRadioInput = document.querySelector('#binary-option');
const decRadioInput = document.querySelector('#decimal-option');
const hexRadioInput = document.querySelector('#hexadecimal-option');
class Converter {
  constructor(option){
    this.input = document.querySelector('#input');
    this.output1 = document.querySelector('#output1');
    this.output1Name = document.querySelector('.output1');
    this.output2 = document.querySelector('#output2');
    this.output2Name = document.querySelector('.output2');
    this.option = option;
    this.system = this.option.value;
  }
  initializeConverter(){
    this.option.addEventListener('click', ()=>{
      this.switchInputType(this.system);
      this.renderOutputNames(this.system);
      this.eraseAllCharacters();
      this.inputOnKeyup();
    })
  }
  inputOnKeyup(){
    this.input.addEventListener('keyup',()=>{
      let inputValue = this.input.value;
      let inputValueArr = [...inputValue];
      if(inputValue){
        if(binRadioInput.checked){
          inputValueArr.forEach( dig =>{
            if(dig >1){
             this.input.value = this.input.value.replace(dig,'')
            } 
          })}  
        else if(hexRadioInput.checked){
          inputValueArr.forEach( dig =>{
            this.input.value = this.input.value.replace(dig,dig.toUpperCase());
            if(dig == 1 || dig == 2 ||dig == 3 ||dig == 4 ||dig == 5 ||dig == 6 ||dig == 7 ||dig == 8 ||dig == 9 || dig == 0 || dig == 'A' ||dig == 'B' ||dig == 'C' ||dig == 'D' ||dig == 'E' ||dig == 'F' ){
              this.input.value = this.input.value;
            }
            else{
              this.input.value = this.input.value.replace(dig,'');
            }
          })
        }
        inputValue = this.input.value;
        this.renderOutputValues(this.system,inputValue);
      }
      else{
        this.eraseAllCharacters()
      }
    })
  }
  renderOutputValues(system,inputValue){
    switch (system) {
      case 'decimal':{
        this.output1.value = convertTo(inputValue,'binary');
        this.output2.value = convertTo(inputValue,'hexadecimal');
        break;
      }
      case 'binary':{
        this.output1.value = toDecimal(inputValue,system);
        this.output2.value = convertTo(toDecimal(inputValue,system),'hexadecimal');
        break;
      }
      case 'hexadecimal':{
        this.output1.value = toDecimal(inputValue,system);
        this.output2.value = convertTo(toDecimal(inputValue,system),'binary');
        break
      }
      default:{
       break;
      }
    }
  }
  eraseAllCharacters(){
    this.input.value = ''
    this.output1.value=''
    this.output2.value=''
  }
  renderOutputNames (system){
    const switchOutputName = (output1,output2)=>{
      const getSystemName = (system)=>{
        let name = null;
        switch (system) {
          case 'decimal':
            name = `DEC<sub>10</sub>`
            break;
           case 'binary':
             name = `BIN<sub>2</sub>` ;
            break;
            case 'hexadecimal':
              name = `HEX<sub>16</sub>`;
              break;
          default:
            break;
        }
        return name
      }
      this.output1Name.innerHTML = getSystemName(output1)
      this.output2Name.innerHTML = getSystemName(output2)
    }
    switch (system) {
      case 'decimal':
        switchOutputName('binary','hexadecimal')
        break;
      case 'binary':
       switchOutputName('decimal','hexadecimal')
        break;
      case 'hexadecimal':
        switchOutputName('decimal','binary')
        break;
      default:
        break;
    }
  }
  switchInputType(system){
    if(system == 'hexadecimal'){
      this.input.setAttribute('placeholder','hex number')
      this.input.setAttribute('type','text')
    }
    else{
      this.input.setAttribute('placeholder',`${system} number`)
      this.input.setAttribute('type','number')
    }
  }
}
const convertTo = (number,system = 'decimal') =>{
  let quotientList = [];
  let quotient = null;
  let moduleList = [];
  let module = null;
  let digits = null;  
  let divisor = null;
  let inputNumber = Number(number).toFixed(0);
  const toHexLetter = (arr) =>{
    let hexLetters = [];
    arr.forEach( (num)=>{
      let hexNumber = Number (num);
      let hexLetter = null;
      switch (hexNumber) {
        case 10:
          hexLetter = 'A'
          break;
        case 11:
          hexLetter = 'B'
          break;
        case 12:
          hexLetter = 'C'
          break;
        case 13:
          hexLetter = 'D'
          break;
        case 14:
          hexLetter = 'E'
          break;
        case 15:
          hexLetter = 'F'
          break;
        default:
          hexLetter = hexNumber;
          break;
      }
      hexLetters.push(hexLetter)
    })
    return hexLetters
  }
  const generateQuotient$Module = (number) =>{
    // Divisor 
    switch (system){
      case 'binary':{
        divisor = 2;
        break;
      }
      case 'hexadecimal':{
        divisor = 16;
        break;
      }
      default:{
        break;
      }
    }
    module   = number % divisor;
    quotient = Math.floor(number/divisor)
    saveQuotient$ModuleDigits(quotient,module,quotientList,moduleList);
    switch(system){
      case 'binary':{
        while (quotient !== 1) {
          generateQuotient$Module(quotient);
          }
        break;
      }
      case 'hexadecimal':{
        while (quotient > 16) {
          generateQuotient$Module(quotient);
        }
        break;
      }
      default:{
        break;
      }    
    }
  }
  const saveQuotient$ModuleDigits = (quotient,module) => {
    quotientList.push(quotient);
    moduleList.unshift(module);
  }
  // Aqui se realiza la conversion 
  if(system !== 'decimal'){
    if(number >=2){
      generateQuotient$Module(inputNumber);
      if(system == 'hexadecimal'){
        quotientList = toHexLetter(quotientList);
        moduleList = toHexLetter(moduleList);
      }
      const lastQLDigit = quotientList.length - 1;
      // Primer digito del numero
      let firstDigit = quotientList[lastQLDigit];
      // siguientes digitos conformados por los modulos 
      let nextDigits = moduleList.join('');
      if( system == 'hexadecimal' && number < 16){
        firstDigit = ``
      }
      digits = `${firstDigit}${nextDigits}`;
      }
    // retorna el mismo numero porque no es necesario convertir 
    else{
         number >=0 ? digits = `${number}` : digits = ``;
      }
  }
  else{
    digits = number;
  }
  return digits;
};
const toDecimal = (number,system = 'decimal') => {
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
      arrNumber.push(digit);
    }
  })
  return arrNumber;
  }
  const digitsToDecimal = (digits) => {
  let base = null;
  switch(system){
    case 'binary':
      base = 2;
      break;
    case 'hexadecimal':
      base = 16;
      break;
  }
  // Aqui se realiza la conversion 
  {
     const numbers = [];
     // exponente de la base 
     let exp = 0;
    //  Multiplica los digitos por la base y el exponente 
    (digits.reverse()).forEach( num =>{
     num = num * Math.pow(base,exp);
     numbers.push(num);
     exp+=1;
   })
    return numbers.reduce((a,b)=> a+b);
  } 
  }
  const splitElements = (arr) =>{
    let splitedArray = [];
    arr.forEach( el =>{
      splitedArray.push(el);
    })
    return splitedArray
  }
  let decimalNumber = null;
  if(system == 'decimal'){
    decimalNumber = number;
  }
  else{
  let numberStr = [...number.toString()]; 
  let splitedNumbers = splitElements(numberStr);
  if(system == 'hexadecimal'){
    splitedNumbers = hexDigitsToDecimal(splitedNumbers);
  }
  decimalNumber = digitsToDecimal(splitedNumbers);
  }
  return decimalNumber;
};
const decimalSystem = new Converter(decRadioInput);
const binarySystem = new Converter(binRadioInput);
const hexadecimalSystem = new Converter(hexRadioInput);
decimalSystem.initializeConverter();
binarySystem.initializeConverter();
hexadecimalSystem.initializeConverter();
decRadioInput.click();
