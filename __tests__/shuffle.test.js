const { notify } = require("browser-sync");
const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  // CODE HERE
  // test if the shuffle returns an array
  const testArr = [1,2,3,4,5,6,7,8];
  const shuffledArr = shuffle(testArr);
  test('the shuffle function returns an array',()=>{
    expect(Array.isArray(shuffledArr)).toBe(true)
  })

  //check that shuffle function returns an array of the same length as the argument sent in
  test('returns an array of the same length',()=>{
    expect(shuffledArr.length).toBe(testArr.length);
  })

  //check that all the same items are in the array
  test('the shuffle returns an array',()=>{ 
    // We will check if the returned array contains all the elements passes in the arg and also the length of the returned array is same as testArray
    expect(shuffledArr).toEqual(expect.arrayContaining(testArr));
    expect(shuffledArr).toHaveLength(testArr.length);
  })

  //check that the items have been shuffled around
  test('the shuffle returns an array',()=>{
    expect(shuffledArr).not.toEqual(testArr);
  })

});

