function duplicateOrUnique(arr){
  const values = arr.reduce((obj, value) => {
    if (!!obj[`${value}`]) obj[`${value}`]++;
    else obj[`${value}`] = 1;
    
    return obj;
  }, {});;
  console.log({values});
  valuesArr = Object.values(values);
  
  let numOfOnes = 0;
  
  for (let i  = 0; i <3; i++) {
      console.log({array: valuesArr[i]});
    if (valuesArr[i] === 1) numOfOnes++;
  }
  
  const isDuplicate = numOfOnes>1;
  console.log(isDuplicate);
  const targetKey = Object.keys(values).find(key => values[key] === (isDuplicate ? 2 : 1));
  console.log(targetKey);
  return Number(targetKey);
}