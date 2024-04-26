const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
let units = ["gal", "L", "mi", "km", "lbs", "kg"];
const UnitCovertMap = {
  gal: { to: "l", spell: "gallons" },
  l: { to: "gal", spell: "liters" },
  mi: { to: "km", spell: "miles" },
  km: { to: "mi", spell: "kilometers" },
  lbs: { to: "kg", spell: "pounds" },
  kg: { to: "lbs", spell: "kilograms" },
};
suite('Unit Tests', function(){
  
// #1
  test('convertHandler should correctly read a whole number input.', function () {
    let input="1"
    let num=convertHandler.getNum(input)
    assert.isNumber(num);
  });
// #2
  test('convertHandler should correctly read a decimal number input.', function () {
    let input="1.5"
    let num=convertHandler.getNum(input)
    assert.isNumber(num);
  });
// #3
  test('convertHandler should correctly read a fractional input.', function () {
    let input="1/2"
    let num=convertHandler.getNum(input)
    assert.isNumber(num);
  });
// #4
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    let input="0.5/0.25"
    let num=convertHandler.getNum(input)
    assert.isNumber(num);
  });
// #5
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    let input="3/2/3"
    let num=convertHandler.getNum(input)
    assert.isNotOk(num);
  });
// #6
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    let input="l"
    let num=convertHandler.getNum(input)
    assert.isNumber(num);
    assert.equal(num,1);
  });
// #7
  test('convertHandler should correctly read each valid input unit.', function () {
    units.forEach((input) => {
      let unit = convertHandler.getUnit(input);
      assert.isString(unit);
      assert.include(units, unit);
    });
  });
// #8
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    let input="lba"
    let unit = convertHandler.getUnit(input);
    assert.isNotOk(unit);
  });
// #9
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    let input="kg"
    let unit= convertHandler.getUnit(input);
    assert.include(units, unit);
  });
// #10
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    units.forEach((input) => {
        let spell=convertHandler.spellOutUnit(input)
        assert.equal(spell,UnitCovertMap[input.toLowerCase()].spell);
    });
  });
// #11
  test('convertHandler should correctly convert gal to L.', function () {
    let input="gal"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"L");
  });
// #2
  test('convertHandler should correctly convert L to gal.', function () {
    let input="L"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"gal");
  });
// #13
  test('convertHandler should correctly convert mi to km.', function () {
    let input="mi"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"km");
  });
// #14
  test('convertHandler should correctly convert km to mi.', function () {
    let input="km"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"mi");
  });
// #15
  test('convertHandler should correctly convert lbs to kg.', function () {
    let input="lbs"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"kg");
  });
// #16
  test('convertHandler should correctly convert kg to lbs.', function () {
    let input="kg"
    let ru=convertHandler.getReturnUnit(input)
    assert.equal(ru,"lbs");
  });

});