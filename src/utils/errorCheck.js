export const errorCheck = (errorList) => {
  let hasError = false;
  let errors = ""
  for (var i = 0; i < errorList?.length; i++) {        
    if(errorList[i]?.length) {
      errors += `${errorList[i]} `;
      hasError = true;
    }else {
      continue
    }
  }
  return [errors.trim(), hasError]
}