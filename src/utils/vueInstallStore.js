exports.install = function (Vue, options) {
  'use strict'
  Vue.prototype.formatNum = function (s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1],
      t = "";
    for (let index = 0; index < l.length; index++) {
      t += l[index] + ((index + 1) % 3 == 0 && (index + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
}
