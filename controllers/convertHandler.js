function ConvertHandler() {
  const UnitCovertMap = {
    gal: { to: "l", spell: "gallons" },
    l: { to: "gal", spell: "liters" },
    mi: { to: "km", spell: "miles" },
    km: { to: "mi", spell: "kilometers" },
    lbs: { to: "kg", spell: "pounds" },
    kg: { to: "lbs", spell: "kilograms" },
  };
  const re_num = /^([0-9.]+[/]?[0-9.]*)[a-z]*$/i;
  const re_unit = /^[0-9./]*(gal|l|mi|km|lbs|kg)$/i;
  this.getNum = function (input) {
    if (!input) return null;
    if (input.match(/^[a-z]+$/i)) return 1;
    let result = input.match(re_num)?.[1];
    if (result === null) return null;
    if (result) {
      result = result.match("/")
        ? result.split("/").reduce((a, b) => ((a * 1) / b) * 1)
        : result * 1;
      return isFinite(result) ? result ?? 1 : null;
    }
  };

  this.getUnit = function (input) {
    if (!input) return null;
    let result = input.match(re_unit)?.[1];
    if (result === null) return null;
    return result?.toLowerCase?.().replace(/^l$/i, "L");
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    result = UnitCovertMap[initUnit?.toLowerCase?.()]?.to;
    return result?.toLowerCase?.().replace(/^l$/i, "L");
  };

  this.spellOutUnit = function (unit) {
    let result;
    result = UnitCovertMap[unit?.toLowerCase?.()]?.spell;
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit?.toLowerCase?.()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return 0;
    }
    return result.toFixed(5) * 1;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (!initNum && !initUnit) result = "invalid number and unit";
    else if (!initNum) result = "invalid number";
    else if (!initUnit) result = "invalid unit";
    if (result) return result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
