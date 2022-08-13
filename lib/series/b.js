var wa = function (a) {
  for (var b = [], d = 0; d < a.length; d++) {
    var f = a.charCodeAt(d);
    b[d] =
      33 <= f && 126 >= f
        ? String.fromCharCode(33 + ((f + 14) % 94))
        : String.fromCharCode(f);
  }
  return Aa(b.join(""));
};

var Aa = function (a) {
  a = a.replace(".cda.mp4", "");
  a = a.replace(".2cda.pl", ".cda.pl");
  a = a.replace(".3cda.pl", ".cda.pl");
  return -1 < a.indexOf("/upstream")
    ? ((a = a.replace("/upstream", ".mp4/upstream")), "https://" + a)
    : "https://" + a + ".mp4";
};

var xa = function (a) {
  String.fromCharCode(
    ("Z" >= a ? 82 : 132) >= (c = a.charCodeAt(0) + 11) ? c : c - 55
  );
  return wa(a);
};

var ya = function (a) {
  return xa(za(L(a)));
};
