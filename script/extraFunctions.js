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