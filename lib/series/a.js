(function () {
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length
        ? {
            done: !1,
            value: a[b++],
          }
        : {
            done: !0,
          };
    };
  }
  function ba(a) {
    var b =
      "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b
      ? b.call(a)
      : {
          next: aa(a),
        };
  }
  var e =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this,
    ca =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, d) {
            a != Array.prototype && a != Object.prototype && (a[b] = d.value);
          };
  function da(a, b) {
    if (b) {
      var d = e;
      a = a.split(".");
      for (var f = 0; f < a.length - 1; f++) {
        var g = a[f];
        g in d || (d[g] = {});
        d = d[g];
      }
      a = a[a.length - 1];
      f = d[a];
      b = b(f);
      b != f &&
        null != b &&
        ca(d, a, {
          configurable: !0,
          writable: !0,
          value: b,
        });
    }
  }
  da("Promise", function (a) {
    function b(a) {
      this.bf = 0;
      this.Jh = void 0;
      this.qe = [];
      var b = this.Ig();
      try {
        a(b.resolve, b.reject);
      } catch (u) {
        b.reject(u);
      }
    }
    function d() {
      this.Rc = null;
    }
    function f(a) {
      return a instanceof b
        ? a
        : new b(function (b) {
            b(a);
          });
    }
    if (a) return a;
    d.prototype.Ki = function (a) {
      null == this.Rc && ((this.Rc = []), this.hl());
      this.Rc.push(a);
    };
    d.prototype.hl = function () {
      var a = this;
      this.Li(function () {
        a.Dl();
      });
    };
    var g = e.setTimeout;
    d.prototype.Li = function (a) {
      g(a, 0);
    };
    d.prototype.Dl = function () {
      for (; this.Rc && this.Rc.length; ) {
        var a = this.Rc;
        this.Rc = [];
        for (var b = 0; b < a.length; ++b) {
          var d = a[b];
          a[b] = null;
          try {
            d();
          } catch (v) {
            this.il(v);
          }
        }
      }
      this.Rc = null;
    };
    d.prototype.il = function (a) {
      this.Li(function () {
        throw a;
      });
    };
    b.prototype.Ig = function () {
      function a(a) {
        return function (f) {
          d || ((d = !0), a.call(b, f));
        };
      }
      var b = this,
        d = !1;
      return {
        resolve: a(this.Xn),
        reject: a(this.Hh),
      };
    };
    b.prototype.Xn = function (a) {
      if (a === this)
        this.Hh(new TypeError("A Promise cannot resolve to itself"));
      else if (a instanceof b) this.so(a);
      else {
        a: switch (typeof a) {
          case "object":
            var d = null != a;
            break a;
          case "function":
            d = !0;
            break a;
          default:
            d = !1;
        }
        d ? this.Wn(a) : this.Vi(a);
      }
    };
    b.prototype.Wn = function (a) {
      var b = void 0;
      try {
        b = a.then;
      } catch (u) {
        this.Hh(u);
        return;
      }
      "function" == typeof b ? this.to(b, a) : this.Vi(a);
    };
    b.prototype.Hh = function (a) {
      this.zk(2, a);
    };
    b.prototype.Vi = function (a) {
      this.zk(1, a);
    };
    b.prototype.zk = function (a, b) {
      if (0 != this.bf)
        throw Error(
          "Cannot settle(" +
            a +
            ", " +
            b +
            "): Promise already settled in state" +
            this.bf
        );
      this.bf = a;
      this.Jh = b;
      this.El();
    };
    b.prototype.El = function () {
      if (null != this.qe) {
        for (var a = 0; a < this.qe.length; ++a) l.Ki(this.qe[a]);
        this.qe = null;
      }
    };
    var l = new d();
    b.prototype.so = function (a) {
      var b = this.Ig();
      a.Af(b.resolve, b.reject);
    };
    b.prototype.to = function (a, b) {
      var d = this.Ig();
      try {
        a.call(b, d.resolve, d.reject);
      } catch (v) {
        d.reject(v);
      }
    };
    b.prototype.then = function (a, d) {
      function f(a, b) {
        return "function" == typeof a
          ? function (b) {
              try {
                g(a(b));
              } catch (Ba) {
                k(Ba);
              }
            }
          : b;
      }
      var g,
        k,
        l = new b(function (a, b) {
          g = a;
          k = b;
        });
      this.Af(f(a, g), f(d, k));
      return l;
    };
    b.prototype.catch = function (a) {
      return this.then(void 0, a);
    };
    b.prototype.Af = function (a, b) {
      function d() {
        switch (f.bf) {
          case 1:
            a(f.Jh);
            break;
          case 2:
            b(f.Jh);
            break;
          default:
            throw Error("Unexpected state: " + f.bf);
        }
      }
      var f = this;
      null == this.qe ? l.Ki(d) : this.qe.push(d);
    };
    b.resolve = f;
    b.reject = function (a) {
      return new b(function (b, d) {
        d(a);
      });
    };
    b.race = function (a) {
      return new b(function (b, d) {
        for (var g = ba(a), k = g.next(); !k.done; k = g.next())
          f(k.value).Af(b, d);
      });
    };
    b.all = function (a) {
      var d = ba(a),
        g = d.next();
      return g.done
        ? f([])
        : new b(function (a, b) {
            function k(b) {
              return function (d) {
                l[b] = d;
                p--;
                0 == p && a(l);
              };
            }
            var l = [],
              p = 0;
            do
              l.push(void 0),
                p++,
                f(g.value).Af(k(l.length - 1), b),
                (g = d.next());
            while (!g.done);
          });
    };
    return b;
  });
  function ea() {
    ea = function () {};
    e.Symbol || (e.Symbol = ja);
  }
  var ja = (function () {
    var a = 0;
    return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  })();
  function h() {
    ea();
    var a = e.Symbol.iterator;
    a || (a = e.Symbol.iterator = e.Symbol("iterator"));
    "function" != typeof Array.prototype[a] &&
      ca(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return ka(aa(this));
        },
      });
    h = function () {};
  }
  function ka(a) {
    h();
    a = {
      next: a,
    };
    a[e.Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function m() {
    this.Me = !1;
    this.gd = null;
    this.og = void 0;
    this.Gc = 1;
    this.Ti = this.Df = 0;
    this.Wd = null;
  }
  function n(a) {
    if (a.Me) throw new TypeError("Generator is already running");
    a.Me = !0;
  }
  m.prototype.Pe = function (a) {
    this.og = a;
  };
  m.prototype.df = function (a) {
    this.Wd = {
      Cl: a,
      am: !0,
    };
    this.Gc = this.Df || this.Ti;
  };
  m.prototype.return = function (a) {
    this.Wd = {
      return: a,
    };
    this.Gc = this.Ti;
  };
  function q(a, b, d) {
    a.Gc = d;
    return {
      value: b,
    };
  }
  function la(a) {
    a.Gc = 7;
    a.Df = 0;
  }
  function ma(a) {
    a.Df = 0;
    a.Wd = null;
  }
  function r(a) {
    this.oa = new m();
    this.Un = a;
  }
  r.prototype.Pe = function (a) {
    n(this.oa);
    if (this.oa.gd) return t(this, this.oa.gd.next, a, this.oa.Pe);
    this.oa.Pe(a);
    return w(this);
  };
  function na(a, b) {
    n(a.oa);
    var d = a.oa.gd;
    if (d)
      return t(
        a,
        "return" in d
          ? d["return"]
          : function (a) {
              return {
                value: a,
                done: !0,
              };
            },
        b,
        a.oa.return
      );
    a.oa.return(b);
    return w(a);
  }
  r.prototype.df = function (a) {
    n(this.oa);
    if (this.oa.gd) return t(this, this.oa.gd["throw"], a, this.oa.Pe);
    this.oa.df(a);
    return w(this);
  };
  function t(a, b, d, f) {
    try {
      var g = b.call(a.oa.gd, d);
      if (!(g instanceof Object))
        throw new TypeError("Iterator result " + g + " is not an object");
      if (!g.done) return (a.oa.Me = !1), g;
      var l = g.value;
    } catch (k) {
      return (a.oa.gd = null), a.oa.df(k), w(a);
    }
    a.oa.gd = null;
    f.call(a.oa, l);
    return w(a);
  }
  function w(a) {
    for (; a.oa.Gc; )
      try {
        var b = a.Un(a.oa);
        if (b)
          return (
            (a.oa.Me = !1),
            {
              value: b.value,
              done: !1,
            }
          );
      } catch (d) {
        (a.oa.og = void 0), a.oa.df(d);
      }
    a.oa.Me = !1;
    if (a.oa.Wd) {
      b = a.oa.Wd;
      a.oa.Wd = null;
      if (b.am) throw b.Cl;
      return {
        value: b.return,
        done: !0,
      };
    }
    return {
      value: void 0,
      done: !0,
    };
  }
  function oa(a) {
    this.next = function (b) {
      return a.Pe(b);
    };
    this.throw = function (b) {
      return a.df(b);
    };
    this.return = function (b) {
      return na(a, b);
    };
    h();
    this[Symbol.iterator] = function () {
      return this;
    };
  }
  function pa(a) {
    function b(b) {
      return a.next(b);
    }
    function d(b) {
      return a.throw(b);
    }
    new Promise(function (f, g) {
      function l(a) {
        a.done ? f(a.value) : Promise.resolve(a.value).then(b, d).then(l, g);
      }
      l(a.next());
    });
  }
  da("Math.sign", function (a) {
    return a
      ? a
      : function (a) {
          a = Number(a);
          return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1;
        };
  });
  var x,
    y,
    z,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    qa,
    I,
    J,
    K,
    ra,
    sa,
    ta,
    ua,
    va,
    L,
    wa,
    xa,
    N,
    ya,
    za,
    O,
    Aa;
  x = function (a) {
    var b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return "object";
        var d = Object.prototype.toString.call(a);
        if ("[object Window]" == d) return "object";
        if ("[object Array]" == d && "number" == typeof a.length)
          return "array";
        if ("[object Function]" == d && "undefined" != typeof a.call)
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  };
  y = function (a) {
    return null == a;
  };
  z = function (a) {
    return "undefined" == typeof a;
  };
  A = function (a) {
    return "function" == x(a);
  };
  B = function (a) {
    return "object" == x(a);
  };
  C = function (a) {
    var b = x(a);
    return "array" == b || ("object" == b && "number" == typeof a.length);
  };
  D = function (a) {
    return "number" == typeof a;
  };
  E = function (a) {
    return "string" == typeof a;
  };
  F = function (a) {
    return "boolean" == typeof a;
  };
  G = function (a) {
    return Number(a) === a && 0 === a % 1;
  };
  H = function (a) {
    return Number(a) === a && 0 !== a % 1;
  };
  qa = function () {
    return y(window.frameElement) && window.self == window.top ? !1 : !0;
  };
  Aa = function (a) {
    a = a.replace(".cda.mp4", "");
    a = a.replace(".2cda.pl", ".cda.pl");
    a = a.replace(".3cda.pl", ".cda.pl");
    return -1 < a.indexOf("/upstream")
      ? ((a = a.replace("/upstream", ".mp4/upstream")), "https://" + a)
      : "https://" + a + ".mp4";
  };
  za = function (a) {
    return decodeURIComponent(a);
  };
  I = function (a, b) {
    return -1 != a.indexOf(b);
  };
  J = function (a, b) {
    return -1 != a.toLowerCase().indexOf(b.toLowerCase());
  };
  K = function (a, b) {
    try {
      var d = b.exec(a);
      return d && 1 <= d.length ? d[1] : "";
    } catch (f) {
      return "";
    }
  };
  wa = function (a) {
    for (var b = [], d = 0; d < a.length; d++) {
      var f = a.charCodeAt(d);
      b[d] =
        33 <= f && 126 >= f
          ? String.fromCharCode(33 + ((f + 14) % 94))
          : String.fromCharCode(f);
    }
    return Aa(b.join(""));
  };
  ra = function () {
    var a = null;
    try {
      a = window.localStorage || null;
    } catch (b) {}
    return a;
  };
  sa = function () {
    var a = null;
    try {
      a = window.sessionStorage || null;
    } catch (b) {}
    return a;
  };
  ta = function () {
    var a = 0,
      b = 0;
    D(window.innerWidth)
      ? ((a = window.innerWidth), (b = window.innerHeight))
      : z(document.documentElement) ||
        (z(document.documentElement.clientWidth) &&
          z(document.documentElement.clientHeight))
      ? z(document.body) ||
        (z(document.body.clientWidth) && z(document.body.clientHeight)) ||
        ((a = document.body.clientWidth), (b = document.body.clientHeight))
      : ((a = document.documentElement.clientWidth),
        (b = document.documentElement.clientHeight));
    return {
      width: a,
      height: b,
    };
  };
  ua = function () {
    var a = window.navigator;
    return z(a) || z(a.userAgent) ? "" : a.userAgent;
  };
  ya = function (a) {
    return xa(za(L(a)));
  };
  va = function () {
    return window.navigator;
  };
  N = function (a) {
    String.fromCharCode(
      ("Z" >= a ? 11 : 344) >= (c = a.charCodeAt(0) + 22) ? c : c - 11
    );
    a = a.replace("_XDDD", "");
    a = a.replace("_CDA", "");
    a = a.replace("_ADC", "");
    a = a.replace("_CXD", "");
    a = a.replace("_QWE", "");
    a = a.replace("_Q5", "");
    a = a.replace("_IKSDE", "");
    return ya(L(a));
  };
  L = function (a) {
    return a.replace(/[a-zA-Z]/g, function (a) {
      return String.fromCharCode(
        ("Z" >= a ? 90 : 122) >= (a = a.charCodeAt(0) + 13) ? a : a - 26
      );
    });
  };
  xa = function (a) {
    String.fromCharCode(
      ("Z" >= a ? 82 : 132) >= (c = a.charCodeAt(0) + 11) ? c : c - 55
    );
    return wa(a);
  };
  O = function (a) {
    return !I(a, "http") && !I(a, ".mp4") && !I(a, "uggcf://");
  };
  var P = ("undefined" !== typeof HTMLElement ? HTMLElement : Element)
    .prototype;
  P.s = function (a) {
    z(this.classList)
      ? (this.className = this.className + " " + a)
      : this.classList.add(a);
  };
  P.C = function (a) {
    if (y(a) || z(a)) this.className = "";
    else if (z(this.classList)) {
      for (var b = this.className.split(" "), d = "", f = 0; f < b.length; f++)
        a != b[f] && (d += b[f] + " ");
      this.className = d;
    } else this.classList.remove(a);
  };
  P.G = function (a) {
    return z(this) || -1 === this.className.indexOf(a) ? !1 : !0;
  };
  P.Jf = function () {
    return !z(this) && A(this.getBoundingClientRect)
      ? this.getBoundingClientRect()
      : !1;
  };
  P.$a = function (a) {
    z(this) || y(this) || (this.style.width = a);
  };
  P.ac = function () {
    return z(this) ? 0 : this.offsetWidth;
  };
  P.Oh = function (a) {
    z(this) || y(this) || (this.style.height = a);
  };
  P.Vc = function () {
    return z(this) ? 0 : this.offsetHeight;
  };
  P.R = function () {
    return z(this) || z(this.offsetParent) || y(this.offsetParent) ? !1 : !0;
  };
  P.m = function () {
    z(this) || y(this) || (this.style.display = "none");
  };
  P.show = function () {
    z(this) || y(this) || (this.style.display = "block");
  };
  P.Ck = function () {
    z(this) || y(this) || (this.style.display = "flex");
  };
  P.ha = function (a) {
    z(this) || (this.innerHTML = a);
  };
  function Q(a, b) {
    if (!a) throw Error("Failed to create player.");
    if (!1 === this.rl())
      throw Error("Domain " + this.fe() + " is not supported.");
    window.focus();
    this.bl = "2.2.22060901";
    this.c = "cda.Player";
    this.ld = this.xe = this.Bi = this.Fi = -1;
    this.we = this.rg = !1;
    this.rf = 0;
    this.pf = this.wi = this.ug = this.Ci = this.sf = !1;
    this.lb = 0;
    this.bi = this.Sd = !1;
    this.options = a;
    this.element = document.getElementById(this.Pa(this.options, "id"));
    this.D = new Ca();
    this.storage = new Da();
    this.w = this.view = new Ea(this);
    this.view.yl(this.element);
    this.view.jo();
    this.Wb = null;
    this.state = Fa;
    this.event = new R();
    this.h = new Ga();
    this.T = new Ha(this);
    this.video = this.view.video;
    this.W = this.view.W;
    this.contextMenu = this.view.contextMenu;
    this.X = null;
    this.ae = this.be = -1;
    this.Qa = null;
    this.Fd = !0;
    this.dc = this.nh = !1;
    this.La = null;
    this.oh = 7;
    this.Wf = "204px";
    this.wc = !1;
    this.xb = null;
    this.je = !1;
    this.v = this.Ac = null;
    this.J = !1;
    this.Lh = this.duration = this.currentTime = -1;
    this.O = !1;
    this.id = null;
    this.loop = this.ended = this.autoplay = !1;
    this.Tf =
      this.Uf =
      this.Pb =
      this.Ad =
      this.Bd =
      this.Db =
      this.Wc =
      this.Sf =
      this.da =
      this.Uh =
      this.src =
        null;
    this.kh = -1;
    this.Fc = this.lh = !1;
    this.Cd = [];
    this.o = null;
    this.Ef = this.de = this.Kg = this.ce = this.Uc = this.Si = this.Jg = !1;
    this.rd = null;
    this.ai = this.Lg = !1;
    this.Z = null;
    this.M = this.Ak = this.gg = !1;
    this.ka = null;
    this.gf = !1;
    this.Qd = null;
    this.Wh = this.ff = !1;
    this.P = null;
    this.kk = !1;
    this.dg = this.Ta = -1;
    this.b = null;
    this.xf = [];
    this.Ji = !1;
    this.i = {};
    this.fa = !1;
    this.ea =
      "play playing pause seeking seeked canplay canplaythrough loadstart loadeddata loadedmetadata error abort stalled suspend volumechange progress durationchange ratechange timeupdate waiting contextmenu click ended".split(
        " "
      );
    this.updating = !1;
    this.test = 0;
    this.Tb = this.fd = null;
    this.sb =
      this.disabled =
      this.lk =
      this.Ub =
      this.ab =
      this.ra =
      this.Sb =
        !1;
    this.He = null;
    this.ia = -1;
    this.ne = this.Pi = !1;
    this.vf = -1;
    this.poster = {
      So: "//static.cda.pl/v001/img/mobile/poster16x9.png",
    };
    this.volume = -1;
    this.Mg =
      this.Fh =
      this.Ei =
      this.$g =
      this.mh =
      this.Ba =
      this.cc =
      this.Ab =
      this.gh =
        !1;
    this.fullScreen = new Ia(
      this.view,
      this.D.bind(this, this.xm),
      this.D.bind(this, this.ym),
      this
    );
    window.onmessage = this.D.bind(this, this.wh);
    this.tj();
    this.Va(this.state.fb);
    this.vj();
    if (null == this.X || this.src || this.da) this.mc();
    else
      try {
        var d = this;
        window[this.X.client].videoGetLink(
          this.f.id,
          this.f.quality,
          this.f.ts,
          this.f.hash,
          {
            success: function (a) {
              "ok" == a.status && null != a.resp && (d.src = a.resp);
              d.mc();
            },
            error: function () {
              d.mc();
            },
          }
        );
      } catch (f) {
        this.mc();
      }
    d = this;
    new MutationObserver(function (a) {
      a.forEach(function (a) {
        "attributes" == a.type &&
          "player_data" == a.attributeName &&
          ((a = JSON.parse(b.getAttribute("player_data"))), d.Mk(a));
      });
    }).observe(b, {
      attributes: !0,
    });
    try {
      this.vo();
    } catch (f) {}
  }
  P = Q.prototype = {};
  P.Mk = function (a) {
    this.getState() != this.state.fb &&
      (this.view.m(this.view.alert),
      this.controls.enable(),
      (this.disabled = !1),
      null != this.o
        ? (this.h.F() &&
            (this.o.pause(), this.o.reset(), this.Vn(), (this.o = null)),
          (this.Jg = !0),
          (this.Lg = !1),
          null != this.rd && (window.clearTimeout(this.rd), (this.rd = null)))
        : null != this.P
        ? (this.P.pause(), (this.ai = !0))
        : null != this.Z
        ? this.Z.unload()
        : this.video.pause());
    if (this.M) {
      this.Qd = null;
      this.ff = !1;
      window.clearInterval(this.controls.Wa);
      this.controls.Wa = null;
      this.controls.jg = !0;
      var b = this;
      this.controls.Wa = window.setInterval(function () {
        b.controls.hf(
          b.ka.program.start_time_ts,
          b.ka.program.start_time_format,
          b.ka.program.end_time_ts,
          b.ka.program.end_time_format
        );
      }, 100);
    }
    this.options = a;
    this.vj();
    this.da &&
      -1 < this.da.indexOf("redefine") &&
      (this.T.Ze(!1), this.T.cd(!1));
    this.T.za();
    this.mc(!0);
  };
  P.mc = function (a) {
    if (z(a)) {
      (J(window.navigator.userAgent, "AppleTV") || this.h.sa()) &&
        this.video.setAttribute("x-webkit-airplay", "allow");
      a = !1;
      try {
        var b = this.h.Pg();
        0 != b && 4 > parseInt(b) && (a = !0);
      } catch (k) {}
      b = this.fullScreen.isEnabled();
      try {
        !this.ta() &&
          this.h.sa() &&
          10 <= parseInt(this.h.Tg()) &&
          !b &&
          (b = !0);
      } catch (k) {}
      if (
        this.h.bm() ||
        this.h.dm() ||
        !(
          (!b && !this.ta()) ||
          (this.h.ke() && this.h.Wl()) ||
          this.h.qj() ||
          this.h.hj() ||
          this.h.Vl() ||
          this.h.Yl() ||
          J(window.navigator.userAgent, "AppleTV") ||
          a
        )
      ) {
        this.Ba && (this.autoplay = !0);
        this.ho();
        this.io();
        this.view.m(this.view.contextMenu);
        if ("function" === typeof S)
          this.O ||
            ((a = new S(this.W, this, this.fullScreen)),
            null !== a &&
              !1 !== a &&
              ((this.controls = a), this.controls.enable()));
        else throw Error("Failed to load controls class.");
        this.h.F() && !this.Ba && this.view.s(this.view.W, "pb-mobile");
        this.h.Ja() && !this.Ba && this.view.s(this.view.W, "pb-tv");
        this.h.Rf() && this.view.s(this.view.W, "pb-browser-opera");
        this.i.Wj = T(this.Vb, "dblclick", this.Wj, this);
        this.i.Fj = T(this.contextMenu, "click", this.Fj, this);
        this.i.ak = T(this.view.Qn, "click", this.ak, this);
        this.i.ck = T(this.view.Rn, "click", this.ck, this);
        this.i.Op = T(this.view.Pn, "click", this.bk, this);
        this.i.Pp = T(this.view.Tn, "click", this.bk, this);
        this.i.Ii = T(
          this.view.j(".pb-ad-pause-plt-skip"),
          "click",
          this.Ii,
          this
        );
        g = this;
        var d = "hidden";
        a = function () {
          g.ne = !z(window.document[d]) && window.document[d] ? !1 : !0;
        };
        d in window.document
          ? window.document.addEventListener("visibilitychange", a)
          : (d = "mozHidden") in window.document
          ? window.document.addEventListener("mozvisibilitychange", a)
          : (d = "webkitHidden") in window.document
          ? window.document.addEventListener("webkitvisibilitychange", a)
          : (d = "msHidden") in window.document &&
            window.document.addEventListener("msvisibilitychange", a);
        this.ne = !z(window.document[d]) && window.document[d] ? !1 : !0;
        if (!this.h.Ja()) {
          g = this;
          var f = !1;
          setInterval(function () {
            if (!g.je && null === g.Ac) {
              if (g.getState() === g.state.ga) {
                if (0 >= g.currentTime) g.controls.H(!0);
                else {
                  if (2 === g.networkState() && 3 > g.readyState())
                    g.controls.H(!0), !1 === g.sf && (g.pk(!0), g.cl());
                  else if (1 === g.networkState() || 3 <= g.readyState())
                    null == g.Z
                      ? g.de || g.controls.H(!1)
                      : g.gg || g.controls.H(!1);
                  g.video.currentTime < g.currentTime &&
                    g.xe === g.state.gi &&
                    g.controls.H(!0);
                  g.video.currentTime > g.currentTime &&
                    g.xe === g.state.li &&
                    g.controls.H(!0);
                }
                null != g.o &&
                  g.Uc &&
                  g.autoplay &&
                  g.video.paused &&
                  !g.controls.aa.R() &&
                  !g.controls.N.R() &&
                  !g.J &&
                  ((g.video.muted = !0),
                  (g.video.autoplay = "autoplay"),
                  (g.Ab = !0),
                  g.L(0, !0),
                  g.controls.L(0, !0),
                  g.controls.se(),
                  g.o.play());
              }
              null !== g.controls && g.controls.oe();
            }
            g.getState() !== g.state.fb || !g.ended || g.J || g.loop || g.Ni();
            g.view.pa.G("pb-playing") &&
              g.getState() != g.state.ga &&
              0 >= g.video.currentTime &&
              !f &&
              !g.controls.aa.R() &&
              null != g.v &&
              (g.v.play(), (f = !0));
            try {
              g.ta() || (g.Sd = g.Hg());
            } catch (k) {}
          }, 50);
        }
        this.gj() && this.ah() && this.dl();
        this.ta() && (this.$g || this.uj());
      } else if (
        (this.video.m(),
        (this.O = !0),
        (this.video.controls = !0),
        this.view.C(this.view.W, "pb-controls"),
        this.view.C(this.view.W, "pb-video-full"),
        this.view.s(this.view.W, "pb-nocontrols"),
        this.view.s(this.view.W, "pb-video-native-light"),
        this.view.m(this.view.j(".pb-play-ico")),
        this.view.m(this.view.j(".pb-loader-ico")),
        this.view.m(this.view.j(".pb-video-click")),
        this.view.m(this.view.j(".pb-vid-click")),
        this.f.poster &&
          ((a = document.createElement("img")),
          (a.src = this.f.poster),
          (a.alt = "poster"),
          this.view.ng.insertBefore(a, this.view.ng.firstChild),
          this.view.N.show()),
        (this.i.Ah = T(this.view.ng, "click", this.Ah, this)),
        (this.i.Id = T(this.view.N, "click", this.Ah, this)),
        !this.h.Ja())
      ) {
        var g = this;
        setInterval(function () {
          g.getState() !== g.state.fb || !g.ended || g.J || g.loop || g.Ni();
        }, 50);
      }
      if (window.Worker && !this.O) {
        try {
          var l = new Worker("/js/player_html5/player.worker.js");
        } catch (k) {
          l = null;
        }
        null != l
          ? ((this.Wb = {
              id: 0,
              Fg: {},
              setInterval: function (a, b, d) {
                this.id++;
                var f = this.id;
                this.Fg[f] = {
                  Ui: a,
                  context: d,
                };
                l.postMessage({
                  command: "interval:start",
                  interval: b,
                  id: f,
                });
                return f;
              },
              wh: function (a) {
                switch (a.data.message) {
                  case "interval:tick":
                    (a = this.Fg[a.data.id]) && a.Ui && a.Ui.apply(a.context);
                    break;
                  case "interval:cleared":
                    delete this.Fg[a.data.id];
                }
              },
              clearInterval: function (a) {
                l.postMessage({
                  command: "interval:clear",
                  id: a,
                });
              },
            }),
            (l.onmessage = this.Wb.wh.bind(this.Wb)))
          : (this.Wb = window);
      } else this.Wb = window;
    }
    if (!this.h.Ja() || this.h.xd())
      this.h.sa() || this.h.fh() || (this.video.preload = "none");
    this.disabled
      ? ((this.video.preload = "none"),
        this.controls.disable(),
        this.f.duration && this.controls.Ua(Number(this.f.duration)))
      : (this.Ye(),
        this.da || this.O || this.td(),
        this.O ||
          !this.h.mj() ||
          z(this.f.width) ||
          z(this.f.height) ||
          ((a = (this.f.height / this.f.width) * 100),
          a < (window.screen.height / window.screen.width) * 100
            ? ((this.view.mg.style["padding-top"] = a + "%"),
              this.view.content.s("pb-playstation-panorama"))
            : ((this.view.mg.style.width =
                (window.screen.height / window.screen.width) *
                  (this.f.width / this.f.height) *
                  100 +
                "%"),
              this.view.content.s("pb-playstation-vertical"))),
        this.log(this.c, "autoplay: " + this.autoplay),
        this.O
          ? ((this.video.controls = !0),
            (this.video.src = this.src),
            this.autoplay && (this.video.autoplay = !0),
            this.h.F() ||
              this.h.xd() ||
              (this.load(), this.log(this.c, "video.load()")))
          : (this.M ||
              this.cc ||
              this.w.yk.G("pb-quality-posible") ||
              this.w.yk.s("pb-quality-posible"),
            this.autoplay
              ? this.h.F()
                ? this.M
                  ? this.rb()
                  : this.Ke(this.b, 0)
                  ? this.Pd(this.b, 0)
                  : (this.h.F() ||
                      this.h.xd() ||
                      (this.load(), this.log(this.c, "video.load()")),
                    this.Zd(),
                    this.da ? this.T.za() : (this.T.za(), this.Je()))
                : this.M
                ? this.rb()
                : this.Ke(this.b, 0) && !this.O
                ? this.Pd(this.b, 0)
                : (this.h.F() ||
                    this.h.xd() ||
                    (this.load(), this.log(this.c, "video.load()")),
                  this.da ? this.T.za() : (this.T.za(), this.Je()),
                  this.rb())
              : this.Ke(this.b, 0) && !this.O
              ? this.Pd(this.b, 0)
              : (this.h.F() ||
                  this.h.xd() ||
                  (this.load(), this.log(this.c, "video.load()")),
                this.da ? this.T.za() : (this.T.za(), this.Je()))),
        (g = this),
        (window.onbeforeunload = function () {
          g.lk = !0;
        }));
  };
  P.vj = function () {
    this.Pa(this.options, "video") && (this.f = this.options.video);
    this.Pa(this.options, "api") && (this.X = this.options.api);
    this.Pa(this.options, "ads") && (this.b = this.options.ads);
    this.Pa(this.options, "id") && (this.id = this.options.id);
    this.Pa(this.options, "disabled") &&
      (this.disabled = this.options.disabled);
    this.Pa(this.options, "nextVideo") && (this.Qa = this.options.nextVideo);
    this.Pa(this.options, "autoplay") &&
      (this.Ei = this.autoplay = this.options.autoplay);
    this.Pa(this.options, "seekTo") &&
      0 < this.Pa(this.options, "seekTo") &&
      (this.Ta = this.options.seekTo);
    this.Pa(this.options, "mute") && (this.mh = this.options.mute);
    this.Pa(this.options, "widget") && (this.cc = !0);
    this.Pa(this.options, "embed_related_video") && (this.Ba = !0);
    this.Pa(this.options, "disable_video_preload") && (this.Mg = !0);
    this.f.file &&
      (O(this.f.file) && (this.f.file = N(this.f.file)),
      -1 == this.f.file.indexOf("http") && (this.f.file = L(this.f.file)),
      -1 == this.f.file.indexOf(".webm") &&
        -1 == this.f.file.indexOf(".mp4") &&
        (this.f.file += ".mp4"));
    this.f.file_cast &&
      (O(this.f.file_cast) && (this.f.file_cast = N(this.f.file_cast)),
      -1 == this.f.file_cast.indexOf("http") &&
        (this.f.file_cast = L(this.f.file_cast)),
      -1 == this.f.file_cast.indexOf(".mp4") && (this.f.file_cast += ".mp4"),
      -1 < this.f.file_cast.indexOf("adc.mp4") &&
        (this.f.file_cast = this.f.file_cast.replace("adc.mp4", ".mp4")));
    this.f.file && (this.src = this.f.file);
    this.f.file_cast && (this.Uh = this.f.file_cast);
    y(this.f.manifest) || z(this.f.manifest) || (this.da = this.f.manifest);
    y(this.f.manifest_cast) ||
      z(this.f.manifest_cast) ||
      (this.Sf = this.f.manifest_cast);
    y(this.f.manifest_drm_proxy) ||
      z(this.f.manifest_drm_proxy) ||
      (this.Wc = this.f.manifest_drm_proxy);
    y(this.f.manifest_drm_header) ||
      z(this.f.manifest_drm_header) ||
      (this.Db = this.f.manifest_drm_header);
    y(this.f.manifest_drm_pr_proxy) ||
      z(this.f.manifest_drm_pr_proxy) ||
      (this.Bd = this.f.manifest_drm_pr_proxy);
    y(this.f.manifest_drm_pr_header) ||
      z(this.f.manifest_drm_pr_header) ||
      (this.Ad = this.f.manifest_drm_pr_header);
    y(this.f.manifest_apple) ||
      z(this.f.manifest_apple) ||
      (this.Pb = this.f.manifest_apple);
    y(this.f.manifest_drm_apple_certificate) ||
      z(this.f.manifest_drm_apple_certificate) ||
      (this.Tf = this.f.manifest_drm_apple_certificate);
    y(this.f.manifest_drm_apple_license) ||
      z(this.f.manifest_drm_apple_license) ||
      (this.Uf = this.f.manifest_drm_apple_license);
    y(this.f.manifest_audio_stereo_bitrate) ||
      z(this.f.manifest_audio_stereo_bitrate) ||
      (this.kh = this.f.manifest_audio_stereo_bitrate);
    y(this.f.manifest_forced_audio_hd) ||
      z(this.f.manifest_forced_audio_hd) ||
      (this.lh = this.f.manifest_forced_audio_hd);
    y(this.f.manifest_auto_quality) ||
      z(this.f.manifest_auto_quality) ||
      (this.Fc = this.f.manifest_auto_quality);
    !z(this.f.quality_change_in_player) &&
      this.f.quality_change_in_player &&
      (this.kk = !0);
    this.Pa(this.options, "tv_live") &&
      ((this.M = !0),
      (this.ka = this.options.tv_live.channel),
      (this.la = this.options.tv_live.channels));
    this.f.hasOwnProperty("cast_available") &&
      null != this.f.cast_available &&
      null != this.T &&
      this.T.eo(this.f.cast_available);
    this.f.poster && this.Qh(this.f.poster);
    this.Pa(this.options, "premium") &&
      !0 === this.options.premium &&
      this.view.s(this.view.zd, "pb-logo-premium");
    this.Pa(this.options, "cuePoints") && (this.He = this.options.cuePoints);
    if (!1 !== this.$b("cda.player.ppst")) {
      var a = this.$b("cda.player.ppst").split(":");
      if (this.options.video.id == a[0] && !0 === this.ih()) {
        this.Ta = Number(a[1]);
        try {
          document.cookie =
            "cda.player.ppst=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        } catch (b) {}
      }
    }
  };
  P.td = function () {
    this.log(this.c, "initEvents");
    if (!this.rg) {
      for (var a in this.ea)
        "" != this.ea[a] &&
          (this.i[this.ea[a]] =
            "contextmenu" == this.ea[a]
              ? T(this.view.rc, this.ea[a], this.pc(this.ea[a]), this)
              : T(this.video, this.ea[a], this.pc(this.ea[a]), this));
      this.rg = !0;
    }
  };
  P.Xe = function () {
    this.log(this.c, "removeEvents");
    for (var a in this.ea)
      "" != this.ea[a] &&
        ("contextmenu" == this.ea[a]
          ? U(this.view.rc, this.ea[a], this.i[this.ea[a]])
          : U(this.video, this.ea[a], this.i[this.ea[a]]),
        (this.i[this.ea[a]] = null));
    this.rg = !1;
  };
  P.pc = function (a) {
    var b = null;
    switch (a) {
      case "play":
        b = this.pe;
        break;
      case "playing":
        b = this.xh;
        break;
      case "pause":
        b = this.oc;
        break;
      case "seeking":
        b = this.zh;
        break;
      case "seeked":
        b = this.yh;
        break;
      case "canplay":
        b = this.rh;
        break;
      case "canplaythrough":
        b = this.Se;
        break;
      case "loadstart":
        b = this.vh;
        break;
      case "loadeddata":
        b = this.th;
        break;
      case "loadedmetadata":
        b = this.uh;
        break;
      case "error":
        b = this.Te;
        break;
      case "abort":
        b = this.ph;
        break;
      case "stalled":
        b = this.cn;
        break;
      case "suspend":
        b = this.gn;
        break;
      case "volumechange":
        b = this.An;
        break;
      case "progress":
        b = this.Hm;
        break;
      case "durationchange":
        b = this.wm;
        break;
      case "ratechange":
        b = this.Qm;
        break;
      case "timeupdate":
        b = this.Yc;
        break;
      case "waiting":
        b = this.We;
        break;
      case "contextmenu":
        b = this.tm;
        break;
      case "click":
        b = this.nc;
        break;
      case "ended":
        b = this.Hd;
    }
    return b;
  };
  P.Pa = function (a, b) {
    if (null !== a && "undefined" !== typeof a)
      return a.hasOwnProperty(b) ? a[b] : null;
    throw new TypeError(
      "Nie mo\u017cna pobra\u0107 w\u0142a\u015bciwo\u015bci " +
        b +
        " obiektu " +
        a +
        " poniewa\u017c obiekt jest pusty."
    );
  };
  P.$a = function (a) {
    isNaN(Number(a)) || this.video.$a(a);
  };
  P.Oh = function (a) {
    isNaN(Number(a)) || this.video.Oh(a);
  };
  P.Qh = function (a) {
    this.video.poster = a;
    this.video.setAttribute("poster", a);
  };
  P.op = function () {
    return this.video.poster || this.video.getAttribute("poster");
  };
  P.fg = function (a) {
    a &&
      (this.video.canPlayType("video/mp4")
        ? ((this.video.src = a), this.video.setAttribute("src", a))
        : ((a = this.xl()),
          !1 !== a &&
            (a.show(),
            this.video.remove(),
            this.controls.aa.m(),
            this.controls.N.m(),
            this.controls.controls.m())));
  };
  P.l = function () {
    return null != this.P
      ? this.P.currentTime() || 0
      : this.video.currentTime || 0;
  };
  P.Eb = function (a) {
    if (this.le(a) || this.Pf(a))
      (this.currentTime = a),
        (this.video.currentTime = a),
        null != this.P && this.P.currentTime(a);
  };
  P.K = function () {
    return null != this.P
      ? this.P.duration() || 0
      : this.Kg
      ? this.l()
      : this.video.duration || 0;
  };
  P.Zi = function () {
    return this.video.getAttribute("src");
  };
  P.Va = function (a) {
    this.Fi = a;
  };
  P.getState = function () {
    return this.Fi;
  };
  P.Ph = function (a) {
    this.Bi = a;
  };
  P.mp = function () {
    return this.Bi;
  };
  P.Md = function (a) {
    this.xe = a;
  };
  P.qp = function () {
    return this.xe;
  };
  P.load = function () {
    this.log(this.c, "load");
    this.h.vd() && this.h.pj() && !this.jb()
      ? this.fa || this.sb || this.autoplay
        ? ((this.video.preload = "auto"), this.video.load(), this.Qb())
        : null != this.o ||
          null != this.P ||
          this.Mg ||
          ((this.video.preload = "auto"), this.video.load())
      : null != this.o ||
        null != this.P ||
        this.Mg ||
        ((this.video.preload = "auto"), this.video.load());
  };
  P.play = function (a) {
    this.log(this.c, "play");
    this.log(this.c, arguments);
    this.log(this.c, "autoplay: " + this.autoplay);
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    if (A(window.MediaSource) || this.h.sa())
      this.h.me() || this.h.sa()
        ? y(this.Pb) ||
          "" == this.Pb ||
          (null != this.P && !this.ai) ||
          (null == this.Z && this.ie())
        : y(this.da) ||
          "" == this.da ||
          (null != this.o && !this.Jg) ||
          (this.h.Qf() ? this.Yg() : (null == this.Z || this.M) && this.ie());
    this.O || this.controls.N.m();
    if (!z(a) && a && !this.ra) {
      if (this.h.Ja()) {
        try {
          this.video.play();
        } catch (b) {}
        this.load();
        this.Va(this.state.ga);
        this.log(this.c, "video.play()");
      } else this.load();
      this.log(this.c, "video.load()");
      this.Sb = !0;
    }
    null != this.o && this.o.isReady()
      ? (this.o.play(), this.Va(this.state.ga))
      : null != this.P
      ? (this.P.play(), this.Va(this.state.ga))
      : null != this.Z
      ? ((!this.M || this.h.me() || this.h.sa()) &&
          0 < this.l() &&
          this.video.play(),
        this.Va(this.state.ga))
      : this.Sb ||
        (this.ra
          ? this.zl || null == this.o
            ? (this.autoplay || this.fa || 0 < this.l()) && this.Qb()
            : (this.o.play(), (this.zl = !0), this.Va(this.state.ga))
          : this.ab
          ? (this.autoplay || this.fa || 0 < this.l()) && this.Qb()
          : (this.load(), this.log(this.c, "video.load()")));
    this.view.G(this.view.xa, "pb-video-active") ||
      this.view.s(this.view.xa, "pb-video-active");
  };
  P.Dh = function (a) {
    null == this.o &&
      (this.log(this.c, "video promise error"),
      "undefined" !== a &&
        ((a = a.toString()),
        -1 <
        a.indexOf(
          "play() failed because the user didn't interact with the document first"
        )
          ? (this.log(
              this.c,
              "video promise - play() failed because the user didn't interact with the document first"
            ),
            (this.sb = !0))
          : this.log(this.c, a)),
      0 < this.l() &&
      !this.video.paused &&
      !this.video.ended &&
      2 < this.video.readyState
        ? (this.sb = !1)
        : (this.sb && (this.ab = this.ra = this.Sb = this.autoplay = !1),
          this.Va(this.state.uc),
          this.controls.qa(!0),
          this.controls.H(!1),
          (this.autoplay || this.cc) && 2 >= this.lb && this.Zd()));
  };
  P.Qb = function () {
    this.sb = !1;
    this.Va(this.state.ga);
    if (null == this.o && null == this.P) {
      var a = this.video.play(),
        b = this;
      z(a) ||
        y(a) ||
        a
          .then(function () {
            b.Kd();
            0 < b.lb && (b.lb = 0);
          })
          .catch(this.D.I(this.Dh, this));
    } else null != this.o ? this.o.play() : null != this.P && this.P.play();
    null == this.Tb &&
      this.controls.aa.R() &&
      null == this.o &&
      null == this.Z &&
      null == this.P &&
      (this.Tb = window.setTimeout(function () {
        window.clearTimeout(b.Tb);
        b.Tb = null;
        0 == b.l() &&
          0 == b.K() &&
          2 == b.video.networkState &&
          0 == b.video.readyState &&
          (b.log(b.c, "network problem, reset connection..."),
          b.video.load(),
          b.Zd());
      }, 1e4));
    this.log(this.c, "video play promise");
  };
  P.pause = function () {
    if (this.getState() !== this.state.uc || !this.video.paused) {
      if (null == this.o && null == this.P)
        try {
          this.video.pause();
        } catch (a) {}
      else
        null != this.o ? this.o.pause() : null != this.P && this.P.pause(),
          this.controls.qa(!0);
      this.Ph(this.getState());
      this.Va(this.state.uc);
    }
  };
  P.resume = function () {
    if (this.getState() !== this.state.ga) {
      if (this.h.Ja())
        try {
          this.video.pause();
        } catch (a) {}
      null == this.o && null == this.P
        ? this.video.play()
        : (null != this.o ? this.o.play() : null != this.P && this.P.play(),
          this.controls.ba(!0));
      this.Ph(this.getState());
      this.Va(this.state.ga);
    }
  };
  P.stop = function () {
    this.pause();
    this.video.src = "";
    this.Ph(this.getState());
    this.Va(this.state.fb);
    this.view.G(this.view.xa, "pb-video-active") &&
      this.view.C(this.view.xa, "pb-video-active");
  };
  P.cb = function (a) {
    this.J ||
      (!G(a) && !H(a)) ||
      a > this.K() ||
      (this.re(),
      this.controls.H(!0),
      a > this.l() ? this.Md(this.state.gi) : this.Md(this.state.li),
      this.log(this.c, "seekTo: " + a),
      this.Eb(a),
      this.getState() === this.state.fb &&
        ((this.Ta = a),
        0 >= this.Ta && this.Md(-1),
        this.O || this.controls.ba()));
  };
  P.mk = function (a) {
    if (this.le(a) || this.Pf(a))
      this.currentTime + a < this.K()
        ? this.cb(this.currentTime + a)
        : this.cb(this.K() - 1);
  };
  P.nk = function (a) {
    if (this.le(a) || this.Pf(a))
      0 > this.currentTime - a ? this.cb(0) : this.cb(this.currentTime - a);
  };
  P.lc = function () {
    var a = this.ib("vol");
    return !y(a) && "" != a && ((a = Number(a)), 0 <= a && 100 >= a) ? a : !1;
  };
  P.L = function (a, b) {
    a = Number(a);
    !1 !== this.lc() && !1 === this.Ab && (a = this.lc());
    if (!isNaN(a) && 0 <= a) {
      this.J &&
        (null !== this.view.j(".pb-block-video-player") &&
          ((this.view.j(".pb-block-video-player").volume = (a / 100).toFixed(
            2
          )),
          (this.view.j(".pb-block-video-player").muted = !1)),
        null !== this.view.j(".pb-ad-video-player") &&
          ((this.view.j(".pb-ad-video-player").volume = (a / 100).toFixed(2)),
          (this.view.j(".pb-ad-video-player").muted = !1)));
      this.volume = a.toFixed(2);
      0 == this.volume
        ? (this.gh = !0)
        : ((this.gh = !1),
          (this.video.muted = !1),
          null != this.P && this.P.muted(!1));
      var d = !1;
      if (this.element.G("pb-mobile") || this.element.G("pb-tv")) d = !0;
      if (this.h.F() || this.h.Ja() || d)
        0 < this.volume && (this.volume = 100),
          0 < a
            ? ((this.video.muted = !1), null != this.P && this.P.muted(!1))
            : ((this.video.muted = !0), null != this.P && this.P.muted(!0));
      try {
        this.video.volume = (this.volume / 100).toFixed(2);
      } catch (f) {}
      null != this.P && this.P.volume((this.volume / 100).toFixed(2));
      this.cc || "undefined" !== typeof b || this.Zn(this.volume, this.gh);
    }
  };
  P.Zn = function (a, b) {
    !1 !== this.lc() && !1 === this.Ab
      ? (this.Ab = !0)
      : ((a = {
          volume: a,
          muted: b,
        }),
        this.storage.isEnabled()
          ? this.storage.set("cda-player-volume", a)
          : V.isEnabled() && V.set("cda-player-volume", JSON.stringify(a), 30));
  };
  P.Lf = function () {
    var a = null;
    this.storage.isEnabled()
      ? (a = this.storage.get("cda-player-volume"))
      : V.Fl() && (a = JSON.parse(V.get("cda-player-volume")));
    return !y(a) && a.hasOwnProperty("volume") && a.hasOwnProperty("muted")
      ? a
      : !1;
  };
  P.tp = function () {
    return this.video.Bq;
  };
  P.mh = function () {
    this.video.muted = !0;
  };
  P.rq = function () {
    this.video.muted = !1;
  };
  P.pp = function () {
    return 5;
  };
  P.Ea = function () {
    return ("undefined" !== document.Hl && document.Hl) ||
      ("undefined" !== document.webkitIsFullScreen &&
        document.webkitIsFullScreen) ||
      ("undefined" !== document.mozFullScreen && document.mozFullScreen) ||
      ("undefined" !== document.msFullscreenElement &&
        document.msFullscreenElement)
      ? !0
      : !1;
  };
  P.oc = function () {
    this.video.paused &&
      !this.O &&
      (this.controls.qa(),
      this.gj() && 0 < this.l() && this.l() < this.K() && this.wo());
    if (A(window.onPause) && !this.J) window.onPause();
  };
  P.pe = function () {
    this.view.m(this.view.contextMenu);
    -1 < this.duration && !this.O && this.controls.Ua(this.duration);
    this.video.paused ||
      (this.O || (this.controls.ba(!0), this.aj()),
      this.ended && 12 > this.vf && (this.ended = !1),
      null !== this.La && this.Ek());
    this.J ||
      !this.view.content.G("pb-pip-enabled") ||
      this.view.content.G("pb-frame-posible") ||
      this.T.isConnected() ||
      this.view.od.G("pb-info-ccast-show") ||
      this.view.content.s("pb-frame-posible");
    if (!this.J && !this.M && !this.view.content.G("pb-aspect-posible")) {
      var a =
        window.screen.height > window.screen.width
          ? window.screen.height / window.screen.width
          : window.screen.width / window.screen.height;
      if (this.h.F() || 1.9 <= a)
        this.view.content.s("pb-aspect-posible"),
          this.h.F() && !this.controls.fc && 1.8 <= a && this.controls.If();
    }
    if (A(window.onPlay) && !this.J) window.onPlay();
  };
  P.xh = function () {
    if (
      -1 == this.ia &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      !1 !== this.hb() &&
      (this.Ob() || "premium" == this.f.type || "premium_free" == this.f.type)
    )
      try {
        var a = this;
        window.$.ajax({
          url: "//api.cda.pl/h.php?uid=" + this.hb(),
          type: "post",
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0,
          },
          data: {
            currentTime: 0,
            duration: this.f.duration,
            test: this.Ob(),
            server: this.ge(),
          },
          success: function () {
            a.ia = 0;
          },
        });
      } catch (d) {
        this.log(this.c, d);
      }
    if (null != this.A && !this.J && 0 < this.f.duration)
      try {
        !1 === this.A.impression.fired &&
          ((this.A.impression.fired = !0), this.S(this.A.impression.url)),
          !1 === this.A.start.fired &&
            ((this.A.start.fired = !0), this.S(this.A.start.url));
      } catch (d) {
        this.log(this.c, d);
      }
    !0 === this.sf && this.pk(!1);
    this.fa && (this.fa = !1);
    this.O || this.view.m(this.controls.aa);
    this.getState() !== this.state.ga && this.Va(this.state.ga);
    0 < this.Ta &&
      -1 === this.ld &&
      this.Ta < this.K() &&
      null == this.o &&
      null == this.P &&
      null == this.Z &&
      (this.cb(this.Ta), (this.ld = this.Ta));
    if (-1 < this.dg) {
      var b = (this.dg / 100) * this.K();
      0 < b && this.cb(b);
      this.dg = -1;
    }
  };
  P.Il = function (a) {
    for (var b = 0; b <= this.video.buffered.length - 1; b++)
      if (this.video.buffered.start(b) <= a && this.video.buffered.end(b) >= a)
        return b;
    return this.video.buffered.length - 1;
  };
  P.zh = function () {
    this.dd(!0);
    this.re();
    this.Lh = this.l();
    3 > this.networkState() && (this.O || this.controls.H(!0));
  };
  P.yh = function () {
    this.dd(!1);
    this.Md(-1);
    this.re();
    -1 < this.ia && (this.ia = this.l());
    this.video.paused && this.resume();
    this.O || this.controls.H(!1);
    try {
      var a = this.controls.Ca.querySelectorAll(".pb-progress-midroll-marker");
      if (!y(a) && 0 < a.length)
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          !y(d) &&
            !y(d.getAttribute("data-time")) &&
            d.getAttribute("data-time") < this.l() &&
            d.m();
        }
    } catch (f) {
      this.log(this.c, f);
    }
  };
  P.vh = function () {
    this.log(this.c, "Event", "onLoadstart");
    this.log(this.c, "videoLoaded: " + this.ra);
    this.log(this.c, "videoLoading: " + this.ab);
    this.log(this.c, "startByClick: " + this.fa);
    this.log(this.c, "videoPromiseAutoplayError: " + this.sb);
    this.sb
      ? (this.controls.aa.R() || this.controls.N.R() || this.controls.H(!0),
        this.Zd())
      : (this.ra && (this.ra = !1),
        (this.ab = !0),
        this.fa || this.autoplay
          ? this.controls.H(!0)
          : this.view.xa.G("pb-ady-player-wait") ||
            (this.controls.H(!1), this.controls.N.show()));
  };
  P.uh = function (a) {
    this.log(this.c, "Event", "onLoadedmetadata");
    this.log(this.c, "videoLoaded: " + this.ra);
    this.log(this.c, "videoLoading: " + this.ab);
    this.log(this.c, "startByClick: " + this.fa);
    this.log(this.c, "videoPromiseAutoplayError: " + this.sb);
    z(this.video.duration) ||
      (this.duration = isNaN(this.video.duration) ? 0 : this.video.duration);
    !this.J &&
      -1 < this.duration &&
      !this.O &&
      (this.controls.Ua(this.duration), this.Sh());
    this.view.Ec(this.view.alert) &&
      (this.view.m(this.view.alert), this.controls.enable());
    if (this.sb)
      try {
        2 >= a.target.networkState &&
          4 === a.target.readyState &&
          !this.controls.N.R() &&
          0 >= this.l() &&
          (this.controls.H(!1), this.controls.qa(!0));
      } catch (d) {}
    else {
      if (this.fa || this.jl || this.Sb) {
        var b = this;
        null == this.fd &&
          (this.fd = window.setTimeout(function () {
            window.clearTimeout(b.fd);
            b.fd = null;
            b.Ub || b.Se();
          }, 2e3));
      }
      null == this.Tb &&
        this.controls.aa.R() &&
        null == this.o &&
        null == this.Z &&
        null == this.P &&
        (this.Tb = window.setTimeout(function () {
          window.clearTimeout(b.Tb);
          b.Tb = null;
          0 == b.l() &&
            0 == b.K() &&
            2 == b.video.networkState &&
            0 == b.video.readyState &&
            (b.log(b.c, "network problem, reset connection..."),
            b.video.load(),
            b.video.play());
        }, 1e4));
    }
  };
  P.th = function (a) {
    this.log(this.c, "Event", "onLoadeddata");
    this.log(this.c, "videoLoaded: true");
    this.log(this.c, "videoLoading: false");
    this.log(this.c, "startByClick: " + this.fa);
    this.log(this.c, "videoPromiseAutoplayError: " + this.sb);
    this.ra = !0;
    this.ab = !1;
    z(this.video.duration) ||
      (this.duration = isNaN(this.video.duration) ? 0 : this.video.duration);
    !this.J &&
      -1 < this.duration &&
      !this.O &&
      (this.controls.Ua(this.duration), this.Sh());
    this.view.Ec(this.view.alert) &&
      (this.view.m(this.view.alert), this.controls.enable());
    if (this.sb)
      try {
        2 >= a.target.networkState &&
          4 === a.target.readyState &&
          !this.controls.N.R() &&
          0 >= this.l() &&
          (this.controls.H(!1), this.controls.qa(!0));
      } catch (d) {}
    else {
      if (this.fa || this.jl || this.Sb) {
        var b = this;
        null == this.fd &&
          (this.fd = window.setTimeout(function () {
            window.clearTimeout(b.fd);
            b.fd = null;
            b.Ub || b.Se();
          }, 2e3));
      }
      null == this.Tb &&
        this.controls.aa.R() &&
        null == this.o &&
        null == this.Z &&
        null == this.P &&
        (this.Tb = window.setTimeout(function () {
          window.clearTimeout(b.Tb);
          b.Tb = null;
          0 == b.l() &&
            0 == b.K() &&
            2 == b.video.networkState &&
            0 == b.video.readyState &&
            (b.log(b.c, "network problem, reset connection..."),
            b.video.load(),
            b.video.play());
        }, 1e4));
    }
  };
  P.Hd = function () {
    this.log(this.c, "Event", "onEnded");
    this.Va(this.state.fb);
    this.ended = !0;
    if (
      -1 < this.ia &&
      (this.l() >= this.f.duration || this.l() == this.K()) &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      (this.Ob() ||
        "premium" == this.f.type ||
        "premium_free" == this.f.type) &&
      !1 !== this.hb()
    )
      try {
        (this.ia = this.f.duration),
          this.log(this.c, "saving watching seconds: " + this.ia),
          window.$.ajax({
            url: "//api.cda.pl/h.php?uid=" + this.hb(),
            type: "post",
            crossDomain: !0,
            xhrFields: {
              withCredentials: !0,
            },
            data: {
              currentTime: this.ia,
              duration: this.f.duration,
              test: this.Ob(),
              server: this.ge(),
            },
            success: function () {},
          });
      } catch (a) {
        this.log(this.c, a);
      }
    if (null != this.A && !this.J && 0 < this.f.duration)
      try {
        if (
          this.l() >= this.f.duration ||
          (this.l() == this.K() && !1 === this.A.complete.fired)
        )
          (this.A.complete.fired = !0), this.S(this.A.complete.url);
      } catch (a) {
        this.log(this.c, a);
      }
    this.Ba ||
      (this.loop
        ? this.play()
        : this.Ke(this.b, -1) && !this.O
        ? this.Pd(this.b, -1)
        : this.$e());
  };
  P.Te = function (a) {
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    if (
      (y(this.da) ||
        "" == this.da ||
        (!A(window.MediaSource) && !this.h.sa())) &&
      !this.lk &&
      !this.J
    ) {
      this.log(this.c, "Event", "onError");
      if (!y(a) && !z(a.target)) {
        this.log(this.c, "networkState: " + a.target.networkState);
        this.log(this.c, "readyState: " + a.target.readyState);
        try {
          if (
            2 == a.target.networkState &&
            4 == a.target.readyState &&
            !this.controls.aa.R()
          ) {
            this.video.play();
            this.log(this.c, "video.play()");
            return;
          }
        } catch (d) {
          this.log(this.c, "error: " + d);
        }
      }
      if (3 === a.target.networkState) {
        this.view.show(this.view.alert);
        this.view.pb(
          this.view.Za,
          "404 Not found: Nie znaleziono podanego wideo"
        );
        this.O || this.controls.disable();
        if (!z(this.X.client) && !y(this.X.client))
          try {
            window[this.X.client].fileNotFound(this.src, {
              zo: console.log,
              error: console.log,
            });
          } catch (d) {}
        if (-1 < this.ia && 0 < this.l()) {
          a = window.location.href;
          var b = Math.floor(this.l());
          -1 < window.location.href.indexOf("?")
            ? null == this.ib("t")
              ? (a += "&t=" + b)
              : ((a = new URL(a)),
                a.searchParams.set("t", b),
                (a = a.toString()))
            : (a += "?t=" + b);
          window.location.href = a;
        }
      } else {
        b = -1;
        if (
          null != this.video.error &&
          "undefined" !== typeof this.video.error.code
        ) {
          b = this.video.error.code;
          if (3 == b) return;
          this.O || this.controls.disable();
        }
        if (-1 < b)
          if (
            2 == b &&
            1 === a.target.networkState &&
            -1 < this.ia &&
            0 < this.l()
          )
            (a = window.location.href),
              (b = Math.floor(this.l())),
              -1 < window.location.href.indexOf("?")
                ? null == this.ib("t")
                  ? (a += "&t=" + b)
                  : ((a = new URL(a)),
                    a.searchParams.set("t", b),
                    (a = a.toString()))
                : (a += "?t=" + b),
              (window.location.href = a);
          else
            switch (b) {
              case 1:
                100 > this.video.currentTime &&
                  (this.view.show(this.view.alert),
                  this.view.pb(
                    this.view.Za,
                    "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1032)"
                  ));
                break;
              case 2:
                100 > this.video.currentTime &&
                  (this.view.show(this.view.alert),
                  this.view.pb(
                    this.view.Za,
                    "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1031)"
                  ));
                break;
              case 3:
                this.view.show(this.view.alert);
                this.view.pb(
                  this.view.Za,
                  "Wyst\u0105pi\u0142 b\u0142\u0105d przegl\u0105darki. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1030)"
                );
                break;
              case 4:
                this.view.show(this.view.alert),
                  this.view.pb(
                    this.view.Za,
                    "Format wideo jest nieobs\u0142ugiwany."
                  );
            }
      }
    }
  };
  P.cn = function (a) {
    this.log(this.c, "Event", "onStalled");
    this.log(this.c, "networkState: " + a.target.networkState);
    this.log(this.c, "readyState: " + a.target.readyState);
    return !1;
  };
  P.ph = function () {};
  P.gn = function () {};
  P.rh = function (a) {
    this.log(this.c, "Event", "onCanplay");
    this.log(this.c, "startLoading: " + this.Sb);
    this.log(this.c, "videoCanPlay: " + this.Ub);
    this.log(this.c, "startByClick: " + this.fa);
    this.log(this.c, "videoPromiseAutoplayError: " + this.sb);
    if (this.sb)
      try {
        2 >= a.target.networkState &&
          4 === a.target.readyState &&
          !this.controls.N.R() &&
          0 >= this.l() &&
          (this.controls.H(!1), this.controls.qa(!0));
      } catch (b) {}
    else
      this.ab && (this.ab = !1),
        this.O ||
          (!this.h.F() && this.J) ||
          (this.autoplay || (this.Ub = !0),
          this.Sb && (this.Sb = !1),
          this.fa && (this.fa = !1),
          y(this.video) ||
            !this.video.paused ||
            (!this.controls.aa.R() &&
              this.Ub &&
              this.getState() != this.state.ga) ||
            ((this.Ub = !0),
            !this.autoplay && this.jb()
              ? (this.controls.H(!1), this.controls.qa(!0))
              : this.Qb()));
  };
  P.Se = function (a) {
    this.log(this.c, "Event", "onCanplaythrough");
    this.log(this.c, "startLoading: " + this.Sb);
    this.log(this.c, "startByClick: " + this.fa);
    this.log(this.c, "videoCanPlay: " + this.Ub);
    this.log(this.c, "videoPromiseAutoplayError: " + this.sb);
    y(a) ||
      z(a.target) ||
      (this.log(this.c, "networkState: " + a.target.networkState),
      this.log(this.c, "readyState: " + a.target.readyState));
    if (this.sb)
      try {
        2 >= a.target.networkState &&
          4 === a.target.readyState &&
          !this.controls.N.R() &&
          0 >= this.l() &&
          (this.controls.H(!1), this.controls.qa(!0));
      } catch (b) {}
    else
      this.ab && (this.ab = !1),
        this.O ||
          (!this.h.F() && this.J) ||
          (this.autoplay || (this.Ub = !0),
          this.Sb && (this.Sb = !1),
          this.fa && (this.fa = !1),
          y(this.video) ||
            !this.video.paused ||
            (!this.controls.aa.R() &&
              this.Ub &&
              this.getState() != this.state.ga) ||
            ((this.Ub = !0),
            !this.autoplay && this.jb()
              ? (this.controls.H(!1), this.controls.qa(!0))
              : this.Qb()));
  };
  P.An = function () {};
  P.Qm = function () {};
  P.wm = function () {};
  P.We = function () {
    try {
      var a = new Date().getHours();
      !this.ug &&
        0 == this.ih() &&
        16 <= a &&
        2 <= this.rf &&
        !1 === this.Ci &&
        ((this.Ci = !0),
        this.view.bg.C("pb-context-wrapp-hide"),
        this.view.bg.s("pb-context-wrapp-show"));
    } catch (b) {}
    if (A(window.onWaiting) && !this.J) window.onWaiting();
  };
  P.ho = function () {
    0 < this.contextMenu.offsetHeight &&
      -1 === this.ae &&
      (this.ae = this.contextMenu.offsetHeight);
  };
  P.io = function () {
    0 < this.contextMenu.offsetWidth &&
      -1 === this.be &&
      (this.be = this.contextMenu.offsetWidth);
  };
  P.tm = function (a) {
    a = a || window.event;
    if ("block" == this.view.contextMenu.style.display)
      this.view.m(this.view.contextMenu);
    else {
      0 < this.view.contextMenu.offsetHeight &&
        -1 === this.ae &&
        (this.ae = this.view.contextMenu.offsetHeight);
      0 < this.view.contextMenu.offsetWidth &&
        -1 === this.be &&
        (this.be = this.view.contextMenu.offsetWidth);
      var b =
        this.be + a.offsetX > this.view.Vb.offsetWidth
          ? this.view.Vb.offsetWidth - this.be
          : a.offsetX;
      var d =
        this.ae + a.offsetY > this.view.Vb.offsetHeight
          ? this.view.Vb.offsetHeight - this.ae
          : a.offsetY;
      this.view.contextMenu.style.top = d + "px";
      this.view.contextMenu.style.left = b + "px";
      this.ta() ||
        (null != window.document.querySelector("#tv-player-stats") &&
          this.view.contextMenu.querySelector('[item="4"]').show());
      this.view.show(this.view.contextMenu);
    }
    a.preventDefault();
  };
  P.Fj = function (a) {
    switch (parseInt(a.target.parentNode.getAttribute("item"))) {
      case 1:
        a = document.createElement("div");
        var b = document.createRange();
        a.style.position = "absolute";
        a.style.left = "-1000px";
        a.style.top = "-1000px";
        a.innerHTML = "https://www.cda.pl/video/" + this.f.id;
        document.body.appendChild(a);
        b.selectNodeContents(a);
        var d = window.getSelection();
        d.removeAllRanges();
        d.addRange(b);
        try {
          document.execCommand("copy");
        } catch (f) {}
        delete a;
        break;
      case 2:
        a = document.createElement("input");
        b = "";
        this.Le()
          ? (b = "https://ebd.cda.pl/620x368/" + this.f.id)
          : this.Of() &&
            (b = window.location.origin + window.location.pathname + "?iframe");
        a.style.position = "absolute";
        a.style.left = "-1000px";
        a.style.top = "-1000px";
        a.type = "text";
        a.setAttribute(
          "value",
          '<iframe src="' +
            b +
            '" width="620" height="368" style="border:none;" scrolling="no" allowfullscreen name="v2" allow="encrypted-media"></iframe>'
        );
        document.body.appendChild(a);
        a.select();
        try {
          document.execCommand("copy");
        } catch (f) {}
        delete a;
        break;
      case 3:
        this.getState() === this.state.ga && this.pause();
        b = "";
        this.Le()
          ? (b = "http://www.cda.pl/kontakt")
          : this.Of() && (b = "http://superfilm.pl/kontakt");
        "" != b && window.open(b, "_blank").focus();
        break;
      case 4:
        this.view.Ec(window.document.querySelector("#tv-player-stats"))
          ? (window.document.querySelector("#tv-player-stats").m(),
            (this.view.contextMenu.querySelector('[item="4"]').innerHTML =
              "<a>Poka\u017c statystyki</a>"))
          : (window.document.querySelector("#tv-player-stats").show(),
            (this.view.contextMenu.querySelector('[item="4"]').innerHTML =
              "<a>Ukryj statystyki</a>"));
    }
    this.view.Ec(this.view.contextMenu) && this.view.m(this.view.contextMenu);
  };
  P.Hm = function () {};
  P.Yc = function () {
    try {
      if (A(window.onVideoTimeUpdate)) window.onVideoTimeUpdate(this.l());
    } catch (g) {}
    if ((!this.de && null != this.o) || (!this.gg && null != this.Z))
      2 === this.video.networkState && 3 > this.video.readyState
        ? this.controls.H(!0)
        : (1 === this.video.networkState || 3 <= this.video.readyState) &&
          this.controls.H(!1);
    this.getState() === this.state.ga &&
      this.controls.N.R() &&
      this.controls.ba(!0);
    this.getState() !== this.state.ga ||
      this.controls.wb.G("pb-play-pause") ||
      this.controls.wb.s("pb-play-pause");
    var a = 600;
    this.f.hasOwnProperty("duration") &&
      null != this.f.duration &&
      0 < this.f.duration &&
      600 >= this.f.duration &&
      (a = 60);
    this.l() >= a && !1 === this.we && this.On();
    if (!y(this.He))
      for (a = 0; a < this.He.length; a++) {
        var b = this.He[a];
        !y(b) &&
          b.hasOwnProperty("time") &&
          b.hasOwnProperty("id") &&
          this.l() >= b.time &&
          !b.fire &&
          ((this.He[a].fire = !0),
          !this.Of() ||
            z(this.X.client) ||
            y(this.X.client) ||
            window[this.X.client].pixel(b.id, "pc", {
              zo: console.log,
              error: console.log,
            }));
      }
    if (this.M && -1 < this.ia && this.l() >= this.ia + 10)
      try {
        this.ia = Math.round(this.l());
        this.log(
          this.c,
          "tv watching - request_id: " +
            this.options.request_id +
            ", ct: " +
            this.ia
        );
        var d = this;
        window.$.ajax({
          url: "//api.cda.pl/htv.php?uid=" + this.hb(),
          type: "post",
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0,
          },
          data: {
            request_id: this.options.request_id,
            channel_id: this.options.tv_live.channel_id,
            channel_url: this.ka.url,
          },
          success: function () {},
        });
      } catch (g) {
        this.log(this.c, g);
      }
    if (
      -1 < this.ia &&
      this.l() >= this.ia + 10 &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      (this.Ob() ||
        "premium" == this.f.type ||
        "premium_free" == this.f.type) &&
      !1 !== this.hb()
    ) {
      try {
        (this.ia = Math.round(this.l())),
          this.log(this.c, "saving watching seconds: " + this.ia),
          window.$.ajax({
            url: "//api.cda.pl/h.php?uid=" + this.hb(),
            type: "post",
            crossDomain: !0,
            xhrFields: {
              withCredentials: !0,
            },
            data: {
              currentTime: this.ia,
              duration: this.f.duration,
              test: this.Ob(),
              server: this.ge(),
            },
            success: function () {},
          });
      } catch (g) {
        this.log(this.c, g);
      }
      if (
        !1 === this.Pi &&
        ("premium" == this.f.type || "premium_free" == this.f.type) &&
        114184580 == this.hb()
      ) {
        this.Pi = !0;
        try {
          (d = this),
            window.$.ajax({
              url: "//api.cda.pl/cl.php?uid=" + this.hb(),
              type: "post",
              crossDomain: !0,
              xhrFields: {
                withCredentials: !0,
              },
              success: function () {},
              error: function (a) {
                a &&
                  429 == a.status &&
                  (null != d.o ? d.o.reset() : d.pause(),
                  d.view.show(d.view.alert),
                  d.view.pb(
                    d.view.Za,
                    "Zbyt wiele os\u00f3b (3) korzysta z Twojego konta."
                  ),
                  d.controls.disable(),
                  (d.disabled = !0));
              },
            });
        } catch (g) {
          this.log(this.c, g);
        }
      }
    }
    if (null != this.A && !this.J && 0 < this.f.duration)
      try {
        if (0 < Math.floor(this.l()) && this.l() < this.K()) {
          var f = Math.floor((this.l() / this.K()) * 100);
          25 <= f && !1 === this.A.firstQuartile.fired
            ? ((this.A.firstQuartile.fired = !0),
              this.S(this.A.firstQuartile.url))
            : 50 <= f && !1 === this.A.midpoint.fired
            ? ((this.A.midpoint.fired = !0), this.S(this.A.midpoint.url))
            : 75 <= f &&
              !1 === this.A.thirdQuartile.fired &&
              ((this.A.thirdQuartile.fired = !0),
              this.S(this.A.thirdQuartile.url));
          60 <= this.l() && !1 === this.A.video60sec.fired
            ? ((this.A.video60sec.fired = !0), this.S(this.A.video60sec.url))
            : 120 <= this.l() && !1 === this.A.video120sec.fired
            ? ((this.A.video120sec.fired = !0), this.S(this.A.video120sec.url))
            : 180 <= this.l() && !1 === this.A.video180sec.fired
            ? ((this.A.video180sec.fired = !0), this.S(this.A.video180sec.url))
            : 240 <= this.l() && !1 === this.A.video240sec.fired
            ? ((this.A.video240sec.fired = !0), this.S(this.A.video240sec.url))
            : 300 <= this.l() && !1 === this.A.video300sec.fired
            ? ((this.A.video300sec.fired = !0), this.S(this.A.video300sec.url))
            : 360 <= this.l() && !1 === this.A.video360sec.fired
            ? ((this.A.video360sec.fired = !0), this.S(this.A.video360sec.url))
            : 420 <= this.l() && !1 === this.A.video420sec.fired
            ? ((this.A.video420sec.fired = !0), this.S(this.A.video420sec.url))
            : 480 <= this.l() && !1 === this.A.video480sec.fired
            ? ((this.A.video480sec.fired = !0), this.S(this.A.video480sec.url))
            : 540 <= this.l() && !1 === this.A.video540sec.fired
            ? ((this.A.video540sec.fired = !0), this.S(this.A.video540sec.url))
            : 600 <= this.l() &&
              !1 === this.A.video600sec.fired &&
              ((this.A.video600sec.fired = !0), this.S(this.A.video600sec.url));
          try {
            "4125787e0" == this.f.id &&
              (193 <= this.l() && !1 === this.A.video193sec.fired
                ? ((this.A.video193sec.fired = !0),
                  this.S(this.A.video193sec.url))
                : 220 <= this.l() &&
                  !1 === this.A.video220sec.fired &&
                  ((this.A.video220sec.fired = !0),
                  this.S(this.A.video220sec.url))),
              "412582640" == this.f.id &&
                148 <= this.l() &&
                !1 === this.A.video148sec.fired &&
                ((this.A.video148sec.fired = !0),
                this.S(this.A.video148sec.url)),
              "412584104" == this.f.id &&
                (50 <= this.l() && !1 === this.A.video50sec.fired
                  ? ((this.A.video50sec.fired = !0),
                    this.S(this.A.video50sec.url))
                  : 115 <= this.l() && !1 === this.A.video115sec.fired
                  ? ((this.A.video115sec.fired = !0),
                    this.S(this.A.video115sec.url))
                  : 122 <= this.l() &&
                    !1 === this.A.video122sec.fired &&
                    ((this.A.video122sec.fired = !0),
                    this.S(this.A.video122sec.url))),
              "4125850f4" == this.f.id &&
                54 <= this.l() &&
                !1 === this.A.video54sec.fired &&
                ((this.A.video54sec.fired = !0), this.S(this.A.video54sec.url)),
              "41258896e" == this.f.id &&
                (229 <= this.l() && !1 === this.A.video229sec.fired
                  ? ((this.A.video229sec.fired = !0),
                    this.S(this.A.video229sec.url))
                  : 247 <= this.l() && !1 === this.A.video247sec.fired
                  ? ((this.A.video247sec.fired = !0),
                    this.S(this.A.video247sec.url))
                  : 253 <= this.l() &&
                    !1 === this.A.video253sec.fired &&
                    ((this.A.video253sec.fired = !0),
                    this.S(this.A.video253sec.url)));
          } catch (g) {
            this.log(this.c, g);
          }
        }
      } catch (g) {
        this.log(this.c, g);
      }
    try {
      0 < Math.floor(this.l()) &&
        this.l() < this.K() &&
        !this.T.isConnected() &&
        (this.h.F() ||
          this.h.Ja() ||
          this.h.xd() ||
          (this.Ke(this.b, Math.floor(this.l())) &&
            this.Pd(this.b, Math.floor(this.l()))));
    } catch (g) {}
  };
  P.xm = function () {
    if (!this.O) {
      var a = this.fullScreen.Ea();
      a || y(this.fullScreen.element()) || (a = !0);
      this.controls.Ea = a;
      this.controls.lo(a);
      if (a) {
        if (!z(window.screen.orientation))
          try {
            -1 === window.screen.orientation.type.indexOf("landscape") &&
              this.f.height < this.f.width &&
              window.screen.orientation.lock("landscape-primary");
          } catch (d) {
            this.log(this.c, d);
          }
        this.controls.tk(!0);
        try {
          if (!this.O && this.h.mj() && !z(this.f.width) && !z(this.f.height)) {
            var b = (this.f.height / this.f.width) * 100;
            b < (window.screen.height / window.screen.width) * 100
              ? ((this.view.mg.style["padding-top"] = b + "%"),
                this.view.content.s("pb-playstation-panorama"))
              : ((this.view.mg.style.width =
                  (window.screen.height / window.screen.width) *
                    (this.f.width / this.f.height) *
                    100 +
                  "%"),
                this.view.content.s("pb-playstation-vertical"));
          }
        } catch (d) {}
      } else {
        this.controls.tk(!1);
        if (!z(window.screen.orientation))
          try {
            window.screen.orientation.unlock();
          } catch (d) {
            this.log(this.c, d);
          }
        this.h.F() && this.controls.ec();
        this.O || this.controls.Th();
        this.video.setAttribute("webkit-playsinline", "true");
        this.video.setAttribute("playsinline", "true");
        this.controls.fc &&
          ((this.controls.fc = !1),
          this.controls.ee.C("pb-aspect-float-on"),
          this.controls.jf.C("pb-stretching-expanded"));
      }
    }
  };
  P.ym = function () {
    this.O ||
      (this.view.xa.G("pb-video-fullscreen") &&
        !this.fullScreen.is() &&
        (this.view.xa.C("pb-video-fullscreen"), this.O || this.controls.Th()),
      this.controls.ko());
  };
  P.nc = function () {
    if (this.view.Ec(this.view.contextMenu)) this.view.m(this.view.contextMenu);
    else if (!(0 >= this.l()) && null === this.La)
      if (this.h.F() && !this.O && this.controls.Ea)
        if (this.controls.W.G("pb-nocontrols")) {
          this.controls.W.C("pb-nocontrols");
          var a = this;
          clearTimeout(this.controls.Ya);
          this.controls.Ya = setTimeout(function () {
            a.controls.W.s("pb-nocontrols");
          }, 3e3);
        } else
          this.getState() === this.state.ga
            ? (this.pause(),
              clearTimeout(this.controls.Ya),
              (this.controls.Ya = null))
            : this.getState() === this.state.uc &&
              (this.resume(),
              (a = this),
              clearTimeout(this.controls.Ya),
              (this.controls.Ya = setTimeout(function () {
                a.controls.W.s("pb-nocontrols");
              }, 3e3)));
      else
        this.getState() === this.state.ga
          ? this.pause()
          : this.getState() === this.state.uc && this.resume();
  };
  P.gk = function () {};
  P.Wj = function () {
    null === this.La && this.controls.Zf();
  };
  P.Ye = function () {
    this.log(this.c, "setVideoFile");
    if (!this.src) {
      this.ra = !1;
      this.view.show(this.view.zd);
      this.h.sa() && this.O && this.view.m(this.view.zd);
      this.O || this.controls.$c(0);
      window.MediaSource = window.MediaSource || window.WebKitMediaSource;
      if (
        y(this.da) ||
        "" == this.da ||
        (!A(window.MediaSource) && !this.h.sa())
      )
        this.view.show(this.view.alert),
          this.view.pb(
            this.view.Za,
            "Aby obejrze\u0107 ten materia\u0142 zaaktualizuj lub zainstaluj najnowsz\u0105 przegl\u0105dark\u0119."
          ),
          this.O || this.controls.disable();
      this.O || this.w.show(this.controls.a);
    } else if (this.Zi() !== this.src) {
      this.log(this.c, "setSrc");
      this.ra = !1;
      this.view.show(this.view.zd);
      this.h.sa() && this.O && this.view.m(this.view.zd);
      this.O || this.controls.$c(0);
      window.MediaSource = window.MediaSource || window.WebKitMediaSource;
      if (
        y(this.da) ||
        "" == this.da ||
        (!A(window.MediaSource) && !this.h.sa())
      )
        this.src
          ? (this.fg(this.src), this.video.pause())
          : (this.view.show(this.view.alert),
            this.view.pb(
              this.view.Za,
              "Aby obejrze\u0107 ten materia\u0142 zaaktualizuj lub zainstaluj najnowsz\u0105 przegl\u0105dark\u0119."
            ),
            this.O || this.controls.disable());
      this.O || this.w.show(this.controls.a);
    }
    this.log(this.c, "autoplay: " + this.autoplay);
  };
  P.rb = function () {
    this.log(this.c, "startVideo");
    this.controls.se();
    A(window.startVideo) && window.startVideo();
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    y(this.Pb) ||
    "" == this.Pb ||
    (!A(window.MediaSource) && !this.h.sa()) ||
    (!this.h.me() && !this.h.sa())
      ? !y(this.da) && "" != this.da && A(window.MediaSource)
        ? this.h.Qf()
          ? this.Yg()
          : this.ie()
        : (this.src && this.Zi() !== this.src && this.Ye(),
          this.Sb ? this.play() : this.play(!0),
          (this.Ub = this.fa = !0),
          this.getState() != this.state.ga && this.Qb())
      : this.ie();
    this.O || (this.controls.Ua(this.K()), this.controls.enable());
    this.J && (this.J = !1);
    this.Je();
    this.log(this.c, "autoplay: " + this.autoplay);
  };
  P.xl = function () {
    var a = this.W.querySelector(".pb-video-player-noise");
    if (
      "undefined" !== a &&
      a &&
      ((a.width = this.Vb.ac() ? this.Vb.ac() : 0),
      (a.height = this.Vb.Vc() ? this.Vb.Vc() : 0),
      0 < a.ac() && 0 < a.Vc())
    ) {
      for (
        var b = a.getContext("2d"),
          d = b.createImageData(b.canvas.width, b.canvas.height),
          f = new Uint32Array(d.data.buffer),
          g = f.length,
          l = 0;
        l < g;

      )
        f[l++] = ((255 * Math.random()) | 0) << 24;
      b.putImageData(d, 0, 0);
      return a;
    }
    return !1;
  };
  P.readyState = function () {
    return this.video.readyState;
  };
  P.networkState = function () {
    return this.video.networkState;
  };
  P.Yi = function () {
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("iphone") ||
      -1 !== a.indexOf("ipod") ||
      -1 !== a.indexOf("ipad")
      ? "ios"
      : -1 !== a.indexOf("android")
      ? "android"
      : "pc";
  };
  P.Pg = function () {
    var a = navigator.userAgent.match(/Android\s([0-9\.]*)/);
    return a ? a[1] : !1;
  };
  P.hp = function () {
    if (/iP(hone|od|ad)/.test(navigator.userAgent)) {
      var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return (
        parseInt(a[1], 10) +
        "." +
        parseInt(a[2], 10) +
        "." +
        parseInt(a[3] || 0, 10)
      ).toString();
    }
  };
  P.xp = function () {
    var a = navigator.userAgent;
    return (
      -1 < a.indexOf("Mozilla/5.0") &&
      -1 < a.indexOf("Android ") &&
      -1 < a.indexOf("Version/") &&
      -1 < a.indexOf("AppleWebKit")
    );
  };
  P.Nh = function (a, b, d, f) {
    var g = new Date();
    null != d &&
      (f ? g.setHours(g.getHours() + d) : g.setDate(g.getDate() + d));
    try {
      document.cookie =
        a + "=" + escape(b) + (null == d ? "" : ";expires=" + g.toGMTString());
    } catch (l) {}
  };
  P.$b = function (a) {
    try {
      var b = document.cookie.split(";");
    } catch (l) {
      b = [];
    }
    for (var d = 0; d < b.length; d++) {
      var f = b[d].substr(0, b[d].indexOf("="));
      var g = b[d].substr(b[d].indexOf("=") + 1);
      f = f.replace(/^\s+|\s+$/g, "");
      if (f == a) return unescape(g);
    }
    return !1;
  };
  P.wd = function (a) {
    return !1 !== this.$b(a) ? !0 : !1;
  };
  P.tj = function () {
    var a =
        document.getElementsByTagName("head")[0] ||
        document.head ||
        document.documentElement,
      b = document.createElement("script");
    b.async = !0;
    b.type = "text/javascript";
    b.src =
      "m.cda.pl" == window.location.host
        ? "//m.cda.pl/adx.js"
        : "//www.cda.pl/adx.js";
    a.insertBefore(b, a.firstChild);
    a.appendChild(b);
    this.wi = !0;
  };
  P.jb = function () {
    this.wi || this.tj();
    this.h.F() && (this.pf = !1);
    this.ta() && "undefined" == typeof window.adblock && (this.pf = !0);
    "undefined" === typeof window.adbloczek && (this.pf = !0);
    return this.pf;
  };
  P.log = function (a, b, d) {
    2 > arguments.length ||
      (this.options.hasOwnProperty("debug") &&
        1 == this.options.debug &&
        (3 === arguments.length
          ? console.log(a + "[" + b + "]: " + JSON.stringify(d))
          : 2 === arguments.length &&
            console.log(a + ": " + JSON.stringify(b))));
  };
  P.Hg = function () {
    var a = this.W.getBoundingClientRect(),
      b = window.innerHeight || document.documentElement.clientHeight,
      d = window.innerWidth || document.documentElement.clientWidth;
    return (
      (0 < a.bottom && a.top < b && 0 < a.right && a.left < d) ||
      0 === document.body.scrollTop
    );
  };
  P.Lp = function () {
    var a = this,
      b = setInterval(function () {
        a.Fd =
          "undefined" !== typeof window.nextVideoEnabled &&
          window.nextVideoEnabled
            ? !0
            : !1;
        a.Fd && a.ended && null === a.La && !1 === a.dc
          ? (clearInterval(b), (b = null), a.$e())
          : a.ended || (clearInterval(b), (b = null));
      }, 50);
  };
  P.$e = function () {
    this.log(this.c, "startNextVideo");
    this.J && (this.J = !1);
    if (this.loop) this.play();
    else if (
      (this.O ||
        (this.video.paused ? this.controls.qa(!0) : this.controls.qa()),
      this.h.F() && (this.Ub = this.ra = !1),
      this.Qa)
    )
      if ((this.controls.vb(!0), this.Le()))
        if ((this.Gg(), this.Fd)) {
          if (
            !this.ne &&
            null === this.La &&
            (this.fullScreen.Lb(), !this.dc)
          ) {
            this.dc = !0;
            this.h.Ja()
              ? window.location.replace(this.Ie())
              : (window.location.href = this.Ie());
            return;
          }
          this.O || (this.controls.isEnabled() && this.controls.disable());
          this.view.Gd.show();
          this.view.wj.href = this.Ie(!0);
          this.view.wj.title = this.Qa.title;
          this.view.lm.innerHTML = this.Qa.title;
          this.view.km.src = this.Qa.thumb;
          this.view.Ed.setAttribute("stroke-dashoffset", this.Wf);
          this.O &&
            (this.view.m(this.view.j(".pb-next-timer-wrapper")),
            this.view.show(this.view.j(".pb-ie-next-loader")),
            (this.view.j(".pb-ie-next-loader-progress").style.width = "0%"));
          -1 < window.location.href.indexOf("dlugiczasprzewijania") &&
            (this.oh = 1e3);
          var a = this,
            b = (1e3 * this.oh) / parseInt(this.Wf);
          this.O && (b = (1e3 * this.oh) / 100);
          this.view.jm.addEventListener(
            "click",
            function () {
              a.O || a.controls.enable();
              a.Fd = !1;
              a.nh = !0;
              a.dc = !1;
              a.controls.H(!1);
              a.O || (a.video.paused ? a.controls.qa(!0) : a.controls.qa());
            },
            !1
          );
          null === this.La &&
            (this.La = this.Wb.setInterval(function () {
              0 == a.Fd && a.Ek();
              if (a.Hg()) {
                if (
                  (a.O
                    ? 100 >
                      parseInt(
                        a.view.j(".pb-ie-next-loader-progress").style.width
                      )
                      ? (a.view.j(".pb-ie-next-loader-progress").style.width =
                          parseInt(
                            a.view.j(".pb-ie-next-loader-progress").style.width
                          ) +
                          1 +
                          "%")
                      : (a.Wb.clearInterval(a.La), (a.La = null))
                    : 0 < parseInt(a.view.Ed.getAttribute("stroke-dashoffset"))
                    ? a.view.Ed.setAttribute(
                        "stroke-dashoffset",
                        parseInt(a.view.Ed.getAttribute("stroke-dashoffset")) -
                          1 +
                          "px"
                      )
                    : (a.Wb.clearInterval(a.La), (a.La = null)),
                  0 == parseInt(a.view.Ed.getAttribute("stroke-dashoffset")) ||
                    100 ===
                      parseInt(
                        a.view.j(".pb-ie-next-loader-progress").style.width
                      ))
                )
                  a.fullScreen.Lb(),
                    a.dc ||
                      ((a.dc = !0),
                      a.h.Ja()
                        ? window.location.replace(a.Ie())
                        : (window.location.href = a.Ie()));
              } else a.O ? "0%" !== a.view.j(".pb-ie-next-loader-progress").style.width && (a.view.j(".pb-ie-next-loader-progress").style.width = "0%") : a.view.Ed.getAttribute("stroke-dashoffset") !== a.Wf && a.view.Ed.setAttribute("stroke-dashoffset", a.Wf);
              a.Gg();
            }, b));
        } else this.controls.H(!1);
      else if (this.Of()) {
        this.view.Gd.m();
        this.view.Gd.innerHTML =
          '<div class="pb-nxt-loader-wrapper"><div class="pb-nxt-loader-wrapper-background"></div>  <div class="pb-nxt-loader"><div class="pb-nxt-wrapper-preview-next-video"><div class="pb-nxt-preview-next-video-rot"><div class="pb-nxt-preview-next-video"><img src="" title="" alt=""></div></div><div class="pb-nxt-preview-video-title">Nast\u0119pne video: <a href=""><h4></h4></a></div></div><div class="pb-nxt-loader-area"></div><a class="pb-nxt-loader-content" href=""><div class="pb-nxt-loader-content-circle"><div class="pb-nxt-loader-progress"></div></div><div class="pb-nxt-loader-play"></div></a><a class="btn btn-dark btn-next-cancel pb-btn-cancel" href="" style="position: absolute;top: 87px;left: -12px;width: 70px;padding: 5px 0;">Anuluj</a>  </div></div>';
        this.view.Gd.show();
        b = this.view.Gd;
        var d = this.Qa.url,
          f = this.view.ub(".pb-nxt-preview-video-title h4", b),
          g = this.view.ub(".pb-nxt-preview-video-title a", b),
          l = this.view.ub(".pb-nxt-loader-content", b),
          k = this.view.ub(".pb-nxt-preview-next-video img", b),
          p = this.view.ub(".pb-nxt-loader-progress", b),
          u = this.view.ub(".pb-btn-cancel", b),
          v = 0;
        f.innerHTML = this.Qa.title;
        g.setAttribute("href", this.Qa.url);
        k.setAttribute("src", this.Qa.thumb);
        k.setAttribute("title", this.Qa.title);
        k.setAttribute("alt", this.Qa.title);
        l.setAttribute("href", this.Qa.url);
        "/uploads/filmico.png" == k &&
          this.view.ub(".pb-nxt-preview-next-video", b).m();
        a = this;
        u.addEventListener("click", function (b) {
          a.O || a.controls.enable();
          a.nh = !0;
          a.dc = !1;
          a.controls.H(!1);
          a.O || (a.video.paused ? a.controls.qa(!0) : a.controls.qa());
          a.view.Gd.m();
          a.Wb.clearInterval(a.La);
          v = 0;
          p.style.width = "0%";
          b.preventDefault();
          return !1;
        });
        null === this.La &&
          (this.La = this.Wb.setInterval(function () {
            100 > v && (v++, (p.style.width = v + "%"));
            100 <= v &&
              !a.dc &&
              ((a.dc = !0),
              a.Wb.clearInterval(a.La),
              a.fullScreen.Lb(),
              a.h.Ja()
                ? window.location.replace(d)
                : (window.location.href = d));
          }, 100));
      }
  };
  P.Ek = function () {
    this.Wb.clearInterval(this.La);
    this.La = null;
    this.view.Gd.m();
    this.dc = !1;
    this.O || this.controls.isEnabled() || this.controls.enable();
  };
  P.Gg = function () {
    this.Fd =
      "undefined" !== typeof window.nextVideoEnabled && window.nextVideoEnabled
        ? !0
        : !1;
  };
  P.Ni = function () {
    null === this.La &&
      (this.Gg(), this.Fd && this.Hg() && !this.nh && !this.dc && this.$e());
  };
  P.Ie = function (a) {
    var b = window.location.href,
      d = "";
    "undefined" === typeof a
      ? (d =
          null !== this.Qa.quality
            ? "?wersja=" + this.Qa.quality + "&a=1"
            : "?a=1")
      : null !== this.Qa.quality && (d = "?wersja=" + this.Qa.quality);
    -1 !== b.indexOf("&html5") && (d = "" == d ? "?html5" : "&html5&vol=10");
    return this.Qa.hasOwnProperty("link")
      ? this.Qa.link + d
      : b.slice(0, b.indexOf("/video/")) + "/video/" + this.Qa.id + d;
  };
  P.Sh = function () {
    if (!this.Ji) {
      this.Ji = !0;
      var a = this.jb(),
        b = !1;
      A(W) && A(X) && A(Y) && (b = !0);
      if (!a && b && !this.h.F() && !this.h.Ja() && !this.h.xd()) {
        if (z(d) || y(d)) var d = this.b;
        if (!y(d)) {
          b = "";
          "plain" == this.f.type && (b = "opacity:0;");
          a =
            "position: absolute;width: 3px;height: 6px;background: #FFCC00;top: 8px;margin-left:0px;z-index:10;" +
            b;
          if (this.h.F() || this.h.Ja())
            a =
              "position: absolute;width: 5px;height: 12px;background: #FFCC00;top: 16px;margin-left:0px;z-index:10;" +
              b;
          if (this.Pa(d, "schedule")) {
            b = this.K() || this.f.duration;
            for (var f = 0; f < d.schedule.length; f++)
              if (d.schedule[f].hasOwnProperty("time")) {
                var g = d.schedule[f].time;
                if (0 < g) {
                  var l = (g / b) * 100;
                  if (!(100 <= l || 0 >= l)) {
                    var k = window.document.createElement("span");
                    k.setAttribute("style", a + "left: " + l + "%");
                    k.setAttribute("data-time", g);
                    k.setAttribute("class", "pb-progress-midroll-marker");
                    this.controls.Ca.insertBefore(
                      k,
                      this.controls.Ca.firstChild
                    );
                  }
                }
              }
          }
        }
      }
    }
  };
  P.Ke = function (a, b) {
    if (!(-1 < this.xf.indexOf(b))) {
      if (this.h.Ja() || this.O) return !1;
      if (this.h.F()) {
        if (this.h.ke()) {
          var d = this.h.Pg();
          this.log(this.c, "android version: " + d);
          d = parseFloat(d);
          if (4.1 >= d) return !1;
        }
        if (this.h.sa())
          if (!1 !== this.h.Tg()) {
            if (((d = parseInt(this.h.Tg())), 10 > d)) return !1;
          } else return !1;
      }
      if (null !== a) {
        d = this.jb();
        var f = !1;
        A(W) && A(X) && A(Y) && (f = !0);
        if (this.h.eh() && this.h.pj() && d) return !1;
        if (this.Pa(a, "schedule"))
          for (a = 0; a < this.b.schedule.length; a++)
            if (
              this.b.schedule[a].hasOwnProperty("time") &&
              this.b.schedule[a].hasOwnProperty("tag") &&
              "" != this.b.schedule[a].tag &&
              this.b.schedule[a].hasOwnProperty("enabled") &&
              !0 === this.b.schedule[a].enabled &&
              this.b.schedule[a].hasOwnProperty("type") &&
              this.b.schedule[a].time === b &&
              f &&
              ((this.b.schedule[a].hasOwnProperty("tagAdblock") &&
                null != this.b.schedule[a].tagAdblock) ||
                !d)
            )
              return !0;
      }
      return !1;
    }
  };
  P.Pd = function (a, b) {
    if (!(-1 < this.xf.indexOf(b))) {
      this.log(this.c, "startAd");
      this.log(this.c, arguments);
      this.log(this.c, this.xf);
      for (var d = this.jb(), f = [], g = 0, l = 0; l < a.schedule.length; l++)
        if (a.schedule[l].time === b) {
          g++;
          var k = a.schedule[l],
            p = {
              autoplay: k.autoplay,
              counter: k.counter,
              displayAs: k.displayAs,
              key: k.key,
              key2: "undefined" != typeof k.key2 ? k.key2 : "",
              skip: k.skip,
              click: k.click,
              tag: k.tag,
              time: k.time,
              type: k.type,
            };
          1 < g && (p.autoplay = !0);
          d &&
            this.Le() &&
            ((p.tag = k.tagAdblock), (p.type = "pool"), (p.counter = !1));
          if (1 < k.repeat)
            for (var u = 0; u < k.repeat; u++) {
              if (0 === b) p.autoplay = this.autoplay;
              else if (-1 === b || 0 < b) p.autoplay = !0;
              f.push(p);
            }
          else {
            if (0 === b) p.autoplay = this.autoplay;
            else if (-1 === b || 0 < b) p.autoplay = !0;
            f.push(p);
          }
          delete k;
          delete p;
          if (d) break;
        }
      this.log(this.c, "startAd", f);
      f != []
        ? (this.log(this.c, "startAd", "init ads manager"),
          this.xf.push(b),
          (this.J = !0),
          (this.v = new Y(this, f)))
        : (this.log(this.c, "startAd", "no ads to display"),
          this.autoplay && this.rb());
    }
  };
  P.Mb = function (a) {
    return "undefined" !== typeof a &&
      "function" === typeof a.getBoundingClientRect
      ? a.getBoundingClientRect()
      : !1;
  };
  P.On = function () {
    if (
      null !== this.X &&
      !1 === this.we &&
      ("premium" == this.f.type || "premium_free" == this.f.type)
    ) {
      this.we = !0;
      var a = this;
      try {
        window[this.X.client][this.X.method](this.X.ts, this.X.key, {
          success: function () {
            a.we = !0;
          },
          error: function () {
            a.we = !1;
          },
        });
      } catch (b) {}
    }
  };
  P.le = function (a) {
    return Number(a) === a && 0 === a % 1;
  };
  P.Pf = function (a) {
    return Number(a) === a && 0 !== a % 1;
  };
  P.Yp = function () {
    this.log(this.c, "window focus");
    this.log(this.c, "focus? " + document.hasFocus());
    this.ne = !0;
  };
  P.Xp = function () {
    this.log(this.c, "window blur");
    this.log(this.c, "focus? " + document.hasFocus());
    this.ne = !1;
  };
  P.ib = function (a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = new RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
    return null == a ? null : a[1];
  };
  P.fe = function () {
    return window.location.hostname;
  };
  P.rl = function () {
    var a = this.fe();
    return -1 < a.indexOf("cda.pl") || -1 < a.indexOf("superfilm.pl") ? !0 : !1;
  };
  P.Le = function () {
    return -1 < this.fe().indexOf("cda.pl");
  };
  P.ta = function () {
    return (
      this.Le() &&
      (-1 < this.fe().indexOf("ebd.") || -1 < this.fe().indexOf("ebdcda.pl"))
    );
  };
  P.Of = function () {
    return -1 < this.fe().indexOf("superfilm.pl");
  };
  P.Ah = function () {
    this.video.show();
    this.view.ng.m();
    this.view.N.m();
    this.load();
    this.video.play();
  };
  P.jp = function () {
    return this.rf;
  };
  P.cl = function () {
    this.rf++;
  };
  P.re = function () {
    this.rf = 0;
  };
  P.pk = function (a) {
    this.sf = !!a;
  };
  P.kp = function () {
    return this.sf;
  };
  P.ak = function (a) {
    a = a || window.event;
    this.view.bg.C("pb-context-wrapp-show");
    this.view.bg.s("pb-context-wrapp-hide");
    a.preventDefault();
    return !1;
  };
  P.ck = function (a) {
    a = a || window.event;
    this.h.F()
      ? alert(
          "CDA nie limituje przepustowo\u015bci oraz transferu danych. \nW godzinach wieczornych mo\u017ce zdarzy\u0107 si\u0119 jednak, i\u017c ilo\u015b\u0107 u\u017cytkownik\u00f3w przekracza mo\u017cliwo\u015bci naszych serwer\u00f3w wideo. W\u00f3wczas odbi\u00f3r mo\u017ce by\u0107 zak\u0142\u00f3cony, a plik wideo mo\u017ce \u0142adowa\u0107 si\u0119 d\u0142u\u017cej ni\u017c zwykle. \n\nW Opcji CDA Premium gwarantujemy, i\u017c przepustowo\u015bci i transferu nie braknie dla \u017cadnego u\u017cytkownika."
        )
      : this.view.Sn.s("pb-why-more-answer-show");
    a.preventDefault();
    return !1;
  };
  P.Ep = function () {
    return this.ug;
  };
  P.dd = function (a) {
    this.ug = !!a;
  };
  P.ih = function () {
    return (this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("role") &&
      "premium" == this.options.user.role) ||
      (this.options.hasOwnProperty("premium") && !0 === this.options.premium)
      ? !0
      : !1;
  };
  P.Ob = function () {
    return (
      this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("video_history") &&
      this.options.user.video_history
    );
  };
  P.Dc = function () {
    return this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("id") &&
      !y(this.options.user.id)
      ? this.options.user.id
      : 33;
  };
  P.hb = function () {
    return this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("uid") &&
      !y(this.options.user.uid)
      ? this.options.user.uid
      : !1;
  };
  P.Rg = function () {
    return this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("gender") &&
      !y(this.options.user.gender)
      ? this.options.user.gender
      : "";
  };
  P.Sg = function () {
    return y(this.f) ||
      !this.f.hasOwnProperty("premium_categories") ||
      y(this.f.premium_categories)
      ? ""
      : this.f.premium_categories;
  };
  P.bk = function () {
    if (!this.J && 0 == this.ih()) {
      var a = this.options.video.id + ":" + Number(Math.floor(this.l()));
      this.Nh("cda.player.ppst", a, 2, !0);
    }
  };
  P.oj = function () {
    return this.options.hasOwnProperty("user") &&
      this.options.user.hasOwnProperty("role") &&
      "admin" == this.options.user.role
      ? !0
      : !1;
  };
  P.gj = function () {
    var a = !this.h.vd();
    this.ta() && (a = !0);
    return (this.ah() && a) || (this.fj() && a) ? !0 : !1;
  };
  P.ah = function () {
    return (
      this.options.hasOwnProperty("plista") &&
      this.options.plista &&
      !this.jb() &&
      !this.J
    );
  };
  P.fj = function () {
    return (
      this.options.hasOwnProperty("adOnPauseEnabled") &&
      this.options.adOnPauseEnabled &&
      !this.jb() &&
      !this.J &&
      !this.h.F() &&
      !this.h.Ja()
    );
  };
  P.uj = function () {
    this.$g = !0;
    this.ah() ? this.im() : this.fj() && this.hm();
  };
  P.wo = function () {
    this.$g || this.uj();
    this.Fh || this.view.j(".pb-ad-pause-plt").s("pb-ad-pause-plt-show");
  };
  P.aj = function () {
    this.view.j(".pb-ad-pause-plt").G("pb-ad-pause-plt-show") &&
      this.view.j(".pb-ad-pause-plt").C("pb-ad-pause-plt-show");
  };
  P.dl = function () {
    this.view
      .j(".pb-ad-pause-plt-content")
      .ha('<div data-widget="plista_widget_infeed_3"></div>');
  };
  P.im = function () {
    var a = {
        publickey: "60e3bc9c547ec9c0d4858cee",
        origin: "pl",
      },
      b = "script",
      d = window;
    var f = a.name || "PLISTA";
    d[f] ||
      ((d[f] = a),
      (f = d.document.getElementsByTagName(b)[0]),
      (b = d.document.createElement(b)),
      (b.async = !0),
      (b.type = "text/javascript"),
      (b.src =
        ("https:" === d.location.protocol ? "https:" : "http:") +
        "//static" +
        (a.origin ? "-" + a.origin : "") +
        ".plista.com/async" +
        (a.name ? "/" + a.name : "") +
        ".js"),
      f.parentNode.insertBefore(b, f));
  };
  P.hm = function () {
    if (
      this.options.hasOwnProperty("adOnPauseElement") &&
      !y(this.options.adOnPauseElement)
    )
      if (
        (this.view
          .j(".pb-ad-pause-plt-content")
          .ha(this.options.adOnPauseElement),
        this.ta())
      ) {
        window.__nc_widgets = window.__nc_widgets || [];
        window.__nc_j = window.__nc_j || null;
        window.__nc_widgets.push([
          "1DF4-A6D5-5098-A1FD-1lEIw4",
          "ebd.cda.pl",
          "advertisement",
          1,
          1,
        ]);
        window.__nc = document.createElement("script");
        window.__nc.type = "text/javascript";
        window.__nc.async = !0;
        window.__nc.id = "Nextclick_Manager";
        window.__nc.src = "//nextclick.pl/widget/widget.advertisement.1.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(window.__nc, a);
      } else
        (window._taboola = window._taboola || []),
          window._taboola.push({
            mode: "thumbnails-a",
            container: "taboola-below-player-thumbnails",
            placement: "Below Player Thumbnails",
            target_type: "mix",
          });
  };
  P.Ii = function () {
    this.aj();
    this.resume();
  };
  P.vo = function () {
    var a = this.f.id;
    this.A =
      "269170516" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NjRiYjMwODg5ODcwOWY4Y2U2NGUwMDBkYjAwNDFhYTg_MTAwMA&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "26916244a" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NGMwYjY0Y2M2YmFlMTIxNmFhZmJiNDM0MTUwNjA0Nzk_OTk3&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "2691633fd" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MDdjOGM5ZTMwNmEwYmEwYWY4MDIxMTg1NGMwNzc1MTk_MTAwMw&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "269163615" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MjdmOThmNTkzODE4MzA3MTk2ZjgzMjU3MTlkZDQyMmM_MTAwNg&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "2691648cb" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=MzM2ZGJlYTFmOGY2MWEyOWNhYjE1ZTIyNjAwNTE1ZjE_MTAwOQ&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "269165137" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=NzVkMmYzOTA1ZDQzOTBiMWRhZDNhMDcyZDEyYWM2OTM_MTAxMg&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "269166053" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZWFlZDgxZDkzYzljOGNjOWQ1YTU1OGJkMDczNGE2NWI_MTAxNQ&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "4125787e0" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
            video193sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video193sec&ct=[timestamp]",
              fired: !1,
            },
            video220sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=Y2EwZWJhOGI4ZDc1Njc4ZjM1YmY3ZjFiNTU0M2M5YzA_MTg5MQ&pl=video220sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "412582640" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
            video148sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ZTRkZjEyMWJkNTFlOTY5MTQyODkyZGVjODM0MWFkNTU_MTg5NA&pl=video148sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "412584104" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
            video50sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video50sec&ct=[timestamp]",
              fired: !1,
            },
            video115sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video115sec&ct=[timestamp]",
              fired: !1,
            },
            video122sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YjA2YTg0Y2Y5YjFlNGI2MGI3OTRlZWM1NTJjZDgxZTE_MTg5Nw&pl=video122sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "4125850f4" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
            video54sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=ODgxYjMzZWQ3MWEwMjMzYjkyNDE2YWM0YTEzMjk4ODM_MTkwMA&pl=video54sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : "41258896e" == a
        ? {
            impression: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=impression&ct=[timestamp]",
              fired: !1,
            },
            start: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=start&ct=[timestamp]",
              fired: !1,
            },
            firstQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=firstQuartile&ct=[timestamp]",
              fired: !1,
            },
            midpoint: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=midpoint&ct=[timestamp]",
              fired: !1,
            },
            thirdQuartile: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=thirdQuartile&ct=[timestamp]",
              fired: !1,
            },
            complete: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=complete&ct=[timestamp]",
              fired: !1,
            },
            video60sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video60sec&ct=[timestamp]",
              fired: !1,
            },
            video120sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video120sec&ct=[timestamp]",
              fired: !1,
            },
            video180sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video180sec&ct=[timestamp]",
              fired: !1,
            },
            video240sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video240sec&ct=[timestamp]",
              fired: !1,
            },
            video300sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video300sec&ct=[timestamp]",
              fired: !1,
            },
            video360sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video360sec&ct=[timestamp]",
              fired: !1,
            },
            video420sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video420sec&ct=[timestamp]",
              fired: !1,
            },
            video480sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video480sec&ct=[timestamp]",
              fired: !1,
            },
            video540sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video540sec&ct=[timestamp]",
              fired: !1,
            },
            video600sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video600sec&ct=[timestamp]",
              fired: !1,
            },
            video229sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video229sec&ct=[timestamp]",
              fired: !1,
            },
            video247sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video247sec&ct=[timestamp]",
              fired: !1,
            },
            video253sec: {
              url: "https://g.cda.pl/g.php?pixel&vi=YTNmYmM1MWExNjMzMWM1NGZhMGFmZjUzNDdlNDNjODU_MTkwMw&pl=video253sec&ct=[timestamp]",
              fired: !1,
            },
          }
        : null;
  };
  P.S = function (a) {
    if (E(a)) {
      var b = new window.Image(1, 1);
      b.onload = b.onerror = function () {
        delete b;
      };
      b.src = a;
    }
  };
  P.Zd = function () {
    this.log(this.c, "check autoplay");
    null == this.video ||
      0 < this.l() ||
      2 < this.lb ||
      ((this.lb += 1),
      (this.video.muted = !0),
      (this.video.autoplay = "autoplay"),
      (this.Ab = !0),
      this.L(0, !0),
      this.controls.L(0, !0),
      this.controls.H(!0),
      this.J || this.ta() || this.controls.se(),
      this.rb(),
      this.Cg());
  };
  P.qd = function () {
    this.log(this.c, "check scroll");
    this.rb();
    this.Kd();
  };
  P.Kd = function () {
    this.log(this.c, "remove scroll events");
    z(this.i.Fe) || U(window, "touchstart", this.i.Fe);
    z(this.i.Ee) || U(window, "scroll", this.i.Ee);
    z(this.i.De) || U(window, "resize", this.i.De);
  };
  P.Cg = function () {
    this.i.Fe = T(window, "touchstart", this.qd, this);
    this.i.Ee = T(window, "scroll", this.qd, this);
    this.i.De = T(window, "resize", this.qd, this);
  };
  P.wh = function () {
    var a = event || window.event;
    null !== a &&
      null !== a.data &&
      ((a = a.data),
      "player-viewable" == a
        ? (this.Sd = this.bi = !0)
        : "player-notviewable" == a
        ? ((this.bi = !0), (this.Sd = !1))
        : "player-mini-fly-show" == a
        ? (this.Fh = !0)
        : "player-mini-fly-hide" == a && (this.Fh = !1));
  };
  P.Je = function () {
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      var a = this;
      this.video.addEventListener(
        "webkitplaybacktargetavailabilitychanged",
        function (b) {
          switch (b.availability) {
            case "available":
              a.view.content.s("pb-airplay-posible");
              break;
            default:
              a.view.content.C("pb-airplay-posible");
          }
          a.view.fl.addEventListener("click", function () {
            a.video.webkitShowPlaybackTargetPicker();
          });
        }
      );
    } else this.view.content.C("pb-airplay-posible");
  };
  P.Ol = function () {
    this.view.content.C("pb-airplay-posible");
  };
  P.Hj = function (a) {
    null != a &&
      (z(a.reason) || "InsufficientBufferRule: Buffer is empty" != a.reason
        ? z(a.type) || "streamUpdated" != a.type || (this.Ef = !1)
        : (this.Ef = !0));
    for (var b in a)
      if ("object" != typeof a[b]) {
        if ("message" == b) {
          this.log("cda.Player.DashJS", "log", a[b]);
          try {
            if (-1 < a[b].indexOf("Denied by stream limiting")) {
              this.o.reset();
              this.view.show(this.view.alert);
              this.view.pb(
                this.view.Za,
                "Zbyt wiele os\u00f3b (3) korzysta z Twojego konta."
              );
              this.controls.disable();
              this.disabled = !0;
              break;
            }
            if (-1 < a[b].indexOf("Buffer is empty! Stalling")) {
              this.cb(Math.ceil(this.l()));
              break;
            }
            if (
              -1 <
                a[b].indexOf(
                  "play() failed because the user didn't interact with the document first"
                ) &&
              this.Uc &&
              this.autoplay &&
              this.video.paused &&
              !this.controls.aa.R() &&
              !this.controls.N.R() &&
              !this.J
            ) {
              this.video.muted = !0;
              this.video.autoplay = "autoplay";
              this.Ab = !0;
              this.L(0, !0);
              this.controls.L(0, !0);
              this.controls.se();
              this.o.play();
              break;
            }
            if (
              -1 <
              a[b].indexOf(
                "requestMediaKeySystemAccess is disabled by feature policy"
              )
            )
              this.o.reset(),
                this.view.show(this.view.alert),
                (this.view.Za.innerHTML =
                  'Wyst\u0105pi\u0142 problem z odtwarzaniem materia\u0142u wideo. <br>Kliknij i przejd\u017a na podstron\u0119 z filmem <a href="https://www.cda.pl/video/' +
                  this.f.id +
                  '" target="_blank" style="color:#e28525">www.cda.pl/video/' +
                  this.f.id +
                  "</a>"),
                this.controls.disable(),
                (this.disabled = !0);
            else if (
              -1 < a[b].indexOf("KeySystem Access Denied") &&
              this.h.F() &&
              this.h.vd()
            ) {
              this.o.reset();
              this.view.show(this.view.alert);
              var d = "market://details?id=pl.cda";
              this.h.sa() &&
                (d = "https://apps.apple.com/pl/app/cda-pl/id1318175670");
              this.view.Za.innerHTML =
                'Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie. <br>(Je\u015bli jeste\u015b w trybie incognito to uruchom przegl\u0105dark\u0119 w trybie normalnym lub <a href="' +
                d +
                '" style="color:#e28525">pobierz aplikacj\u0119 CDA na swoje urz\u0105dzenie</a>.)';
              this.controls.disable();
              this.disabled = !0;
            }
          } catch (g) {}
        }
        if (
          "type" == b &&
          "playbackNotAllowed" == a[b] &&
          this.M &&
          this.autoplay &&
          this.video.paused &&
          !this.controls.aa.R() &&
          !this.controls.N.R() &&
          !this.J
        ) {
          this.video.muted = !0;
          this.video.autoplay = "autoplay";
          this.Ab = !0;
          this.L(0, !0);
          this.controls.L(0, !0);
          this.controls.se();
          this.o.play();
          break;
        }
        "message" != b &&
          "type" != b &&
          "level" != b &&
          this.log("cda.Player.DashJS", b, a[b]);
      } else
        for (var f in a[b])
          this.log("cda.Player.DashJS", f, JSON.stringify(a[b][f]));
  };
  P.Oj = function () {
    this.log(this.c, "PLAYBACK PLAYING");
    this.J ||
      !this.view.content.G("pb-pip-enabled") ||
      this.view.content.G("pb-frame-posible") ||
      this.T.isConnected() ||
      this.view.od.G("pb-info-ccast-show") ||
      this.view.content.s("pb-frame-posible");
    if (!this.J && !this.M && !this.view.content.G("pb-aspect-posible")) {
      var a =
        window.screen.height > window.screen.width
          ? window.screen.height / window.screen.width
          : window.screen.width / window.screen.height;
      if (this.h.F() || 1.9 <= a)
        this.view.content.s("pb-aspect-posible"),
          this.h.F() && !this.controls.fc && 1.8 <= a && this.controls.If();
    }
    this.de = !1;
    this.controls.H(!1);
    this.Va(this.state.ga);
    this.controls.ba(!0);
    this.M &&
      this.gf &&
      ((this.gf = !1),
      this.controls.Wg(),
      this.controls.Ea && this.controls.Rb());
    this.ff && (this.ff = !1);
    if (
      -1 == this.ia &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      !1 !== this.hb() &&
      (this.Ob() || "premium" == this.f.type || "premium_free" == this.f.type)
    )
      try {
        var b = this;
        window.$.ajax({
          url: "//api.cda.pl/h.php?uid=" + this.hb(),
          type: "post",
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0,
          },
          data: {
            currentTime: 0,
            duration: this.f.duration,
            test: this.Ob(),
            server: this.ge(),
          },
          success: function () {
            b.ia = 0;
          },
        });
      } catch (d) {
        this.log(this.c, d);
      }
  };
  P.Gj = function (a) {
    if (this.Uc)
      this.view.m(this.view.alert),
        this.controls.enable(),
        this.getState() === this.state.ga && this.video.paused && this.o.play();
    else if (!1 === this.Si)
      (this.Si = !0), this.o.reset(), (this.o = null), this.Yg();
    else
      try {
        var b = a.error.message;
        if (-1 < b.indexOf("MEDIA_ERR_DECODE"))
          try {
            window[this.X.client].playerDrmError(
              this.f.id,
              this.f.quality,
              this.da,
              b
            );
          } catch (g) {}
        if (
          -1 < b.toLowerCase().indexOf("license") ||
          -1 < b.indexOf("MEDIA_ERR_DECODE")
        ) {
          this.M && this.controls.te.s("pb-time-tv-info-live-disable");
          this.view.show(this.view.alert);
          this.view.pb(
            this.view.Za,
            "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1033)"
          );
          this.controls.disable();
          this.disabled = !0;
          var d = window.location.href,
            f = Math.floor(this.l());
          -1 < window.location.href.indexOf("?")
            ? null == this.ib("t")
              ? (d += "&t=" + f)
              : ((d = new URL(d)),
                d.searchParams.set("t", f),
                (d = d.toString()))
            : (d += "?t=" + f);
          -1 == d.indexOf("pr") && (window.location.href = d + "&pr");
        } else
          -1 < b.indexOf("KeySystem Access Denied") &&
            this.h.F() &&
            this.h.vd() &&
            (this.o.reset(),
            this.view.show(this.view.alert),
            (a = "market://details?id=pl.cda"),
            this.h.sa() &&
              (a = "https://apps.apple.com/pl/app/cda-pl/id1318175670"),
            (this.view.Za.innerHTML = this.M
              ? "Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie. <br>(Je\u015bli jeste\u015b w trybie incognito to uruchom przegl\u0105dark\u0119 w trybie normalnym.)"
              : 'Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie. <br>(Je\u015bli jeste\u015b w trybie incognito to uruchom przegl\u0105dark\u0119 w trybie normalnym lub <a href="' +
                a +
                '" style="color:#e28525">pobierz aplikacj\u0119 CDA na swoje urz\u0105dzenie</a>.)'),
            this.controls.disable(),
            (this.disabled = !0));
      } catch (g) {}
  };
  P.Nj = function (a) {
    this.log(this.c, "player error");
    try {
      var b = a.error.message;
      this.log(this.c, b);
      try {
        window[this.X.client].playerDrmError(
          this.f.id,
          this.f.quality,
          this.da,
          b
        );
      } catch (d) {}
    } catch (d) {}
  };
  P.Tj = function () {
    this.log(this.c, "PLAYBACK WAITING");
    this.de = !0;
    this.controls.H(!0);
    var a = this.o.getBufferLength();
    if (
      this.M &&
      null == this.rd &&
      (this.Ef || 0.5 > this.o.getBufferLength()) &&
      !this.Lg
    ) {
      var b = this;
      this.rd = window.setTimeout(function () {
        (b.Ef || 0.5 > b.o.getBufferLength()) &&
        b.de &&
        a == b.o.getBufferLength()
          ? (b.Lg = !0)
          : window.clearTimeout(b.rd);
        b.rd = null;
      }, 5e3);
    }
  };
  P.Pj = function () {};
  P.Sj = function () {
    return this.Yc();
  };
  P.Vj = function () {
    this.log(this.c, "STREAM INIT");
    this.Kd();
    this.M && (this.gf = !0);
    try {
      if (A(window.onVideoDashStreamInit)) window.onVideoDashStreamInit(this.o);
    } catch (a) {}
    try {
      this.Sh();
    } catch (a) {}
  };
  P.Ij = function (a) {
    !a.request ||
    z(a.request.mediaInfo) ||
    z(a.request.mediaInfo.streamInfo) ||
    z(a.request.mediaInfo.streamInfo.manifestInfo) ||
    z(a.request.mediaInfo.streamInfo.manifestInfo.isDynamic) ||
    !a.request.mediaInfo.streamInfo.manifestInfo.isDynamic
      ? (this.Kg = !1)
      : ((this.Kg = !0),
        this.controls.Ng.m(),
        this.controls.Ca.m(),
        (this.Ta = -1));
    if (
      a.request &&
      ("InitializationSegment" === a.request.type ||
        "MediaSegment" == a.request.type) &&
      !this.ce
    ) {
      this.ce = !0;
      a = this.o.getBitrateInfoListFor("video");
      var b = -1;
      -1 < this.da.indexOf("redefine.pl") &&
        ((b = a.length - 1), this.o.setQualityFor("video", b));
      if (1 < a.length && -1 == b) {
        for (var d = 0; d < a.length; d++) {
          if (1920 == a[d].width && "hd" == this.f.quality) {
            b = a[d].qualityIndex;
            break;
          }
          if (1280 == a[d].width && "sd" == this.f.quality) {
            b = a[d].qualityIndex;
            break;
          }
          if (854 == a[d].width && "lq" == this.f.quality) {
            b = a[d].qualityIndex;
            break;
          }
          if (640 == a[d].width && "vl" == this.f.quality) {
            b = a[d].qualityIndex;
            break;
          }
        }
        this.o.setQualityFor("video", b);
      }
      this.log(this.c, "video qualities");
      this.log(this.c, a);
      this.log(this.c, "current video quality: " + b);
      a = this.o.getBitrateInfoListFor("audio");
      b = -1;
      if (-1 < this.kh) {
        if (0 < a.length)
          for (d = 0; d < a.length; d++)
            if (a[d].bitrate == this.kh) {
              b = a[d].qualityIndex;
              break;
            }
      } else
        "hd" == this.f.quality || this.lh
          ? 0 < a.length && (b = a.length - 1)
          : (b = 0);
      this.log(this.c, "audio qualities");
      this.log(this.c, a);
      this.log(this.c, "current audio quality: " + b);
      this.o.setQualityFor("audio", b);
    }
  };
  P.Mj = function () {
    return this.Hd();
  };
  P.Qj = function () {
    this.dd(!1);
    this.Md(-1);
    this.re();
    -1 < this.ia && (this.ia = this.l());
    this.o.play();
    this.controls.H(!1);
    try {
      var a = this.controls.Ca.querySelectorAll(".pb-progress-midroll-marker");
      if (!y(a) && 0 < a.length)
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          !y(d) &&
            !y(d.getAttribute("data-time")) &&
            d.getAttribute("data-time") < this.l() &&
            d.m();
        }
    } catch (f) {
      this.log(this.c, f);
    }
  };
  P.Rj = function () {
    this.dd(!0);
    this.controls.H(!0);
  };
  P.Kj = function (a) {
    a.error
      ? this.log(this.c, "LICENSE REQUEST ERROR")
      : this.log(this.c, "LICENSE REQUEST COMPLETE");
  };
  P.Jj = function (a) {
    var b = this;
    try {
      a.data.session.keyStatuses.forEach(function (a) {
        b.log(b.c, "KEY STATUS: " + a);
        switch (a) {
          case "expired":
            b.Uc = !1;
            break;
          case "output-restricted":
            b.Uc = !1;
            break;
          case "usable":
            (b.Uc = !0),
              0 < b.Ta &&
                -1 === b.ld &&
                b.Ta < b.K() &&
                ((b.ld = b.Ta), (b.autoplay = !0), b.o.seek(b.Ta));
        }
      });
    } catch (d) {
      this.log(this.c, d);
    }
  };
  P.Uj = function () {
    0 >= this.l() && this.controls.H(!0);
  };
  P.Lj = function (a) {
    if (
      a.data &&
      a.data.availabilityStartTime &&
      ((a = new Date(a.data.availabilityStartTime).getTime()),
      null == this.Qd &&
        ((this.Qd = a),
        this.log(this.c, "availabilityStartTime saved: " + this.Qd)),
      null != this.Qd && this.Qd != a && !this.ff)
    ) {
      this.log(this.c, "availabilityStartTime changed - restarting...");
      this.ff = !0;
      this.Qd = null;
      this.autoplay = !0;
      var b = this;
      window.setTimeout(function () {
        b.Mk(b.options);
      }, 2e3);
    }
  };
  P.Yg = function () {
    this.log(this.c, "init dashjs");
    this.storage.get("dashjs_video_bitrate") &&
      this.storage.remove("dashjs_video_bitrate");
    try {
      if (null != this.o) {
        this.ce = this.Uc = this.Jg = !1;
        var a = {};
        y(this.Wc) ||
          ((a["com.widevine.alpha"] = {}),
          (a["com.widevine.alpha"].serverURL = this.Wc),
          (a["com.widevine.alpha"].videoRobustness = "SW_SECURE_CRYPTO"),
          (a["com.widevine.alpha"].audioRobustness = "SW_SECURE_CRYPTO"),
          y(this.Db) ||
            (a["com.widevine.alpha"].httpRequestHeaders = {
              "x-dt-custom-data": this.Db,
            }));
        y(this.Bd) ||
          ((a["com.microsoft.playready"] = {}),
          (a["com.microsoft.playready"].serverURL = this.Bd),
          y(this.Ad) ||
            (a["com.microsoft.playready"].httpRequestHeaders = {
              "x-dt-custom-data": this.Ad,
            }));
        this.o.setProtectionData(a);
        this.o.attachSource(this.da);
      } else
        (this.o = dashjs.MediaPlayer().create()),
          (this.ce = this.Uc = !1),
          (a = {}),
          y(this.Wc) ||
            ((a["com.widevine.alpha"] = {}),
            (a["com.widevine.alpha"].serverURL = this.Wc),
            (a["com.widevine.alpha"].videoRobustness = "SW_SECURE_CRYPTO"),
            (a["com.widevine.alpha"].audioRobustness = "SW_SECURE_CRYPTO"),
            y(this.Db) ||
              (a["com.widevine.alpha"].httpRequestHeaders = {
                "x-dt-custom-data": this.Db,
              })),
          y(this.Bd) ||
            ((a["com.microsoft.playready"] = {}),
            (a["com.microsoft.playready"].serverURL = this.Bd),
            y(this.Ad) ||
              (a["com.microsoft.playready"].httpRequestHeaders = {
                "x-dt-custom-data": this.Ad,
              })),
          this.o.initialize(this.video, this.da, !0),
          this.o.setProtectionData(a),
          this.Tl(),
          this.i.contextmenu ||
            (this.i.contextmenu = T(
              this.view.rc,
              "contextmenu",
              this.pc("contextmenu"),
              this
            )),
          this.i.contextmenu2 ||
            (this.i.contextmenu2 = T(
              this.video,
              "contextmenu",
              this.pc("contextmenu"),
              this
            )),
          this.i.click ||
            (this.i.click = T(this.video, "click", this.pc("click"), this)),
          this.M ||
            this.o.updateSettings({
              streaming: {
                abr: {
                  autoSwitchBitrate: {
                    video: this.Fc,
                    audio: this.Fc,
                  },
                },
              },
            }),
          (a = !0),
          this.M && (a = !this.h.F()),
          this.o.updateSettings({
            streaming: {
              abr: {
                bandwidthSafetyFactor: this.M ? 0.7 : 0.9,
                initialBitrate: {},
              },
              lastBitrateCachingInfo: {
                enabled: this.M ? !1 : !0,
              },
              lastMediaSettingsCachingInfo: {
                enabled: this.M ? !1 : !0,
              },
              buffer: {
                fastSwitchEnabled: a,
              },
              retryIntervals: {
                MPD: 1e3,
              },
              retryAttempts: {
                MPD: 5e3,
                XLinkExpansion: 5e3,
                MediaSegment: 5e3,
                InitializationSegment: 5e3,
                BitstreamSwitchingSegment: 5e3,
                IndexSegment: 5e3,
                other: 5e3,
                license: 10,
                lowLatencyMultiplyFactor: 100,
                FragmentInfoSegment: 5e3,
              },
              fragmentRequestTimeout: this.M ? 5e3 : 0,
            },
          }),
          this.Fc && (this.ce = !0),
          this.o.setAutoPlay(!0);
      this.Va(this.state.ga);
      this.controls.ba(!0);
      this.controls.H(!0);
      window.__cda_dashjs = this.o;
    } catch (b) {
      this.log(this.c, b);
    }
  };
  P.lp = function () {
    return "BUFFER_EMPTY BUFFER_LOADED CAN_PLAY ERROR LOG MANIFEST_LOADED FRAGMENT_LOADING_STARTED FRAGMENT_LOADING_PROGRESS FRAGMENT_LOADING_COMPLETED PERIOD_SWITCH_COMPLETED PERIOD_SWITCH_STARTED PLAYBACK_ENDED PLAYBACK_ERROR PLAYBACK_METADATA_LOADED PLAYBACK_PAUSED PLAYBACK_PLAYING PLAYBACK_PROGRESS PLAYBACK_RATE_CHANGED PLAYBACK_SEEKED PLAYBACK_SEEKING PLAYBACK_STARTED PLAYBACK_STALLED PLAYBACK_TIME_UPDATED PLAYBACK_WAITING PLAYBACK_NOT_ALLOWED GAP_CAUSED_INTERNAL_SEEK GAP_CAUSED_SEEK_TO_PERIOD_END AST_IN_FUTURE STREAM_INITIALIZED STREAM_INITIALIZING STREAM_TEARDOWN_COMPLETE STREAM_UPDATED SOURCE_INITIALIZED QUALITY_CHANGE_REQUESTED QUALITY_CHANGE_RENDERED TEXT_TRACK_ADDED TEXT_TRACKS_ADDED".split(
      " "
    );
  };
  P.Tl = function () {
    for (
      var a =
          "BUFFER_EMPTY BUFFER_LOADED CAN_PLAY ERROR LOG MANIFEST_LOADED FRAGMENT_LOADING_STARTED FRAGMENT_LOADING_PROGRESS FRAGMENT_LOADING_COMPLETED PERIOD_SWITCH_COMPLETED PERIOD_SWITCH_STARTED PLAYBACK_ENDED PLAYBACK_ERROR PLAYBACK_METADATA_LOADED PLAYBACK_PAUSED PLAYBACK_PLAYING PLAYBACK_PROGRESS PLAYBACK_RATE_CHANGED PLAYBACK_SEEKED PLAYBACK_SEEKING PLAYBACK_STARTED PLAYBACK_STALLED PLAYBACK_TIME_UPDATED PLAYBACK_WAITING PLAYBACK_NOT_ALLOWED GAP_CAUSED_INTERNAL_SEEK GAP_CAUSED_SEEK_TO_PERIOD_END AST_IN_FUTURE STREAM_INITIALIZED STREAM_INITIALIZING STREAM_TEARDOWN_COMPLETE STREAM_UPDATED SOURCE_INITIALIZED QUALITY_CHANGE_REQUESTED QUALITY_CHANGE_RENDERED TEXT_TRACK_ADDED TEXT_TRACKS_ADDED".split(
            " "
          ),
        b = 0;
      b < a.length;
      b++
    )
      try {
        if ("STREAM_INITIALIZED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Vj, this)
          );
        else if ("ERROR" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Gj, this)
          );
        else if ("PLAYBACK_ERROR" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Nj, this)
          );
        else if ("PLAYBACK_TIME_UPDATED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Sj, this)
          );
        else if ("PLAYBACK_PLAYING" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Oj, this)
          );
        else if ("PLAYBACK_ENDED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Mj, this)
          );
        else if ("PLAYBACK_SEEKED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Qj, this)
          );
        else if ("PLAYBACK_SEEKING" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Rj, this)
          );
        else if ("PLAYBACK_WAITING" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Tj, this)
          );
        else if ("PLAYBACK_PROGRESS" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Pj, this)
          );
        else if ("FRAGMENT_LOADING_STARTED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Uj, this)
          );
        else if ("FRAGMENT_LOADING_COMPLETED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Ij, this)
          );
        else if ("MANIFEST_LOADED" == a[b])
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Lj, this)
          );
        else
          this.o.on(
            window.dashjs.MediaPlayer.events[a[b]],
            this.D.I(this.Hj, this)
          );
      } catch (d) {}
    this.o.on("public_licenseRequestComplete", this.D.I(this.Kj, this));
    this.o.on("public_keyStatusesChanged", this.D.I(this.Jj, this));
  };
  P.Vn = function () {
    for (
      var a =
          "BUFFER_EMPTY BUFFER_LOADED CAN_PLAY ERROR LOG MANIFEST_LOADED FRAGMENT_LOADING_STARTED FRAGMENT_LOADING_PROGRESS FRAGMENT_LOADING_COMPLETED PERIOD_SWITCH_COMPLETED PERIOD_SWITCH_STARTED PLAYBACK_ENDED PLAYBACK_ERROR PLAYBACK_METADATA_LOADED PLAYBACK_PAUSED PLAYBACK_PLAYING PLAYBACK_PROGRESS PLAYBACK_RATE_CHANGED PLAYBACK_SEEKED PLAYBACK_SEEKING PLAYBACK_STARTED PLAYBACK_STALLED PLAYBACK_TIME_UPDATED PLAYBACK_WAITING PLAYBACK_NOT_ALLOWED GAP_CAUSED_INTERNAL_SEEK GAP_CAUSED_SEEK_TO_PERIOD_END AST_IN_FUTURE STREAM_INITIALIZED STREAM_INITIALIZING STREAM_TEARDOWN_COMPLETE STREAM_UPDATED SOURCE_INITIALIZED QUALITY_CHANGE_REQUESTED QUALITY_CHANGE_RENDERED TEXT_TRACK_ADDED TEXT_TRACKS_ADDED".split(
            " "
          ),
        b = 0;
      b < a.length;
      b++
    )
      try {
        "STREAM_INITIALIZED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Vj, this)
            )
          : "ERROR" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Gj, this)
            )
          : "PLAYBACK_ERROR" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Nj, this)
            )
          : "PLAYBACK_TIME_UPDATED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Sj, this)
            )
          : "PLAYBACK_PLAYING" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Oj, this)
            )
          : "PLAYBACK_ENDED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Mj, this)
            )
          : "PLAYBACK_SEEKED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Qj, this)
            )
          : "PLAYBACK_SEEKING" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Rj, this)
            )
          : "PLAYBACK_WAITING" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Tj, this)
            )
          : "PLAYBACK_PROGRESS" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Pj, this)
            )
          : "FRAGMENT_LOADING_STARTED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Uj, this)
            )
          : "FRAGMENT_LOADING_COMPLETED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Ij, this)
            )
          : "MANIFEST_LOADED" == a[b]
          ? this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Lj, this)
            )
          : this.o.off(
              window.dashjs.MediaPlayer.events[a[b]],
              this.D.I(this.Hj, this)
            );
      } catch (d) {}
    this.o.off("public_licenseRequestComplete", this.D.I(this.Kj, this));
    this.o.off("public_keyStatusesChanged", this.D.I(this.Jj, this));
  };
  P.wp = function () {
    this.log(this.c, "init videojs");
    try {
      null == this.P
        ? ((this.P = window.videojs(this.video, {
            autoplay: !1,
            preload: "auto",
          })),
          this.P.eme())
        : (this.ai = !1);
      var a = this;
      this.P.src({
        src: this.Pb,
        type: "application/x-mpegURL",
        keySystems: {
          "com.apple.fps.1_0": {
            certificateUri: this.Tf,
            certificateHeaders: {
              "x-dt-custom-data": this.Db,
            },
            getContentId: function (a, b) {
              a = b;
              b = Array(a.length / 2);
              for (var d = 0; d < a.length / 2; d++) b[d] = a[2 * d];
              a = String.fromCharCode.apply(null, b);
              b = a.indexOf("skd://drmtoday?");
              if (-1 === b) return "";
              a = a.substring(b + 6);
              a = a.replace(/assetid/gi, "assetId");
              return (a = a.replace(/variantid/gi, "variantId"));
            },
            getLicense: function (b, f, g, l) {
              window.videojs.xhr(
                {
                  url: a.Uf,
                  method: "POST",
                  responseType: "text",
                  body:
                    "spc=" +
                    encodeURIComponent(
                      btoa(String.fromCharCode.apply(null, g))
                    ),
                  headers: {
                    "Cache-Control": "max-age=0",
                    Pragma: "no-cache",
                    "Content-type": "application/x-www-form-urlencoded",
                    "x-dt-custom-data": a.Db,
                  },
                },
                function (a, b, d) {
                  a ? l(a) : l(null, d);
                }
              );
            },
          },
        },
      });
      this.P.play();
      this.P.el().querySelector("video").classList.add("pb-video-player");
      this.P.on("play", this.D.I(this.pn, this));
      this.P.on("playing", this.D.I(this.qn, this));
      this.P.on("pause", this.D.I(this.nn, this));
      this.P.on("timeupdate", this.D.I(this.tn, this));
      this.P.on("seeking", this.D.I(this.sn, this));
      this.P.on("seeked", this.D.I(this.rn, this));
      this.P.on("ended", this.D.I(this.kn, this));
      this.P.on("error", this.D.I(this.ln, this));
      this.P.on("loadedmetadata", this.D.I(this.mn, this));
      this.video = this.P.tech({
        IWillNotUseThisInPlugins: !0,
      }).el();
      this.controls.H(!0);
      try {
        var b = this.Lf();
        0 != b && b.hasOwnProperty("volume")
          ? this.controls.L(b.volume)
          : this.wd("cda.player.volume")
          ? this.controls.L(this.$b("cda.player.volume"))
          : this.controls.L(this.controls.Jc);
      } catch (d) {
        this.controls.L(this.controls.Jc);
      }
      this.controls.td();
    } catch (d) {
      this.log(this.c, d);
    }
  };
  P.pn = function () {
    this.J ||
      !this.view.content.G("pb-pip-enabled") ||
      this.view.content.G("pb-frame-posible") ||
      this.T.isConnected() ||
      this.view.od.G("pb-info-ccast-show") ||
      this.view.content.s("pb-frame-posible");
    if (!this.J && !this.M && !this.view.content.G("pb-aspect-posible")) {
      var a =
        window.screen.height > window.screen.width
          ? window.screen.height / window.screen.width
          : window.screen.width / window.screen.height;
      if (this.h.F() || 1.9 <= a)
        this.view.content.s("pb-aspect-posible"),
          this.h.F() && !this.controls.fc && 1.8 <= a && this.controls.If();
    }
  };
  P.qn = function () {
    this.Va(this.state.ga);
    this.controls.ba(!0);
    if (
      -1 == this.ia &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      !1 !== this.hb() &&
      (this.Ob() || "premium" == this.f.type || "premium_free" == this.f.type)
    )
      try {
        var a = this;
        window.$.ajax({
          url: "//api.cda.pl/h.php?uid=" + this.hb(),
          type: "post",
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0,
          },
          data: {
            currentTime: 0,
            duration: this.f.duration,
            test: this.Ob(),
            server: this.ge(),
          },
          success: function () {
            a.ia = 0;
          },
        });
      } catch (b) {
        this.log(this.c, b);
      }
  };
  P.nn = function () {};
  P.tn = function () {
    return this.Yc();
  };
  P.kn = function () {
    return this.Hd();
  };
  P.sn = function () {
    this.dd(!0);
    this.controls.H(!0);
  };
  P.rn = function () {
    this.dd(!1);
    this.Md(-1);
    this.re();
    -1 < this.ia && (this.ia = this.l());
    this.P.play();
    this.controls.H(!1);
    try {
      var a = this.controls.Ca.querySelectorAll(".pb-progress-midroll-marker");
      if (!y(a) && 0 < a.length)
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          !y(d) &&
            !y(d.getAttribute("data-time")) &&
            d.getAttribute("data-time") < this.l() &&
            d.m();
        }
    } catch (f) {
      this.log(this.c, f);
    }
  };
  P.ln = function () {};
  P.mn = function () {};
  P.Co = function () {
    window[this.X.client].tvGetProgramForAllChannels({
      success: this.D.I(this.Do, this),
    });
  };
  P.Do = function (a) {
    if (a && 0 < a.length) {
      for (var b = 0; b < a.length; b++)
        for (var d = 0; d < this.la.length; d++)
          if (a[b].channel == this.la[d].url) {
            a[b].program.actual.start_time_ts >
              this.la[d].program.actual.start_time_ts &&
              (this.la[d].program = a[b].program);
            break;
          }
      try {
        window.tvUpdatePrograms(a);
      } catch (f) {}
    }
    this.controls.Nk(this);
  };
  P.Ao = function () {
    1 >= this.ka.program.end_time_ts ||
      new Date().getTime() / 1e3 < this.ka.program.end_time_ts ||
      this.Wh ||
      ((this.Wh = !0),
      window[this.X.client].tvGetCurrentProgram(
        this.ka.url,
        this.ka.program.start_time_ts,
        {
          success: this.D.I(this.Bo, this),
        }
      ));
  };
  P.Bo = function (a) {
    if (a) {
      this.ka.program = a;
      for (var b = 0; b < this.la.length; b++)
        if (this.ka.url == this.la[b].url) {
          this.la[b].program.actual = a;
          this.controls.bd();
          break;
        }
    }
    this.Wh = !1;
    this.controls.Nk(this);
  };
  P.pl = function (a, b, d) {
    try {
      window[this.X.client].videoGetLink(
        this.f.id,
        a,
        this.f.ts,
        this.f.hash2,
        {
          success: function (a) {
            "ok" == a.status && null != a.resp ? b(a.resp) : d();
          },
          error: function () {
            d();
          },
        }
      );
    } catch (f) {
      d();
    }
  };
  P.Yn = function (a) {
    if (33 != this.Dc())
      try {
        window[this.X.client].saveVideoQuality(a);
      } catch (b) {}
  };
  P.ie = function () {
    var a = this,
      b,
      d,
      f,
      g,
      l,
      k,
      p,
      u;
    pa(
      new oa(
        new r(function (v) {
          switch (v.Gc) {
            case 1:
              a.log(a.c, "init Shaka Player");
              window.shaka.polyfill.installAll();
              a.video.autoplay = !0;
              a.Ak = !1;
              null == a.Z &&
                ((a.Z = new window.shaka.Player(a.video)),
                (b = new window.shaka.util.EventManager()),
                (d = a),
                b.listen(a.Z, "buffering", function (a) {
                  d.controls.H(a.buffering);
                  d.gg = a.buffering;
                }),
                b.listen(a.video, "timeupdate", a.D.I(a.bn, a)),
                b.listen(a.video, "pause", a.D.I(a.Ym, a)),
                b.listen(a.video, "playing", a.D.I(a.Zm, a)),
                b.listen(a.video, "ended", a.D.I(a.Um, a)),
                b.listen(a.video, "seeking", a.D.I(a.an, a)),
                b.listen(a.video, "seeked", a.D.I(a.$m, a)),
                a.Z.addEventListener("error", a.D.I(a.Vm, a)),
                a.i.contextmenu ||
                  (a.i.contextmenu = T(
                    a.view.rc,
                    "contextmenu",
                    a.pc("contextmenu"),
                    a
                  )),
                a.i.contextmenu2 ||
                  (a.i.contextmenu2 = T(
                    a.video,
                    "contextmenu",
                    a.pc("contextmenu"),
                    a
                  )),
                a.i.click ||
                  (a.i.click = T(a.video, "click", a.pc("click"), a)));
              f = null;
              if (
                y(a.Pb) ||
                "" == a.Pb ||
                (!a.h.me() && !a.h.nj()) ||
                (!a.h.sa() && !a.h.fh())
              ) {
                y(a.Wc) ||
                  ((g = a.Db),
                  y(a.Db) ||
                    ((d = a),
                    a.Z.getNetworkingEngine().registerRequestFilter(function (
                      a,
                      b
                    ) {
                      if (
                        a ==
                        window.shaka.net.NetworkingEngine.RequestType.MANIFEST
                      )
                        for (var d = 0; d < b.uris.length; d++) {
                          var f = new URL(b.uris[d]);
                          f.searchParams.has("vendorid") &&
                            (f.searchParams.delete("vendorid"),
                            f.searchParams.delete("userid"),
                            f.searchParams.delete("deviceid"),
                            (b.uris[d] = f.toString()));
                        }
                      a ==
                        window.shaka.net.NetworkingEngine.RequestType.LICENSE &&
                        (b.headers["x-dt-custom-data"] = g);
                    })),
                  a.Z.configure({
                    drm: {
                      servers: {
                        "com.widevine.alpha": a.Wc,
                      },
                      advanced: {
                        "com.widevine.alpha": {
                          videoRobustness: "SW_SECURE_CRYPTO",
                          audioRobustness: "SW_SECURE_CRYPTO",
                        },
                      },
                    },
                  }));
                y(a.Bd) ||
                  ((g = a.Ad),
                  y(a.Ad) ||
                    a.Z.getNetworkingEngine().registerRequestFilter(function (
                      a,
                      b
                    ) {
                      a ==
                        window.shaka.net.NetworkingEngine.RequestType.LICENSE &&
                        (b.headers["x-dt-custom-data"] = g);
                    }),
                  a.Z.configure({
                    drm: {
                      servers: {
                        "com.microsoft.playready": a.Bd,
                      },
                    },
                  }));
                f = a.da;
                v.Gc = 2;
                break;
              }
              d = a;
              a.Z.configure("streaming.useNativeHlsOnSafari", !0);
              a.Z.configure("drm.initDataTransform", function (a, b) {
                if ("skd" != b) return a;
                window.shaka.util.StringUtils.fromBytesAutoDetect(a);
                b = String.fromCharCode.apply(null, a);
                b = b.replace("skd://", "");
                var f = d.Z.drmInfo().serverCertificate;
                return window.shaka.util.FairPlayUtils.initDataTransform(
                  a,
                  b,
                  f
                );
              });
              y(a.Db) ||
                ((g = a.Db),
                a.Z.getNetworkingEngine().registerRequestFilter(function (
                  a,
                  b
                ) {
                  if (
                    a == window.shaka.net.NetworkingEngine.RequestType.MANIFEST
                  )
                    for (var d = 0; d < b.uris.length; d++) {
                      var f = new URL(b.uris[d]);
                      f.searchParams.has("vendorid") &&
                        (f.searchParams.delete("vendorid"),
                        f.searchParams.delete("userid"),
                        f.searchParams.delete("deviceid"),
                        (b.uris[d] = f.toString()));
                    }
                  a == window.shaka.net.NetworkingEngine.RequestType.LICENSE &&
                    ((a = new Uint8Array(b.body)),
                    (a = window.shaka.util.Uint8ArrayUtils.toStandardBase64(a)),
                    (a = "spc=" + encodeURIComponent(a)),
                    (b.headers["Content-Type"] =
                      "application/x-www-form-urlencoded"),
                    (b.headers["x-dt-custom-data"] = g),
                    (b.body = a));
                }),
                a.Z.getNetworkingEngine().registerResponseFilter(function (
                  a,
                  b
                ) {
                  a == window.shaka.net.NetworkingEngine.RequestType.LICENSE &&
                    ((a = window.shaka.util.StringUtils.fromUTF8(b.data)),
                    (a = a.trim()),
                    "<ckc>" === a.substr(0, 5) &&
                      "</ckc>" === a.substr(-6) &&
                      (a = a.slice(5, -6)),
                    (b.data =
                      window.shaka.util.Uint8ArrayUtils.fromBase64(a).buffer));
                }));
              if (y(a.Tf) || y(a.Uf)) {
                v.Gc = 3;
                break;
              }
              return q(
                v,
                fetch(a.Tf, {
                  headers: {
                    "x-dt-custom-data": a.Db,
                  },
                }),
                4
              );
            case 4:
              return (l = v.og), q(v, l.arrayBuffer(), 5);
            case 5:
              k = v.og;
              if (!l.ok)
                return (
                  a.M && a.controls.te.s("pb-time-tv-info-live-disable"),
                  a.view.show(a.view.alert),
                  a.view.pb(
                    a.view.Za,
                    "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1038)"
                  ),
                  a.controls.disable(),
                  (a.disabled = !0),
                  v.return()
                );
              a.Z.configure({
                drm: {
                  servers: {
                    "com.apple.fps.1_0": a.Uf,
                  },
                  advanced: {
                    "com.apple.fps.1_0": {
                      serverCertificate: new Uint8Array(k),
                    },
                  },
                },
              });
            case 3:
              f = a.Pb.replace("/stereo", "");
            case 2:
              return (
                (p = 1 == a.Fc),
                a.Z.configure({
                  abr: {
                    enabled: p,
                  },
                }),
                a.Z.configure({
                  drm: {
                    retryParameters: {
                      maxAttempts: 5,
                    },
                  },
                  manifest: {
                    retryParameters: {
                      maxAttempts: 5,
                    },
                  },
                  streaming: {
                    retryParameters: {
                      maxAttempts: 50,
                    },
                  },
                }),
                (u = !1),
                a.M &&
                  f &&
                  -1 < f.indexOf("tvp") &&
                  ((u = !0),
                  a.Z.configure({
                    streaming: {
                      lowLatencyMode: u,
                    },
                  })),
                a.autoplay &&
                  (-1 < location.href.indexOf("a=1") || 0 < a.Ta) &&
                  (a.video.muted = !0),
                (v.Df = 6),
                q(v, a.Z.load(f).then(a.D.I(a.Xm, a)).catch(a.D.I(a.Wm, a)), 8)
              );
            case 8:
              la(v);
              break;
            case 6:
              ma(v);
            case 7:
              a.Va(a.state.ga),
                a.controls.ba(!0),
                a.controls.H(!0),
                (window.__cda_shakaPlayer = a.Z),
                (v.Gc = 0);
          }
        })
      )
    );
  };
  P.Xm = function () {
    this.log(this.c, "manifest loaded");
    this.Kd();
    this.Ak = !0;
    if (!this.M && this.Fc) {
      var a = {},
        b = this.Z.getVariantTracks();
      if (b && 0 < b.length) {
        for (var d in b)
          256 == b[d].width && z(a["144p"])
            ? (a["144p"] = "144p")
            : 426 == b[d].width && z(a["240p"])
            ? (a["240p"] = "240p")
            : 640 == b[d].width && z(a["360p"])
            ? (a["360p"] = "vl")
            : 854 == b[d].width && z(a["480p"])
            ? (a["480p"] = "lq")
            : 1280 == b[d].width && z(a["720p"])
            ? (a["720p"] = "sd")
            : 1920 == b[d].width && z(a["1080p"])
            ? (a["1080p"] = "hd")
            : 2560 == b[d].width && z(a["2K"])
            ? (a["2K"] = "qhd")
            : 3840 == b[d].width && z(a["4K"]) && (a["4K"] = "uhd");
        a.auto = "auto";
        this.Cd = a;
        this.controls.uo(a);
      }
    }
    try {
      if (A(window.onShakaPlayerInit)) window.onShakaPlayerInit(this.Z);
    } catch (f) {}
    if (!this.M) {
      a = null;
      switch (this.f.quality) {
        case "uhd":
          a = 3840;
          break;
        case "qhd":
          a = 2560;
          break;
        case "hd":
          a = 1920;
          break;
        case "sd":
          a = 1280;
          break;
        case "lq":
          a = 854;
          break;
        case "vl":
          a = 640;
          break;
        case "240p":
          a = 426;
          break;
        case "144p":
          a = 256;
      }
      null != a && this.Bk(a);
    }
  };
  P.Wm = function (a) {
    this.log(this.c, "manifest load error");
    if (a && (!a || "undefined" != typeof a.code)) {
      var b = "";
      if (a && "undefined" != a.code) {
        if (7e3 == a.code) return;
        b = " / " + a.code;
      }
      this.M && this.controls.te.s("pb-time-tv-info-live-disable");
      this.h.F() && this.h.vd() && a && 6001 == a.code
        ? ((a = "market://details?id=pl.cda"),
          this.h.sa() &&
            (a = "https://apps.apple.com/pl/app/cda-pl/id1318175670"),
          this.view.pb(
            this.view.Za,
            'Je\u015bli jeste\u015b w trybie incognito to uruchom przegl\u0105dark\u0119 w trybie normalnym lub <a href="' +
              a +
              '" style="color:#e28525">pobierz aplikacj\u0119 CDA na swoje urz\u0105dzenie</a>.<br><br>Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie (error code: P1038' +
              b +
              ")."
          ))
        : this.view.pb(
            this.view.Za,
            "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1036" +
              b +
              ")"
          );
      this.view.show(this.view.alert);
      this.controls.disable();
      this.disabled = !0;
    }
  };
  P.Vm = function (a) {
    this.log(this.c, "shaka Player error");
    if (10 > this.l() && this.h.Zl() && 90 > this.h.Jl())
      this.view.pb(
        this.view.Za,
        'W zwi\u0105zku z tym, i\u017c nowe urz\u0105dzenia ChromeBook maj\u0105 problemy z odtwarzaniem wideo z protoko\u0142em DRM, polecamy zainstalowa\u0107 aplikacj\u0119 na android CDA, kt\u00f3ra umo\u017cliwi odtwarzanie wideo. <b>Aby zainstalowa\u0107 nale\u017cy wej\u015b\u0107 w Android Apps i wyszuka\u0107 "cda.pl".</b> <br>Mamy nadziej\u0119, i\u017c firma Google szybko upora si\u0119 z problemem odtwarzania wideo na urz\u0105dzeniach ChromeBook.<br>(error code: P1039)'
      ),
        this.view.show(this.view.alert),
        this.controls.disable(),
        (this.disabled = !0);
    else if (a && (!a || "undefined" != typeof a.code)) {
      var b = "";
      a && "undefined" != a.code && (b = " / " + a.code);
      this.M && this.controls.te.s("pb-time-tv-info-live-disable");
      this.view.show(this.view.alert);
      this.view.pb(
        this.view.Za,
        "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odtwarzania. Od\u015bwie\u017c stron\u0119 i spr\u00f3buj ponownie.<br>(error code: P1037" +
          b +
          ")"
      );
      this.controls.disable();
      this.disabled = !0;
    }
  };
  P.bn = function () {
    return this.Yc();
  };
  P.Um = function () {
    return this.Hd();
  };
  P.Ym = function () {
    this.log(this.c, "on shaka Player pause");
    this.Va(this.state.uc);
    this.controls.qa(!0);
    this.controls.H(!1);
  };
  P.Zm = function () {
    this.log(this.c, "on shaka Player playing");
    this.J ||
      !this.view.content.G("pb-pip-enabled") ||
      this.view.content.G("pb-frame-posible") ||
      this.T.isConnected() ||
      this.view.od.G("pb-info-ccast-show") ||
      this.view.content.s("pb-frame-posible");
    if (!this.J && !this.M && !this.view.content.G("pb-aspect-posible")) {
      var a =
        window.screen.height > window.screen.width
          ? window.screen.height / window.screen.width
          : window.screen.width / window.screen.height;
      if (this.h.F() || 1.9 <= a)
        this.view.content.s("pb-aspect-posible"),
          this.h.F() && !this.controls.fc && 1.8 <= a && this.controls.If();
    }
    this.Va(this.state.ga);
    this.gg || (this.controls.H(!1), this.controls.ba(!0));
    this.M &&
      this.gf &&
      ((this.gf = !1),
      this.controls.Wg(),
      this.controls.Ea && this.controls.Rb());
    if (
      -1 == this.ia &&
      0 < this.f.duration &&
      33 != this.Dc() &&
      !this.J &&
      !1 !== this.hb() &&
      (this.Ob() || "premium" == this.f.type || "premium_free" == this.f.type)
    )
      try {
        var b = this;
        window.$.ajax({
          url: "//api.cda.pl/h.php?uid=" + this.hb(),
          type: "post",
          crossDomain: !0,
          xhrFields: {
            withCredentials: !0,
          },
          data: {
            currentTime: 0,
            duration: this.f.duration,
            test: this.Ob(),
            server: this.ge(),
          },
          success: function () {
            b.ia = 0;
          },
        });
      } catch (d) {
        this.log(this.c, d);
      }
    if (this.M && -1 == this.ia)
      try {
        (b = this),
          window.$.ajax({
            url: "//api.cda.pl/htv.php?uid=" + this.hb(),
            type: "post",
            crossDomain: !0,
            xhrFields: {
              withCredentials: !0,
            },
            data: {
              request_id: this.options.request_id,
              channel_id: this.options.tv_live.channel_id,
              channel_url: this.ka.url,
            },
            success: function () {
              b.ia = 0;
            },
          });
      } catch (d) {
        this.log(this.c, d);
      }
    0 < this.Ta &&
      -1 === this.ld &&
      this.Ta < this.K() &&
      (this.cb(this.Ta), (this.ld = this.Ta));
  };
  P.$m = function () {
    this.log(this.c, "shaka player seeked");
    this.dd(!1);
    this.Md(-1);
    this.re();
    -1 < this.ia && (this.ia = this.l());
    this.video.paused && this.video.play();
    this.controls.H(!1);
    try {
      var a = this.controls.Ca.querySelectorAll(".pb-progress-midroll-marker");
      if (!y(a) && 0 < a.length)
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          !y(d) &&
            !y(d.getAttribute("data-time")) &&
            d.getAttribute("data-time") < this.l() &&
            d.m();
        }
    } catch (f) {
      this.log(this.c, f);
    }
  };
  P.an = function () {
    this.log(this.c, "shaka player seeking");
    this.dd(!0);
    this.controls.H(!0);
  };
  P.Bk = function (a) {
    if (854 <= a && z(this.Cd["2K"]) && z(this.Cd["4K"]))
      this.Z.configure({
        abr: {
          enabled: !0,
        },
      });
    else if (
      (this.Z.configure({
        abr: {
          enabled: !1,
        },
      }),
      null != a)
    ) {
      var b =
        1920 <= a || -1 < this.f.quality.indexOf("hd") || this.lh
          ? this.Z.getVariantTracks()
              .filter(function (b) {
                return b.width === a;
              })
              .pop()
          : this.Z.getVariantTracks()
              .filter(function (b) {
                return b.width === a;
              })
              .shift();
      b &&
        (this.log(this.c, "change quality"),
        this.log(this.c, b),
        this.Z.selectVariantTrack(b, !0));
    }
  };
  P.ge = function () {
    try {
      var a = "";
      if (null != this.Z || null != this.o)
        y(this.Pb) ||
        "" == this.Pb ||
        (!this.h.me() && !this.h.nj()) ||
        (!this.h.sa() && !this.h.fh())
          ? y(this.da) || "" == this.da || (a = new URL(this.da))
          : (a = new URL(this.Pb));
      "" == a && (a = new URL(this.src));
      return a.hostname.replace(".cda.pl", "");
    } catch (b) {
      return "";
    }
  };
  function Ea(a) {
    if (!a) throw new TypeError("playerObject is null or empty.");
    this.a = a;
    this.D = a.D;
  }
  P = Ea.prototype;
  P.yl = function (a) {
    if (this.D.jj(a)) {
      var b = this.ll(this.a.options.video.width, this.a.options.video.height),
        d = "";
      1 == b.x && 1 == b.y && (d = "pb-format16x9");
      var f = '<span class="pb-ico-above-hide"></span>';
      y(this.a.options.video.content_rating) ||
        (f =
          '<span class="pb-ico-above-wrapp"><span class="pb-ico-above-' +
          this.a.options.video.content_rating +
          'y"></span></span>');
      this.uk(
        a,
        '<div class="pb-player-html-wrapper"><div class="pb-player-settings-posible"><div class="pb-player-content ' +
          b.className +
          " " +
          d +
          '"> <style>' +
          ("#" +
            this.a.options.id +
            " .pb-video-active .pb-stretching-full .pb-video-player {transform: scaleX(" +
            b.x +
            ") scaleY(" +
            b.y +
            ")} .pb-vid-click {position: absolute;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;} .pb-block-video-player {width: 100%; background: #000; position: relative; object-fit: contain;} .pb-tv .pb-block-video-player, .pb-mobile .pb-block-video-player{position:absolute;top:0;left:0;height:100%} .pb-browser-opera .pb-block-video-player{object-fit:initial} .brdPlayerWrapper :-webkit-full-screen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important} .brdPlayerWrapper :-moz-full-screen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important} :-ms-fullscreen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important} .brdPlayerWrapper :full-screen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important} .brdPlayerWrapper :fullscreen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important} .pb-video-fullscreen .pb-block-video-player {display:inline-block;vertical-align:middle;width:100%;height:100% !important}") +
          ' .pb-run-ad .pb-progress-midroll-marker {display:none;}</style><div class="pb-player-html"><span class="pb-ady-counter"></span><span class="pb-ady-player-wrap"><span id="pb-yt-iframe"></span><span class="pb-ady-skip"></span></span><span class="pb-video-player-wrap"><div class="player-mute-off" style="display:none;width:100%; height:100%; z-index:10000; position: absolute; background:#000; opacity:0.6; text-align:center; align-items: center; justify-content: center;"><div style="width: 400px;margin-top: -20px;"><div style="width: 100%;"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNSAxMmMwLTEuNzctMS4wMi0zLjI5LTIuNS00LjAzdjIuMjFsMi40NSAyLjQ1Yy4wMy0uMi4wNS0uNDEuMDUtLjYzem0yLjUgMGMwIC45NC0uMiAxLjgyLS41NCAyLjY0bDEuNTEgMS41MUMyMC42MyAxNC45MSAyMSAxMy41IDIxIDEyYzAtNC4yOC0yLjk5LTcuODYtNy04Ljc3djIuMDZjMi44OS44NiA1IDMuNTQgNSA2Ljcxek00LjI3IDNMMyA0LjI3IDcuNzMgOUgzdjZoNGw1IDV2LTYuNzNsNC4yNSA0LjI1Yy0uNjcuNTItMS40Mi45My0yLjI1IDEuMTh2Mi4wNmMxLjM4LS4zMSAyLjYzLS45NSAzLjY5LTEuODFMMTkuNzMgMjEgMjEgMTkuNzNsLTktOUw0LjI3IDN6TTEyIDRMOS45MSA2LjA5IDEyIDguMThWNHoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+" style="filter: invert(1); height: 200px; opacity:0.7;"></div><div style="width:100%;font-size: 28px;">Wy\u0142\u0105cz wyciszenie</div></div></div> <img class="pb-resp-width-max" src="//static.cda.pl/v001/img/mobile/v16x9.png"><span class="pb-fl-player-wrap"><span class="pb-post-fl"><span class="pb-video-player-content"><video class="pb-video-player" webkit-playsinline="true" playsinline="true"></video></span><span class="pb-valign-middle"></span></span></span> <span class="pb-video-poster"><span class="pb-valign-middle"></span></span><span class="pb-logo"></span> <span class="pb-vid-click"></span><span class="pb-video-ad-container"><span class="pb-video-ad-content"></span><span class="pb-valign-middle"></span></span><span class="pb-play-ico"></span> <span class="pb-loader-ico"></span> <span class="pb-next-video-wrapper" style="display: none"> <span class="pb-next-video-content"> <span class="pb-next-video-title"></span> <span class="pb-next-viteo-thumb-wrapper"> <img class="pb-next-thumb-video" src=""/> <span class="pb-next-timer-wrapper"> <svg width="100%" viewBox="0 0 98 98" height="100%"> <circle transform="rotate(-90)" stroke-width="18" stroke="rgba(0,0,0,0.5)" r="32.5" fill-opacity="0" cy="49" cx="-49" class="load-new-film"/> <circle class="pb-next-video-circle-progress" transform="rotate(-90)" stroke-width="14" stroke-dasharray="208.2%" stroke-dashoffset="204px" stroke="rgba(249, 249, 249, 0.5)" r="32.5" fill-opacity="0" cy="49" cx="-49" class="load-new-film"/> <polygon points="42,37 62,49 42,61"fill="rgba(255,255,255,0.7)" class="pb-next-play"/> </svg> </span> <span class="pb-ie-next-loader" style="display: none"> <span class="pb-ie-next-loader-progress"></span> </span> <a href="#" title="" class="pb-next-click"></a> </span> <span class="pb-btn-wrapper"> <a class="pb-btn-cancel">anuluj</a> </span> </span> </span> <span class="pb-alert" style="display:none"> <span class="pb-alert-body"> <span class="header-alert"></span> <span class="text-alert"></span> </span> <span class="pb-alert-valign-middle"></span> </span> <span class="pb-ad-counter" style="display: none"></span><span class="pb-ad-info" style="display: none;"></span><span class="pb-ad-premium-click" style="display:none"><span>Aktywuj CDA Premium aby wy\u0142\u0105czy\u0107 reklamy <img src="https://scdn.cda.pl/v001/img/player/touch_app_white_18.png" /></span></span><span class="pb-ad-pause-plt"> <span class="pb-ad-pause-plt-body"> <span class="pb-ad-pause-plt-content"></span> <span class="pb-ad-pause-plt-skip">Zamknij reklam\u0119 aby wznowi\u0107 odtwarzanie<span class="pb-ad-pause-close-body">\u00d7</span></span></span></span><span class="pb-info" style="display: none"><span class="pb-info-container"><span class="pb-info-content"></span></span><span class="pb-valign-middle"></span></span><span class="pb-info-tvoff"><span class="pb-info-tvoff-container"><span class="pb-info-tvoff-content">Czy nadal ogl\u0105dasz?<span class="pb-info-tvoff-btn-true">tak</span><span class="pb-info-tvoff-btn-false">nie</span></span></span><span class="pb-valign-middle"></span></span><span class="pb-info-ccast"><span class="pb-info-ccast-container"><span class="pb-info-ccast-content"><span class="pb-line pb-info-ccast-click"><span class="pb-cast-inline-ico"></span><span class="pb-info-ccast-header">Chromecast</span></span><span class="pb-line"><span class="pb-info-ccast-text"></span> <span class="pb-info-ccast-name"></span></span></span></span><span class="pb-valign-middle"></span></span><span class="pb-float-icon"><span class="pb-aspect-float"></span><span class="pb-airplay-float"></span><span class="pb-frame-player-float"></span><span class="pb-ccast-float"></span>' +
          f +
          '</span> <a class="pb-ad-close"> <span class="pb pb-ad-close-body" style="display: none"></span> </a> <a class="pb-skip" style="display: none"> <span class=pb-skip-body>pomi\u0144</span> </a> <span class="pb-premium-promotion pb-context-wrapp pb-context-wrapp-hide"><span class="pb-context-body"><span class="pb pb-context-close pb-premium-promotion-close"></span><span class="pb-context-content"><span class="pb-ico-speed"><span></span></span><span class="pb-context-content-body">Potrzebujesz szybszego \u0142adowania wideo? <span class="pb-context-block"><a class="pb-context-button pb-premium-promotion-button" href="https://premium.cda.pl/rejestracja?cd2_sid=1&cd2_n=baner-playertransfer&cd2_hash=3b7e9aec07749895077743bd2c62686ffada59ad">W\u0142\u0105cz konto premium na 14 dni za darmo</a></span><span class="pb-why-more">Dlaczego widz\u0119 ten komunikat?</span></span><span class="pb-why-more-answer"><p>CDA nie limituje przepustowo\u015bci oraz transferu danych. <br />W godzinach wieczornych mo\u017ce zdarzy\u0107 si\u0119 jednak, i\u017c ilo\u015b\u0107 u\u017cytkownik\u00f3w przekracza mo\u017cliwo\u015bci naszych serwer\u00f3w wideo. W\u00f3wczas odbi\u00f3r mo\u017ce by\u0107 zak\u0142\u00f3cony, a plik wideo mo\u017ce \u0142adowa\u0107 si\u0119 d\u0142u\u017cej ni\u017c zwykle.</p><p>W opcji CDA Premium gwarantujemy, i\u017c przepustowo\u015bci i transferu nie braknie dla \u017cadnego u\u017cytkownika. <a href="https://premium.cda.pl/rejestracja?cd2_sid=1&cd2_n=baner-playertransfer&cd2_hash=3b7e9aec07749895077743bd2c62686ffada59ad" class="pb-why-more-register pb-link-color">Zarejestruj swoje konto premium ju\u017c teraz!</a></p></span></span></span></span><span class="pb-box-info"><span class="pb-box-info-content"></span></span><div class="rewind-click-wrapper r-c-right" style="display: none;"><div class="r-c-circle"></div><div class="r-c-circle-min"></div><div class="r-c-text-wrapper"><div class="r-c-text"><img class="r-c-rewind-icon" src="https://scdn.cda.pl/v001/img/player/r-c-rewind-icon-r.png"></div><div class="r-c-text-1 r-c-seconds-counter">10 sekund</div></div></div><div class="rewind-click-wrapper r-c-left" style="display: none;"><div class="r-c-circle"></div><div class="r-c-circle-min"></div><div class="r-c-text-wrapper"><div class="r-c-text"><img class="r-c-rewind-icon" src="https://scdn.cda.pl/v001/img/player/r-c-rewind-icon-l.png"></div><div class="r-c-text r-c-seconds-counter">10 sekund</div></div></div><span class="pb-tv-list-g"> <span class="pb-tv-list-g-bg-logo"></span> <span class="pb-tv-list-g-bg-content"> <a class="pb-tv-list-g-bg-content-bx"> <span class="pb-grap" id="pb-progId-0"></span> <span class="pb-tv-list-g-bg-content-bx-bg"> <span class="pb-tv-list-g-bg-content-pd"> <div class="pb-tvpr-title-header pb-tv-text"> </div><span class="ico-above-24" style="position: absolute; top: 20px; right: 20px; margin-top: 0; margin-right: 0;"></span> <span class="pb-tvpr-info pb-tv-text"> </span> <div class="pb-mrg-m"> <div class="tvpr-row"> <span class="pb-tvpr-header-td pb-tv-text" style="display:none">obsada:</span><span class="pb-tvpr-value-td pb-tv-text"></span> </div><p class="pb-tvpr-description pb-tv-text"></p></div></span> <span class="pb-time-tv-pos-bar"> <span class="pb-actual-time-tv-pos"></span> <span class="pb-max-time-tv-pos"></span> <span class="pb-progress-time-tv-pos pb-progress-time-tv-pos-active"> <span class="pb-progress-time-tv-pos-progress" style="width: 0%;"></span> <span class="pb-progress-bar-tv-pos-area"> <span class="pb-time-tv-pos-position" style="left: 66.0099%;"> <span class="pb-time-tv-pos-cloud"> <span class="pb-time-tv-pos-container">0:00</span> <span class="pb-time-tv-pos-cloud-arrow"></span> </span> </span> <span class="pb pb-progress-bar-time-tv-pos" style="width: 0%"> <span class="bar-line-handle"></span> </span> </span> </span> </span> </span></a><span class="pb-tv-list-end"></span></span><span class="pb-tv-canals-scroll-gw"> <span class="pb-tv-canals-scroll-g" style1="display: none;"> <span class="pb-li-canal-logo-last"></span> </span> </span> </span></span><span class="button-players"> <span class="pb pb-bar"> <span class="pb pb-play"></span> <span class="pb pb-guide"></span> <span class="pb pb-volume"> <span class="pb pb-volume-mute"></span> <span class="pb pb-progress-bar-volume-area"> <span class="pb pb-progress-bar-volume"></span> </span> <span class="pb pb-volume-max"></span> </span> <span class="pb-quality"><span class="pb pb-quality-txt"></span><span class="pb-settings-click"></span><span class="pb-settings-menu pb-settings-menu-quality"><span class="pb-settings-menu-wrapper"><span class="pb-settings-cloud"><span class="pb-settings-container"><span class="pb-menu pb-menu-static"><span class="pb pb-close-settings"></span><span class="pb-header-menu">Jako\u015b\u0107</span><ul class="pb-menu-slave pb-menu-slave-indent"></ul></span></span></span></span><span class="pb-settings-cloud-arrow"></span></span></span><span class="pb pb-settings"><span class="pb-settings-click"></span><span class="pb-settings-menu"><span class="pb-settings-menu-wrapper"><span class="pb-settings-cloud"><span class="pb-settings-container"><span class="pb-menu pb-menu-static"><span class="pb pb-close-settings"></span><span class="pb-header-menu">Ustawienia</span><ul><li><span class="pb-menu-head">Format obrazu </span><ul class="pb-menu-slave"><li item="5"><a><span class="pb-ico-exp"></span><span class="pb-radio"><span class="pb-radio-btn"></span></span>rozszerzony</a></li><li item="6" class="pb-active"><a><span class="pb-ico-norm"></span><span class="pb-radio"><span class="pb-radio-btn"></span></span>normalny</a></li><li item="7"><a><span class="pb-ico-full"></span><span class="pb-radio"><span class="pb-radio-btn"></span></span>rozci\u0105gni\u0119ty</a></li><li item="8"><a><span class="pb-ico-oryg"></span><span class="pb-radio"><span class="pb-radio-btn"></span></span>nieskalowany</a></li></ul></li><li item="1" style="display: none" class="pb-settings-nextvideo"><a><span class="pb-switch"><span class="pb-switch-on-text">on</span><span class="pb-switch-off-text">off</span><span class="pb-switch-btn"></span></span>Autoodtwarzanie nast\u0119pnego video</a></li><li item="4" class="pb-settings-autoplay"><a><span class="pb-switch"><span class="pb-switch-on-text">on</span><span class="pb-switch-off-text">off</span><span class="pb-switch-btn"></span></span>Autoplay</a></li><li style="display: none" item="2" class="pb-settings-loop"><a><span class="pb-switch"><span class="pb-switch-on-text">on</span><span class="pb-switch-off-text">off</span><span class="pb-switch-btn"></span></span>Odtwarzaj w p\u0119tli</a></li><li item="2" style="display: none"><a><span class="pb-switch"><span class="pb-switch-on-text">on</span><span class="pb-switch-off-text">off</span><span class="pb-switch-btn"></span></span>Odtwarzanie w p\u0119tli</a></li><li item="3"><a>Zg\u0142o\u015b problem z playerem</a></li></ul></span></span></span></span><span class="pb-settings-cloud-arrow"></span></span></span><span class="pb pb-ccast"></span><span class="pb pb-fullscreen"></span> <span class="pb-time-bar"> <span class="pb-actual-time">0:00</span> <span class="pb-max-time">0:00</span> <span class="pb pb-progress-time pb-progress-time-active"> <span class="pb pb-progress-time-progress"></span> <span class="pb-progress-bar-area"> <span class="pb-time-position"> <span class="pb-time-cloud"> <span class="pb-time-container">0:00</span> <span class="pb-time-cloud-arrow"></span> </span> </span> <span class="pb pb-progress-bar-time"> <span class="bar-line-handle"></span> </span> </span> </span> </span> <span class="pb-time-tv-bar"> <span class="pb-time-tv-info-live pb-time-tv-info-live-disable"><span class="pb-time-tv-info-live-ico"></span><span class="pb-time-tv-info-live-txt">NA \u017bYWO</span></span><span class="pb-actual-time-tv">00:00</span> <span class="pb-max-time-tv">00:00</span> <span class="pb pb-progress-time-tv pb-progress-time-tv-active"> <span class="pb pb-progress-time-tv-progress" style="width: 0%;"></span> <span class="pb-progress-bar-area"> <span class="pb-time-tv-position" style="left: 0%;"> <span class="pb-time-tv-cloud"> <span class="pb-time-tv-container">0:00</span> <span class="pb-time-tv-cloud-arrow"></span> </span> </span> <span class="pb pb-progress-bar-time-tv" style="width: 0%"> <span class="bar-line-handle"></span> </span> </span> </span> </span> </span> </span><span class="pb-menu-context"><span class="pb-menu"><span class="pb-header-menu">Player wersja: ' +
          this.a.bl +
          '</span><ul><li item="1"><a>Kopiuj adres filmu</a></li><li item="2"><a>Skopiuj kod embed</a></li><li item="3"><a>Zg\u0142o\u015b problem z playerem</a></li><li item="4" style="display:none"><a>Poka\u017c statystyki</a></li></ul></span></span></div></div></div></div>'
      );
    }
  };
  P.jo = function () {
    this.W = this.ub(".pb-player-html-wrapper", this.a.element);
    this.content = this.j(".pb-player-content");
    this.video = this.j(".pb-video-player");
    this.rc = this.j(".pb-vid-click");
    this.Vb = this.j(".pb-video-player-wrap");
    this.jf = this.j(".pb-fl-player-wrap");
    this.xa = this.j(".pb-player-html");
    this.ng = this.j(".pb-video-poster");
    this.mg = this.j(".pb-video-player-content");
    this.zd = this.j(".pb-logo");
    this.contextMenu = this.j(".pb-menu-context");
    this.wj = this.j(".pb-next-click");
    this.Gd = this.j(".pb-next-video-wrapper");
    this.lm = this.j(".pb-next-video-title");
    this.km = this.j(".pb-next-thumb-video");
    this.Ed = this.j(".pb-next-video-circle-progress");
    this.j(".pb-ie-next-loader");
    this.j(".pb-ie-next-loader-progress");
    this.jm = this.j(".pb-btn-cancel");
    this.alert = this.j(".pb-alert");
    this.Za = this.j(".text-alert");
    this.wb = this.j(".pb-play");
    this.N = this.j(".pb-play-ico");
    this.aa = this.j(".pb-loader-ico");
    this.Ca = this.j(".pb-progress-time");
    this.ob = this.j(".pb-progress-bar-time");
    this.Jb = this.j(".pb-progress-bar-area");
    this.Gh = this.j(".pb-bar");
    this.Eg = this.j(".pb-progress-time-progress");
    this.currentTime = this.j(".pb-actual-time");
    this.Ng = this.j(".pb-max-time");
    this.fullScreen = this.j(".pb-fullscreen");
    this.Kc = this.j(".pb-volume-mute");
    this.tb = this.j(".pb-progress-bar-volume");
    this.ci = this.j(".pb-volume-max");
    this.Bc = this.j(".pb-progress-bar-volume-area");
    this.controls = this.j(".button-players");
    this.Vb = this.j(".pb-video-player-wrap");
    this.pa = this.j(".pb-player-html");
    this.xk = this.j(".pb-settings-click");
    this.j(".pb-settings-menu");
    this.ro = this.j(".pb-close-settings");
    this.j(".pb-settings-click");
    this.cg = this.j(".pb-quality-txt");
    this.ua = this.j(".pb-settings-menu-quality");
    this.ml = this.j(".pb-ccast");
    this.Sc = this.j(".pb-ccast-float");
    this.od = this.j(".pb-info-ccast");
    this.Cf = this.j(".pb-info-ccast-text");
    this.Bf = this.j(".pb-info-ccast-name");
    this.Oi = this.j(".pb-cast-inline-ico");
    this.nl = this.j(".pb-info-ccast-click");
    this.fl = this.j(".pb-airplay-float");
    this.Mn = this.j(".pb-frame-player-float");
    this.yk = this.j(".pb-player-settings-posible");
    this.mb = this.j(".pb-video-ad-container");
    this.nb = this.j(".pb-video-ad-content");
    this.j(".pb-ad-video-player");
    this.Na = this.j(".pb-ad-counter");
    this.Be = this.j(".pb-ad-close-body");
    this.Da = this.j(".pb-skip");
    this.ma = this.j(".pb-ad-info");
    this.kc = this.j(".pb-ad-premium-click");
    this.Ok = this.ub(".pb-ady-player-wrap");
    this.tc = this.ub(".pb-ady-skip");
    this.lf = this.ub(".pb-ady-counter");
    this.info = this.j(".pb-info");
    this.j(".pb-info-content");
    this.he = this.j(".pb-box-info");
    this.Nf = this.j(".pb-box-info-content");
    this.bg = this.j(".pb-premium-promotion");
    this.Qn = this.j(".pb-premium-promotion-close");
    this.Pn = this.j(".pb-premium-promotion-button");
    this.Rn = this.j(".pb-why-more");
    this.Sn = this.j(".pb-why-more-answer");
    this.Tn = this.j(".pb-why-more-register");
    this.sd = this.j(".r-c-right");
    this.Ld = this.j(".r-c-left");
    this.Dd = this.j(".player-mute-off");
  };
  P.ll = function (a, b) {
    a = this.D.le(Number(a)) ? a : 640;
    var d = this.D.le(Number(b)) ? b : 360,
      f = window.screen.width,
      g = window.screen.height,
      l = "";
    a / d >= f / g
      ? ((b = 1), (a = (a / f) * (g / d)))
      : ((b = (d / g) * (f / a)), (a = 1), (l = "pb-h-vid"));
    return {
      x: b,
      y: a,
      className: l,
    };
  };
  P.j = function (a) {
    if (!this.D.fm(this.W)) return this.ub(a, this.W);
  };
  P.ub = function (a, b) {
    if (1 < arguments.length && null !== b) {
      if (this.D.kj(b.querySelector)) return b.querySelector(a);
      if (-1 !== a.indexOf("#")) return document.getElementById(a.substring(1));
      if (0 < b.Qg(a.substring(1)).length) return b.Qg(a.substring(1))[0];
    } else {
      if (this.D.kj(document.querySelector)) return document.querySelector(a);
      if (-1 !== a.indexOf("#")) return document.getElementById(a.substring(1));
      if (0 < document.Qg(a.substring(1)).length)
        return document.Qg(a.substring(1))[0];
    }
    return null;
  };
  P.uk = function (a, b) {
    this.D.jj(a) && (a.innerHTML = b);
  };
  P.pb = function (a, b) {
    this.uk(a, b);
  };
  P.s = function (a, b) {
    "undefined" !== typeof a &&
      ("undefined" !== typeof a.classList
        ? a.classList.add(b)
        : (a.className = a.className + " " + b));
  };
  P.C = function (a, b) {
    if ("undefined" !== typeof a)
      if ("undefined" !== typeof a.classList) a.classList.remove(b);
      else {
        for (var d = a.className.split(" "), f = "", g = 0; g < d.length; g++)
          b != d[g] && (f += d[g] + " ");
        a.className = f;
      }
  };
  P.G = function (a, b) {
    return "undefined" !== typeof a && -1 !== a.className.indexOf(b) ? !0 : !1;
  };
  P.Mb = function (a) {
    return "undefined" !== typeof a &&
      "function" === typeof a.getBoundingClientRect
      ? a.getBoundingClientRect()
      : !1;
  };
  P.$a = function (a) {
    z(a) || y(a) || isNaN(void 0) || (a.style.width = void 0);
  };
  P.ac = function (a) {
    return z(a) || y(a) ? 0 : a.offsetWidth;
  };
  P.Oh = function (a) {
    z(a) || y(a) || isNaN(void 0) || (a.style.height = void 0);
  };
  P.Vc = function (a) {
    return z(a) || y(a) ? 0 : a.offsetHeight;
  };
  P.Ec = function (a) {
    return z(a) ||
      y(a) ||
      "undefined" === typeof a.offsetParent ||
      null === a.offsetParent
      ? !1
      : !0;
  };
  P.m = function (a) {
    z(a) ||
      y(a) ||
      z(a.style) ||
      ("visible" === a.style.visiblity
        ? (a.style.visiblity = "hidden")
        : (a.style.display = "none"));
  };
  P.show = function (a) {
    z(a) ||
      y(a) ||
      z(a.style) ||
      ("hidden" === a.style.visiblity
        ? (a.style.visiblity = "visible")
        : (a.style.display = "block"));
  };
  function Ca() {}
  P = Ca.prototype;
  P.sp = function (a) {
    if ("object" == typeof a) {
      if (null === a) return "null";
      if (a instanceof Array) return "array";
      if (a instanceof Object) return "object";
    }
  };
  P.Bp = function (a) {
    return null === a;
  };
  P.fm = function (a) {
    return "undefined" === typeof a;
  };
  P.kj = function (a) {
    return "function" === typeof a;
  };
  P.Dp = function (a) {
    return "object" === typeof a;
  };
  P.jj = function (a) {
    return "undefined" !== typeof HTMLElement
      ? a instanceof HTMLElement
      : a instanceof Element;
  };
  P.Cp = function (a) {
    return "number" === typeof a;
  };
  P.Fp = function (a) {
    return "string" === typeof a;
  };
  P.Xl = function (a) {
    return "boolean" === typeof a;
  };
  P.le = function (a) {
    return Number(a) === a && 0 === a % 1;
  };
  P.Pf = function (a) {
    return Number(a) === a && 0 !== a % 1;
  };
  "undefined" === typeof Array.isArray &&
    (Array.isArray = function (a) {
      return "[object Array]" === Object.prototype.toString.call(a);
    });
  P.Nh = function (a, b, d, f) {
    var g = new Date();
    null != d &&
      (f ? g.setHours(g.getHours() + d) : g.setDate(g.getDate() + d));
    try {
      document.cookie =
        a + "=" + escape(b) + (null == d ? "" : ";expires=" + g.toGMTString());
    } catch (l) {}
  };
  P.$b = function (a) {
    try {
      var b = document.cookie.split(";");
    } catch (l) {
      b = [];
    }
    for (var d = 0; d < b.length; d++) {
      var f = b[d].substr(0, b[d].indexOf("="));
      var g = b[d].substr(b[d].indexOf("=") + 1);
      f = f.replace(/^\s+|\s+$/g, "");
      if (f == a) return unescape(g);
    }
    return !1;
  };
  P.wd = function (a) {
    return !1 !== this.$b(a) ? !0 : !1;
  };
  P.bind = function (a, b) {
    return function () {
      b.apply(a, b);
    };
  };
  P.kl = function (a, b) {
    return a.call.apply(a.bind, arguments);
  };
  P.I = function (a, b) {
    return this.kl.apply(null, arguments);
  };
  function V() {}
  P = V;
  P.isEnabled = function () {
    return z(window.navigator.cookieEnabled)
      ? !isEmpty(window.document.cookie)
      : window.navigator.cookieEnabled;
  };
  P.set = function (a, b, d, f) {
    var g = new Date();
    null != d &&
      (f ? g.setHours(g.getHours() + d) : g.setDate(g.getDate() + d));
    try {
      document.cookie =
        a + "=" + escape(b) + (null == d ? "" : ";expires=" + g.toGMTString());
    } catch (l) {}
  };
  P.get = function (a) {
    try {
      var b = document.cookie.split(";");
    } catch (l) {
      b = [];
    }
    for (var d = 0; d < b.length; d++) {
      var f = b[d].substr(0, b[d].indexOf("="));
      var g = b[d].substr(b[d].indexOf("=") + 1);
      f = f.replace(/^\s+|\s+$/g, "");
      if (f == a) return unescape(g);
    }
    return null;
  };
  P.Fl = function () {
    return !1 !== this.get("cda-player-volume") ? !0 : !1;
  };
  function Da() {
    this.po();
  }
  P = Da.prototype;
  P.isEnabled = function () {
    return !y(this.storage);
  };
  P.po = function () {
    this.type = "local";
    this.storage = "session" === this.type ? sa() : ra();
  };
  P.set = function (a, b) {
    if (0 < arguments.length && !z(a) && !z(b))
      try {
        this.isEnabled() && this.storage.setItem(a, JSON.stringify(b));
      } catch (d) {}
  };
  P.get = function (a) {
    try {
      if (this.isEnabled()) {
        var b = this.storage.getItem(a);
        return y(b) && z(b) ? null : JSON.parse(b);
      }
    } catch (d) {
      return null;
    }
  };
  P.remove = function (a) {
    try {
      this.isEnabled() && this.storage.removeItem(a);
    } catch (b) {}
  };
  P.clear = function () {
    try {
      this.isEnabled() && this.storage.clear();
    } catch (a) {}
  };
  function S(a, b, d) {
    if ("undefined" == a || null == a || null === d) return !1;
    this.c = "cda.Player.Controls";
    this.W = a;
    this.a = b;
    this.wc = d;
    this.view = b.view;
    this.D = b.D;
    this.wb = this.view.j(".pb-play");
    this.N = this.view.j(".pb-play-ico");
    this.aa = this.view.j(".pb-loader-ico");
    this.Ca = this.view.j(".pb-progress-time");
    this.ob = this.view.j(".pb-progress-bar-time");
    this.Jb = this.view.j(".pb-progress-bar-area");
    this.Gh = this.view.j(".pb-bar");
    this.Eg = this.view.j(".pb-progress-time-progress");
    this.currentTime = this.view.j(".pb-actual-time");
    this.Ng = this.view.j(".pb-max-time");
    this.fullScreen = this.view.j(".pb-fullscreen");
    this.Kc = this.view.j(".pb-volume-mute");
    this.tb = this.view.j(".pb-progress-bar-volume");
    this.ci = this.view.j(".pb-volume-max");
    this.Bc = this.view.j(".pb-progress-bar-volume-area");
    this.controls = this.view.j(".button-players");
    this.Vb = this.view.j(".pb-video-player-wrap");
    this.pa = this.view.j(".pb-player-html");
    this.xk = this.view.j(".pb-settings-click");
    this.view.j(".pb-settings-menu");
    this.jf = this.view.j(".pb-fl-player-wrap");
    this.ee = this.view.j(".pb-aspect-float");
    this.view.j(".pb-time-tv-bar");
    this.te = this.view.j(".pb-time-tv-info-live");
    this.Zh = this.view.j(".pb-actual-time-tv-pos");
    this.$h = this.view.j(".pb-actual-time-tv");
    this.Xh = this.view.j(".pb-max-time-tv-pos");
    this.Yh = this.view.j(".pb-max-time-tv");
    this.Ik = this.view.j(".pb-progress-bar-time-tv-pos");
    this.Jk = this.view.j(".pb-progress-bar-time-tv");
    this.Kk = this.view.j(".pb-progress-time-tv-pos-progress");
    this.view.j(".pb-info-tvoff");
    this.va = this.view.j(".pb-tv-list-g");
    this.Ma = 0;
    this.jg = !1;
    this.Wa = null;
    this.bb = this.Bb = this.Kb = this.sj = this.rj = -1;
    this.Jc = 70;
    this.Ne = this.Ea = !1;
    this.yd = !0;
    this.i = {};
    this.Ya = null;
    this.Ab = this.qg = this.Lc = this.jc = !1;
    this.zb = this.Yb = null;
    this.Gb = 0;
    this.fc = !1;
    this.event = null;
    this.Ka =
      "click timeupdate loadeddata loadedmetadata progress waiting play pause".split(
        " "
      );
    "function" === typeof R && (this.event = new R());
    null == this.W.getAttribute("tabindex") &&
      this.W.setAttribute("tabindex", "1");
    try {
      var f = this.a.Lf();
      0 != f && f.hasOwnProperty("volume")
        ? this.L(f.volume)
        : this.a.wd("cda.player.volume")
        ? this.L(this.a.$b("cda.player.volume"))
        : this.L(this.Jc);
    } catch (k) {
      this.L(this.Jc);
    }
    (this.a.mh || this.a.cc) && this.L(0);
    if (!this.a.M && this.a.kk && this.a.f.qualities) {
      d = b = a = "";
      for (var g in this.a.f.qualities)
        this.a.f.quality == this.a.f.qualities[g]
          ? ((b = g), (d = "pb-active"))
          : (d = ""),
          (a +=
            '<li data-quality="' +
            g +
            '" data-value="' +
            this.a.f.qualities[g] +
            '" class="settings-quality ' +
            d +
            '"><a><span class="pb-radio"><span class="pb-radio-btn"></span></span>' +
            g +
            "</a></li>");
      this.view.ua.querySelector("ul").ha(a);
      this.view.cg.ha(b);
    }
    if (this.a.M && this.a.ka) {
      null != this.Wa && (window.clearInterval(this.Wa), (this.Wa = null));
      var l = this;
      this.Wa = window.setInterval(function () {
        l.hf(
          l.a.ka.program.start_time_ts,
          l.a.ka.program.start_time_format,
          l.a.ka.program.end_time_ts,
          l.a.ka.program.end_time_format
        );
      }, 100);
    }
    if (this.a.M && this.a.la) {
      g = "";
      for (a = 0; a < this.a.la.length; a++)
        g +=
          '<span class="pb-li-canal-logo" data-url="' +
          this.a.la[a].url +
          '" data-logo="' +
          this.a.la[a].logo +
          '" data-title="' +
          this.a.la[a].title +
          '"><span class="pb-li-canal-g-title-logo"><img class="pb-li-canal-g-title-logo-img" src="' +
          this.a.la[a].logo +
          '"><span class="pb-loading-tv-logo"></span></span></span>';
      this.va.querySelector(".pb-tv-canals-scroll-g").innerHTML =
        g + '<span class="pb-li-canal-logo-last"></span>';
      this.hh = !1;
      this.Sa = window.$(".pb-tv-canals-scroll-g").first();
      this.hg = this.jh = 0;
      this.jk = 1;
      this.Vh = !1;
      this.ao = 0.35;
      this.xj = 1;
      l = this;
      g = this.va.querySelectorAll(".pb-li-canal-logo");
      Array.prototype.slice.call(g).forEach(function (a, b) {
        return a.addEventListener("click", function () {
          a.s("channel-active");
          l.Ma = b;
          l.a.controls.Ea && (l.va.show(), l.ec());
          l.Wg();
          a.querySelector(".pb-loading-tv-logo").s("pb-loading-tv-logo-show");
          var d = 0;
          l.hh && (d = "touch");
          d
            ? l.Sa.addClass("pb-smooth-scroll")
            : l.Sa.removeClass("pb-smooth-scroll");
          l.ef(l.Sa, 0, a);
          l.hh = !1;
          l.bd();
          d = a.getAttribute("data-url");
          var f = a.getAttribute("data-logo"),
            g = a.getAttribute("data-title");
          window.tvChangeChannel(d, g, f, !0);
        });
      });
      Array.prototype.slice.call(g).forEach(function (a) {
        return a
          .querySelector(".pb-li-canal-g-title-logo")
          .addEventListener("touchstart", function () {
            l.hh = !0;
          });
      });
      Array.prototype.slice.call(g).forEach(function (a, b) {
        a.getAttribute("data-url") == l.a.ka.url &&
          (a.s("channel-active"), (l.Ma = b), 0 < b && (l.jg = !0), l.bd());
      });
      this.Sa.bind("mousewheel, wheel", function (a, b, d, f) {
        l.Sa.removeClass("pb-smooth-scroll");
        f = Math.sign(a.originalEvent.deltaY);
        l.ef(window.$(this), f, 1);
        a.preventDefault();
      });
      this.Sa.on("touchstart", function () {
        l.Sa.removeClass("pb-smooth-scroll");
        l.Vh = !0;
      });
      this.Sa[0].addEventListener("touchend", function () {
        l.Vh = !1;
        l.Hk();
      });
      this.Lk();
      window.setInterval(function () {
        l.Lk();
      }, 6e4);
    }
    this.td();
  }
  P = S.prototype = {};
  P.Nk = function (a) {
    this.a = a;
  };
  P.td = function () {
    for (var a in this.Ka)
      if ("" != this.Ka[a]) {
        var b = null;
        switch (this.Ka[a]) {
          case "click":
            b = this.nc;
            break;
          case "timeupdate":
            b = this.Yc;
            break;
          case "loadeddata":
            b = this.th;
            break;
          case "loadedmetadata":
            b = this.uh;
            break;
          case "progress":
            b = this.oe;
            break;
          case "waiting":
            b = this.We;
            break;
          case "play":
            b = this.pe;
            break;
          case "pause":
            b = this.oc;
            break;
          case "seeking":
            b = this.zh;
            break;
          case "seeked":
            b = this.yh;
        }
        null !== b &&
          "function" === typeof b &&
          (this.i[this.Ka[a]] = T(this.a.video, this.Ka[a], b, this));
      }
    this.a.h.Ja() || (this.i.Hp = T(this.W, "keydown", this.Am, this));
    this.a.h.Ja() &&
      (this.i.cq = T(
        document.querySelector(".btn-fullscreen"),
        "click",
        this.Gm,
        this
      ));
    this.i.rc = T(this.view.rc, "click", this.gk, this);
    this.i.tq = T(this.view.rc, "dblclick", this.jn, this);
    this.i.bp = T(this.fullScreen, "click", this.Zf, this);
    this.i.bq = T(this.wb, "click", this.Xc, this);
    this.i.aq = T(this.N, "click", this.Id, this);
    this.i.wq = T(this.Kc, "click", this.wn, this);
    this.i.ci = T(this.ci, "click", this.vn, this);
    this.i.oq = T(this.xk, "click", this.Sm, this);
    this.i.pq = T(this.view.ua, "click", this.Tm, this);
    this.i.Xj = T(window.document, "click", this.Xj, this);
    this.i.ek = T(this.view.ro, "click", this.ek, this);
    this.i.Zj = T(this.view.Dd, "click", this.Zj, this);
    this.i.$j = T(this.view.Mn, "click", this.$j, this);
    this.i.cp = T(this.ee, "click", this.zm, this);
    this.a.h.F() ||
      ((this.i.eq = T(this.Ca, "mousedown", this.Im, this)),
      (this.i.gq = T(this.Ca, "mouseup", this.Km, this)),
      (this.i.kq = T(this.Gh, "mousemove", this.Om, this)),
      (this.i.xq = T(this.Bc, "mousedown", this.xn, this)),
      (this.i.zq = T(this.Bc, "mouseup", this.zn, this)),
      (this.i.yq = T(this.Bc, "mousemove", this.yn, this)),
      (this.i.fq = T(this.Ca, "mousemove", this.Jm, this)),
      (this.i.uq = T(this.Vb, "mousemove", this.un, this)),
      (this.i.wl = T(this.controls, "mouseenter", this.Qi, this)),
      (this.i.wl = T(this.controls, "mouseover", this.Qi, this)),
      (this.i.vl = T(this.controls, "mouseleave", this.Ri, this)),
      (this.i.vl = T(this.controls, "mouseout", this.Ri, this)),
      (this.i.Fq = T(this.W, "mouseup", this.Bn, this)),
      (this.i.Zo = T(document, "mouseup", this.vm, this)),
      (this.i.Yo = T(document, "mousedown", this.um, this)));
    this.a.h.F() &&
      ((this.i.jq = T(this.Ca, "touchstart", this.Nm, this)),
      (this.i.hq = T(this.Ca, "touchend", this.Lm, this)),
      (this.i.lq = T(this.Gh, "touchmove", this.Pm, this)),
      (this.i.iq = T(this.Ca, "touchmove", this.Mm, this)));
    this.aa.m();
    this.pa.s("pb-paused");
    this.pa.s("pb-bar-no-seeking");
  };
  P.$j = function () {
    if (document.pictureInPictureElement)
      window.document.exitPictureInPicture();
    else
      try {
        this.a.video.requestPictureInPicture();
      } catch (a) {}
  };
  P.ef = function (a, b, d) {
    var f = this.va.querySelectorAll(".pb-li-canal-logo");
    this.Rb();
    var g = window.$(".pb-li-canal-logo", this.Sa).length,
      l = window.$(".pb-li-canal-logo", this.Sa)[0],
      k = window.$(l).height(),
      p = a.scrollTop();
    b =
      ("object" !== typeof d && "function" !== typeof d) || null === d
        ? d
          ? b
            ? p + (k * (d - 1) + k / 2 + 1) * b
            : k * (d - 1)
          : p + ((k / 2) * (1 - this.ao) + 1) * b
        : window.$(d).context.offsetTop - window.$(l).context.offsetTop;
    b = Math.round(b / k) * k;
    0 > b && (b = 0);
    b >= (g - 1) * k && (b = (g - 1) * k);
    this.xj = Math.round(b / k) + 1;
    this.Ma = this.xj - 1;
    Array.prototype.slice.call(f).forEach(function (a) {
      a.C("channel-active");
    });
    a.scrollTop(b);
    this.bd();
  };
  P.qq = function (a) {
    this.Sa.removeClass("pb-smooth-scroll");
    this.ef(this.Sa, a, 1);
  };
  P.kg = function (a) {
    this.Sa.removeClass("pb-smooth-scroll");
    this.ef(this.Sa, 0, a);
  };
  P.Eo = function () {
    this.Sa.addClass("pb-smooth-scroll");
    this.ef(this.Sa, this.jk, 0);
  };
  P.Gk = function () {
    var a = window.$(".pb-li-canal-logo", this.Sa)[0];
    a = window.$(a).height();
    var b = this.Sa.scrollTop();
    b = Math.round(b / a) * a;
    return Math.round(b / a) + 1;
  };
  P.Hk = function () {
    if (!this.Vh)
      if (
        ((this.jh = this.hg),
        (this.hg = this.Sa.scrollTop()),
        this.jh == this.hg)
      )
        this.Eo();
      else {
        this.jk = Math.sign(this.hg - this.jh);
        var a = this;
        setTimeout(function () {
          a.Hk();
        }, 100);
      }
  };
  P.enable = function () {
    this.qg = !0;
    this.view.C(this.view.xa, "pb-nocloud");
  };
  P.disable = function () {
    this.qg = !1;
    this.view.s(this.view.xa, "pb-nocloud");
  };
  P.isEnabled = function () {
    return this.qg;
  };
  P.Th = function () {
    clearInterval(this.Ya);
    this.Ya = null;
    this.W.C("pb-nocontrols");
  };
  P.up = function () {
    clearInterval(this.Ya);
    this.Ya = null;
    this.W.s("pb-nocontrols");
  };
  P.qc = function (a) {
    a = Number(a);
    var b = Math.floor(a / 3600),
      d = Math.floor((a % 3600) / 60);
    a = Math.floor((a % 3600) % 60);
    return (
      (0 < b ? b + ":" + (10 > d ? "0" : "") : "") +
      d +
      ":" +
      (10 > a ? "0" : "") +
      a
    );
  };
  P.s = function (a, b) {
    "undefined" !== typeof a.classList
      ? a.classList.add(b)
      : (a.className = a.className + " " + b);
  };
  P.C = function (a, b) {
    if ("undefined" !== typeof a.classList) a.classList.remove(b);
    else {
      for (var d = a.className.split(" "), f = "", g = 0; g < d.length; g++)
        b != d[g] && (f += d[g] + " ");
      a.className = f;
    }
  };
  P.G = function (a, b) {
    return -1 === a.className.indexOf(b) ? !1 : !0;
  };
  P.Mb = function (a) {
    return "undefined" !== a && "function" === typeof a.getBoundingClientRect
      ? a.getBoundingClientRect()
      : !1;
  };
  P.Eb = function (a) {
    D(a) && !isNaN(a) && (this.currentTime.innerHTML = this.qc(a));
  };
  P.Ua = function (a) {
    D(a) && !isNaN(a) && (this.Ng.innerHTML = this.qc(a));
  };
  P.lo = function (a) {
    this.D.Xl(a) &&
      (a
        ? !1 === this.view.G(this.view.fullScreen, "pb-fullscreen-active") &&
          this.view.s(this.view.fullScreen, "pb-fullscreen-active")
        : this.view.G(this.view.fullScreen, "pb-fullscreen-active") &&
          this.view.C(this.view.fullScreen, "pb-fullscreen-active"));
  };
  P.tk = function (a) {
    var b = this;
    this.view.G(this.view.ua, "pb-settings-menu-on") &&
      (this.view.C(this.view.ua, "pb-settings-menu-on"),
      this.view.s(this.view.ua, "pb-settings-menu-off"));
    this.view.Ec(this.view.contextMenu) && this.view.m(this.view.contextMenu);
    a
      ? ((this.Ea = !0),
        this.a.M &&
          (this.va.show(),
          this.jg
            ? ((this.jg = !1),
              this.va
                .querySelectorAll(".pb-li-canal-logo")
                .forEach(function (a, f) {
                  a.C("channel-active");
                  a.getAttribute("data-url") == b.a.ka.url &&
                    (a.s("channel-active"), (b.Ma = f), b.kg(b.Ma + 1));
                }, this))
            : this.bd()),
        this.a.M && this.a.getState() === this.a.state.fb && this.a.play(),
        this.a.getState() === this.a.state.ga &&
          (this.a.h.F() && (this.jc = !1), this.Rb()),
        this.view.xa.s("pb-video-fullscreen"),
        this.view.fullScreen.s("pb-fullscreen-active"))
      : ((this.Ea = !1),
        this.a.M &&
          (this.va
            .querySelectorAll(".pb-li-canal-logo")
            .forEach(function (a, f) {
              a.getAttribute("data-url") == b.a.ka.url &&
                ((b.Ma = f),
                0 < b.Ma &&
                  ((a = a.Vc() * b.Ma),
                  window.$(".pb-tv-canals-scroll-g").scrollTop(a),
                  null != b.Wa && (window.clearInterval(b.Wa), (b.Wa = null)),
                  (b.Wa = window.setInterval(function () {
                    b.hf(
                      b.a.ka.program.start_time_ts,
                      b.a.ka.program.start_time_format,
                      b.a.ka.program.end_time_ts,
                      b.a.ka.program.end_time_format
                    );
                  }, 100))));
            }, this),
          this.va.m(!0)),
        this.a.h.F() && (this.jc = !1),
        this.ec(),
        this.view.xa.C("pb-video-fullscreen"),
        this.view.fullScreen.C("pb-fullscreen-active"));
  };
  P.ko = function () {
    var a = !0;
    this.Xg();
    a
      ? (this.a.ta()
          ? ((a = "http://www.cda.pl/video/" + this.a.f.id + "?html5"),
            1 < this.a.l() && (a += "&t=" + Math.floor(this.a.l())),
            (a =
              'Tryb pe\u0142noekranowy jest niedost\u0119pny. <a href="' +
              a +
              '" target="_blank">Kliknij tutaj, aby otworzy\u0107 film w nowym oknie.</a>'))
          : (a =
              "Tryb pe\u0142noekranowy jest niedost\u0119pny na Twoim urz\u0105dzeniu."),
        (this.i.$f = T(this.view.Nf, "click", this.$f, this)),
        this.Rl(a))
      : (U(this.view.Nf, "click", this.i.$f), (this.i.$f = null));
  };
  P.Zf = function () {
    this.a.disabled ||
      (this.bc() && this.vb(),
      this.wc.is() || (!this.wc.is() && !y(this.wc.element()))
        ? this.wc.Lb()
        : (this.a.J && this.a.h.sa()) || this.wc.request());
  };
  P.Im = function (a) {
    if (
      this.isEnabled() &&
      ((a = a || window.event), "undefined" === typeof a.which || 1 == a.which)
    ) {
      this.bc() && this.vb();
      this.yd = !1;
      this.Ca.setAttribute("data-click", "click");
      this.Lc = !0;
      this.pa.G("pb-bar-no-seeking") && this.pa.C("pb-bar-no-seeking");
      this.pa.s("pb-bar-seeking");
      var b = ((a.pageX - this.Mb(this.Jb).left) / this.Jb.offsetWidth) * 100;
      100 < b ? (b = 100) : 0 > b && (b = 0);
      0 === this.a.K() && (this.a.dg = b);
      this.Kb = b;
      this.ob.style.width = b + "%";
      a.preventDefault();
      return !1;
    }
  };
  P.Nm = function (a) {
    if (this.isEnabled()) {
      a = a || window.event;
      var b = a.changedTouches;
      "undefined" !== b &&
        1 == b.length &&
        (this.wc.Ea() && (this.a.h.F() && (this.jc = !0), this.ec()),
        (this.yd = !1),
        this.Ca.setAttribute("data-click", "click"),
        (this.Lc = !0),
        this.pa.G("pb-bar-no-seeking") && this.pa.C("pb-bar-no-seeking"),
        this.pa.s("pb-bar-seeking"),
        this.pa.s("pb-time-cloud-show"),
        (b =
          ((b[0].pageX - this.Mb(this.Jb).left) / this.Jb.offsetWidth) * 100),
        100 < b ? (b = 100) : 0 > b && (b = 0),
        (this.Kb = b),
        (this.ob.style.width = b + "%"));
      a.preventDefault();
      return !1;
    }
  };
  P.Km = function (a) {
    if (
      this.isEnabled() &&
      ((a = a || window.event), "undefined" === typeof a.which || 1 == a.which)
    ) {
      this.bc() && this.vb();
      this.yd = !0;
      this.Ca.setAttribute("data-click", "none");
      this.Lc = !1;
      this.pa.G("pb-bar-seeking") && this.pa.C("pb-bar-seeking");
      this.pa.s("pb-bar-no-seeking");
      if (-1 != this.a.K() && -1 != this.Kb) {
        var b = (this.Kb / 100) * this.a.K();
        this.a.T.isConnected() ? this.a.T.cb(b) : this.a.cb(b);
      } else this.Xc(), this.a.rb();
      a.preventDefault();
      return !1;
    }
  };
  P.Lm = function (a) {
    if (this.isEnabled()) {
      a = a || window.event;
      var b = a.changedTouches;
      "undefined" !== b &&
        1 == b.length &&
        (this.wc.Ea() && (this.a.h.F() && (this.jc = !1), this.Rb()),
        this.bc() && this.vb(),
        (this.yd = !0),
        this.Ca.setAttribute("data-click", "none"),
        (this.Lc = !1),
        this.pa.G("pb-bar-seeking") && this.pa.C("pb-bar-seeking"),
        this.pa.s("pb-bar-no-seeking"),
        this.pa.C("pb-time-cloud-show"),
        -1 != this.a.K() && -1 != this.Kb
          ? ((b = (this.Kb / 100) * this.a.K()),
            this.a.T.isConnected() ? this.a.T.cb(b) : this.a.cb(b))
          : (this.Xc(), this.a.rb()));
      a.preventDefault();
      return !1;
    }
  };
  P.Om = function (a) {
    if (
      this.isEnabled() &&
      ((a = a || window.event), "undefined" === typeof a.which || 1 == a.which)
    ) {
      if ("click" == this.Ca.getAttribute("data-click")) {
        var b = ((a.pageX - this.Mb(this.Jb).left) / this.Jb.offsetWidth) * 100;
        100 < b ? (b = 100) : 0 > b && (b = 0);
        this.Kb = b;
        this.ob.style.width = b + "%";
      }
      a.preventDefault();
      return !1;
    }
  };
  P.Pm = function (a) {
    if (this.isEnabled()) {
      a = a || window.event;
      var b = a.changedTouches;
      "undefined" !== b &&
        1 == b.length &&
        "click" == this.Ca.getAttribute("data-click") &&
        ((b =
          ((b[0].pageX - this.Mb(this.Ca).left) / this.Jb.offsetWidth) * 100),
        100 < b ? (b = 100) : 0 > b && (b = 0),
        (this.Kb = b),
        (this.ob.style.width = b + "%"));
      a.preventDefault();
      return !1;
    }
  };
  P.Jm = function (a) {
    if (this.isEnabled()) {
      a = a || window.event;
      var b = ((a.pageX - this.Mb(this.Jb).left) / this.Jb.offsetWidth) * 100;
      100 < b ? (b = 100) : 0 > b && (b = 0);
      this.a.K();
      var d = this.qc((b / 100) * this.a.K());
      this.W.querySelector(".pb-time-position").style.left = b + "%";
      b = this.W.querySelector(".pb-time-container");
      null != b && (b.innerHTML = d);
      a.preventDefault();
      return !1;
    }
  };
  P.Mm = function (a) {
    if (this.isEnabled()) {
      a = a || window.event;
      var b = a.changedTouches;
      if ("undefined" !== b && 1 == b.length) {
        this.wc.Ea() && (this.a.h.F() && (this.jc = !0), this.ec());
        var d =
          ((b[0].pageX - this.Mb(this.Jb).left) / this.Jb.offsetWidth) * 100;
        100 < d ? (d = 100) : 0 > d && (d = 0);
        this.a.K();
        b = this.qc((d / 100) * this.a.K());
        this.W.querySelector(".pb-time-position").style.left = d + "%";
        d = this.W.querySelector(".pb-time-container");
        null != d && (d.innerHTML = b);
      }
      a.preventDefault();
      return !1;
    }
  };
  P.Id = function () {
    this.a.disabled ||
      (this.bc() && this.vb(),
      (this.a.ra && this.a.getState() !== this.a.state.fb) || (this.a.fa = !0),
      this.N.R() &&
        (this.a.J
          ? this.ba()
          : ((this.a.ra && this.a.getState() !== this.a.state.fb) ||
              (this.a.fa = !0),
            this.a.T.isConnected()
              ? (this.ba(!0), this.a.T.play())
              : (this.ba(), this.H(!0)))));
  };
  P.Xc = function () {
    this.view.j(".pb-ad-pause-plt").G("pb-ad-pause-plt-show") ||
      this.a.disabled ||
      (this.bc() && this.vb(),
      (this.a.ra && this.a.getState() !== this.a.state.fb) || (this.a.fa = !0),
      -1 === this.wb.className.indexOf("pb-play-pause")
        ? (this.wb.s("pb-play-pause"),
          this.a.T.isConnected()
            ? (this.ba(!0), this.a.T.play())
            : ((this.a.ra && this.a.getState() !== this.a.state.fb) ||
                (this.a.fa = !0),
              this.ba(),
              this.H(!0)))
        : (this.wb.C("pb-play-pause"),
          this.a.T.isConnected()
            ? (this.qa(!0), this.a.T.pause())
            : this.qa()));
  };
  P.ba = function (a) {
    this.a.log(this.c, "set play");
    this.a.M && this.te.C("pb-time-tv-info-live-disable");
    this.wb.G("pb-play-pause") || this.wb.s("pb-play-pause");
    this.N.R() && this.N.m();
    this.pa.G("pb-paused") && this.pa.C("pb-paused");
    this.pa.s("pb-playing");
    this.bc() || this.se();
    (F(a) && a) ||
      (this.a.J ? null != this.a.v && this.a.v.play() : this.a.play());
  };
  P.qa = function (a) {
    this.a.M && this.te.s("pb-time-tv-info-live-disable");
    this.wb.G("pb-play-pause") && this.wb.C("pb-play-pause");
    this.N.R() || (this.N.show(), this.H(!1));
    this.pa.G("pb-playing") && this.pa.C("pb-playing");
    this.bc() && this.vb();
    (F(a) && a) ||
      (this.a.J ? null != this.a.v && this.a.v.pause() : this.a.pause());
  };
  P.H = function (a) {
    F(a) &&
      (a
        ? (this.N.R() && this.N.m(), this.aa.R() || this.aa.show())
        : this.aa.m());
  };
  P.qo = function () {
    this.a.wd("cda.player.volume")
      ? this.L(this.a.$b("cda.player.volume"))
      : this.L(this.Jc);
  };
  P.L = function (a, b) {
    a = Number(a);
    !1 !== this.a.lc() && !1 === this.Ab && (a = this.a.lc());
    0 < a && this.bc() && this.vb();
    this.bb = isNaN(a) ? this.Jc : a;
    0 == this.bb
      ? ((this.Ne = !0),
        this.Kc.G("pb-volume-mute-active") ||
          this.Kc.s("pb-volume-mute-active"))
      : ((this.Ne = !1),
        this.Kc.G("pb-volume-mute-active") &&
          this.Kc.C("pb-volume-mute-active"));
    this.tb.$a(this.bb + "%");
    this.a.cc || this.Kh(this.bb);
    this.a.L(this.bb, b);
    this.a.T.isConnected() && this.a.T.L(this.bb, 0 == this.bb ? !0 : !1);
    if (!y(this.a.v) && this.a.v.Fa == this.a.v.type.Xa && this.a.v.gb)
      try {
        this.a.v.Ac.L(this.bb);
      } catch (d) {}
  };
  P.Kh = function (a) {
    !1 !== this.a.lc() && !1 === this.Ab
      ? (this.Ab = !0)
      : (0 > a ? (a = 0) : 100 < a && (a = 100),
        (a = parseInt(a)),
        this.a.Nh("cda.player.volume", a, 7));
  };
  P.$c = function (a) {
    0 > a ? (a = 0) : 100 < a && (a = 100);
    this.Bb = a;
    this.Eg.$a(this.Bb + "%");
  };
  P.wn = function () {
    this.tb.setAttribute("data-click", "none");
    if (!1 === this.Ne && !1 === this.Kc.G("pb-volume-mute-active")) {
      if (
        ((this.Ne = !0),
        this.Kc.s("pb-volume-mute-active"),
        this.tb.$a("0%"),
        this.Kh(0),
        this.a.L(0),
        this.a.T.isConnected() && this.a.T.L(0, !0),
        !y(this.a.v) && this.a.v.Fa == this.a.v.type.Xa && this.a.v.gb)
      )
        try {
          this.a.v.Ac.L(0);
        } catch (a) {}
    } else if (
      (0 >= this.bb && (this.bb = this.Jc),
      (this.Ne = !1),
      this.Kc.C("pb-volume-mute-active"),
      this.tb.$a(this.bb + "%"),
      this.Kh(this.bb),
      this.a.L(this.bb),
      this.a.T.isConnected() && this.a.T.L(this.bb, !1),
      !y(this.a.v) && this.a.v.Fa == this.a.v.type.Xa && this.a.v.gb)
    )
      try {
        this.a.v.Ac.L(this.bb);
      } catch (a) {}
  };
  P.xn = function (a) {
    a = a || window.event;
    if ("undefined" === typeof a.which || 1 == a.which) {
      this.tb.setAttribute("data-click", "click");
      var b = ((a.pageX - this.Bc.Jf().left) / (this.Bc.ac() - 1)) * 100;
      100 < b ? (b = 100) : 0 > b && (b = 0);
      this.L(b);
      a.preventDefault();
      return !1;
    }
  };
  P.zn = function (a) {
    a = a || window.event;
    if ("undefined" === typeof a.which || 1 == a.which)
      return this.tb.setAttribute("data-click", "none"), a.preventDefault(), !1;
  };
  P.yn = function (a) {
    a = a || window.event;
    if ("undefined" === typeof a.which || 1 == a.which) {
      if ("click" == this.tb.getAttribute("data-click")) {
        var b = ((a.pageX - this.tb.Jf().left) / (this.Bc.ac() - 1)) * 100;
        100 < b ? (b = 100) : 0 > b && (b = 0);
        this.bb = b;
        this.L(b);
      }
      a.preventDefault();
      return !1;
    }
  };
  P.Wp = function (a) {
    a = a || window.event;
    var b = a.changedTouches;
    "undefined" !== b &&
      1 == b.length &&
      (this.tb.setAttribute("data-click", "click"),
      (b = ((b[0].pageX - this.tb.Jf().left) / (this.Bc.ac() - 1)) * 100),
      100 < b ? (b = 100) : 0 > b && (b = 0),
      this.L(b));
    a.preventDefault();
    return !1;
  };
  P.Up = function (a) {
    a = a || window.event;
    this.tb.setAttribute("data-click", "none");
    a.preventDefault();
    return !1;
  };
  P.Vp = function (a) {
    a = a || window.event;
    var b = a.changedTouches;
    "undefined" !== b &&
      1 == b.length &&
      "click" == this.tb.getAttribute("data-click") &&
      ((b = ((b[0].pageX - this.tb.Jf().left) / (this.Bc.ac() - 1)) * 100),
      100 < b ? (b = 100) : 0 > b && (b = 0),
      (this.bb = b),
      this.L(b));
    a.preventDefault();
    return !1;
  };
  P.vn = function () {
    this.tb.setAttribute("data-click", "none");
    100 === this.bb ? this.L(0) : this.L(100);
  };
  P.Tp = function () {
    if (this.a.Ba) {
      if (this.a.disabled && !y(this.a.v) && this.a.v.Fa == this.a.v.type.Xa)
        return;
    } else if (this.a.disabled) return;
    0 < this.Mb(this.a.contextMenu).width &&
    0 < this.Mb(this.a.contextMenu).height
      ? this.a.contextMenu.m()
      : ((this.a.ra && this.a.getState() !== this.a.state.fb) ||
          (this.a.fa = !0),
        null === this.a.La &&
          this.view.Ec(this.view.N) &&
          (this.a.getState() === this.a.state.fb && (this.a.fa = !0),
          (y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa)) &&
            this.ba()));
  };
  P.Am = function (a) {
    a = a || window.event;
    switch (a.keyCode) {
      case 32:
        if (y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa))
          0 == this.a.video.paused ? this.qa() : this.ba();
        a.preventDefault();
        break;
      case 27:
        this.a.Ea() && (this.Zf(), this.Th());
        a.preventDefault();
        break;
      case 39:
        this.a.M ||
          ((y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa)) &&
            this.a.mk(5));
        a.preventDefault();
        break;
      case 37:
        this.a.M ||
          ((y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa)) &&
            this.a.nk(5));
        a.preventDefault();
        break;
      case 38:
        if (this.a.M && this.Ea) {
          this.va.show();
          this.Rb();
          a = this.Gk();
          this.Ma = a - 1;
          var b = this.va.querySelectorAll(".pb-li-canal-logo");
          0 < this.Ma && (b[this.Ma].C("channel-active"), this.kg(a - 1));
          this.bd();
        }
        break;
      case 40:
        this.a.M &&
          this.Ea &&
          (this.va.show(),
          this.Rb(),
          (a = this.Gk()),
          (this.Ma = a - 1),
          (b = this.va.querySelectorAll(".pb-li-canal-logo")),
          this.Ma + 1 < b.length &&
            (b[this.Ma].C("channel-active"), this.kg(a + 1)),
          this.bd());
        break;
      case 13:
        if (this.a.M && this.Ea) {
          this.va.show();
          this.ec();
          var d = this.va.querySelectorAll(".pb-li-canal-logo")[this.Ma];
          a = d.getAttribute("data-url");
          b = d.getAttribute("data-logo");
          d = d.getAttribute("data-title");
          window.tvChangeChannel(a, d, b, !0);
        }
        break;
      case 116:
        location.reload();
    }
    return !1;
  };
  P.Vo = function (a) {
    return 3 * (1 - a) * (1 - a) * (1 - a) * (1 - a) + 1;
  };
  P.oe = function () {
    if (!this.a.J) {
      if (0 <= this.a.K() && -1 === this.a.xe) {
        var a = this.a.video;
        if (
          "undefined" !== a.buffered &&
          0 < a.buffered.length &&
          "undefined" !== a.buffered.end
        ) {
          var b = a.buffered.length - 1;
          -1 < this.a.Lh && (b = this.a.Il(this.a.Lh));
          a.buffered.end(b);
          this.a.K();
          var d = this.a.K(),
            f = this.a.l();
          this.Bb = (a.buffered.end(b) / d) * 100;
          this.Bb < (f / d) * 100 + 2 && (this.Bb = (f / d) * 100 + 2);
          this.Bb = Math.ceil(10 * this.Bb) / 10;
        } else
          this.Bb =
            "undefined" !== a.Mi && 0 < a.Mi && "undefined" !== a.Uo
              ? a.To / a.Mi
              : 0;
      }
      0 > this.Bb ? (this.Bb = 0) : 100 < this.Bb && (this.Bb = 100);
      this.Eg.$a(this.Bb + "%");
    }
  };
  P.Yj = function () {
    this.aa.m();
    this.a.getState() != this.a.state.ga ? this.N.show() : this.N.m();
  };
  P.th = function () {
    0 <= this.a.K() && !1 === this.a.J && this.Ua(this.a.K());
  };
  P.uh = function () {
    0 <= this.a.K() && !1 === this.a.J && this.Ua(this.a.K());
  };
  P.We = function () {
    (y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa)) &&
      this.aa.show();
  };
  P.nc = function () {
    if (this.a.jb() && 0 >= this.a.l() && !this.a.fa && this.aa.R())
      this.a.autoplay = !0;
    else if (this.a.jb() && 0 >= this.a.l() && !this.a.fa && !this.aa.R())
      return (this.a.fa = !0), this.a.cb(0);
  };
  P.pe = function () {
    this.Ea &&
      !this.view.G(this.view.W, "pb-nocontrols") &&
      null === this.Ya &&
      (this.a.h.F() && (this.jc = !1), this.Rb());
  };
  P.oc = function () {};
  P.Yc = function () {
    this.oe();
    null == this.a.Z && (this.a.de || (this.aa.R() && this.aa.m()));
    "undefined" === this.a.video.currentTime ||
      isNaN(this.a.video.currentTime) ||
      (this.a.currentTime = this.a.video.currentTime);
    if (this.yd) {
      var a = (100 / this.a.K()) * this.a.currentTime;
      this.ob.$a(a + "%");
    }
    this.Eb(this.a.currentTime);
  };
  P.zh = function () {
    try {
      window.clearTimeout(this.Yb), (this.Yb = null);
    } catch (a) {}
  };
  P.yh = function () {
    try {
      window.clearTimeout(this.Yb), (this.Yb = null);
    } catch (a) {}
  };
  P.Rb = function () {
    null !== this.Ya && (window.clearTimeout(this.Ya), (this.Ya = null));
    var a = this;
    this.Ya = window.setTimeout(function () {
      a.jc ||
        (a.W.s("pb-nocontrols"),
        a.a.M &&
          a.va.R() &&
          (a.va.querySelectorAll(".pb-li-canal-logo").forEach(function (b, d) {
            b.getAttribute("data-url") == a.a.ka.url &&
              ((a.Ma = d),
              a.kg(a.Ma + 1),
              null != a.Wa && (window.clearInterval(a.Wa), (a.Wa = null)),
              (a.Wa = window.setInterval(function () {
                a.hf(
                  a.a.ka.program.start_time_ts,
                  a.a.ka.program.start_time_format,
                  a.a.ka.program.end_time_ts,
                  a.a.ka.program.end_time_format
                );
              }, 100)));
          }),
          a.va.m(!0)));
    }, 5e3);
  };
  P.ec = function () {
    window.clearTimeout(this.Ya);
    this.Ya = null;
    this.W.C("pb-nocontrols");
  };
  P.un = function (a) {
    if (this.rj !== a.clientX || this.sj !== a.clientY)
      this.ec(),
        this.Ea && this.a.M && !this.va.R() && (this.va.show(), this.bd()),
        this.Ea && this.a.getState() === this.a.state.ga
          ? !1 === this.jc
            ? this.W.G("pb-nocontrols") || null !== this.Ya
              ? this.W.C("pb-nocontrols")
              : this.Rb()
            : this.ec()
          : this.ec();
    this.rj = a.clientX;
    this.sj = a.clientY;
  };
  P.Bn = function () {
    if (!0 === this.Lc) {
      if (0 <= this.a.K() && -1 != this.Kb) {
        var a = (this.Kb / 100) * this.a.K();
        this.a.cb(a);
      }
      this.Ca.setAttribute("data-click", "none");
      this.Lc = !1;
      this.yd = !0;
      this.pa.G("pb-bar-seeking") && this.pa.C("pb-bar-seeking");
      this.pa.s("pb-bar-no-seeking");
    }
  };
  P.vm = function () {
    if (!0 === this.Lc) {
      if (0 <= this.a.K() && -1 != this.Kb) {
        var a = (this.Kb / 100) * this.a.K();
        this.a.cb(a);
      }
      this.Ca.setAttribute("data-click", "none");
      this.Lc = !1;
      this.yd = !0;
      this.pa.G("pb-bar-seeking") && this.pa.C("pb-bar-seeking");
      this.pa.s("pb-bar-no-seeking");
    }
  };
  P.um = function () {};
  P.Sm = function () {
    this.bc() && this.vb();
    this.view.ua.G("pb-settings-menu-on")
      ? (this.view.ua.C("pb-settings-menu-on"),
        this.view.ua.s("pb-settings-menu-off"))
      : (this.view.ua.s("pb-settings-menu-on"),
        this.view.ua.C("pb-settings-menu-off"));
  };
  P.gk = function (a) {
    if (this.a.h.F() && !y(this.zb) && !y(a) && !z(a)) {
      var b = (a.offsetX / this.Mb(this.view.rc).width) * 100;
      if (60 < b && 0 < this.Gb) return this.Wi();
      if (40 > b && 0 > this.Gb) return this.Xi();
    }
    try {
      window.clearTimeout(this.Yb), (this.Yb = null);
    } catch (f) {}
    if (0 >= this.a.l()) return this.hk();
    if (y(a) || 2 !== a.detail) {
      var d = this;
      this.Yb = window.setTimeout(function () {
        window.clearTimeout(d.Yb);
        d.Yb = null;
        d.hk();
      }, 300);
    }
  };
  P.hk = function () {
    if (this.a.Ba) {
      if (this.a.disabled && !y(this.a.v) && this.a.v.Fa == this.a.v.type.Xa)
        return;
    } else if (this.a.disabled) return;
    if (this.view.Ec(this.view.contextMenu)) this.view.m(this.view.contextMenu);
    else if (this.view.G(this.view.ua, "pb-settings-menu-on"))
      this.view.C(this.view.ua, "pb-settings-menu-on"),
        this.view.s(this.view.ua, "pb-settings-menu-off");
    else if (this.view.he.G("pb-box-info-open")) this.Xg();
    else if (
      (this.a.ra ||
        ((this.a.fa = !0),
        this.a.h.F()
          ? this.a.J &&
            !y(this.a.v) &&
            (this.a.v.dj() || this.a.v.ej()) &&
            this.H(!0)
          : this.H(!0)),
      this.a.T.isConnected())
    )
      (this.a.getState() != this.a.state.fb &&
        this.a.getState() != this.a.state.uc) ||
      !this.N.R()
        ? (this.qa(!0), this.a.T.pause())
        : (this.ba(!0), this.a.T.play());
    else if (this.a.J)
      this.N.R()
        ? this.a.h.F()
          ? y(this.a.v) || (!this.a.v.dj() && !this.a.v.ej()) || this.ba()
          : this.ba()
        : y(this.a.v) || this.a.v.click();
    else if (null === this.a.La)
      if (this.a.h.F() && !this.a.O && this.Ea)
        this.W.G("pb-nocontrols")
          ? (this.W.C("pb-nocontrols"), this.a.M && this.va.show(), this.Rb())
          : this.a.getState() === this.a.state.ga
          ? (this.a.pause(), this.ec())
          : this.a.getState() === this.a.state.uc &&
            (this.a.resume(), this.Rb());
      else
        switch (this.a.getState()) {
          case this.a.state.ga:
            if (this.a.T.isConnected()) {
              this.qa(!0);
              this.a.T.pause();
              break;
            }
            this.qa();
            break;
          case this.a.state.uc:
            if (this.a.T.isConnected()) {
              this.ba(!0);
              this.a.T.play();
              break;
            }
            this.ba();
            break;
          case this.a.state.fb:
            (this.a.fa = !0),
              y(this.a.v) || (!y(this.a.v) && this.a.v.Fa != this.a.v.type.Xa)
                ? this.ba()
                : this.N.R() && (this.ba(), this.H(!0));
        }
  };
  P.jn = function (a) {
    try {
      window.clearTimeout(this.Yb), (this.Yb = null);
    } catch (b) {}
    if (!(this.a.J || 0 >= this.a.l() || y(a) || z(a))) {
      a = (a.offsetX / this.Mb(this.view.rc).width) * 100;
      if (60 < a) return this.Wi();
      if (40 > a) return this.Xi();
    }
  };
  P.Wi = function () {
    this.Gb = y(this.zb) ? 10 : this.Gb + 10;
    this.mo(this.Gb);
    try {
      window.clearTimeout(this.zb), (this.zb = null);
    } catch (b) {}
    this.Ug();
    this.Vg();
    this.xo();
    var a = this;
    this.zb = window.setTimeout(function () {
      a.Ug();
      a.a.mk(Math.abs(a.Gb));
      a.Gb = 0;
      window.clearTimeout(a.zb);
      a.zb = null;
    }, 700);
  };
  P.Xi = function () {
    this.Gb = y(this.zb) ? -10 : this.Gb - 10;
    this.no(this.Gb);
    try {
      window.clearTimeout(this.zb), (this.zb = null);
    } catch (b) {}
    this.Vg();
    this.Ug();
    this.yo();
    var a = this;
    this.zb = window.setTimeout(function () {
      a.Vg();
      a.a.nk(Math.abs(a.Gb));
      a.Gb = 0;
      window.clearTimeout(a.zb);
      a.zb = null;
    }, 700);
  };
  P.Ug = function () {
    this.a.view.sd.m();
    this.a.view.sd.querySelector(".r-c-circle").C("r-c-big-circle");
    this.a.view.sd.querySelector(".r-c-circle-min").C("r-c-big-circle");
  };
  P.xo = function () {
    this.a.view.sd.Ck();
    this.a.view.sd.querySelector(".r-c-circle").s("r-c-big-circle");
    this.a.view.sd.querySelector(".r-c-circle-min").s("r-c-big-circle");
  };
  P.Vg = function () {
    this.a.view.Ld.m();
    this.a.view.Ld.querySelector(".r-c-circle").C("r-c-big-circle");
    this.a.view.Ld.querySelector(".r-c-circle-min").C("r-c-big-circle");
  };
  P.yo = function () {
    this.a.view.Ld.Ck();
    this.a.view.Ld.querySelector(".r-c-circle").s("r-c-big-circle");
    this.a.view.Ld.querySelector(".r-c-circle-min").s("r-c-big-circle");
  };
  P.mo = function (a) {
    this.a.view.sd
      .querySelector(".r-c-seconds-counter")
      .ha("" + Math.abs(a) + " sekund");
  };
  P.no = function (a) {
    this.a.view.Ld.querySelector(".r-c-seconds-counter").ha(
      "" + Math.abs(a) + " sekund"
    );
  };
  P.Tm = function (a) {
    if (
      !y(a.target) &&
      !y(a.target.parentNode) &&
      a.target.parentNode.G("settings-quality")
    ) {
      if (!this.a.J) {
        var b = a.target.parentNode.getAttribute("data-quality"),
          d = a.target.parentNode.getAttribute("data-value");
        this.a.log(this.c, "change quality to " + b + " (" + d + ")");
        if (d != this.a.f.quality) {
          if (this.a.da) {
            this.a.Fc = "auto" == b ? !0 : !1;
            if (null != this.a.o)
              this.a.o.updateSettings({
                streaming: {
                  abr: {
                    autoSwitchBitrate: {
                      video: this.a.Fc,
                      audio: this.a.Fc,
                    },
                  },
                },
              });
            else if (
              null != this.a.Z &&
              (this.a.Z.configure({
                abr: {
                  enabled: "auto" == b,
                },
              }),
              "auto" != b)
            ) {
              var f = null;
              switch (d) {
                case "uhd":
                  f = 3840;
                  break;
                case "qhd":
                  f = 2560;
                  break;
                case "hd":
                  f = 1920;
                  break;
                case "sd":
                  f = 1280;
                  break;
                case "lq":
                  f = 854;
                  break;
                case "vl":
                  f = 640;
                  break;
                case "240p":
                  f = 426;
                  break;
                case "144p":
                  f = 256;
              }
              this.a.Bk(f);
            }
            this.a.f.quality = d;
            this.a.ce = !1;
          } else {
            var g = this;
            this.a.pl(
              d,
              function (a) {
                g.a.log(g.c, "link " + a);
                g.a.f.quality = d;
                g.a.src = a;
                g.a.T.isConnected() && g.a.view.od.G("pb-info-ccast-show")
                  ? g.a.T.Fo()
                  : ((g.a.autoplay = !0),
                    (g.a.Ta = g.a.l()),
                    (g.a.ld = -1),
                    g.a.Ye(),
                    g.a.play());
                g.a.Yn(b);
              },
              function () {
                var a = new URLSearchParams(window.location.search);
                a.get("wersja");
                a.set("wersja", b);
                a.set("a", 1);
                a.set("t", parseInt(g.a.l()));
                document.location.search = a;
              }
            );
          }
          for (
            f = 0;
            f < this.view.ua.querySelectorAll("li.settings-quality").length;
            f++
          )
            this.view.ua
              .querySelectorAll("li.settings-quality")
              [f].C("pb-active");
          a.target.parentNode.s("pb-active");
        }
        if (z(this.a.Cd["2K"]) && z(this.a.Cd["4K"])) this.view.cg.ha(b);
        else {
          a = b;
          if ("auto" == b)
            z(this.a.Cd["4K"])
              ? z(this.a.Cd["2K"]) ||
                (a += ' <span style="color:#b62323">2K</span>')
              : (a += ' <span style="color:#b62323">4K</span>');
          else if ("2K" == b || "4K" == b)
            a = '<span style="color:#b62323">' + b + "</span>";
          this.view.cg.ha(a);
        }
      }
      this.view.ua.G("pb-settings-menu-on")
        ? (this.view.ua.C("pb-settings-menu-on"),
          this.view.ua.s("pb-settings-menu-off"))
        : (this.view.ua.s("pb-settings-menu-on"),
          this.view.ua.C("pb-settings-menu-off"));
    }
  };
  P.Zj = function () {
    this.bc() && this.vb();
  };
  P.Ri = function () {
    this.jc = !1;
  };
  P.Qi = function () {
    this.ec();
    this.jc = !0;
  };
  P.Xj = function (a) {
    /pb/.test(a.target.className) ||
      (null !== a.target.parentNode &&
        /pb/.test(a.target.parentNode.className)) ||
      (this.view.Ec(this.view.contextMenu)
        ? this.view.m(this.view.contextMenu)
        : this.view.G(this.view.ua, "pb-settings-menu-on") &&
          (this.view.C(this.view.ua, "pb-settings-menu-on"),
          this.view.s(this.view.ua, "pb-settings-menu-off")));
  };
  P.ek = function () {
    this.view.G(this.view.ua, "pb-settings-menu-on") &&
      (this.view.C(this.view.ua, "pb-settings-menu-on"),
      this.view.s(this.view.ua, "pb-settings-menu-off"));
  };
  P.Gm = function () {
    this.Zf();
    document.querySelector(".btn-fullscreen").m();
    this.N.focus();
    this.W.s("pb-nocontrols-absolute");
  };
  P.Rl = function (a) {
    this.view.he.C("pb-box-info-close");
    this.view.he.s("pb-box-info-open");
    this.view.he.s("pb-box-info-for-fullscreen");
    this.view.Nf.ha(a);
  };
  P.Xg = function () {
    this.view.he.C();
    this.view.he.s("pb-box-info");
    this.view.Nf.ha("");
  };
  P.$f = function () {
    this.Xg();
    try {
      this.a.h.Qf()
        ? window.self != window.top && 0 < this.a.l() && this.a.pause()
        : (y(window.frameElement) && window.self == window.top) ||
          (0 < this.a.l() && this.a.pause());
    } catch (a) {}
  };
  P.bc = function () {
    try {
      if ("flex" == this.view.Dd.style.display) return !0;
    } catch (a) {}
    return !1;
  };
  P.se = function () {
    try {
      if (this.a.Ei && !this.a.J) {
        var a = 0,
          b = this.a.Lf();
        0 != b && b.hasOwnProperty("volume")
          ? (a = b.volume)
          : this.a.wd("cda.player.volume") &&
            (a = this.a.$b("cda.player.volume"));
        0 < a &&
          this.a.video.muted &&
          "none" == this.a.view.Dd.style.display &&
          !this.a.ta() &&
          (this.a.view.Dd.style.display = "flex");
      }
    } catch (d) {}
  };
  P.vb = function (a) {
    try {
      if (
        "flex" == this.view.Dd.style.display &&
        ((this.view.Dd.style.display = "none"),
        "undefined" === typeof ononlyHide || !a)
      )
        try {
          var b = this.a.Lf();
          0 != b && b.hasOwnProperty("volume")
            ? this.L(b.volume)
            : this.a.wd("cda.player.volume")
            ? this.L(this.a.$b("cda.player.volume"))
            : this.L(this.Jc);
        } catch (d) {
          this.L(this.Jc);
        }
    } catch (d) {}
  };
  P.Lk = function () {
    this.a.Co();
  };
  P.bd = function () {
    var a = this.va.querySelectorAll(".pb-li-canal-logo");
    a[this.Ma].G("channel-active") || a[this.Ma].s("channel-active");
    for (
      var b = {
        Ha: 0,
      };
      b.Ha < this.a.la.length;
      b = {
        Ha: b.Ha,
      },
        b.Ha++
    )
      if (this.a.la[b.Ha].url == a[this.Ma].getAttribute("data-url")) {
        null != this.Wa && (window.clearInterval(this.Wa), (this.Wa = null));
        var d = this;
        this.Wa = window.setInterval(
          (function (a) {
            return function () {
              d.hf(
                d.a.la[a.Ha].program.actual.start_time_ts,
                d.a.la[a.Ha].program.actual.start_time_format,
                d.a.la[a.Ha].program.actual.end_time_ts,
                d.a.la[a.Ha].program.actual.end_time_format
              );
            };
          })(b),
          100
        );
        this.a.la[b.Ha].program.actual.title &&
          (this.va.querySelector(".pb-tvpr-title-header").innerText =
            this.a.la[b.Ha].program.actual.title);
        this.a.la[b.Ha].program.actual.description &&
          (this.va.querySelector(".pb-tvpr-description").innerText =
            this.a.la[b.Ha].program.actual.description);
        a = "";
        this.a.la[b.Ha].program.actual.year &&
          (a += this.a.la[b.Ha].program.actual.year);
        this.a.la[b.Ha].program.actual.genre &&
          (a += " | " + this.a.la[b.Ha].program.actual.genre);
        this.a.la[b.Ha].program.actual.country &&
          (a +=
            " | " + this.a.la[b.Ha].program.actual.country.replace("|", ", "));
        this.va.querySelector(".pb-tvpr-info").innerText = a;
        this.va.querySelector(".ico-above-24").className = "ico-above-24";
        this.a.la[b.Ha].program.actual.age_rating &&
          this.va
            .querySelector(".ico-above-24")
            .s("ico-above-" + this.a.la[b.Ha].program.actual.age_rating + "y");
        break;
      }
  };
  P.hf = function (a, b, d, f) {
    1 >= a && 1 >= d
      ? ((this.Zh.innerHTML = ""),
        (this.$h.innerHTML = ""),
        (this.Xh.innerHTML = ""),
        (this.Yh.innerHTML = ""),
        (this.Ik.style.width = "0%"),
        (this.Jk.style.width = "0%"),
        (this.Kk.style.width = "0%"))
      : ((a = ((new Date().getTime() / 1e3 - a) / (d - a)) * 100),
        this.Zh.innerHTML != b && (this.Zh.innerHTML = b),
        this.$h.innerHTML != b && (this.$h.innerHTML = b),
        this.Xh.innerHTML != f && (this.Xh.innerHTML = f),
        this.Yh.innerHTML != f && (this.Yh.innerHTML = f),
        (this.Ik.style.width = a + "%"),
        (this.Jk.style.width = a + "%"),
        (this.Kk.style.width = a + "%"),
        this.a.Ao());
  };
  P.Wg = function () {
    Array.prototype.slice
      .call(this.va.querySelectorAll(".pb-li-canal-logo"))
      .forEach(function (a) {
        a.querySelector(".pb-loading-tv-logo").C("pb-loading-tv-logo-show");
      });
  };
  P.uo = function (a) {
    if (a) {
      var b = "",
        d = "",
        f;
      for (f in a) {
        if (this.a.f.quality == a[f]) {
          var g = "pb-active";
          d = f;
          "auto" == f &&
            (z(a["4K"])
              ? z(a["2K"]) || (d += ' <span style="color:#b62323">2K</span>')
              : (d += ' <span style="color:#b62323">4K</span>'));
        } else g = "";
        var l = f;
        if (!z(a["2K"]) || !z(a["4K"]))
          if ("auto" == f)
            z(a["4K"])
              ? z(a["2K"]) || (l += ' <span style="color:#b62323">2K</span>')
              : (l += ' <span style="color:#b62323">4K</span>');
          else if ("2K" == f || "4K" == f)
            l = '<span style="color:#b62323">' + f + "</span>";
        b +=
          '<li data-quality="' +
          f +
          '" data-value="' +
          a[f] +
          '" class="settings-quality ' +
          g +
          '"><a><span class="pb-radio"><span class="pb-radio-btn"></span></span>' +
          l +
          "</a></li>";
      }
      this.view.ua.querySelector("ul").ha(b);
      this.view.cg.ha(d);
    }
  };
  P.zm = function () {
    this.Rb();
    this.ee.G("pb-aspect-float-on")
      ? (this.ee.C("pb-aspect-float-on"), (this.fc = !1))
      : (this.ee.s("pb-aspect-float-on"), (this.fc = !0));
    this.fc
      ? this.jf.s("pb-stretching-expanded")
      : this.jf.C("pb-stretching-expanded");
  };
  P.If = function () {
    this.fc = !0;
    this.ee.s("pb-aspect-float-on");
    this.jf.s("pb-stretching-expanded");
  };
  function R() {}
  R.prototype.bind = function (a, b) {
    return function () {
      b.apply(a, b);
    };
  };
  function T(a, b, d, f) {
    if ("undefined" === typeof a || null === a) return !1;
    if ("function" === typeof a.addEventListener)
      return (
        a.addEventListener(
          b,
          (a = function (a) {
            d.call(f, a);
          }),
          !1
        ),
        a
      );
    if ("function" === typeof a.attachEvent)
      return (
        a.attachEvent(
          "on" + b,
          (a = function (a) {
            d.call(f, a);
          }),
          !1
        ),
        a
      );
  }
  function U(a, b, d) {
    "undefined" !== typeof a &&
      null !== a &&
      ("function" === typeof a.removeEventListener &&
        a.removeEventListener(b, d, !1),
      "function" === typeof a.detachEvent && a.detachEvent("on" + b, d, !1));
  }
  var Fa = {
    fb: 0,
    ga: 1,
    uc: 2,
    Oo: 3,
    gi: 4,
    li: 5,
    gc: 10,
    yb: 11,
    ue: 12,
  };
  function Ia(a, b, d, f) {
    0 < arguments.length
      ? ((this.view = a), (this.ol = b), (this.Bl = d), (this.a = f))
      : (this.view = null);
    this.ea = {
      Al: "requestFullscreen requestFullScreen mozRequestFullScreen webkitRequestFullscreen  webkitEnterFullscreen msRequestFullscreen".split(
        " "
      ),
      Lb: "exitFullscreen exitFullScreen cancelFullscreen mozCancelFullScreen webkitCancelFullscreen webkitExitFullscreen msExitFullscreen".split(
        " "
      ),
      enabled: [
        "fullscreenEnabled",
        "fullScreenEnabled",
        "mozFullScreenEnabled",
        "webkitFullscreenEnabled",
        "msFullscreenEnabled",
      ],
      element:
        "fullscreenElement fullScreenElement mozFullScreenElement webkitFullscreenElement webkitCurrentFullScreenElement msFullscreenElement".split(
          " "
        ),
      Cc: [
        "fullscreenchange",
        "mozfullscreenchange",
        "webkitfullscreenchange",
        "MSFullscreenChange",
      ],
      error: [
        "fullscreenerror",
        "mozfullscreenerror",
        "webkitfullscreenerror",
        "MSFullscreenError",
      ],
      is: "fullscreen fullScreen webkitIsFullScreen webkitIsFullscreen mozFullScreen msFullscreenElement".split(
        " "
      ),
      Pl: ["webkitbeginfullscreen", "webkitendfullscreen"],
    };
    this.X = null;
    this.zf = {
      webkit: {
        is: "webkitIsFullScreen",
        enabled: "webkitFullscreenEnabled",
        element: "webkitFullscreenElement",
        request: "webkitRequestFullscreen",
        Lb: "webkitExitFullscreen",
        ea: {
          Cc: "webkitfullscreenchange",
          error: "webkitfullscreenerror",
        },
      },
      Dq: {
        is: "webkitIsFullScreen",
        enabled: "webkitFullscreenEnabled",
        element: "webkitCurrentFullScreenElement",
        request: "webkitRequestFullScreen",
        Lb: "webkitCancelFullScreen",
        ea: {
          Cc: "webkitfullscreenchange",
          error: "webkitfullscreenerror",
        },
      },
      Jp: {
        is: "",
        enabled: "msFullscreenEnabled",
        element: "msFullscreenElement",
        request: "msRequestFullscreen",
        Lb: "msExitFullscreen",
        ea: {
          Cc: "MSFullscreenChange",
          error: "MSFullscreenError",
        },
      },
      Cq: {
        is: "fullscreen",
        enabled: "fullscreenEnabled",
        element: "fullscreenElement",
        request: "requestFullscreen",
        Lb: "exitFullscreen",
        ea: {
          Cc: "fullscreenchange",
          error: "fullscreenerror",
        },
      },
      Ip: {
        is: "mozFullScreen",
        enabled: "mozFullScreenEnabled",
        element: "mozFullScreenElement",
        request: "mozRequestFullScreen",
        Lb: "mozCancelFullScreen",
        ea: {
          Cc: "mozfullscreenchange",
          error: "mozfullscreenerror",
        },
      },
      gl: {
        is: "webkitDisplayingFullscreen",
        enabled: "webkitSupportsFullscreen",
        element: "webkitFullscreenElement",
        request: "webkitEnterFullscreen",
        Lb: "webkitExitFullscreen",
        ea: {
          Cc: "webkitbeginfullscreen webkitendfullscreen",
          error: "webkitfullscreenerror",
        },
      },
    };
    for (var g in this.zf)
      if (this.zf[g].enabled in window.document) {
        this.X = this.zf[g];
        break;
      }
    this.a.h.sa() && (this.X = this.zf.gl);
    this.userAgent = window.navigator.userAgent;
    this.h = {
      Wo: /Chrome/.test(this.userAgent),
      ap: /Firefox/.test(this.userAgent),
      opera: /Opera/.test(this.userAgent),
      Kp: /MSIE/.test(this.userAgent),
      Ro: /Android/.test(this.userAgent),
      Pl: /iP(hone|od|ad)/.test(this.userAgent),
    };
    this.view.j(".pb-video-player-wrap");
    this.timeout = null;
    this.za();
  }
  P = Ia.prototype;
  P.za = function () {
    try {
      if (E(this.X.ea.Cc))
        if (this.a.h.sa()) {
          var a = this.X.ea.Cc.split(" "),
            b;
          for (b in a) T(this.a.video, a[b], this.Dj, this);
        } else T(window.document, this.X.ea.Cc, this.Dj, this);
      E(this.X.ea.error) && T(window.document, this.X.ea.error, this.Te, this);
    } catch (d) {}
  };
  P.Dj = function (a) {
    this.ol(a);
  };
  P.Te = function (a) {
    this.Bl(a);
  };
  P.request = P.Al = function () {
    if (y(this.X)) return !1;
    try {
      this.a.video.removeAttribute("webkit-playsinline"),
        this.a.video.removeAttribute("playsinline");
    } catch (a) {}
    if (this.a.h.sa())
      try {
        return this.a.video[this.X.request](), !0;
      } catch (a) {
        return !1;
      }
    else
      try {
        return (
          this.view.W[this.X.request]({
            navigationUI: "hide",
          }),
          !0
        );
      } catch (a) {
        return !1;
      }
  };
  P.Lb = function () {
    if (y(this.X)) return !1;
    try {
      return window.document[this.X.Lb](), !0;
    } catch (a) {}
    return !1;
  };
  P.is = P.Ea = function () {
    if (y(this.X)) return !1;
    try {
      if ("" != this.X.is) return window.document[this.X.is];
    } catch (a) {}
    return !1;
  };
  P.enabled = P.isEnabled = function () {
    if (y(this.X)) return !1;
    try {
      return (
        this.view.s(this.view.W, "pb-video-full"),
        window.document[this.X.enabled]
      );
    } catch (a) {}
    return !1;
  };
  P.ub = P.element = function () {
    if (y(this.X)) return !1;
    try {
      return window.document[this.X.element];
    } catch (a) {}
    return !1;
  };
  function Ga() {
    this.Vf = va();
    this.B = ua();
    this.h = -1;
    this.Oa = {
      ei: "CHROME",
      fi: "FIREFOX",
      Rk: "FIREFOX_MOBILE",
      ji: "OPERA",
      Sk: "OPERA_MOBILE",
      Uk: "SAFARI",
      ii: "MSIE",
      Qk: "EDGE",
      di: "ANDROID",
      Pk: "APPLE",
      Wk: "TV",
      Xk: "TV_CONSOLE",
      Tk: "OTHER",
      Jo: "DESKTOP",
    };
    this.rk();
  }
  P = Ga.prototype;
  P.rk = function () {
    this.h = this.Ja()
      ? this.Oa.Wk
      : this.em()
      ? this.Oa.Xk
      : this.lj()
      ? this.Oa.Sk
      : this.cm()
      ? this.Oa.Rk
      : this.ke()
      ? this.Oa.di
      : this.sa()
      ? this.Oa.Pk
      : this.vd()
      ? this.Oa.ei
      : this.eh()
      ? this.Oa.fi
      : this.Rf()
      ? this.Oa.ji
      : this.me()
      ? this.Oa.Uk
      : this.Qf()
      ? this.Oa.ii
      : this.$l()
      ? this.Oa.Qk
      : this.Oa.Tk;
  };
  P.Yi = function () {
    -1 === this.h && this.rk();
    return this.h;
  };
  P.Ja = function () {
    return (
      J(this.B, "SMART-TV") ||
      J(this.B, "SmartTV") ||
      J(this.B, "SmartTvA") ||
      J(this.B, "Maple") ||
      J(this.B, "Opera TV") ||
      J(this.B, "NetCast.TV") ||
      J(this.B, "AppleTV") ||
      J(this.B, "GoogleTV") ||
      J(this.B, "HbbTV") ||
      J(this.B, "CrKey") ||
      J(this.B, "POV_TV") ||
      J(this.B, "GTV100") ||
      J(this.B, "STB") ||
      J(this.B, "NETTV") ||
      J(this.B, "PhilipsTV") ||
      J(this.B, "Roku") ||
      J(this.B, "Viera") ||
      J(this.B, "PlayStation") ||
      J(this.B, "Xbox") ||
      J(this.B, "BRAVIA") ||
      J(this.B, "HYUNDAI") ||
      J(this.B, "Hisense") ||
      J(this.B, "Tizen") ||
      J(this.B, "SRAF") ||
      J(this.B, "Linux; U") ||
      J(this.B, "InettvBrowser") ||
      J(this.B, "Puffin")
    );
  };
  P.em = function () {
    return (
      J(this.B, "PlayStation") ||
      J(this.B, "Xbox") ||
      J(this.B, "Nintendo WiiU")
    );
  };
  P.mj = function () {
    return J(this.B, "PlayStation");
  };
  P.vd = function () {
    return (
      I(this.B, "Chrome") &&
      I(this.Vf.vendor, "Google Inc") &&
      !I(this.B, "OPR/")
    );
  };
  P.eh = function () {
    return I(this.B, "Firefox");
  };
  P.Rf = function () {
    return I(this.B, "Opera") || I(this.B, "OPR/");
  };
  P.me = function () {
    return (
      I(this.B, "Safari") &&
      0 == I(this.B, "Chrome") &&
      0 == I(this.B, "Mobile")
    );
  };
  P.nj = function () {
    return I(this.B, "Safari") && 0 == I(this.B, "Chrome") && this.sa();
  };
  P.Qf = function () {
    return I(this.B, "MSIE") || I(this.B, "Trident");
  };
  P.$l = function () {
    return I(this.B, "Edge");
  };
  P.ke = function () {
    return I(this.B, "Android");
  };
  P.zp = function () {
    return I(this.B, "iPhone");
  };
  P.sa = function () {
    return /iP(hone|ad|od)/.test(this.B);
  };
  P.fh = function () {
    return I(this.B, "Macintosh");
  };
  P.yp = function () {
    return I(this.B, "iPad");
  };
  P.qj = function () {
    return (
      J(this.B, "iemobile") ||
      (J(this.B, "windows phone") && J(this.B, "edge")) ||
      I(this.B, " WPDesktop")
    );
  };
  P.lj = function () {
    return this.Rf() && I(this.B, "Mobile");
  };
  P.cm = function () {
    return this.eh() && I(this.B, "Mobile");
  };
  P.hj = function () {
    return I(this.B, "BlackBerry");
  };
  P.Vl = function () {
    return I(this.B, "ALCATEL");
  };
  P.F = function () {
    return this.ke() || this.sa() || this.qj() || this.hj();
  };
  P.Yl = function () {
    return I(this.B, "CrKey");
  };
  P.Zl = function () {
    return I(this.B, "CrOS") && I(this.sq, "Chrome");
  };
  P.Jl = function () {
    return K(this.B, /Chrome\/([0-9.]+)/);
  };
  P.Gp = function () {
    return I(this.B, "Tizen");
  };
  P.ip = function () {
    switch (this.Yi()) {
      case this.Oa.ei:
        return K(this.B, /Chrome\/([0-9.]+)/);
      case this.Oa.fi:
        return K(this.B, /Firefox\/([0-9.]+)/);
      case this.Oa.ji:
        return I(this.B, "OPR")
          ? K(this.B, /OPR\/([0-9.]+)/)
          : I(this.B, "Version")
          ? K(this.B, /Version\/([0-9.]+)/)
          : K(this.B, /Opera\s+([0-9]+)/);
      case this.Oa.Ko:
        return K(this.B, /Version\/([0-9.]+)/);
      case this.Oa.ii:
        return K(this.B, /MSIE\s+([0-9.]+)/);
      case this.Oa.di:
        return K(this.B, /Android\s([0-9\.]*)/);
      default:
        return I(this.B, "Version") ? K(this.B, /Version\/([0-9.]+)/) : "";
    }
  };
  P.Ll = function () {
    try {
      var a = /AppleWebKit\/([\d.]+)/.exec(this.B);
      if (a) return parseFloat(a[1]);
    } catch (b) {}
    return !1;
  };
  P.xd = function () {
    try {
      var a = this.Ll();
      if (!y(a) && !1 !== a && 537 > a) return !0;
    } catch (b) {}
    return !1;
  };
  P.pj = function () {
    return /Windows/.test(this.Vf.platform) || I(this.B, "Windows");
  };
  P.Ap = function () {
    return /Linux/.test(this.Vf.platform);
  };
  P.Wl = function () {
    return this.ke()
      ? I(this.B, "Mozilla/5.0") &&
          I(this.B, "Android ") &&
          I(this.B, "Version/") &&
          I(this.B, "AppleWebKit") &&
          !this.lj()
      : !1;
  };
  P.Pg = function () {
    if (this.ke()) {
      var a = this.B.match(/Android\s([0-9\.]*)/);
      return a && a[1] ? a[1] : !1;
    }
    return !1;
  };
  P.Tg = function () {
    if (this.sa()) {
      var a = this.Vf.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return null !== a
        ? parseInt(a[1], 10) +
            ("undefined" !== typeof a[2]
              ? "." +
                parseInt(a[2], 10) +
                ("undefined" !== typeof a[3] ? "." + parseInt(a[3], 10) : "")
              : "")
        : -1;
    }
    return !1;
  };
  P.bm = function () {
    var a =
      window.navigator.userAgent || window.navigator.vendor || window.opera;
    return -1 < a.indexOf("FBAN") || -1 < a.indexOf("FBAV");
  };
  P.dm = function () {
    return -1 < window.navigator.userAgent.indexOf("Instagram");
  };
  var Ja = {
    gc: 10,
    yb: 11,
    ue: 12,
    Io: 13,
    Po: 14,
    Lo: 15,
    No: 16,
    Qo: 17,
    Ho: 18,
    Go: 19,
    Mo: 20,
  };
  function Y(a, b) {
    if (0 >= arguments.length) throw Error("Failed initialize Ads Manager.");
    if (!B(a) || y(a)) throw new TypeError("Player reference is NULL.");
    if (z(b) || y(b) || 0 >= b.length) return this.Ga();
    this.c = "cda.Player.Ads.Manager";
    this.type = Ka;
    this.error = Z;
    this.state = Ja;
    this.a = a;
    this.Xb = null;
    this.hd = !1;
    this.mb = this.a.view.j(".pb-video-ad-container");
    this.nb = this.a.view.j(".pb-video-ad-content");
    this.Ac = this.xb = null;
    this.b = b;
    this.Dg = b.length;
    this.nd = [];
    this.gb = !1;
    this.Pc = 0;
    this.Zb = 1;
    this.Cb = this.U = 0;
    this.Fa = -1;
    this.zc = 1;
    this.kf = null;
    this.Nb = [];
    this.sc = [];
    this.eb = {
      creativeView: [],
      start: [],
      firstQuartile: [],
      midpoint: [],
      thirdQuartile: [],
      complete: [],
    };
    this.tg = !1;
    this.yi = 0;
    this.ic = "";
    this.jd = 0;
    this.ve = null;
    this.zi = 10;
    var d = this.a.storage.get("cda-gdpr");
    !d ||
      z(d.gdpr) ||
      z(d.gdpr_consent) ||
      ((this.jd = d.gdpr), (this.ic = d.gdpr_consent));
    try {
      var f = this;
      this.ve = setInterval(function () {
        if (0 == f.zi) clearInterval(f.ve), (f.ve = null);
        else if ((f.zi--, "undefined" !== typeof window.__tcfapi)) {
          clearInterval(f.ve);
          f.ve = null;
          var a = function (a) {
            !a ||
              "loaded" != a.cmpStatus ||
              ("useractioncomplete" != a.eventStatus &&
                "tcloaded" != a.eventStatus) ||
              ((f.yi = !1 === a.gdprApplies ? 0 : 1),
              a.tcString && a.tcString.length && (f.ic = a.tcString),
              f.yi &&
                (f.jd =
                  a.purpose &&
                  a.purpose.consents &&
                  a.purpose.consents[1] &&
                  a.vendor &&
                  a.vendor.consents &&
                  a.vendor.consents[255]
                    ? 0
                    : 1),
              f.a.storage.set("cda-gdpr", {
                gdpr: f.jd,
                gdpr_consent: f.ic,
              }));
          };
          window.__tcfapi("addEventListener", 0, a);
          window.__tcfapi("getTCData", 0, a);
        }
      }, 200);
    } catch (u) {}
    this.a.log(this.c, this.b);
    z(this.b[this.U]) ||
      y(this.b[this.U]) ||
      (this.b[this.U].hasOwnProperty("displayAs")
        ? this.eg(this.b[this.U].displayAs)
        : this.eg(this.state.gc));
    this.a.controls.vb();
    this.za();
    if (!z(this.b[this.U]) && !y(this.b[this.U]))
      try {
        this.b[this.U].hasOwnProperty("displayAs")
          ? this.eg(this.b[this.U].displayAs)
          : this.eg(this.state.gc);
        this.a.log(this.c, "ad state type: " + this.ya);
        var g = this.b[this.U].tag;
        if (this.b[this.U].hasOwnProperty("safe")) {
          var l = !!this.b[this.U].safe;
          if (
            !y(g) &&
            -1 !== g.indexOf("google_safe") &&
            -1 !== g.indexOf("google_unsafe")
          )
            try {
              var k = g.match(
                /\x3c!--google_safe_begin--\x3e(.+?)\x3c!--google_safe_end--\x3e/i
              );
              y(k) || z(k[1]) || !E(k[1]) || (k = k[1]);
              var p = g.match(
                /\x3c!--google_unsafe_begin--\x3e(.+?)\x3c!--google_unsafe_end--\x3e/i
              );
              y(p) || z(p[1]) || !E(p[1]) || (p = p[1]);
              this.b[this.U].tag = l ? k : p;
              this.je(this.b[this.U].tag)
                ? (this.b[this.U].type = this.type.Xa)
                : (this.b[this.U].type = this.type.hc);
              this.a.log(this.c, "safe: " + this.mq);
              this.a.log(this.c, "googleSafeTag: " + k);
              this.a.log(this.c, "googleUnsafeTag: " + p);
            } catch (u) {
              this.a.log(this.c, u);
            }
        }
        this.a.Ba
          ? ((this.a.disabled = !0),
            (this.kf = window.setInterval(this.a.D.bind(this, this.sl), 100)))
          : this.cj();
      } catch (u) {
        this.a.log(this.c, u), this.Ga();
      }
  }
  P = Y.prototype = {};
  P.za = function (a) {
    this.Pc = 0;
    if (this.ya !== this.state.yb || !z(a) || this.a.h.F())
      y(this.a.T) || this.a.T.Ze(!1),
        this.a.Ol(),
        this.a.controls.disable(),
        this.a.w.xa.s("pb-nocloud"),
        this.a.w.m(this.a.w.zd),
        this.a.controls.$c(0),
        this.a.controls.ob.$a("0%"),
        this.a.controls.Eb(0),
        this.a.controls.Ua(0),
        this.a.h.F() && this.a.Xe();
  };
  P.sl = function () {
    this.a.bi && (window.clearInterval(this.kf), (this.kf = null), this.cj());
  };
  P.cj = function () {
    if (this.je(this.b[this.U].tag))
      this.Ff(this.b[this.U].tag), this.ig(this.b[this.U]);
    else
      switch (this.b[this.U].type) {
        case this.type.hc:
          this.Ff(this.b[this.U].tag);
          this.af(this.b[this.U]);
          break;
        case this.type.Xa:
          this.Ff(this.b[this.U].tag);
          this.ig(this.b[this.U]);
          break;
        case this.type.ki:
          this.Kf(this.b[this.U].tag);
          break;
        case this.type.nf:
          this.Dk(this.b[this.U]);
          break;
        default:
          this.Ga();
      }
  };
  P.Ga = function (a) {
    this.a.log(this.c, "destroy");
    try {
      this.a.ta() && window.parent.postMessage("player-ad-finish", "*");
    } catch (g) {}
    try {
      window.document.querySelector("#player_branding_top") &&
        (window.document.querySelector("#player_branding_top").innerHTML = ""),
        window.document.querySelector("#player_branding_bottom") &&
          (window.document.querySelector("#player_branding_bottom").innerHTML =
            "");
    } catch (g) {}
    this.a.Ba &&
      (window.clearInterval(this.kf),
      (this.kf = null),
      (this.a.disabled = !1),
      this.gb || (this.a.autoplay = !1));
    this.a.Je();
    this.a.controls.enable();
    this.a.v = null;
    this.tg = this.a.J = !1;
    y(this.nb) || (this.nb.innerHTML = "");
    y(this.mb) || this.mb.m();
    if (this.ya !== this.state.yb || this.gb || this.a.h.F())
      this.a.w.show(this.a.w.zd),
        this.a.w.m(this.a.w.Na),
        this.a.w.m(this.a.w.Be),
        this.a.w.xa.C("pb-run-ad"),
        this.a.controls.$c(0),
        this.a.controls.ob.$a("0%"),
        this.a.controls.Eb(0),
        this.a.controls.Ua(this.a.K()),
        this.a.h.F() && this.a.controls.Ua(0);
    this.a.T.za();
    this.ya !== this.state.gc &&
      !y(this.a.T) &&
      this.a.T.bh() &&
      this.a.T.Ze(!0);
    if (this.ya === this.state.gc) {
      if (
        this.a.h.F() &&
        (this.a.td(),
        this.a.Ye(),
        this.a.autoplay && !this.gb && this.ya != this.state.ue)
      ) {
        var b = this;
        window.addEventListener("touchstart", function l() {
          b.a.rb();
          this.removeEventListener("touchstart", l);
        });
      }
      this.a.video.load();
    }
    if (this.ya === this.state.ue)
      this.a.log(this.c, "start next video"),
        this.na("Startuje kolejny film"),
        this.a.$e();
    else if (this.ya === this.state.gc)
      !z(a) && a
        ? (this.a.log(this.c, "start video force"),
          this.na("Startuje film"),
          this.a.rb())
        : this.gb
        ? (this.a.log(this.c, "adsDisplay true, start video"),
          this.na("Startuje film"),
          this.a.rb())
        : this.a.autoplay || this.a.fa
        ? (this.a.log(this.c, "autoplay true, start video"),
          this.na("Startuje film"),
          this.a.rb())
        : (this.a.log(this.c, "set video file"),
          this.na("Wracam do filmu"),
          this.a.Ye(),
          this.a.Ba
            ? (this.a.controls.qa(!0), this.a.controls.aa.m())
            : (this.a.controls.aa.R() ||
                this.a.controls.wb.G("pb-play-pause")) &&
              this.a.rb());
    else if (this.ya === this.state.yb) {
      this.a.log(this.c, "start video after midroll");
      try {
        var d = this.a.controls.Ca.querySelectorAll(
          ".pb-progress-midroll-marker"
        );
        if (!y(d) && 0 < d.length)
          for (a = 0; a < d.length; a++) {
            var f = d[a];
            y(f) ||
              y(f.getAttribute("data-time")) ||
              f.getAttribute("data-time") != this.b[this.U - 1].time ||
              f.m();
          }
      } catch (g) {
        this.a.log(this.c, g);
      }
      this.a.h.F() || (0 < this.a.l() ? this.a.play() : this.a.rb());
    }
  };
  P.eg = function (a) {
    switch (a) {
      case "prerol":
      case "preroll":
        this.ya = this.state.gc;
        break;
      case "midrol":
      case "midroll":
        this.ya = this.state.yb;
        break;
      case "postrol":
      case "postroll":
        this.ya = this.state.ue;
        break;
      default:
        this.ya = this.state.gc;
    }
    this.a.vf = this.ya;
  };
  P.fp = function () {
    return this.ya;
  };
  P.nq = function (a) {
    this.vf = a;
  };
  P.ep = function () {
    return this.vf;
  };
  P.Kf = function (a, b) {
    this.a.log(this.c, "getPool", a);
    (!this.a.fa && !this.a.autoplay) ||
      this.a.controls.aa.R() ||
      (this.a.controls.aa.show(), this.a.controls.N.m());
    this.na("Pobieram pule reklam...");
    this.na(a);
    -1 != window.location.host.indexOf("cda.pl") &&
      (a += "&wa=" + Number(this.a.ne));
    try {
      this.yf(
        a,
        "GET",
        !0,
        !0,
        function (a) {
          this.a.log(this.c, "getPool", a);
          try {
            if (!y(a)) {
              var d = JSON.parse(a);
              if (!y(d) && 0 < d.length) {
                try {
                  for (
                    this.na("Lista dost\u0119pnych reklam:"), a = 0;
                    a < d.length;
                    a++
                  )
                    this.na(d[a]);
                } catch (g) {}
                this.nd = d;
                this.Cb = 0;
                this.Ff(d);
                return this.Ch(this.nd, this.Cb, b);
              }
            }
          } catch (g) {
            this.a.log(this.c, "getPool", g),
              this.na("Wyst\u0105pi\u0142 b\u0142\u0105d: " + g);
          }
          this.a.log(this.c, "getPool", "response null");
          return this.Ga();
        }.bind(this)
      );
    } catch (d) {
      this.a.log(this.c, "getPool", d), this.Ga();
    }
  };
  P.Ch = function (a, b, d) {
    (!this.a.fa && !this.a.autoplay) ||
      this.a.controls.aa.R() ||
      (this.a.controls.aa.show(), this.a.controls.N.m());
    this.a.log(this.c, "parsePool", arguments);
    this.na("Sprawdzam reklam\u0119 nr " + (b + 1));
    if (E(a[b])) {
      d && (this.tg = !0);
      "undefined" == typeof d && (d = this.tg);
      var f = {
        autoplay: 0 < this.U ? !0 : this.b[this.U].autoplay,
        counter: this.b[this.U].counter,
        displayAs: this.b[this.U].displayAs,
        key:
          d && "undefined" != typeof this.b[this.U].key2
            ? this.b[this.U].key2
            : this.b[this.U].key,
        key2:
          "undefined" != typeof this.b[this.U].key2 ? this.b[this.U].key2 : "",
        skip: this.b[this.U].skip,
        click: this.b[this.U].click,
        time: this.b[this.U].time,
        pool: this.b[this.U].tag,
        tag: a[b],
      };
      this.wf && (f.autoplay = !0);
      this.a.fa && (f.autoplay = !0);
      this.a.log(this.c, "startbyclick: " + this.a.fa);
      this.a.log(this.c, "autoplay: " + f.autoplay);
      this.a.log(this.c, "state: " + this.a.getState());
      if (this.ya == this.state.ue || this.ya == this.state.yb) f.autoplay = !0;
      if (this.je(a[b])) return (f.type = this.type.Xa), this.ig(f);
      if (this.gm(a[b]) && !this.a.h.F())
        return (
          this.a.log(this.c, "youtube embed ads: " + a[b]),
          this.a.log(this.c, "youtube video id: " + this.$i(a[b])),
          (f.type = this.type.nf),
          this.Dk(f)
        );
      f.type = this.type.hc;
      return this.af(f);
    }
    return this.Ga();
  };
  P.af = function (a) {
    this.a.log(this.c, "startVast", a);
    this.na("Reklama VAST");
    this.na("Pobieram: " + a.tag);
    this.Gf(this.Cb, !0);
    this.a.controls.vb();
    this.Fa = this.type.hc;
    this.xb = new W(this.a, this, a);
    this.xb.Zc(
      function (a) {
        this.xb.Sl(a);
      }.bind(this),
      function () {
        this.Ra(this.error.vi);
      }.bind(this)
    );
    if (this.a.cc) {
      var b = this;
      window.videoAdPlay = function () {
        return null != b.xb.video && y(document.querySelector(".pb-run-ad"))
          ? ((b.xb.video.preload = "auto"),
            (b.xb.video.autoplay = "autoplay"),
            (b.xb.video.muted = "muted"),
            b.xb.play(),
            !0)
          : !1;
      };
    }
  };
  P.ig = function (a) {
    this.a.log(this.c, "startAdsense", a);
    this.a.controls.vb();
    if (!this.Ml())
      return (
        this.Cb++,
        this.Cb < this.nd.length ? this.Ch(this.nd, this.Cb) : this.Hc()
      );
    this.na("Reklama ADSENSE");
    this.na("Pobieram: " + a.tag);
    this.Gf(this.Cb, !0);
    this.Fa = this.type.Xa;
    this.Ac = new X(this.a, this, a);
    this.Ac.za();
  };
  P.Dk = function (a) {
    function b(a) {
      k.a.controls.aa.R() && k.a.controls.H(!1);
      k.a.controls.N.m();
      a.target.setVolume(50);
      k.a.view.xa.C("pb-ady-player-wait");
      k.a.controls.N.show();
      k.hd = !0;
    }
    function d(a) {
      !fa && k.hd && (k.Eh(), (fa = !0), 0 < k.Hi && k.Xb.seekTo(k.Hi));
      a.data == window.YT.PlayerState.PLAYING &&
        (k.a.view.xa.G("pb-ady-player-active") &&
          k.a.view.xa.C("pb-ady-player-active"),
        (p = window.setInterval(function () {
          y(k.Xb) || z(k.Xb)
            ? (window.clearInterval(p), (p = null))
            : (k.Cn(k.Xb.getCurrentTime(), k.Xb.getDuration()),
              k.tf &&
                !u &&
                (k.a.view.tc.show(),
                k.a.view.tc.ha("Pomi\u0144 reklam\u0119 za " + k.kd),
                (k.a.view.tc.style.opacity = "0.5"),
                (u = !0),
                (v = window.setInterval(function () {
                  k.kd--;
                  0 < k.kd
                    ? k.a.view.tc.ha("Pomi\u0144 reklam\u0119 za " + k.kd)
                    : (k.a.view.tc.ha("Pomi\u0144 reklam\u0119"),
                      (k.a.view.tc.style.opacity = "1"),
                      (k.Di = !0),
                      window.clearTimeout(v),
                      (v = null));
                }, 1e3))),
              k.Zk &&
                !ia &&
                ((ia = !0),
                (M = window.setInterval(function () {
                  var a = Math.round(
                    k.Xb.getDuration() - k.Xb.getCurrentTime()
                  );
                  !isNaN(a) && 0 < a
                    ? (k.a.view.lf.show(),
                      k.a.view.lf.ha("Reklama zniknie za " + a + " sek"))
                    : k.a.view.lf.m();
                  0 >= a && (window.clearInterval(M), (M = null));
                }, 500))));
        }, 500)));
      a.data == window.YT.PlayerState.ENDED &&
        (k.hd
          ? (k.S(k.Mf().complete),
            window.setTimeout(function () {
              k.Fk();
            }, 500))
          : ((k.hd = !0),
            k.a.view.xa.C("pb-ady-player-wait"),
            k.a.controls.N.show()));
    }
    this.a.log(this.c, "start yt", a);
    this.a.controls.N.m();
    this.a.view.xa.s("pb-ady-player-wait");
    this.a.view.xa.s("pb-ady-player-active");
    this.a.view.xa.s("pb-ady-player-show");
    this.na("Reklama Youtube Embed");
    this.na("Wy\u015bwietlam: " + a.tag);
    this.Gf(this.Cb, !0);
    this.Fa = this.type.nf;
    this.Gi = this.Vd = this.yc = this.xc = this.vc = !1;
    this.tf = !0;
    this.kd = 60;
    this.Zk = this.Di = !1;
    this.Hi = this.ye = 0;
    try {
      null != this.a.ib("controls") &&
        ((this.ye = parseInt(this.a.ib("controls"))),
        D(this.ye) || (this.ye = 0));
    } catch (ha) {
      this.ye = 0;
    }
    try {
      null != this.a.ib("skip") &&
        (parseInt(this.a.ib("skip")) ? (this.tf = !0) : (this.tf = !1));
    } catch (ha) {
      this.tf = !1;
    }
    try {
      if (null != this.a.ib("skip_sec")) {
        var f = parseInt(this.a.ib("skip_sec"));
        if (!D(f) || 0 >= f || 15 < f) f = 5;
        this.kd = f;
      }
    } catch (ha) {
      this.kd = 5;
    }
    f = document.createElement("script");
    f.src = "https://www.youtube.com/iframe_api";
    var g = document.getElementsByTagName("script")[0];
    g.parentNode.insertBefore(f, g);
    this.Hb = a.tag;
    var l = this.$i(a.tag);
    if (y(l)) return this.Ga();
    if (
      "https://www.youtube.com/watch?v=lq1k3B4D_tQ" == this.Hb ||
      "https://www.youtube.com/watch?v=SAqEE8AJvDE" == this.Hb ||
      "https://www.youtube.com/watch?v=v2K7b2JhH5o" == this.Hb ||
      "https://www.youtube.com/watch?v=DjZpjpJr4FU" == this.Hb ||
      "https://www.youtube.com/watch?v=ItVe60UwwMU" == this.Hb
    )
      this.kd = 60;
    var k = this;
    window.onYouTubeIframeAPIReady = function () {
      k.Xb = new window.YT.Player("pb-yt-iframe", {
        height: k.a.view.Vc(k.a.view.W),
        width: k.a.view.ac(k.a.view.W),
        videoId: l,
        playerVars: {
          rel: 0,
          showinfo: 1,
          playsinline: 1,
          autoplay: 0,
          controls: k.ye,
          disablekb: 0,
          fs: 0,
          modestbranding: 1,
          autohide: 1,
          wmode: "opaque",
        },
        events: {
          onReady: b,
          onStateChange: d,
        },
      });
    };
    k = this;
    var p = null;
    k = this;
    var u = !1,
      v = null,
      M = null,
      ia = !1,
      fa = !1;
    this.a.view.tc.m();
    T(this.a.view.tc, "click", this.Dn, this);
  };
  P.Fk = function () {
    try {
      this.a.view.xa.C("pb-ady-player-show"),
        this.a.view.tc.ha(""),
        this.a.view.tc.m(),
        this.a.view.lf.ha(""),
        this.a.view.lf.m(),
        (this.Xb = null),
        (this.hd = !1),
        this.a.rb(),
        this.a.view.Ok.ha(""),
        this.a.view.Ok.m();
    } catch (a) {
      this.a.log(this.c, a);
    }
  };
  P.je = function (a) {
    return (
      /ima3vpaid/.test(a) ||
      /doubleclick.net/.test(a) ||
      /svastx.moatads.com/.test(a) ||
      /s418.mxcdn.net/.test(a) ||
      /services.bilsyndication.com/.test(a) ||
      /secure.adnxs.com/.test(a) ||
      /bdr.wpcdn.pl/.test(a) ||
      /vpaid=1/.test(a) ||
      /pubmatic.com/.test(a)
    );
  };
  P.Ml = function () {
    try {
      if ("undefined" != typeof window.google.ima) return !0;
    } catch (a) {}
    return !1;
  };
  P.gm = function (a) {
    return -1 < a.indexOf("www.youtube.com/watch?v=");
  };
  P.$i = function (a) {
    try {
      return a.split("v=")[1];
    } catch (b) {
      return null;
    }
  };
  P.Mf = function () {
    if ("https://www.youtube.com/watch?v=lq1k3B4D_tQ" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=clickTracking&ct=[timestamp]",
        video60sec:
          "https://g.cda.pl/g.php?pixel&vi=Y2RiZDNlNDFlMDI0YjkwODViNTdjODdhYzNlZmU4M2M_MTkzNg&pl=video60sec&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=SAqEE8AJvDE" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=clickTracking&ct=[timestamp]",
        video60sec:
          "https://g.cda.pl/g.php?pixel&vi=YTNhYzdiOTY5NWNmMTdmNTQ1OTdmMjg1NjVjNTBlZDA_MTk1NA&pl=video60sec&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=v2K7b2JhH5o" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=clickTracking&ct=[timestamp]",
        video60sec:
          "https://g.cda.pl/g.php?pixel&vi=OTI4Yjc0MTRhMjU2YzgyOTY3YTg2ODliMzUwYzVhNjY_MTk1Nw&pl=video60sec&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=DjZpjpJr4FU" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=clickTracking&ct=[timestamp]",
        video60sec:
          "https://g.cda.pl/g.php?pixel&vi=ZDk1NmZiMGMxY2E4OTMxY2RjMzYzOTVmYzI4YjllNDU_MTk2MA&pl=video60sec&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=ItVe60UwwMU" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=clickTracking&ct=[timestamp]",
        video60sec:
          "https://g.cda.pl/g.php?pixel&vi=MWI0NmUwNDcyMDkwMmI2YjYwODFjMmViYWNiMWRjYzY_MTk2Mw&pl=video60sec&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=YJO9VAx9PPM" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ&pl=clickTracking&ct=[timestamp]",
      };
    if ("https://www.youtube.com/watch?v=uPyQzjzhYEE" == this.Hb)
      return {
        impression: [
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=impression&ct=[timestamp]",
        ],
        start:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=start&ct=[timestamp]",
        firstQuartile:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=firstQuartile&ct=[timestamp]",
        midpoint:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=midpoint&ct=[timestamp]]",
        thirdQuartile:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=thirdQuartile&ct=[timestamp]",
        complete:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=complete&ct=[timestamp]",
        skip: "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=skip&ct=[timestamp]",
        clickTracking:
          "https://g.cda.pl/g.php?pixel&vi=MWQwYmVmNjdiODA2YmYzMGNmMDc4ZGRlNGVkZWZlMWQ_MjI3Mg&pl=clickTracking&ct=[timestamp]",
      };
  };
  P.Cn = function (a, b) {
    var d = this.Mf();
    b = Math.floor((a / b) * 100);
    if (0 <= a && !1 === this.Vd)
      try {
        this.S(d.start), (this.Vd = !0);
      } catch (f) {}
    if (60 <= a && !1 === this.Gi)
      try {
        "undefined" !== typeof d.video60sec &&
          (this.S(d.video60sec), (this.Gi = !0));
      } catch (f) {}
    if (25 <= b && !1 === this.vc)
      try {
        this.S(d.firstQuartile), (this.vc = !0);
      } catch (f) {}
    else if (50 <= b && !1 === this.xc)
      try {
        this.S(d.midpoint), (this.xc = !0);
      } catch (f) {}
    else if (75 <= b && 0 == this.yc)
      try {
        this.S(d.thirdQuartile), (this.yc = !0);
      } catch (f) {}
  };
  P.S = function (a) {
    this.a.log(this.c, "sendPixel", a);
    if (E(a)) {
      var b = new window.Image(1, 1);
      b.onload = b.onerror = function () {
        delete b;
      };
      b.src = a;
    }
  };
  P.rp = function () {
    return this.Fa;
  };
  P.play = function () {
    if (this.Fa == this.type.hc) this.xb.play();
    else if (this.Fa == this.type.nf)
      if (this.hd) this.Eh();
      else
        var a = this,
          b = window.setInterval(function () {
            a.a.log(a.c, "yt ready: " + a.hd);
            a.hd
              ? (a.Eh(),
                a.a.controls.H(!1),
                window.clearInterval(b),
                (b = null))
              : (a.a.controls.H(!0),
                !y(a.Xb) &&
                  A(a.Xb.getCurrentTime) &&
                  0 < a.Xb.getCurrentTime() &&
                  (window.clearInterval(b), (b = null)));
          }, 50);
  };
  P.Eh = function () {
    var a = this.Mf();
    if (C(a.impression))
      for (var b = 0; b < a.impression.length; b++) this.S(a.impression[b]);
    else this.S(a.impression);
    this.a.view.xa.C("pb-ady-player-active");
  };
  P.Dn = function () {
    this.Di && (this.S(this.Mf().skip), this.Fk());
  };
  P.pause = function () {
    this.Fa == this.type.hc && this.xb.pause();
  };
  P.click = function () {
    this.Fa == this.type.hc && this.xb.nc();
  };
  P.dj = function () {
    if (this.Fa == this.type.hc) return this.xb.ra;
  };
  P.ej = function () {
    if (this.Fa == this.type.hc) return this.xb.Rd;
  };
  P.Cj = function () {
    this.a.log(this.c, "onAdSkipped");
    if (A(window.onAdSkipped)) window.onAdSkipped(this.a.id);
    return this.Hc();
  };
  P.Hc = function () {
    this.a.log(this.c, "onAdComplete");
    this.nd = [];
    this.Cb = 0;
    this.Zb++;
    this.U++;
    this.a.log(this.c, "currentAd: " + this.Zb);
    this.a.log(this.c, "adsCount: " + this.Dg);
    if (A(window.onAdComplete)) window.onAdComplete(this.a.id, this.gb);
    if (!this.a.Ba && this.a.h.F() && 1 < this.Zb && this.gb) return this.Ga();
    if (this.Zb <= this.zc)
      if (z(this.b[this.U]) || y(this.b[this.U])) this.Ga();
      else
        try {
          switch (this.b[this.U].type) {
            case this.type.hc:
              this.af(this.b[this.U]);
              break;
            case this.type.Xa:
              this.ig(this.b[this.U]);
              break;
            case this.type.ki:
              this.Kf(this.b[this.U].tag);
              break;
            default:
              this.Ga();
          }
        } catch (a) {
          this.a.log(this.c, "onAdComplete Error", a), this.Ga();
        }
    else this.Ga();
  };
  P.Aj = function () {};
  P.Ra = function (a, b) {
    this.a.log(this.c, "onAdError", arguments);
    this.na("Wyst\u0105pi\u0142 b\u0142\u0105d: " + a);
    if (A(window.onAdError)) window.onAdError(this.a.id, this.gb);
    this.Gf(this.Cb, !1);
    switch (a) {
      case this.error.si:
      case this.error.mf:
      case this.error.pi:
      case this.error.Td:
      case this.error.pg:
      case this.error.ti:
      case this.error.ui:
      case this.error.Yk:
      case this.error.vi:
      case this.error.oi:
      case this.error.UNKNOWN_ERROR:
      case this.error.mi:
        return (
          this.Cb++,
          this.Cb < this.nd.length ? this.Ch(this.nd, this.Cb) : this.Hc()
        );
      case this.error.ri:
        var d = !1;
        !this.gb && this.a.autoplay && (d = !0);
        return this.Ga(d);
      case this.error.ni:
        return this.hn(b);
      default:
        return (d = !1), !this.gb && this.a.autoplay && (d = !0), this.Ga(d);
    }
  };
  P.hn = function (a) {
    this.a.log(this.c, "startAdsense", a);
    this.na("Reklama ADSENSE");
    this.na("Pobieram: " + a.ad.tag);
    try {
      (this.Fa = this.type.Xa),
        (this.Ac = new X(
          this.a,
          this,
          a.ad,
          a.tracking,
          a.impression,
          a.clickTracking,
          a.viewableImpression
        )),
        this.Ac.za();
    } catch (b) {
      this.a.log(this.c, b), this.Ga();
    }
  };
  P.yf = function (a, b, d, f, g) {
    this.a.log(this.c, "ajax", arguments);
    if (E(a))
      try {
        var l = new XMLHttpRequest(),
          k = this;
        l.onload = function () {};
        l.onreadystatechange = function () {
          4 == l.readyState && 200 == l.status
            ? z(l.response) || y(l.response) || !l.response
              ? k.Ga()
              : g(l.response)
            : 200 < l.status && k.Ga();
        };
        l.onerror = function () {
          k.na("Wyst\u0105pi\u0142 b\u0142\u0105d podczas pobierania!");
          k.Ga();
        };
        l.ontimeout = function () {
          k.na("Przekoczono czas odpowiedzi!");
          k.Ga();
        };
        l.withCredentials = f;
        l.open(b, a, d);
        l.timeout = 5e3;
        l.send(null);
      } catch (p) {
        this.a.log(this.c, "ajax", p), this.Ga();
      }
    else this.Ga();
  };
  P.na = function (a) {
    if (
      this.a.options.hasOwnProperty("debugAds") &&
      1 == this.a.options.debugAds
    ) {
      var b = document.querySelector(".console-player-container");
      null !== b &&
        (/http/.test(a) &&
          (a = '<a href="' + a + '" target="_blank">' + a + "</a>"),
        b.insertAdjacentHTML(
          "beforeend",
          '<div class="console-player-line">' + a + "</div>"
        ));
    }
  };
  P.Ff = function (a) {
    if (0 != this.a.oj()) {
      var b = window.document.querySelector(".player-vast-pool");
      if (!y(b) && !z(b)) {
        var d = "<ul>";
        if (C(a))
          for (var f = 0; f < a.length; f++)
            d +=
              '<li class="vast-' + f + '">' + (f + 1) + ": " + a[f] + "</li>";
        else d += '<li class="vast-0">' + a + "</li>";
        b.innerHTML = d + "</ul>";
      }
    }
  };
  P.Gf = function (a, b) {
    if (0 != this.a.oj()) {
      var d = window.document.querySelector(".player-vast-pool");
      y(d) ||
        z(d) ||
        ((a = window.document.querySelector(
          ".player-vast-pool ul li.vast-" + a
        )),
        y(a) || (a.style.color = b ? "green" : "red"));
    }
  };
  var Ka = {
    hc: "vast",
    Xa: "adsense",
    ki: "pool",
    nf: "yt",
  };
  var Z = {
    si: "VAST_NOT_FOUND",
    pi: "VAST_LOADING_ERROR",
    mf: "VAST_LOAD_TIMEOUT",
    Td: "VAST_EMPTY",
    pg: "VAST_PARSE_ERROR",
    ti: "VAST_UNSUPPORTED_VERSION",
    ui: "VAST_WRAPPER_ERROR",
    Yk: "VAST_MEDIA_ERROR",
    ri: "VAST_MEDIA_LOAD_TIMEOUT",
    oi: "VAST_AD_NOT_FOUND",
    vi: "VAST_XML_ERROR",
    ni: "VAST_ADSENSE_FOUND",
    Vk: "SERVER_ERROR",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    mi: "UNKNOWN_RESPONSE",
  };
  function X(a, b, d, f, g, l, k) {
    if (3 > arguments.length)
      throw Error("Failed initialize Adsense advertisement.");
    if (!B(a) || y(a)) throw new TypeError("Player reference is NULL.");
    if (!B(b) || y(b)) throw new TypeError("Ads Manager reference is NULL.");
    (z(d) || y(d)) && this.finish();
    this.c = "cda.Player.Ads.Adsense";
    this.a = a;
    this.u = b;
    this.b = d;
    this.Ia = null;
    this.event = new R();
    this.error = Z;
    this.ea = [
      google.ima.AdEvent.Type.AD_BREAK_READY,
      google.ima.AdEvent.Type.AD_METADATA,
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      google.ima.AdEvent.Type.CLICK,
      google.ima.AdEvent.Type.COMPLETE,
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      google.ima.AdEvent.Type.DURATION_CHANGE,
      google.ima.AdEvent.Type.FIRST_QUARTILE,
      google.ima.AdEvent.Type.IMPRESSION,
      google.ima.AdEvent.Type.LINEAR_CHANGED,
      google.ima.AdEvent.Type.LOADED,
      google.ima.AdEvent.Type.LOG,
      google.ima.AdEvent.Type.MIDPOINT,
      google.ima.AdEvent.Type.PAUSED,
      google.ima.AdEvent.Type.RESUMED,
      google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,
      google.ima.AdEvent.Type.SKIPPED,
      google.ima.AdEvent.Type.STARTED,
      google.ima.AdEvent.Type.THIRD_QUARTILE,
      google.ima.AdEvent.Type.USER_CLOSE,
      google.ima.AdEvent.Type.VOLUME_CHANGED,
      google.ima.AdEvent.Type.VOLUME_MUTED,
    ];
    this.Og = [
      "fullscreenchange",
      "mozfullscreenchange",
      "webkitfullscreenchange",
      "MSFullscreenChange",
    ];
    this.Zg = null;
    this.i = {};
    this.Ae = this.Yd = !1;
    this.mb = this.a.view.mb;
    this.nb = this.a.view.nb;
    this.Na = this.a.view.Na;
    this.ze = null;
    null != this.a.view.ub(".pb-ad-video-player", this.mb) &&
      (this.nb.innerHTML = "");
    this.sk(this.nb, this.a.video);
    (this.u.ya !== this.u.state.yb || this.a.h.F()) && this.mb.show();
    this.v = this.Qc = this.md = null;
    this.H();
    this.Mc = null;
    this.Nc = this.Oc = this.Ib = -1;
    this.uf = !1;
    window.encodeURIComponent(location.href);
    this.V = !1;
    this.ca = 5;
    this.qb = this.Fb = null;
    this.Nd = !1;
    this.Y = 5;
    this.Od = !0;
    this.yc = this.xc = this.vc = this.Ud = this.xi = this.wk = !1;
    this.eb = {
      creativeView: [],
      start: [],
      firstQuartile: [],
      midpoint: [],
      thirdQuartile: [],
      complete: [],
    };
    this.Nb = [];
    this.sc = [];
    this.Tc = [];
    y(f) || z(f) || (this.eb = f);
    y(g) || z(g) || (this.Nb = g);
    y(l) || z(l) || (this.Tc = l);
    y(k) || z(k) || (this.sc = k);
    this.vk();
    -1 <
      this.b.tag.indexOf(
        "MTc2_MDVhMDdjNDFjMGYxZGU1YmU1OTYyMjhiZTAwODgxYmQ_MzEwMw"
      ) && ((this.V = !0), (this.Y = this.ca = 20));
    var p = this.a.video.ac(),
      u = this.a.video.Vc();
    0 == u && (u = Math.ceil(p / 1.77));
    this.co(p);
    this.bo(u);
    try {
      -1 < this.b.tag.indexOf("[referrer_url]") &&
        (this.b.tag = this.b.tag.replace(
          "[referrer_url]",
          encodeURIComponent(window.location.href)
        )),
        -1 < this.b.tag.indexOf("[player_h]") &&
          (this.b.tag = this.b.tag.replace("[player_h]", u)),
        -1 < this.b.tag.indexOf("[player_w]") &&
          (this.b.tag = this.b.tag.replace("[player_w]", p));
    } catch (v) {}
    this.ud = !1;
    y(this.a.ib("vast_test")) && (this.ud = !0);
    this.a.Ba && 5 > this.u.Pc && !this.a.jb()
      ? ((p = new URLSearchParams(this.b.tag)),
        p.set("ts", "[timestamp]"),
        (p = window.decodeURIComponent(p.toString())),
        (p = p.replace("ads=&", "ads&")),
        (p = this.b.pool + "&remove_from_pool=" + window.encodeURIComponent(p)),
        (this.u.zc = 6),
        (this.Ia = {
          tag: p,
          autoplay: !0,
          counter: !0,
          displayAs: this.b.displayAs,
          key: "",
          skip: !1,
          click: !0,
          time: 0,
          type: "pool",
          length: 15,
        }))
      : this.a.Ba ||
        this.a.ta() ||
        (this.a.h.F() && (!this.a.h.F() || "midrol" == this.b.displayAs)) ||
        this.a.h.Ja() ||
        ("prerol" != this.b.displayAs &&
          "postrol" != this.b.displayAs &&
          "midrol" != this.b.displayAs) ||
        !y(this.a.ib("vast_test")) ||
        ("plain" == this.a.f.type &&
          (z(this.a.f.video_promoted) || !this.a.f.video_promoted)) ||
        !(300 <= this.a.f.duration || "postrol" == this.b.displayAs) ||
        0 != this.u.Pc ||
        -1 < this.b.tag.indexOf("g_zaslepka_dzieci.php") ||
        -1 <
          this.b.tag.indexOf(
            "MjA_ZDMwYzA2NTg5NTBiNmU0MzMyMDU4MjQ4OGZhZjQ0MjQ_MjM5NQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_N2JhODc3Y2U3NTJkNTI4Yjc4NmZiMTdjYzFlNDJhYWU_MTIyMQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MGYzNWQyMzlhN2U0NThlMGQ3OTNiYTMwYzQ3ZmU3NmI_MjUyOQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjcxYjg4ODFlYmUwNmYwYWM0ZWVhZWYzZGRlMWExYjY_MjUzOQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTg0ZmRmMDg5ZjM4MjI2NzkyZWUzODMwYzExNmNjZjc_MjY0MQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_Y2I2YjBkNjVkZTA5M2U1NGQ3ZTY2YjkwYTQ1NTI1ZWY_MzIxNw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MGE0OTJhMzc0YjZmOGQ5YjRlNWE1MTc4OTkwMDk2Y2Y_MzIxNA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTQ1MDkxYmJiZjgxOGFkNDdlNGQzZTgwMWIxMjc1ZDE_MzE2Ng"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_NjNkNDgyZjU4YTJhZGE5ZTY2NGM4MTc4ZDQyNDk2Zjk_MzEwMA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_NzFlYzcyMDJmYzlhODE0NzVmNTM2NWQ3MzJiZjBmMjc_MzA5Nw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTc4YzZhOGIwN2U0ZjVjZTBkOGNlNTQ1ZWJkMGZhMTc_MzA5NA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MDZiYWRiODMyODhiMDkxMWE5YzM2MGJkNDBiYmMwNGM_MzA5MQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YzU3ZmMyNDcxODk0ZTdhY2JkNGE5ZDEyOTllMWQ0N2I_MzA0Mw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjE1NTVlOGZhY2YyYTAxZmVjYWJiNDQ1NzYzZTExOTM_MzI0NA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_ZWU3YjlhZWMyMmVmYzk1MDdiY2E2NDJhZTM1YmZiM2Q_MzI0Nw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_OTQyM2VhYzkyZWJmNGY5MWJiNDE1ZTBhNGJjMTFmM2U_MzI1MA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YmMwYTA5NzAyYTA4MTQwMzMzYTMzNWFjYWI5MjM3MTA_MzI1Mw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjEyNWI0N2Y1NzE4M2Q0ZTAxYWQ3MmI3OWEzMDc5ODM_MzI1OQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YzliYjJkMmVhMWRlNmU5Y2Q2NDA0YjU1ZjJlMDgzNTg_MzI1Ng"
          ) ||
        "undefined" === typeof this.b.pool ||
        ((p = new URLSearchParams(this.b.tag)),
        p.set("ts", "[timestamp]"),
        (p = window.decodeURIComponent(p.toString())),
        (p = p.replace("ads=&", "ads&")),
        (p = this.b.pool + "&remove_from_pool=" + window.encodeURIComponent(p)),
        (this.u.zc = 2),
        (this.Ia = {
          tag: p,
          autoplay: !0,
          counter: !0,
          displayAs: this.b.displayAs,
          key: "undefined" != typeof this.b.key2 ? this.b.key2 : "",
          skip: !1,
          click: !0,
          time: 0,
          type: "pool",
          length: 30,
        }));
  }
  P = X.prototype;
  P.za = function () {
    this.a.log(this.c, "init");
    google.ima.settings.setVpaidMode(
      google.ima.ImaSdkSettings.VpaidMode.INSECURE
    );
    google.ima.settings.setNumRedirects(9);
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(!0);
    google.ima.settings.setPlayerVersion("5.0.0");
    null === this.ze &&
      (this.sk(this.nb, this.a.video),
      this.u.ya !== this.u.state.yb && this.mb.show());
    null === this.Qc && this.H();
    null === this.i && (this.i = {});
    this.i[google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED] = T(
      this.Qc,
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.om,
      this
    );
    this.i[google.ima.AdErrorEvent.Type.AD_ERROR] = T(
      this.Qc,
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.Ra,
      this
    );
    this.i.Xf = T(this.nb, "click", this.Xf, this);
    this.i.Id = T(this.a.controls.N, "click", this.Id, this);
    this.i.Xc = T(this.a.controls.wb, "click", this.Xc, this);
    this.i.Ve = T(this.a.view.Da, "click", this.Jd, this);
    this.i.Ic = T(this.a.view.kc, "click", this.Ic, this);
    this.ze.initialize();
    !this.Yd && this.b.autoplay
      ? (this.a.controls.ba(!0), this.Zc())
      : this.a.controls.aa.R() && (this.a.controls.ba(!0), this.Zc());
  };
  P.restore = function () {
    window.clearTimeout(this.md);
    this.md = null;
    this.nb.innerHTML = "";
    this.mb.m();
    this.v = this.Qc = this.ze = this.Mc = null;
    this.Ae = this.Yd = !1;
  };
  P.sk = function (a, b) {
    this.vk();
    this.ze = new google.ima.AdDisplayContainer(a, b);
  };
  P.H = function () {
    this.Qc = new google.ima.AdsLoader(this.ze);
  };
  P.oo = function (a, b, d) {
    this.v = a.getAdsManager(b, d);
  };
  P.Kl = function () {
    var a = new google.ima.AdsRenderingSettings();
    a.AUTO_SCALE = !0;
    a.restoreCustomPlaybackStateOnAdBreakComplete = !0;
    a.uiElements = [];
    a.useStyledNonLinearAds = !0;
    a.loadVideoTimeout = 4e3;
    a.autoAlign = !0;
    return a;
  };
  P.finish = function () {
    this.a.log(this.c, "finish");
    null !== this.v && this.v.destroy();
    this.Xe();
    this.restore();
    this.a.w.m(this.a.w.Na);
    this.a.w.m(this.a.w.Be);
    this.a.w.m(this.a.w.ma);
    this.a.w.m(this.a.w.kc);
    this.a.w.m(this.a.w.Da);
    if (!y(this.Ia) && B(this.Ia)) {
      if ("vast" == this.Ia.type)
        return this.Ae && this.u.Zb++, this.u.af(this.Ia);
      if ("pool" == this.Ia.type)
        return this.Ae && this.u.Zb++, this.u.Kf(this.Ia.tag, !0);
    }
    return this.u.Hc();
  };
  P.Bg = function () {
    this.a.log(this.c, "add events");
    for (var a in this.ea)
      this.i[this.ea[a]] = T(this.v, this.ea[a], this.Aj, this);
    this.i[google.ima.AdErrorEvent.Type.AD_ERROR] = T(
      this.v,
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.Ra,
      this
    );
    for (a in this.Og)
      this.i[this.Og[a]] = T(this.a.view.W, this.Og[a], this.Ue, this);
    this.i.Ue = T(window, "resize", this.Ue, this);
  };
  P.Xe = function () {
    this.a.log(this.c, "remove events");
    for (var a in this.ea)
      null != this.i[this.ea[a]] && U(this.v, this.ea[a], this.i[this.ea[a]]);
    null != this.i[google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED] &&
      U(
        this.Qc,
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        this.i[google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED]
      );
    null != this.i[google.ima.AdErrorEvent.Type.AD_ERROR] &&
      U(
        this.Qc,
        google.ima.AdErrorEvent.Type.AD_ERROR,
        this.i[google.ima.AdErrorEvent.Type.AD_ERROR]
      );
    null != this.i.Xf && U(this.nb, "click", this.i.Xf);
    null != this.i.Id && U(this.a.controls.N, "click", this.i.Id);
    null != this.i.Xc && U(this.a.controls.wb, "click", this.i.Xc);
    null != this.i.Ve && U(this.a.view.Da, "click", this.i.Ve);
    z(this.i.Ic) || U(this.a.view.kc, "click", this.i.Ic);
    null != this.i.Ue && U(window, "resize", this.Ue);
    this.i = null;
  };
  P.vk = function () {
    this.a.log(this.c, "set locale to pl");
    google.ima.settings.setLocale("pl");
  };
  P.co = function (a) {
    this.Oc = a;
    this.a.log(this.c, "set width to " + a + "px");
  };
  P.bo = function (a) {
    this.Nc = a;
    this.a.log(this.c, "set height to " + a + "px");
  };
  P.Zc = function (a) {
    this.a.log(this.c, "requestAd");
    var b = this;
    this.md = window.setTimeout(function () {
      b.zj(b.error.mf);
    }, 1e4);
    (this.u.ya !== this.u.state.yb || this.a.h.F()) &&
      this.a.controls.aa.show();
    this.Yd = !0;
    var d = new google.ima.AdsRequest();
    d.adTagUrl = this.b.tag;
    d.linearAdSlotWidth = this.Oc;
    d.linearAdSlotHeight = this.Nc;
    d.nonLinearAdSlotWidth = 10;
    d.nonLinearAdSlotHeight = 10;
    d.forceNonLinearFullSlot = !1;
    d.setAdWillAutoPlay(this.b.autoplay);
    "undefined" !== typeof a && a && d.setAdWillPlayMuted(!0);
    this.a.log(this.c, d);
    this.Qc.requestAds(d);
  };
  P.om = function (a) {
    this.a.log(this.c, "onAdsManagerLoaded");
    this.oo(a, this.a.video, this.Kl);
    this.Bg();
    this.a.fullScreen.Ea() &&
      ((this.Oc = window.screen.width), (this.Nc = window.screen.height));
    try {
      this.v.init(this.Oc, this.Nc, google.ima.ViewMode.NORMAL), this.Pd();
    } catch (b) {
      this.a.log(this.c, b), this.finish();
    }
  };
  P.Pd = function () {
    this.a.log(this.c, "startAd");
    if (!1 !== this.a.lc()) {
      var a = this.a.lc();
      this.a.controls.L(a);
    } else this.a.controls.qo();
    try {
      this.v.start();
    } catch (b) {
      this.a.log(this.c, b), this.finish();
    }
  };
  P.Aj = function (a) {
    this.a.log(this.c, "AdEvent", a.type);
    try {
      if ("allAdsCompleted" == a.type && !this.Ae)
        return this.zj(this.error.Td);
    } catch (b) {}
    this.Mc = a.getAd();
    switch (a.type) {
      case google.ima.AdEvent.Type.LOADED:
        this.mm();
        break;
      case google.ima.AdEvent.Type.STARTED:
        this.nm();
        break;
      case google.ima.AdEvent.Type.COMPLETE:
        this.Hc();
        break;
      case google.ima.AdEvent.Type.CLICK:
        try {
          this.ja("clicktracking");
        } catch (b) {}
        this.yj();
        break;
      case google.ima.AdEvent.Type.PAUSED:
        if (this.a.Ba && this.a.disabled)
          try {
            this.v.resume();
          } catch (b) {}
        else this.a.controls.qa(!0), (this.uf = !0);
        break;
      case google.ima.AdEvent.Type.RESUMED:
        (this.a.Ba && this.a.disabled) ||
          (this.a.controls.ba(!0), (this.uf = !1));
        break;
      case google.ima.AdEvent.Type.SKIPPED:
      case google.ima.AdEvent.Type.USER_CLOSE:
        this.fk();
    }
  };
  P.mm = function () {
    this.a.log(this.c, "onAdLoaded");
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (a) {}
    window.clearTimeout(this.md);
    this.md = null;
    this.Ib = this.Mc.getDuration();
    this.a.controls.Eb(0);
    this.a.controls.Ua(0);
    this.a.log(this.c, "adDuration: " + this.Ib);
    this.u.ya === this.u.state.yb && (this.a.video.paused || this.a.pause());
    if (this.b.autoplay && this.a.h.F()) {
      this.v.setVolume(0);
      this.a.video.muted = !0;
      this.a.Ab = !0;
      this.a.L(0, !0);
      this.a.controls.L(0, !0);
      try {
        this.a.view.Dd.style.display = "none";
      } catch (a) {}
    }
  };
  P.nm = function () {
    this.a.log(this.c, "onAdStarted");
    this.u.na("Startuje reklam\u0119");
    this.a.J = !0;
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (d) {}
    this.u.ya === this.u.state.yb &&
      (this.u.za(!0), this.a.controls.aa.show(), this.mb.show());
    this.ud && !this.a.ta() && this.a.w.kc.show();
    window.clearTimeout(this.md);
    this.md = null;
    this.Ae = this.u.gb = !0;
    this.a.w.xa.G("pb-run-ad") || this.a.w.xa.s("pb-run-ad");
    try {
      this.ja("impression");
    } catch (d) {}
    try {
      if (this.a.Sd) {
        var a = this;
        window.setTimeout(function () {
          a.a.Sd && a.ja("viewableImpression");
        }, 2e3);
      }
    } catch (d) {}
    if (this.a.cc)
      try {
        this.S(
          "https://g.cda.pl/g.php?pixel&vi=MTcwYjVmZjFjMTA0MzU5NDExMjcwNDQ3MWZjZDc4NzQ_Nzc4&pl=impression&ct=[timestamp]"
        );
      } catch (d) {}
    try {
      if (
        this.b.hasOwnProperty("counter") &&
        this.b.counter &&
        this.b.hasOwnProperty("key") &&
        this.b.hasOwnProperty("displayAs")
      ) {
        var b = "";
        z(this.Mc.g) ||
          y(this.Mc.g) ||
          (b =
            "" != this.Mc.g.clickThroughUrl
              ? this.Mc.g.clickThroughUrl
              : this.Mc.g.adQueryId + "/" + new Date().getTime());
        E(b) && (b = b.trim());
        "" != b &&
          null != b &&
          "undefined" != typeof b &&
          this.Xd(b, this.b.key, this.b.displayAs);
      }
    } catch (d) {
      this.a.log(this.c, d);
    }
    try {
      this.ja("start"), this.ja("creativeView");
    } catch (d) {}
    0 < this.Ib && this.a.controls.Ua(this.Ib);
    this.a.controls.ba();
    this.a.controls.H(!1);
    this.mb.show();
    this.Zb++;
    a = this;
    this.Zg = setInterval(function () {
      if (null != a.v && "undefined" !== typeof a.v.getRemainingTime) {
        var b = a.v.getRemainingTime();
        !isNaN(b) && 0 < b
          ? a.wk ||
            b == a.Ib ||
            ((a.Ib = b), a.a.controls.Ua(a.Ib), (a.wk = !0))
          : (b = 0);
      }
      b = a.Ib - b;
      var f = Math.floor((b / a.Ib) * 100);
      if (25 <= f && !1 === a.vc)
        try {
          a.ja("firstQuartile"), (a.vc = !0);
        } catch (g) {}
      else if (50 <= f && !1 === a.xc)
        try {
          a.ja("midpoint"), (a.xc = !0);
        } catch (g) {}
      else if (75 <= f && 0 == a.yc)
        try {
          a.ja("thirdQuartile"), (a.yc = !0);
        } catch (g) {}
      !isNaN(b) &&
        0 <= b &&
        (a.a.Ba
          ? (a.Na.innerHTML = "Reklama")
          : ((f = "Reklama: "),
            a.a.h.F() && (f = ""),
            (a.Na.innerHTML = f + "" + a.u.Zb + " z " + a.u.zc)),
        a.Na.show(),
        a.a.controls.Eb(b),
        (f = (100 / a.Ib) * b),
        a.a.controls.ob.$a(f + "%"),
        0 < a.Y &&
          !0 === a.V &&
          !a.ed().R() &&
          !1 === a.Nd &&
          ((a.Od = !1),
          a.a.view.Da.show(),
          a.a.view.Da.ha(
            '<span class="pb-skip-body">Pomi\u0144 reklam\u0119 za ' +
              a.Y +
              "</span>"
          ),
          (a.a.view.Da.style.opacity = "0.5"),
          (b = Math.ceil(a.Y - b)),
          0 >= b
            ? (a.a.view.Da.ha(
                '<span class="pb-skip-body">Pomi\u0144 reklam\u0119</span>'
              ),
              (a.a.view.Da.style.opacity = "1"),
              (a.Od = !0))
            : a.a.view.Da.ha(
                '<span class="pb-skip-body">Pomi\u0144 reklam\u0119 za ' +
                  b +
                  "</span>"
              )));
    }, 100);
  };
  P.Hc = function () {
    this.a.log(this.c, "onAdComplete");
    this.u.na("Koniec reklamy");
    this.u.Pc++;
    this.a.controls.currentTime.innerHTML = this.a.controls.qc(this.Ib);
    this.a.controls.ob.$a("100%");
    this.Na.m();
    clearInterval(this.Zg);
    try {
      this.ja("complete");
    } catch (a) {}
    return this.finish();
  };
  P.yj = function () {
    this.a.log(this.c, "onAdClick");
    if (this.a.Ba) return !1;
  };
  P.Ra = function (a) {
    var b = a.getError();
    b.getInnerError();
    var d = b.getErrorCode();
    this.a.log(this.c, "AdError", a.getError().toString());
    this.a.log(this.c, "AdError", "ErrorCode: " + b.getErrorCode());
    if (-1 < a.getError().toString().indexOf("AdError 1205") && !1 === this.xi)
      (this.xi = !0), this.Zc(!0);
    else {
      switch (d) {
        case google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT:
          a = this.error.mf;
          break;
        case google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE:
          a = this.error.Td;
          break;
        case google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR:
          a = this.error.pg;
          break;
        case google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION:
          a = this.error.ti;
          break;
        case google.ima.AdError.ErrorCode.VAST_WRAPPER_ERROR:
          a = this.error.ui;
          break;
        case google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE:
          a = this.error.mi;
          break;
        default:
          a = this.error.UNKNOWN_ERROR;
      }
      null !== this.v && this.v.destroy();
      this.Xe();
      this.restore();
      return this.u.Ra(a);
    }
  };
  P.zj = function (a) {
    null !== this.v && this.v.destroy();
    this.Xe();
    this.restore();
    return this.u.Ra(a);
  };
  P.pe = function () {
    null !== this.v && this.a.controls.ba(!0);
  };
  P.oc = function () {
    null !== this.v &&
      ((this.a.Ba && this.a.disabled) ||
        (this.a.controls.qa(!0), this.v.pause()),
      this.a.log(this.c, "pause ad"));
  };
  P.ag = function () {
    null !== this.v &&
      ((this.a.Ba && this.a.disabled) ||
        (this.a.controls.ba(!0), this.a.controls.aa.m(), this.v.resume()),
      this.a.log(this.c, "resume ad"));
  };
  P.fk = function () {
    this.a.log(this.c, "onSkipped");
    this.u.na("Reklama przewini\u0119ta");
    this.u.Pc++;
    this.a.controls.currentTime.innerHTML = this.a.controls.qc(this.Ib);
    this.a.controls.ob.$a("100%");
    this.Na.m();
    clearInterval(this.Zg);
    this.finish();
  };
  P.Ue = function () {
    var a = this;
    window.setTimeout(function () {
      a.Oc = a.a.video.ac();
      a.Nc = a.a.video.Vc();
      a.a.controls.Ea &&
        ((a.Oc = window.screen.width), (a.Nc = window.screen.height));
      a.a.log(a.c, "resize", "new width: " + a.Oc);
      a.a.log(a.c, "resize", "new height: " + a.Nc);
      null !== a.v && a.v.resize(a.Oc, a.Nc, google.ima.ViewMode.NORMAL);
    }, 100);
  };
  P.Xf = function () {
    this.u.wf = !0;
    if (!0 === this.b.autoplay || this.Yd) return this.yj();
    this.a.controls.ba(!0);
    this.Zc();
  };
  P.Id = function () {
    this.u.wf = !0;
    !0 === this.b.autoplay || this.Yd
      ? !1 === this.uf
        ? this.oc()
        : this.ag()
      : (this.a.controls.ba(!0), this.Zc());
  };
  P.Xc = function () {
    this.u.wf = !0;
    !0 === this.b.autoplay || this.Yd
      ? this.a.disabled || (!1 === this.uf ? this.oc() : this.ag())
      : (this.a.controls.ba(!0), this.Zc());
  };
  P.L = function (a) {
    this.a.log(this.c, "setVolume", a);
    null !== this.v &&
      ((a = Number(a)),
      !isNaN(a) &&
        0 <= a &&
        (0 === a
          ? this.v.setVolume(0)
          : this.v.setVolume((a / 100).toFixed(2))));
  };
  P.ja = function (a) {
    this.a.log(this.c, "tracking", a);
    if ("impression" == a)
      for (var b = 0; b < this.Nb.length; b++) this.S(this.Nb[b]);
    else if ("viewableImpression" == a)
      for (b = 0; b < this.sc.length; b++) this.S(this.sc[b]);
    else if ("clicktracking" == a)
      for (b = 0; b < this.Tc.length; b++) this.S(this.Tc[b]);
    else
      for (var d in this.eb)
        if (a == d)
          for (b = 0; b < this.eb[a].length; b++) this.S(this.eb[a][b]);
  };
  P.S = function (a) {
    this.a.log(this.c, "sendPixel", a);
    if (a) {
      var b = new window.Image(1, 1);
      b.onload = b.onerror = function () {
        delete b;
      };
      b.src = a;
    }
  };
  P.Xd = function (a, b, d) {
    this.a.log(this.c, "adHit", arguments);
    if (null !== this.a.X && !1 === this.Ud) {
      var f = this;
      try {
        window[this.a.X.client].zliczReklame(a, b, d, {
          success: function (a) {
            f.Ud = !0;
            f.a.log(f.c, "adHit", "response: " + a);
          },
          error: function (a) {
            f.a.log(f.c, "adHit", "erorr: " + a);
          },
        });
      } catch (g) {
        f.a.log(f.c, "adHit", "erorr: " + g);
      }
    }
  };
  P.Jd = function () {
    if (this.Od) {
      try {
        this.ja("skip");
      } catch (a) {
        this.a.log(this.c, a);
      }
      clearTimeout(this.Fb);
      this.Fb = null;
      window.clearInterval(this.qb);
      this.qb = null;
      this.Nd = !1;
      this.ed().m();
      this.a.view.Da.m();
      this.qf = !0;
      return this.fk();
    }
  };
  P.ed = function () {
    return this.a.view.W.querySelector(".pb-ad-close-body");
  };
  P.Ic = function () {
    return window.open(
      "https://premium.cda.pl/rejestracja?cd2_sid=1&cd2_n=baner-wideoadpremium&cd2_hash=40fc7a5638fc18189a3a00d9892e30fde92da781",
      "_blank"
    );
  };
  function W(a, b, d) {
    if (0 >= arguments.length)
      throw Error("Failed initialize VAST advertisement.");
    if (!B(a) || y(a)) throw new TypeError("Player reference is NULL.");
    if (!B(b) || y(b)) throw new TypeError("Ads Manager refrence is NULL.");
    if (z(d) || y(d)) return this.finish();
    this.c = "cda.Player.Ads.Vast";
    this.eb = {
      creativeView: [],
      start: [],
      firstQuartile: [],
      midpoint: [],
      thirdQuartile: [],
      complete: [],
      skip: [],
      mute: [],
      unmute: [],
      pause: [],
      resume: [],
      video5sec: [],
      video10sec: [],
      video15sec: [],
      video20sec: [],
      video25sec: [],
      video30sec: [],
    };
    this.Nb = [];
    this.sc = [];
    this.Ge = "";
    this.Tc = [];
    this.Oe = "";
    this.U = 0;
    this.V = !1;
    this.ca = 5;
    this.qb = this.Fb = null;
    this.Nd = !1;
    this.Y = 5;
    this.Od = !0;
    this.autoplay = !1;
    this.i = {};
    this.$d = 0;
    this.b = d;
    this.Ia = null;
    this.qf =
      this.Ud =
      this.sg =
      this.zg =
      this.yg =
      this.xg =
      this.wg =
      this.vg =
      this.Ag =
      this.yc =
      this.xc =
      this.vc =
      this.Vd =
        !1;
    this.lb = 0;
    this.ab = !1;
    this.Aa = null;
    this.Rd = this.ra = !1;
    this.duration = this.currentTime = -1;
    this.a = a;
    this.u = b;
    this.event = this.video = null;
    this.Ka =
      "click timeupdate error abort ended pause play playing loadstart load loadeddata loadedmetadata progress waiting canplay canplaythrough volumechange".split(
        " "
      );
    this.state = null;
    this.Nn = "//static.cda.pl/v001/img/mobile/poster16x9.png";
    this.mb = this.a.view.mb;
    this.nb = this.a.view.nb;
    this.w = this.a.view;
    this.event = new R();
    this.error = Z;
    this.ij = !1;
    this.b.hasOwnProperty("autoplay") && (this.autoplay = !!this.b.autoplay);
    this.b.hasOwnProperty("skip") && (this.V = !!this.b.skip);
    this.V = !1;
    this.a.jb() && ((this.V = !0), (this.ca = 5));
    try {
      -1 < this.b.tag.indexOf("${GDPR}") &&
        (this.b.tag = this.b.tag.replace("${GDPR}", this.u.jd));
      -1 < this.b.tag.indexOf("${GDPR_CONSENT_755}") &&
        (this.b.tag = this.b.tag.replace("${GDPR_CONSENT_755}", this.u.ic));
      -1 < this.b.tag.indexOf("${GDPR_CONSENT_772}") &&
        (this.b.tag = this.b.tag.replace("${GDPR_CONSENT_772}", this.u.ic));
      -1 < this.b.tag.indexOf("${GDPR_CONSENT}") &&
        (this.b.tag = this.b.tag.replace("${GDPR_CONSENT}", this.u.ic));
      if (-1 == this.b.tag.indexOf("gdpr_consent=")) {
        var f = -1 < this.b.tag.indexOf("?") ? "&" : "?";
        this.b.tag += f + "gdpr_consent=" + this.u.ic;
      }
      -1 == this.b.tag.indexOf("gdpr=") &&
        ((f = -1 < this.b.tag.indexOf("?") ? "&" : "?"),
        (this.b.tag += f + "gdpr=" + this.u.jd));
    } catch (g) {}
    if (
      -1 <
        this.b.tag.indexOf(
          "MjA_MTI3M2FjYjVmMzI3YTljMzI1Y2NmYWZkMTIyM2RhOGE_NjIz"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZGMyN2E2NmFhYjZhNjE3YTE1N2E0ZTgzODk2ZTVlNWI_NjE3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Y2YyYmM1ZmJiOTJkNzU1ZDgwMmJmYzgxOGNmNzZiMjQ_NjE0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YTk1ZjkwZGViMmZkZDc4YmE4MzhiM2U1MmY0NjhkODY_NjA4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDk1ODNhM2U4MDdmNjJjODBhMWIxMTAzNDk3ZjdkNTE_NjMy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "NzY_MGI4MThkZjU2MmEwM2Y2MzY4NDllM2RkYjhjYzM1MDQ_NjU1"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MjA_YmY3OGEwODRkOTNkNDAwNTI4YjE5ZDM1MDdmNWY2M2E_NjAw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_OGJkM2RkZTI5YjIxNjE5ZDYxZGUzYjU3ZDUwOGVhYzk_NTUy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MzY1ZmIzZGNhMzhhZmY0ZmI2NWE2NTdjMmQ0YWQzMDI_NTQ5"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_M2YzNTJmZDMwOGVhNDgyMjllZmFlNjNlOTQ2OThmZTY_NTQ2"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MjRkZDcxOGQ4MmFhYTQ0NWU0OGFhYmVjMjM1ZGJlM2Q_NTQz"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NTNhZjNmY2NiYmE5ZTVmZDEwY2FlYTQyNWYxYmM3MzI_NTI4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_OGIyMWVkNGMwNzhhZjA0YTc2Y2Y1N2EzYmEwYjI3Y2Y_NTI1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MWFhOWQyYzM3NWQyZWM0N2ZlODkzNDE0ZDExZTFiOGE_NTIy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NzY0ZWYwNjRjNzJhZDU0MWYzYWI5NDYxM2Q4YzNmMmU_NDkz"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_N2NkZjEzZDIwNDliNWY3MDc1YzQzYmM3ZmViYTc0NTM_NDg0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Njc1MTI4Y2NkNGIxMTFiNGQxNjg5NGFjOTJkZjUxNDM_MzY5"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NTI5NzU2NDQ2YzEwY2Y1OGZlZmRlNjU1MzEzNDQzODc_NjI2"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZDY5ODE4MjM2MmEzMjEwMzIwOTU3YzJkMTYzMDU0ZmU_NjEx"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZGNiMTBiMjJhOTdjMDlhY2I2YTBlNDUxMWM4MGRiODc_NjM3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Nzc3ZDhkYzYyYjUwNzQ4ZmRiMmVhNDgxOWJiOWYwMTk_NjM0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NDg0ZGE4ZTI5MWRlMTdiY2IyNGU3YzE3N2Q1ODZlNDA_NjQy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NDhmZDZlY2U2YTIwZWExMTlkMjAzZDJkM2IzMGZkYzU_NjY0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YjY5NGNjZmJjN2NmMDJmMDU2YzkyNmY3OGE1YTE1MWY_Njcw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_N2Q2MjY3ZDQwZmQzNDVkZDhlZDM5YzNhNmQ0YWI0MGE_NjY3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YTk4NGJhMGMxM2RmOThmZDQ0MjAxNzMyOWM1ODlkYTA_Njk0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ODljOGQ2MzdkZWQxOWRiZTlmNmIxYTc0OGUyODViOTM_Njkx"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MmNjNTU5NDc5NDc0ZDU4NzAyNTFmYmVlYTQ1ZDJiNjc_Njg4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NTQzOGNiNDViZmY5NjVjZTk4MTFlMzdkZWU4NWE0YzI_Njg1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_N2NmNWZiMzU0OGYyZTNjODQ4NTI3NGQ4YmU4MmY3YTA_Njgy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZDhiMDVhYzRkMGJjNTFjZTQyZGU4Y2ZhNjNmZWM5YWQ_NzIw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_N2QxZTE0NTg4NTdmNmM5MTY3NDdkOTdmNmViMzA5NTY_NzE3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZDc0MDdlMmQ5NDBiNzZiYjg2MjE4ZjgxMTgxOGYwMDc_NzMw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZTY5YWQ3NzljMzMzMjI4OGQ0NzIzZGM1ZjUwZjRhMDg_NzI3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NTY1ZWFkMjJjNDFiMDM2MGYzNGE3MzVhYjEzNDY3M2Q_ODA1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZTZhNzM4NmI4YTk1ZWMwZWM0NGYxYjg5ZTY0MGUwYzU_ODE0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MjMxYTdmYTg2ZDFmYTJkNTE2Yjc5MDYzZGViMGNhNDg_ODE3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YjYzOTQ5M2Q0NDhkZmY3NGNmOTVkZjhmYWYzMzEyODg_ODQx"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MWRkNTQyMWM3NWZiZGQyMDJkYzRmZGVhNzgwNDYxNWE_ODY4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDdkMzkxM2RlNTQyODBmMzM3NWIyNmM2NjY1ZDNlYWI_ODY1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NDIzNTk0OGM1NjM2MzExM2UzZGNkMjUzNGZlMGYxOTk_ODYy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YmI5ZWM3MDRmM2YxYWQxYzdmN2YyMTRhNjA1NDZlYWU_ODU5"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YTU4YmQ2NjI0MzEwZWVmNTIwM2I0ODFkYTdmZDAxMmQ_OTU1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YTQwNjQ1YWYwNTA4ZDE3OGRlYThjYWU2ZjU0ZTM4YmY_OTUy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_M2MxZjhlNzA4YWY1MjA3NzYwNjE2YzJjZjJkMmI2NjQ_OTkx"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_OTBmNmQ5ODA1MjQ3ZTYxNzRiNDA2Mjk3YTNiNTUwZDE_OTg4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Y2RmM2M2ZWYyNWZlMDVmNTBhNzgzODQ1ZGQxM2ZkZDU_OTg1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDIzYjAwODgzMDdhNmVkZDg2NDZkMjlmYjM1OWVhNTE_MTAxOQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDRjN2Y5MGVkNTA5N2I4OGRmMDgwMmE2NTIyNGM0Njk_MTAzNA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NGNkZmZhYjFmMzIxMjM3MjdiNzM0MDQyNGFmYmEyNWQ_MTA3Nw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NzM4ODI4ZGNjY2JjOTZiOGQwYTc4ZWY3ZjY5OWY3Zjc_MTA3NA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZTZiMDE1YjA1OTliMTJkYjE3ZGE2YWRhNmNkZmVjZTQ_MTA4Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NDliODM4ODBmZjY2ZTliNDYwYThkMWQwNjM4ZGUzMTk_MTExOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NGU3NTJmNTM3M2I1ZTQ0MDhiN2MyNjdmOGJlZjRiYTA_MTEyNA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_OWJhZWJjNjdiYjVhYTBkNzMyZjhhMTUyY2MxNDJhN2I_MTEyNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YmMyYmIxMWVhNWQ5YjkxYzE5ZjczNDk5NmU3YmQ1ZmI_MTEyOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MjM1Zjc1MTAxZDZjMzU3ZDI4NDYxMTg5MTI4NTYyMDU_MTEzMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZTI2YWQxOTRmZjY4YmJjZTBlYjk3MDE4MDRjODE4NDA_MTEzNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Y2VmOWVmY2VhNWM0NzZhZjE5NjE1YzQxMzI2ZDg2ZGY_MTM2NQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ODRmOWEwN2ViOTcwYmE1Mzg1YjQyMmNmNWMyOTIzY2Y_MTM2Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NWYzMjY4OWYyYjI2OGFkZWY4NDNkMDQwMmY4YWNhOTE_MTM1OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDYwYTEyMmU5MmU1YzdhNTg0ZWU5MDNmNDcyZGQzNDg_MTM1Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YmFmMzI3N2EyMDYyZjMwNWU0ZDE5YzhlMzhhMzdhZjY_MTM1Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MzkzNDg5OWI5MGQ1YTk4NTBlNjg5Y2I2M2I3MWUwNTc_MTQ4Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YzQ0MzgzNGNhMDIxMjVhMGExNWM2YTBiMjRkZTI4ZWQ_MTk0Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YjM1YWIxMWNkZDk5NTcwYTcyYWYyOWM5NjcwZmM1Mzk_MTkzOQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NjFlYjM3OWIxNDRjY2U5MmE1YTAzYzY0YmQ0Zjc4ZGE_MTgxNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NzYwZDhjMzU1ZjRjNWExYWRjMWM3MzQ3MzkzY2YxMzQ_MTY5MA"
        )
    )
      (this.V = !0), (this.ca = 5);
    this.ud = !1;
    y(this.a.ib("vast_test")) && (this.ud = !0);
    -1 <
      this.b.tag.indexOf(
        "MjYw_MzljNjA0NDkwMjc3M2ZjZDZmZjg4YTE5OTMyZmNkNTY_MzYzOA"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZGZlYjIyYjVmYzk0MmI5ZThlMmVhMTE2Yzg2ZWQ5YWE_MjkzOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Y2VlNTczYzAyYTJjMjdmNTUzNjJiNTJiMGJjMzZkZjE_MjkzNQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_NGRiMGI0YWFiZGQ5NTIxZDExZDkxYWZjYTQzNTIyM2E_MzAxOQ"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MjA_NjNkNDgyZjU4YTJhZGE5ZTY2NGM4MTc4ZDQyNDk2Zjk_MzEwMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDZiYWRiODMyODhiMDkxMWE5YzM2MGJkNDBiYmMwNGM_MzA5MQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_NjkwOWIyOTVkOTkyNzVhODI1ODEyMmRmYzA0YmUwOWU_MzA4OA"
        )
    )
      (this.V = !0), (this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTcwZTkwN2EyMzM4NDQzMTYyN2M4Nzg5MzIwZDhkOGE_MzAyMg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTcwZTkwN2EyMzM4NDQzMTYyN2M4Nzg5MzIwZDhkOGE_MzAyMg"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjIzMjA0ZDU2OTA0Mzg0YjE3Y2I5NGY4ZmE2MTdiNzY_MzQ5MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjI2ZjFiNjQxOWJkY2Q0ZTY1NzZhNWIyZDRhNDE2YzE_MzQ5Mw"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_YmZjYjRkNDJiOTJmYTY2MWMxOTNmNmNmMWYyZWZjMzE_MzQ4Nw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZWRkOGY0OTFhMDJkZGJhY2VhZDQ1MGI2ZjViOGRiYmQ_MzQ5Ng"
        )
    )
      (this.V = !0), (this.Y = this.ca = 15);
    -1 <
      this.b.tag.indexOf(
        "MTk2_Mzc3YTc2ZjI2YmUzNGMyNTEwMDJkMTVjYTYxYzE5YjY_MjY0NA"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MTk2_ZmE5ZTY1NGFhMzQ4MTRiMGIwZTg5OTg5NzA3Y2MwOGQ_Mzk0MA"
      ) && ((this.V = !0), (this.Y = this.ca = 7));
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODI2ZWM2M2U2ZTI4MzI3MGJmZDFhY2QwMjhjOTU1ZmI_MjU2Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Njk3OGNlNDFmYmJkMWIxY2JkMzQxZGJmNWEyNTlkYzk_Mjc3MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YmQxOTdhYzQ0MjA2MDVlNTYwODM2ZTJiMzI0N2EyYTI_Mjc4OA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MTA5YmJlYTg2YWRhOTY0YjIyNTgzZmU2MTc0YjQxYmI_Mjc5MQ"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MjY2_ZGYxMmVkMzQzZGE1MDNkNDNlZjBkMjMzY2ZjOTJlMDQ_MzgyMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_MWEyZWRkMDgxYzBjZjZkZmFiNjMwMWVlN2I5OThkOWU_MzgyMw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_ODFlMTI2ZDQ4ODYxZWMxNGJlZjU4YjA2ZmJhYWI5MjY_MzgyNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_OGYzNGY2ZWE2ZjYzMjYzYzgxYTcyZjU2ZjgzYzdiYjA_MzgyOQ"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZGJjMTMxZDdmMjQwMTc5NTZiZmE5OGU4MDJkYTZiMzg_MzczNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MGUzYmQ1ZWYyMDBjMTFlMmZmMTY1NzE1ZjhmZTEzYTY_MzczMw"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTNhZjY5OTk3MGU2YjZhYzc2NWMxZWRjNmRlYTIzYzU_MzIyMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjMyNmVmZTUzODRiM2E3MWFmNmQ5Mjk0YTAyZWU1ZTk_MzI2Mg"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_MTQ3ZjcyNzRmMDA5NDA4YzE1YjdkZDQ3ZmM2M2UwOTE_MzQ3OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZmI2YWEzZDQwZTY0YzlhMTM0YWUzNGQ4ZjdiZDFjZDQ_MzQ3Ng"
        )
    )
      (this.V = !0), (this.Y = this.ca = 15);
    -1 <
      this.b.tag.indexOf(
        "MTk2_OWI3ZGZlMDMxZjU4NTI4OTcyMDYwYTkyNjhjOTk2YjU_MzQ3Mw"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MTk2_Y2FiNjZhMjQ1MWU0ODBkZjEyYzBhNDE1ZTZiYTQ0MDI_Mzk2MQ"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MTk2_YTU3Mjg2NTk1MjU3YWYwNzY2ZTYyZGJmZmI4ZjkwMGY_MzU1OQ"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODc3MzBiMjM5NWE1N2JhNjZmN2IwNWI1ZTdmMTI2MDQ_Mjg2Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YzBmODkzNmNkYTBkNzljYWE2ODVmN2NlZTJkODE1NTM_Mjg2Ng"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    -1 <
      this.b.tag.indexOf(
        "MTk2_ZTY4YmEyY2RhN2NiYjI3NzkzYTA3ZmVmNDQ2YjY4MTE_MjgyNA"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MTk2_ZmJmZjgyY2I4N2MxMjgyMjEyNTY0YzM1OWM1YTY2NmM_MjgyNw"
      ) && ((this.V = !0), (this.Y = this.ca = 10));
    -1 <
      this.b.tag.indexOf(
        "MTk2_MWRmY2ExZWQ4YWYyMGNiYjM1MTE1ZWQ1ZDg1Njc5YmQ_MjkzMg"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    if (
      -1 <
        this.b.tag.indexOf(
          "MTk2_YTQ1OTk2MmEwNTk0NzVjMjQ2M2Y5MmQwOGFiYjA5ZmI_MzE4NA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MzAxYWRlM2Q4MDUyNGZlNWQ2OGU2N2U0MDE3NzU4OTE_MzE4MQ"
        )
    )
      (this.V = !0), (this.Y = this.ca = 5);
    -1 <
      this.b.tag.indexOf(
        "MTk2_M2JjOGI5Y2I3Mjk0YWZiMjhjOTZhNTFiNWQ2OWZiYzA_MzI2OA"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MjA_Y2U5ODIxYWI5MmQ3ZGMyZGQzNGEzY2E3MmQyZDlhOTM_MzUzNQ"
      ) && ((this.V = !0), (this.Y = this.ca = 10));
    -1 <
      this.b.tag.indexOf(
        "MjA_NjZjMTkyNGE3ZjE2NzRmY2Y4MDA2YjE4YjZhNmUzNjE_MzU0MQ"
      ) && ((this.V = !0), (this.Y = this.ca = 10));
    -1 <
      this.b.tag.indexOf(
        "MjA_OTlmYjJhMzdmZGJiNTJmMGI4NmRlMDM2OWVjOWNhM2Y_MzYwMQ"
      ) && ((this.V = !0), (this.Y = this.ca = 15));
    -1 <
      this.b.tag.indexOf(
        "MjA_OWVkODllZTc0ZTU1OWMzYzQwZDFlOGExYmI4MzI3YjQ_MzY1OQ"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MjY2_ZDRiM2Q0NzJjMjYwNzIxZGQwZjk4MDlmNjhhMDkzMjU_MzY0Nw"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MjY2_MTk4MGI2OTc1MzRhNjAyYjVhN2RmZTM3ZjAzNzkwMjA_MzY1MA"
      ) && ((this.V = !0), (this.Y = this.ca = 15));
    -1 <
      this.b.tag.indexOf(
        "MjU2_YzBiMWNlMTZhNjkzYjVjOTcxMWZiN2I1ZWM0MjQ0YTc_MzcyNw"
      ) && ((this.V = !0), (this.Y = this.ca = 5));
    -1 <
      this.b.tag.indexOf(
        "MjA_ZDNhNmI2NjMwZTRhMzgxZTMxYWRhMTc3MTBiZTNmZTY_MzgwOA"
      ) && (this.V = !1);
    -1 <
      this.b.tag.indexOf(
        "MjA_MWNkM2JmYThmYjFkYWFhZDViOGFlNTk0NGM3YzRmZGE_Mzg1Ng"
      ) && ((this.V = !0), (this.Y = this.ca = 20));
    if (
      -1 <
      this.b.tag.indexOf(
        "MjIw_OWJmZjkxNjA4M2IwNDc4MjJjY2YwMWQyYzg5MjRjOWM_MjgxOA"
      )
    ) {
      this.V = !0;
      this.Y = this.ca = 15;
      try {
        this.V = !1;
      } catch (g) {}
    }
    -1 < this.b.tag.indexOf("g_zaslepka_dzieci") &&
      "plain" != this.a.f.type &&
      (this.b.tag =
        -1 < this.b.tag.indexOf("?")
          ? this.b.tag + "&partner"
          : this.b.tag + "?partner");
    this.b.tag &&
      ((f = new URL(this.b.tag)),
      f.searchParams.get("cpv") &&
        ((this.V = !0),
        (this.ca = parseInt(f.searchParams.get("cpv"))),
        (this.Y = parseInt(f.searchParams.get("cpv"))),
        (this.ij = !0)),
      f.searchParams.get("skip") &&
        ((this.V = !0),
        (this.ca = parseInt(f.searchParams.get("skip"))),
        (this.Y = parseInt(f.searchParams.get("skip")))));
    this.a.Ba && (this.V = !1);
    try {
      -1 < window.location.href.indexOf("skipoff=1") && (this.V = !1);
    } catch (g) {}
    this.ud = f = -1 < this.b.tag.indexOf("MjA_");
    this.a.Ba && 5 > this.u.Pc && !this.a.jb()
      ? ((f = new URLSearchParams(this.b.tag)),
        f.set("ts", "[timestamp]"),
        (f = window.decodeURIComponent(f.toString())),
        (f = f.replace("ads=&", "ads&")),
        (f = this.b.pool + "&remove_from_pool=" + window.encodeURIComponent(f)),
        (this.u.zc = 6),
        (this.Ia = {
          tag: f,
          autoplay: !0,
          counter: !0,
          displayAs: this.b.displayAs,
          key: "",
          skip: !1,
          click: !0,
          time: 0,
          type: "pool",
          length: 15,
        }))
      : this.a.Ba ||
        this.a.jb() ||
        this.a.ta() ||
        (this.a.h.F() && (!this.a.h.F() || "midrol" == this.b.displayAs)) ||
        this.a.h.Ja() ||
        ("prerol" != this.b.displayAs &&
          "postrol" != this.b.displayAs &&
          "midrol" != this.b.displayAs) ||
        f ||
        !y(this.a.ib("vast_test")) ||
        ("plain" == this.a.f.type &&
          (z(this.a.f.video_promoted) || !this.a.f.video_promoted)) ||
        !(300 <= this.a.f.duration || "postrol" == this.b.displayAs) ||
        0 != this.u.Pc ||
        (-1 <
          this.b.tag.indexOf(
            "MjA_ZDMwYzA2NTg5NTBiNmU0MzMyMDU4MjQ4OGZhZjQ0MjQ_MjM5NQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_N2JhODc3Y2U3NTJkNTI4Yjc4NmZiMTdjYzFlNDJhYWU_MTIyMQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MGYzNWQyMzlhN2U0NThlMGQ3OTNiYTMwYzQ3ZmU3NmI_MjUyOQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjcxYjg4ODFlYmUwNmYwYWM0ZWVhZWYzZGRlMWExYjY_MjUzOQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTg0ZmRmMDg5ZjM4MjI2NzkyZWUzODMwYzExNmNjZjc_MjY0MQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_Y2I2YjBkNjVkZTA5M2U1NGQ3ZTY2YjkwYTQ1NTI1ZWY_MzIxNw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MGE0OTJhMzc0YjZmOGQ5YjRlNWE1MTc4OTkwMDk2Y2Y_MzIxNA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTQ1MDkxYmJiZjgxOGFkNDdlNGQzZTgwMWIxMjc1ZDE_MzE2Ng"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_NjNkNDgyZjU4YTJhZGE5ZTY2NGM4MTc4ZDQyNDk2Zjk_MzEwMA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_NzFlYzcyMDJmYzlhODE0NzVmNTM2NWQ3MzJiZjBmMjc_MzA5Nw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YTc4YzZhOGIwN2U0ZjVjZTBkOGNlNTQ1ZWJkMGZhMTc_MzA5NA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_MDZiYWRiODMyODhiMDkxMWE5YzM2MGJkNDBiYmMwNGM_MzA5MQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YzU3ZmMyNDcxODk0ZTdhY2JkNGE5ZDEyOTllMWQ0N2I_MzA0Mw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjE1NTVlOGZhY2YyYTAxZmVjYWJiNDQ1NzYzZTExOTM_MzI0NA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_ZWU3YjlhZWMyMmVmYzk1MDdiY2E2NDJhZTM1YmZiM2Q_MzI0Nw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_OTQyM2VhYzkyZWJmNGY5MWJiNDE1ZTBhNGJjMTFmM2U_MzI1MA"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YmMwYTA5NzAyYTA4MTQwMzMzYTMzNWFjYWI5MjM3MTA_MzI1Mw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YjEyNWI0N2Y1NzE4M2Q0ZTAxYWQ3MmI3OWEzMDc5ODM_MzI1OQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjA_YzliYjJkMmVhMWRlNmU5Y2Q2NDA0YjU1ZjJlMDgzNTg_MzI1Ng"
          )
          ? (this.u.zc = 1)
          : -1 < this.b.tag.indexOf("g_zaslepka_dzieci.php")
          ? ((this.u.zc = 2),
            (this.Ia = {
              tag: this.b.tag,
              autoplay: !0,
              counter: !0,
              displayAs: this.b.displayAs,
              key: "",
              skip: !1,
              click: !0,
              time: 0,
              type: "vast",
              length: 15,
            }))
          : "undefined" !== typeof this.b.pool &&
            ((f = new URLSearchParams(this.b.tag)),
            f.set("ts", "[timestamp]"),
            (f = window.decodeURIComponent(f.toString())),
            (f = f.replace("ads=&", "ads&")),
            (f =
              this.b.pool +
              "&remove_from_pool=" +
              window.encodeURIComponent(f)),
            (this.u.zc = 2),
            (this.Ia = {
              tag: f,
              autoplay: !0,
              counter: !0,
              displayAs: this.b.displayAs,
              key: "undefined" != typeof this.b.key2 ? this.b.key2 : "",
              skip: !1,
              click: !0,
              time: 0,
              type: "pool",
              length: 15,
            })));
    this.a.log(this.c, this.b);
  }
  P = W.prototype = {};
  P.Zc = function (a, b) {
    this.a.log(this.c, "requestAd");
    try {
      this.yf(
        this.b.tag,
        "GET",
        !0,
        !0,
        "xml",
        function (d) {
          !y(d) && d ? a(d) : b();
        }.bind(this)
      );
    } catch (d) {
      this.a.log(this.c, "requestAd error", d);
    }
  };
  P.$o = function () {
    return this.u.Np();
  };
  P.Sl = function (a) {
    this.a.log(this.c, "initAd");
    this.ik(a);
  };
  P.finish = function () {
    this.a.log(this.c, "finish");
    this.u.gb = !1;
    this.Ih();
    window.clearTimeout(this.Fb);
    this.Fb = null;
    window.clearInterval(this.qb);
    this.qb = null;
    window.clearTimeout(this.Aa);
    this.Aa = null;
    this.a.w.m(this.a.w.Na);
    this.a.w.m(this.a.w.Be);
    this.a.w.m(this.a.w.ma);
    this.a.w.m(this.a.w.kc);
    this.a.w.m(this.a.w.Da);
    this.a.h.F() || (this.video = null);
    return this.u.Ga();
  };
  P.fg = function (a) {
    a && -1 < a.indexOf(".mp4")
      ? this.video.canPlayType("video/mp4")
        ? ((this.video.src = a), this.video.setAttribute("src", a))
        : this.finish()
      : this.finish();
  };
  P.Qh = function (a) {
    y(this.video) || (this.video.poster = a);
  };
  P.l = function () {
    return this.video.currentTime || 0;
  };
  P.Eb = function (a) {
    if (G(a) || H(a)) (this.currentTime = a), (this.video.currentTime = a);
  };
  P.K = function () {
    return this.video.duration || 0;
  };
  P.play = function () {
    this.a.log(this.c, "play");
    y(this.video) ||
      (0 < this.l()
        ? this.resume()
        : (this.u.ya === this.u.state.yb && this.u.za(!0),
          this.a.controls.H(!0),
          this.ra || this.ab || this.video.load(),
          this.Qb()));
  };
  P.Dh = function (a) {
    "undefined" !== a &&
      ((a = a.toString()),
      -1 <
      a.indexOf(
        "play() failed because the user didn't interact with the document first"
      )
        ? this.a.log(
            this.c,
            "video promise - play() failed because the user didn't interact with the document first"
          )
        : this.a.log(this.c, a));
    A(window.videoAdPlayError) && window.videoAdPlayError(this.a.id);
    (0 < this.l() &&
      !this.video.paused &&
      !this.video.ended &&
      2 < this.video.readyState) ||
      (this.a.log(this.c, "video promise error"),
      this.a.controls.qa(!0),
      this.a.controls.H(!1),
      this.u.ya == this.u.state.gc && 2 >= this.lb && this.Zd());
  };
  P.Qb = function () {
    var a = this.video.play(),
      b = this;
    z(a) ||
      y(a) ||
      a
        .then(function () {
          A(window.videoAdPlayPromise) && window.videoAdPlayPromise(b.a.id);
          b.Kd();
          0 < b.lb && (b.lb = 0);
        })
        .catch(this.a.D.I(this.Dh, this));
    this.a.log(this.c, "video.play()");
  };
  P.pause = function () {
    this.a.log(this.c, "pause");
    y(this.video) || (this.video.paused ? this.resume() : this.video.pause());
  };
  P.resume = function () {
    this.a.log(this.c, "resume");
    y(this.video) || (this.video.paused && this.video.play());
  };
  P.Ul = function () {
    if (!this.sg) {
      for (var a in this.Ka)
        "" != this.Ka[a] &&
          (this.i[this.Ka[a]] = T(
            this.video,
            this.Ka[a],
            this.pc(this.Ka[a]),
            this
          ));
      this.i.Ve = T(this.a.view.Da, "click", this.Jd, this);
      this.i.Jd = T(this.ed(), "click", this.Jd, this);
      this.i.Ic = T(this.a.view.kc, "click", this.Ic, this);
      this.sg = !0;
    }
  };
  P.Ih = function () {
    for (var a in this.Ka)
      "" == this.Ka[a] ||
        z(this.i[this.Ka[a]]) ||
        ("click" == this.Ka[a]
          ? U(this.a.view.rc, this.Ka[a], this.i[this.Ka[a]])
          : U(this.video, this.Ka[a], this.i[this.Ka[a]]),
        (this.i[this.Ka[a]] = null));
    z(this.i.Jd) || U(this.ed(), "click", this.i.Jd);
    z(this.i.Ve) || U(this.a.view.Da, "click", this.i.Ve);
    z(this.i.Ic) || U(this.a.view.kc, "click", this.i.Ic);
    try {
      z(this.i.Re) ||
        U(
          window.document.querySelector("#player_branding_top"),
          "click",
          this.i.Re
        ),
        z(this.i.Yf) ||
          U(
            window.document.querySelector("#player_branding_bottom"),
            "click",
            this.i.Yf
          );
    } catch (b) {}
  };
  P.pc = function (a) {
    var b = null;
    switch (a) {
      case "click":
        b = this.nc;
        break;
      case "timeupdate":
        b = this.Yc;
        break;
      case "error":
        b = this.Te;
        break;
      case "abort":
        b = this.ph;
        break;
      case "ended":
        b = this.Hd;
        break;
      case "pause":
        b = this.oc;
        break;
      case "play":
        b = this.pe;
        break;
      case "playing":
        b = this.xh;
        break;
      case "loadstart":
        b = this.vh;
        break;
      case "load":
        b = this.sh;
        break;
      case "loadeddata":
        b = this.Yj;
        break;
      case "loadedmetadata":
        b = this.Cm;
        break;
      case "progress":
        b = this.oe;
        break;
      case "waiting":
        b = this.We;
        break;
      case "canplaythrough":
        b = this.Se;
        break;
      case "canplay":
        b = this.rh;
        break;
      case "volumechange":
        b = this.Bh;
    }
    return b;
  };
  P.Xo = function () {
    return this.a.view.Na;
  };
  P.ed = function () {
    return this.a.view.W.querySelector(".pb-ad-close-body");
  };
  P.ik = function (a) {
    if (a)
      if ((a = a.getElementsByTagName("Ad")) && 0 < a.length)
        for (var b = 0; b <= a.length; b++) {
          var d = a[b];
          if (d) {
            if (
              null == d.querySelector("Wrapper") &&
              0 == d.querySelectorAll("MediaFiles").length
            ) {
              this.Ra(this.error.Td);
              break;
            }
            var f = d.querySelectorAll("Impression");
            null !== f && 0 < f.length && this.Gn(f);
            f = d.querySelectorAll("ViewableImpression");
            null !== f && 0 < f.length && this.Kn(f);
            f = d.querySelectorAll("TrackingEvents");
            null !== f && 0 < f.length && this.Jn(f);
            f = d.querySelectorAll("ClickThrough");
            null !== f && 0 < f.length && this.En(f);
            f = d.querySelectorAll("ClickTracking");
            null !== f && 0 < f.length && this.Fn(f);
            f = d.querySelector("Wrapper");
            null !== f && this.Ln(f);
            var g = d.querySelectorAll("Script");
            null !== g && 0 < g.length && this.In(g);
            d = d.querySelectorAll("MediaFiles");
            if (null !== d && 0 < d.length && (this.Hn(d), "" !== this.Oe)) {
              this.u.gb = !0;
              this.a.h.F()
                ? ((this.video = this.a.video),
                  this.u.ya != this.u.state.gc &&
                    this.a.Qh("//static.cda.pl/v001/img/mobile/poster16x9.png"))
                : null === this.video &&
                  ((this.video = window.document.createElement("video")),
                  this.a.jb()
                    ? (this.video.className = "pb-block-video-player")
                    : (this.video.className = "pb-ad-video-player"),
                  (this.video.poster = this.Nn),
                  this.nb.appendChild(this.video),
                  this.w.show(this.mb),
                  this.a.Ba
                    ? (this.a.controls.L(0), (this.video.volume = 0))
                    : this.a.cc
                    ? (this.a.controls.L(0), (this.video.volume = 0))
                    : this.a.jb()
                    ? (this.video.volume = 0.3)
                    : !1 !== this.a.lc()
                    ? ((a = this.a.lc()), this.a.controls.L(a))
                    : this.a.wd("cda.player.volume")
                    ? this.a.controls.L(this.a.$b("cda.player.volume"))
                    : this.u.ya === this.u.state.yb
                    ? (this.video.volume = 0.3)
                    : this.a.controls.L(this.a.controls.vq));
              this.a.controls.$c(0);
              this.Ul();
              this.a.h.F()
                ? this.a.fg(this.Oe)
                : (this.fg(this.Oe), this.a.video.paused || this.a.pause());
              if (this.autoplay || this.a.controls.aa.R())
                this.video &&
                  (this.video.setAttribute("webkit-playsinline", "true"),
                  this.video.setAttribute("playsinline", "true")),
                  this.a.controls.ba(!0),
                  this.play();
              break;
            }
            if (null == f && "" == this.Oe) {
              this.Ra(this.error.Td);
              break;
            }
          }
        }
      else this.Ra(this.error.oi);
  };
  P.Ln = function (a) {
    try {
      if (null !== a) {
        var b =
          a.querySelector("VASTAdTagURL") || a.querySelector("VASTAdTagURI");
        if ("object" === typeof b && b.hasChildNodes()) {
          var d = b.querySelector("URL") || b.querySelector("URI");
          a = null;
          a = null !== d && d.hasChildNodes() ? d.childNodes : b.childNodes;
          for (b = 0; b < a.length; b++)
            if ("" !== a[b].nodeValue.trim()) {
              var f = a[b].nodeValue.trim();
              if (f == this.b.tag) break;
              this.u.na("Pobieram wrapper: " + f);
              try {
                -1 < f.indexOf("${GDPR}") &&
                  (f = f.replace("${GDPR}", this.u.jd));
                -1 < f.indexOf("${GDPR_CONSENT_755}") &&
                  (f = f.replace("${GDPR_CONSENT_755}", this.u.ic));
                -1 < f.indexOf("${GDPR_CONSENT}") &&
                  (f = f.replace("${GDPR_CONSENT}", this.u.ic));
                if (-1 == f.indexOf("gdpr_consent=")) {
                  var g = -1 < f.indexOf("?") ? "&" : "?";
                  f += g + "gdpr_consent=" + this.u.ic;
                }
                -1 == f.indexOf("gdpr=") &&
                  ((g = -1 < f.indexOf("?") ? "&" : "?"),
                  (f += g + "gdpr=" + this.u.jd));
              } catch (l) {}
              if (this.u.je(f) && -1 == this.b.tag.indexOf("polsat")) {
                this.u.na("Wrapper ADSENSE");
                try {
                  -1 < f.indexOf("[referrer_url]") &&
                    (f = f.replace(
                      "[referrer_url]",
                      encodeURIComponent(window.location.href)
                    ));
                } catch (l) {}
                g = [];
                g.ad = {
                  autoplay: this.b.autoplay,
                  counter: this.b.counter,
                  displayAs: this.b.displayAs,
                  key: this.b.key,
                  key2: "undefined" != typeof this.b.key2 ? this.b.key2 : "",
                  skip: this.b.skip,
                  tag: f,
                  time: this.b.time,
                  type: this.u.type.Xa,
                  pool: this.b.pool,
                };
                g.tracking = this.eb;
                g.impression = this.Nb;
                g.viewableImpression = this.sc;
                g.clickTracking = this.Tc;
                this.Ra(this.error.ni, g);
                break;
              }
              try {
                this.yf(
                  f,
                  "GET",
                  !0,
                  !0,
                  "xml",
                  function (a) {
                    null != a && a ? this.ik(a) : this.finish();
                  }.bind(this)
                );
              } catch (l) {
                this.a.log(this.c, "getWrapper", l);
              }
            }
        }
      }
    } catch (l) {
      this.a.log(this.c, "parseWrapper", l), this.Ra(this.error.Td);
    }
  };
  P.Jn = function (a) {
    try {
      for (var b = 0; b < a.length; b++) {
        var d = a[b].querySelectorAll("Tracking");
        if (null !== d && 0 < d.length)
          for (var f = 0; f < d.length; f++)
            if ("undefined" !== d[f].getAttribute("event"))
              for (var g in this.eb)
                if (g == d[f].getAttribute("event")) {
                  var l =
                      d[f].querySelector("URL") || d[f].querySelector("URI"),
                    k = null;
                  null !== l && l.hasChildNodes()
                    ? (k = l.childNodes)
                    : null !== d[f] &&
                      d[f].hasChildNodes() &&
                      (k = d[f].childNodes);
                  if (null !== k)
                    for (var p = 0; p < k.length; p++)
                      "" !== k[p].nodeValue.trim() &&
                        this.eb[g].push(k[p].nodeValue.trim());
                }
      }
    } catch (u) {
      this.a.log(this.c, "parseTrackingEvents", u);
    }
  };
  P.Gn = function (a) {
    try {
      for (var b = 0; b < a.length; b++) {
        var d = a[b].querySelector("URL") || a[b].querySelector("URI"),
          f = null;
        null !== d && d.hasChildNodes()
          ? (f = d.childNodes)
          : null !== a[b] && a[b].hasChildNodes() && (f = a[b].childNodes);
        if (null !== f)
          for (var g = 0; g < f.length; g++)
            "" !== f[g].nodeValue.trim() && this.Nb.push(f[g].nodeValue.trim());
      }
    } catch (l) {
      this.a.log(this.c, "parseImpression", l);
    }
  };
  P.Kn = function (a) {
    try {
      if (null !== a && 0 < a.length)
        for (var b = 0; b < a.length; b++)
          if (a[b].hasChildNodes())
            for (var d = a[b].childNodes, f = 0; f < d.length; f++)
              if ("Viewable" === d[f].nodeName && d[f].hasChildNodes())
                for (var g = d[f].childNodes, l = 0; l < g.length; l++)
                  "" !== g[l].nodeValue.trim() &&
                    this.sc.push(g[l].nodeValue.trim());
    } catch (k) {
      this.a.log(this.c, "parseViewableImpression", k);
    }
  };
  P.En = function (a) {
    try {
      for (var b = 0; b < a.length; b++)
        if (a[b].hasChildNodes())
          for (var d = a[b].childNodes, f = 0; f < d.length; f++)
            if ("" !== d[f].nodeValue.trim()) {
              this.Ge = d[f].nodeValue.trim();
              return;
            }
    } catch (g) {
      this.a.log(this.c, "parseClickThrough", g);
    }
  };
  P.Fn = function (a) {
    try {
      for (var b = 0; b < a.length; b++)
        if (a[b].hasChildNodes())
          for (var d = a[b].childNodes, f = 0; f < d.length; f++)
            "" !== d[f].nodeValue.trim() && this.Tc.push(d[f].nodeValue.trim());
    } catch (g) {
      this.a.log(this.c, "parseClickTracking", g);
    }
  };
  P.Hn = function (a) {
    try {
      for (var b = null, d = 0; d < a.length; d++) {
        var f = a[d].getElementsByTagName("MediaFile");
        if ("undefined" !== f)
          if (1 < f.length)
            for (var g = 0; g < f.length; g++) {
              if (
                "undefined" !== f[g].getAttribute("type") &&
                ("video/mp4" == f[g].getAttribute("type") ||
                  "mp4" == f[g].getAttribute("type"))
              ) {
                b = f[g];
                break;
              }
            }
          else 1 == f.length && (b = f[0]);
      }
      if (null !== b && b.hasChildNodes) {
        var l = b.childNodes;
        for (a = 0; a < l.length; a++)
          "" !== l[a].nodeValue.trim() &&
            l[a].nodeValue.trim().indexOf("mp4") &&
            (this.Oe = l[a].nodeValue.trim());
      }
    } catch (k) {
      this.a.log(this.c, "parseMediaFiles", k);
    }
  };
  P.In = function (a) {
    try {
      for (var b = 0; b < a.length; b++)
        if (a[b].hasChildNodes)
          for (var d = a[b].childNodes, f = 0; f < d.length; f++)
            "" != d[f].nodeValue && eval(d[f].nodeValue);
    } catch (g) {
      this.a.log(this.c, "parseScripts", g);
    }
  };
  P.yf = function (a, b, d, f, g, l) {
    this.a.log(this.c, "ajax", arguments);
    try {
      var k = new XMLHttpRequest(),
        p = this;
      k.onload = function () {};
      k.onreadystatechange = function () {
        4 == k.readyState && 200 == k.status
          ? "undefined" !== k.responseXML && k.responseXML
            ? l(k.responseXML)
            : p.Ra(p.error.pg)
          : 200 < k.status &&
            (400 < k.status && 500 > k.status
              ? p.Ra(p.error.si)
              : p.Ra(p.error.Vk));
      };
      k.onerror = function () {
        p.Ra(p.error.pi);
      };
      k.ontimeout = function () {
        p.Ra(p.error.mf);
      };
      k.withCredentials = f;
      k.open(b, a, d);
      k.timeout = 5e3;
      k.send(null);
    } catch (u) {
      this.a.log(this.c, "ajax", u);
    }
  };
  P.ja = function (a) {
    this.a.log(this.c, "tracking", a);
    if ("impression" == a)
      for (var b = 0; b < this.Nb.length; b++) this.S(this.Nb[b]);
    else if ("viewableImpression" == a)
      for (b = 0; b < this.sc.length; b++) this.S(this.sc[b]);
    else if ("clicktracking" == a)
      for (b = 0; b < this.Tc.length; b++) this.S(this.Tc[b]);
    else
      for (var d in this.eb)
        if (a == d)
          for (b = 0; b < this.eb[a].length; b++) this.S(this.eb[a][b]);
  };
  P.S = function (a) {
    try {
      -1 < a.indexOf("[timestamp]") &&
        (a = a.replace("[timestamp]", parseInt(new Date().getTime() / 1e3))),
        -1 < a.indexOf("[TIMESTAMP]") &&
          (a = a.replace("[TIMESTAMP]", parseInt(new Date().getTime() / 1e3)));
    } catch (d) {}
    try {
      -1 < a.indexOf("g.cda.pl") &&
        33 < this.a.Dc() &&
        (a += "&uid=" + this.a.Dc());
    } catch (d) {}
    this.a.log(this.c, "sendPixel", a);
    if (E(a)) {
      var b = new window.Image(1, 1);
      b.onload = b.onerror = function () {
        delete b;
      };
      b.src = a;
      try {
        this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
      } catch (d) {}
    }
  };
  P.qc = function (a) {
    a = Number(a);
    var b = Math.floor(a / 3600),
      d = Math.floor((a % 3600) / 60);
    a = Math.floor((a % 3600) % 60);
    return (
      (0 < b ? b + ":" + (10 > d ? "0" : "") : "") +
      d +
      ":" +
      (10 > a ? "0" : "") +
      a
    );
  };
  P.setTime = function (a) {
    if (0 < this.K()) {
      if (!y(this.Ia) && B(this.Ia)) {
        var b = this.Ia.length;
        50 < b + this.K() && (b = 50 - this.K());
        a = b + this.K() - a;
      } else a = this.K() - a;
      !isNaN(a) && D(a)
        ? (-1 <
            this.b.tag.indexOf(
              "MjA_ZmFlNGExNDQ3ODg3ZmM1MmZhZTExMWQxMjhkNGY2NWI_NTg1"
            ) || this.a.cc
            ? (this.a.view.Na.innerHTML = this.qc(a))
            : this.a.Ba
            ? (this.a.view.Na.innerHTML = "Reklama")
            : ((a = "Reklama: "),
              this.a.h.F() && (a = ""),
              (this.a.view.Na.innerHTML =
                a + "" + this.u.Zb + " z " + this.u.zc)),
          this.a.view.Na.R() || this.a.view.Na.show())
        : this.a.view.Na.m();
    }
  };
  P.Bh = function () {
    this.a.log(this.c, "onVolumeChange", this.video.volume);
    if (0 < this.video.volume)
      try {
        this.ja("unmute");
      } catch (a) {}
    else
      try {
        this.ja("mute");
      } catch (a) {}
  };
  P.Yc = function () {
    this.oe();
    2 === this.video.networkState && 3 > this.video.readyState
      ? this.a.controls.H(!0)
      : (1 === this.video.networkState || 3 <= this.video.readyState) &&
        this.a.controls.H(!1);
    this.a.controls.Eb(this.l());
    this.a.controls.Ua(this.K());
    this.setTime(this.l());
    var a = (100 / this.K()) * this.l();
    this.a.controls.ob.$a(a + "%");
    this.a.controls.N.R() && 0 < this.l() && this.a.controls.N.m();
    if (0 < this.l() && !0 === this.V && !this.ed().R() && !1 === this.Nd) {
      var b = this;
      -1 <
        this.b.tag.indexOf(
          "Njk_OTVkOTRkOGU0NmJkN2VlMGFkNDA5ZTE1YmM5YmIwYWI_NjAz"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YmQ3NzhiNzUyMmRiNmE3NTljNDg3YzBhMDVhNTk0Y2Q_NjA1"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MTI3M2FjYjVmMzI3YTljMzI1Y2NmYWZkMTIyM2RhOGE_NjIz"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_ZGMyN2E2NmFhYjZhNjE3YTE1N2E0ZTgzODk2ZTVlNWI_NjE3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_Y2YyYmM1ZmJiOTJkNzU1ZDgwMmJmYzgxOGNmNzZiMjQ_NjE0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YTk1ZjkwZGViMmZkZDc4YmE4MzhiM2U1MmY0NjhkODY_NjA4"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_MDk1ODNhM2U4MDdmNjJjODBhMWIxMTAzNDk3ZjdkNTE_NjMy"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjA_YmVhOWFjNzQ3NWFlZmQ4ZTllNmNlNDdkMThhNTA3ZTM_NjQ5"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "NzM_NmM5M2ViYjU2ZmY5MTViMWFmNWFiM2ZjYmFlZGEwMmQ_NzM5"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "OTQ_MjgxMTM3ZjMzNTAxNjYzYThiMjgzMjlmNzBiYzY3OTM_ODc3"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTA5_NmQxZjM1NGM1ZTYyZjVkMmNlYWIwYTUwYzgxODc2ZTE_OTY0"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTA5_NDYxYzk1MWRjNjQ1YmEzODIzODNhMDUyZjlhNjhhYjI_OTYx"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTY2_MGM3MWEyY2VlNDNlNWZjYmIxNDA4MTJhNTI4YzZjZGQ_MTkwNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTg3_OGQ4YjBhOTYyMWU0MWMwNmNhZGNjNDJmOTIzMjgwYWQ_MjI2Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Mzc3YTc2ZjI2YmUzNGMyNTEwMDJkMTVjYTYxYzE5YjY_MjY0NA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZDFhN2ZkNzdlYjM3YTAwZDBlZGFlYWQ5ZWI4NzBiY2E_MjUzNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODI2ZWM2M2U2ZTI4MzI3MGJmZDFhY2QwMjhjOTU1ZmI_MjU2Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTg3_YjU5OTJlYWVlYjI5MjNiNWI3M2YzNmQ4MDhkNjdmZDM_MjUxNQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZWYzZWEwZDAzMDBkMzM5NjcyZjc1MDYyYmRjNWFjNmU_MjU3Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MWI2M2RiM2ZkYTg0NTFhNTE2MmFkODU3NmJiMjhkMDA_MjU4MQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_NGQ0ZWY4ZTFlMmM4YWQ2NzM3YWY1NmEwZDU3Y2ZkNDk_MjU4NA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_OTM0YTdmMDVjNTE1MmNhZjdhZjQ0M2I2YzgzY2JiNjg_MjY1Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZmQzYTZmZGNkN2Q5YmViZDhjYmY0Zjg3MzI2ZDM1NDY_MjY2Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YjE3ZWNmZDVhMTVjYmQ2NzEzODE3ZGI2ZjE4MzQ2NzA_MjY2NQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZjM2MTRiODZjMmM5NGVkZDJmNjE1NmQ3NDNhYTA3ZDQ_MjY2OA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODI2ZWM2M2U2ZTI4MzI3MGJmZDFhY2QwMjhjOTU1ZmI_MjU2Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Njk3OGNlNDFmYmJkMWIxY2JkMzQxZGJmNWEyNTlkYzk_Mjc3MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YmQxOTdhYzQ0MjA2MDVlNTYwODM2ZTJiMzI0N2EyYTI_Mjc4OA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YWMyNjE3NzI3ZjNhODZiZTA4MWNkMmJlOTc2N2JkZmE_Mjc3Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MTA5YmJlYTg2YWRhOTY0YjIyNTgzZmU2MTc0YjQxYmI_Mjc5MQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Mzk3ZGM5MDYxZmFhYWE3NmU0NzAxNjVmOWM5N2ZlZWM_Mjc5Nw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTg3_N2Q1MDAwNTMwZDE3MjRmYzI2MjkxYzg3ZDU4N2I2NDk_Mjc5OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjIw_OWJmZjkxNjA4M2IwNDc4MjJjY2YwMWQyYzg5MjRjOWM_MjgxOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZmJmZjgyY2I4N2MxMjgyMjEyNTY0YzM1OWM1YTY2NmM_MjgyNw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTY4YmEyY2RhN2NiYjI3NzkzYTA3ZmVmNDQ2YjY4MTE_MjgyNA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODc3MzBiMjM5NWE1N2JhNjZmN2IwNWI1ZTdmMTI2MDQ_Mjg2Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YzBmODkzNmNkYTBkNzljYWE2ODVmN2NlZTJkODE1NTM_Mjg2Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_NWE2YzRiM2Y4YmY3ODlkMzFhYTg1NTgzZTFkOThhYzc_Mjg2OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MWRmY2ExZWQ4YWYyMGNiYjM1MTE1ZWQ1ZDg1Njc5YmQ_MjkzMg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZGZlYjIyYjVmYzk0MmI5ZThlMmVhMTE2Yzg2ZWQ5YWE_MjkzOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Y2VlNTczYzAyYTJjMjdmNTUzNjJiNTJiMGJjMzZkZjE_MjkzNQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_Mjk3ZjNkZDEwN2U1M2Q2NDBiYzViNDdkOGJkMjFhODU_MzAwMQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YjM3ZTkwMzMxNWI1MGE3YzBjMDc0MTAyYzI2NzkxOTk_MzAwNA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_NGRiMGI0YWFiZGQ5NTIxZDExZDkxYWZjYTQzNTIyM2E_MzAxOQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTcwZTkwN2EyMzM4NDQzMTYyN2M4Nzg5MzIwZDhkOGE_MzAyMg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MzU4Zjg3NDVlOGU1OGVlY2JlODEwNzZjYjgwNDU2OTk_MzA1NQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ODg2ZmZhNzE1MjA2YzE4ZDY5OGY0ZjMxZjMwNDBhYWY_MzA1OA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_OWNkYmM1ZGNjZmIzZTE3YzMwNTMxOWJiODlhYzk3ZjI_MzA2MQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MzAxYWRlM2Q4MDUyNGZlNWQ2OGU2N2U0MDE3NzU4OTE_MzE4MQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YTQ1OTk2MmEwNTk0NzVjMjQ2M2Y5MmQwOGFiYjA5ZmI_MzE4NA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZTNhZjY5OTk3MGU2YjZhYzc2NWMxZWRjNmRlYTIzYzU_MzIyMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZWMwMTcxMWZkZDJmODdmMDZlMDc3Y2U0YzE3N2JkMTg_MzI2NQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjMyNmVmZTUzODRiM2E3MWFmNmQ5Mjk0YTAyZWU1ZTk_MzI2Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_M2JjOGI5Y2I3Mjk0YWZiMjhjOTZhNTFiNWQ2OWZiYzA_MzI2OA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjU2_YTJiZDExNjBlYTZjOTc1ZjUyZWI5NmNhZGI0NzlmOGE_MzQwMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_OWI3ZGZlMDMxZjU4NTI4OTcyMDYwYTkyNjhjOTk2YjU_MzQ3Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZmI2YWEzZDQwZTY0YzlhMTM0YWUzNGQ4ZjdiZDFjZDQ_MzQ3Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MTQ3ZjcyNzRmMDA5NDA4YzE1YjdkZDQ3ZmM2M2UwOTE_MzQ3OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZWRkOGY0OTFhMDJkZGJhY2VhZDQ1MGI2ZjViOGRiYmQ_MzQ5Ng"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YmZjYjRkNDJiOTJmYTY2MWMxOTNmNmNmMWYyZWZjMzE_MzQ4Nw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjI2ZjFiNjQxOWJkY2Q0ZTY1NzZhNWIyZDRhNDE2YzE_MzQ5Mw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MjIzMjA0ZDU2OTA0Mzg0YjE3Y2I5NGY4ZmE2MTdiNzY_MzQ5MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_YTU3Mjg2NTk1MjU3YWYwNzY2ZTYyZGJmZmI4ZjkwMGY_MzU1OQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjYw_MzljNjA0NDkwMjc3M2ZjZDZmZjg4YTE5OTMyZmNkNTY_MzYzOA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_MTk4MGI2OTc1MzRhNjAyYjVhN2RmZTM3ZjAzNzkwMjA_MzY1MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_ZDRiM2Q0NzJjMjYwNzIxZGQwZjk4MDlmNjhhMDkzMjU_MzY0Nw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_MGUzYmQ1ZWYyMDBjMTFlMmZmMTY1NzE1ZjhmZTEzYTY_MzczMw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZGJjMTMxZDdmMjQwMTc5NTZiZmE5OGU4MDJkYTZiMzg_MzczNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjU2_YzBiMWNlMTZhNjkzYjVjOTcxMWZiN2I1ZWM0MjQ0YTc_MzcyNw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_ZGYxMmVkMzQzZGE1MDNkNDNlZjBkMjMzY2ZjOTJlMDQ_MzgyMA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_MWEyZWRkMDgxYzBjZjZkZmFiNjMwMWVlN2I5OThkOWU_MzgyMw"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_ODFlMTI2ZDQ4ODYxZWMxNGJlZjU4YjA2ZmJhYWI5MjY_MzgyNg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MjY2_OGYzNGY2ZWE2ZjYzMjYzYzgxYTcyZjU2ZjgzYzdiYjA_MzgyOQ"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTk2_ZmE5ZTY1NGFhMzQ4MTRiMGIwZTg5OTg5NzA3Y2MwOGQ_Mzk0MA"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTI1_ZDRmNjdlMjMyYTRhNTgwZjhlYTYxOWJjNDlhY2ZiODk_Mzk1Mg"
        ) ||
      -1 <
        this.b.tag.indexOf(
          "MTI1_ZTliNDk0MmY2YzQ4NmMwZTNlYmE4NDMxM2QwZDk3Yzg_Mzk0OQ"
        ) ||
      !0 === this.ij
        ? null === this.qb &&
          0 < this.Y &&
          ((this.Od = !1),
          this.a.view.Da.show(),
          this.a.view.Da.ha(
            '<span class="pb-skip-body">Pomi\u0144 reklam\u0119 za ' +
              b.Y +
              "</span>"
          ),
          (this.a.view.Da.style.opacity = "0.5"),
          (this.qb = window.setInterval(function () {
            b.Y--;
            0 < b.Y
              ? b.a.view.Da.ha(
                  '<span class="pb-skip-body">Pomi\u0144 reklam\u0119 za ' +
                    b.Y +
                    "</span>"
                )
              : (b.a.view.Da.ha(
                  '<span class="pb-skip-body">Pomi\u0144 reklam\u0119</span>'
                ),
                (b.a.view.Da.style.opacity = "1"),
                (b.Od = !0),
                window.clearInterval(b.qb),
                (b.qb = null));
          }, 1e3)))
        : null === this.Fb &&
          (this.Fb = setTimeout(function () {
            -1 <
              b.b.tag.indexOf(
                "NTc_MWM1ZjEwYjg5ZGM1ZjVkZDA3YjJmYjI5MzBhOGEwMWE_NTc2"
              ) ||
            -1 <
              b.b.tag.indexOf(
                "NTc_ZjBmNmZkOTYzOTQ1ZTcwMzQ0YWJjN2VlYzg1Y2NiZDE_NTcw"
              ) ||
            -1 <
              b.b.tag.indexOf(
                "MjA_ZmFlNGExNDQ3ODg3ZmM1MmZhZTExMWQxMjhkNGY2NWI_NTg1"
              ) ||
            -1 <
              b.b.tag.indexOf(
                "NjY_ZTc2M2ZmMDA3YWRiMTZjMjViMjZjMzM1N2RhNWJlOWQ_NTkx"
              ) ||
            -1 <
              b.b.tag.indexOf(
                "Njk_OTVkOTRkOGU0NmJkN2VlMGFkNDA5ZTE1YmM5YmIwYWI_NjAz"
              ) ||
            -1 <
              b.b.tag.indexOf(
                "NzY_MGI4MThkZjU2MmEwM2Y2MzY4NDllM2RkYjhjYzM1MDQ_NjU1"
              )
              ? b.a.view.Da.show()
              : b.ed().show();
            b.V = !1;
            b.Nd = !0;
          }, 1e3 * this.ca));
    }
    a = Math.floor((this.l() / this.K()) * 100);
    if (25 <= a && !1 === this.vc)
      try {
        this.ja("firstQuartile"), (this.vc = !0);
      } catch (d) {}
    else if (50 <= a && !1 === this.xc)
      try {
        this.ja("midpoint"), (this.xc = !0);
      } catch (d) {}
    else if (75 <= a && 0 == this.yc)
      try {
        this.ja("thirdQuartile"), (this.yc = !0);
      } catch (d) {}
    if (5 <= this.l() && !1 === this.Ag)
      try {
        this.ja("video5sec"), (this.Ag = !0);
      } catch (d) {}
    else if (10 <= this.l() && !1 === this.vg)
      try {
        this.ja("video10sec"), (this.vg = !0);
      } catch (d) {}
    else if (15 <= this.l() && !1 === this.wg)
      try {
        this.ja("video15sec"), (this.wg = !0);
      } catch (d) {}
    else if (20 <= this.l() && !1 === this.xg)
      try {
        this.ja("video20sec"), (this.xg = !0);
      } catch (d) {}
    else if (25 <= this.l() && !1 === this.yg)
      try {
        this.ja("video25sec"), (this.yg = !0);
      } catch (d) {}
    else if (30 <= this.l() && !1 === this.zg)
      try {
        this.ja("video30sec"), (this.zg = !0);
      } catch (d) {}
  };
  P.Te = function (a) {
    this.a.log(this.c, "onError");
    3 === a.target.networkState
      ? this.finish()
      : ((a = -1),
        null != this.video.error &&
          "undefined" !== typeof this.video.error.code &&
          (a = this.video.error.code),
        -1 < a && this.finish());
  };
  P.ph = function () {};
  P.Hd = function () {
    if (!1 === this.qf)
      try {
        this.ja("complete");
      } catch (a) {}
    this.a.w.m(this.a.w.Na);
    this.a.w.m(this.a.w.Be);
    this.a.w.m(this.a.w.ma);
    this.a.w.m(this.a.w.kc);
    this.a.w.m(this.a.w.Da);
    this.a.controls.H(!0);
    this.a.controls.$c(0);
    this.a.controls.ob.$a("0%");
    this.a.controls.Eb(0);
    this.a.controls.Ua(0);
    window.clearTimeout(this.Aa);
    this.Aa = null;
    window.clearInterval(this.qb);
    this.qb = null;
    window.clearTimeout(this.Fb);
    this.Fb = null;
    this.Nd = !1;
    this.eb = {
      creativeView: [],
      start: [],
      firstQuartile: [],
      midpoint: [],
      thirdQuartile: [],
      complete: [],
      video5sec: [],
      video10sec: [],
      video15sec: [],
      video20sec: [],
      video25sec: [],
      video30sec: [],
    };
    this.Nb = [];
    this.sc = [];
    this.Ge = "";
    this.qf =
      this.Ud =
      this.sg =
      this.zg =
      this.yg =
      this.xg =
      this.wg =
      this.vg =
      this.Ag =
      this.yc =
      this.xc =
      this.vc =
      this.Vd =
        !1;
    this.Ih();
    this.mb.m();
    this.nb.innerHTML = "";
    this.video = null;
    A(window.videoAdEnded) && window.videoAdEnded(this.a.id);
    return this.Hc();
  };
  P.nc = function () {
    if (this.a.h.F()) {
      if (
        -1 <
        this.b.tag.indexOf(
          "MjA_N2JhODc3Y2U3NTJkNTI4Yjc4NmZiMTdjYzFlNDJhYWU_MTIyMQ"
        )
      )
        return;
      this.Ej();
    }
    this.ra ? this.a.controls.ba(!0) : this.Rd && this.a.controls.ba();
    !y(this.video) && this.video.paused
      ? this.video.play()
      : (0 < this.$d && this.Ej(), this.$d++);
  };
  P.Ej = function () {
    if (
      this.b.click &&
      !(
        1 > this.l() &&
        (-1 <
          this.b.tag.indexOf(
            "MTI4_ODEwOGQ2ZTkwMTkwOWJjZjFjNjY0NWYzYzAzMDBiNGU_MTE4NA"
          ) ||
          -1 <
            this.b.tag.indexOf(
              "MTI4_M2M5ZTMwNmU0OGJlOTQ3Y2VhOWU0OWM0M2JmY2VhNDE_MTE4MQ"
            ))
      ) &&
      0 < this.$d &&
      (this.$d++, !y(this.Ge) && "" !== this.Ge)
    ) {
      var a = this.Ge;
      try {
        if (
          -1 < a.indexOf("myphone.pl/klasycznie") ||
          -1 < a.indexOf("myphone.pl/produkty")
        )
          y(this.a.Rg()) ||
            "" == this.a.Rg() ||
            (a += "&utm_term=" + this.a.Rg()),
            y(this.a.Sg()) ||
              "" == this.a.Sg() ||
              (a += "&utm_content=" + this.a.Sg());
      } catch (b) {}
      try {
        -1 < a.indexOf("http://sprawachrystusa.pl") &&
          Math.round(Math.random()) &&
          (a = "http://sprawachrystusa.pl/lista-kin/");
      } catch (b) {}
      try {
        if (!window.open(a, "_blank").closed)
          try {
            this.ja("clicktracking");
          } catch (b) {}
      } catch (b) {}
    }
  };
  P.oc = function () {
    try {
      this.ja("pause");
    } catch (a) {
      this.a.log(this.c, a);
    }
  };
  P.pe = function () {
    this.a.log(this.c, "Event", "onPlay");
    this.a.w.xa.G("pb-run-ad") || this.a.w.xa.s("pb-run-ad");
    y(this.Aa) || (window.clearTimeout(this.Aa), (this.Aa = null));
    0 < this.K() && this.a.controls.Ua(this.K());
    this.u.wf = !0;
    0 === this.$d && this.$d++;
    this.a.controls.aa.m();
  };
  P.xh = function () {
    this.a.controls.H(!1);
    this.a.controls.N.R() && this.a.controls.N.m();
    if (!1 === this.Vd) {
      this.Vd = !0;
      if (
        -1 <
        this.b.tag.indexOf(
          "ODQ_NjM2ZDE0NDQxZjZjZGY5ZmQ1MmE0MTNmNDA4OWI1YWU_MTQzMg"
        )
      )
        try {
          (window.document.querySelector("#player_branding_top").innerHTML =
            '<a href="https://gde-default.hit.gemius.pl/lshitredir/id=B8M1j_s4gXFBYe7iKMDiLMRqXtFKLO_aZu6AH7NbvSz.T7/fastid=gqpuotncdlryxcgwixbcgacbbfkc/stparam=tpqrfnisav/nc=0/gdpr=0/gdpr_consent=/url=https://www.facebook.com/KozelPL/?utm_campaign=KOZEL%20VOD_07-09.19_SABM_19_0225&utm_source=DISPLAY_desktop&utm_medium=%2FVOD%2FVOD%2FCDA_BRANDING%2FCDA_634x75" target="_blank"><img src="https://www.cda.pl/img/branding/KP_Kozel_Digital_Cda_[634x75]_v5.jpg" /></a>'),
            (window.document.querySelector(
              "#player_branding_bottom"
            ).innerHTML =
              '<a href="https://gde-default.hit.gemius.pl/lshitredir/id=B8M1j_s4gXFBYe7iKMDiLMRqXtFKLO_aZu6AH7NbvSz.T7/fastid=gqpuotncdlryxcgwixbcgacbbfkc/stparam=tpqrfnisav/nc=0/gdpr=0/gdpr_consent=/url=https://www.facebook.com/KozelPL/?utm_campaign=KOZEL%20VOD_07-09.19_SABM_19_0225&utm_source=DISPLAY_desktop&utm_medium=%2FVOD%2FVOD%2FCDA_BRANDING%2FCDA_634x75" target="_blank"><img src="https://www.cda.pl/img/branding/KP_Kozel_Digital_Cda_[634x75]_v5a.jpg" /></a>'),
            this.qh(),
            (this.i.Yf = T(
              window.document.querySelector("#player_branding_bottom"),
              "click",
              this.Qe,
              this
            )),
            (this.i.Re = T(
              window.document.querySelector("#player_branding_top"),
              "click",
              this.Qe,
              this
            ));
        } catch (g) {}
      if (
        -1 <
          this.b.tag.indexOf(
            "MjUw_MTkxNzAxODhiZDRhM2Y1YTY2OGY1ODY5YmY1NzZlZTY_MzgzMg"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjUw_ODZmN2RlN2U3NTZlZTZkOWYwY2JmMjg0MzE1NTQ1YmI_MzgzNQ"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "MjUw_ZWQ2NDM4MWFkODlhZDdiNmE4NTk5ZWFhODRhMDMxMjc_MzgzOA"
          )
      )
        try {
          (window.document.querySelector("#player_branding_top").innerHTML =
            '<a href="https://wyborowa.pl/" target="_blank"><img src="https://static.cda.pl/branding/wyborowa/CDA_634x75_01_UP_v3.jpg" /></a>'),
            (window.document.querySelector(
              "#player_branding_bottom"
            ).innerHTML =
              '<a href="https://wyborowa.pl/" target="_blank"><img src="https://static.cda.pl/branding/wyborowa/CDA_634x75_02_DOWN_v3.jpg" /></a>'),
            this.qh(),
            (this.i.Yf = T(
              window.document.querySelector("#player_branding_bottom"),
              "click",
              this.Qe,
              this
            )),
            (this.i.Re = T(
              window.document.querySelector("#player_branding_top"),
              "click",
              this.Qe,
              this
            ));
        } catch (g) {}
      try {
        -1 <
          this.b.tag.indexOf(
            "MTI4_YWUxOGM3NWRlMTE4NzFhMGNhNjk1NjI1YzE1YmJiNWY_MzQ0MA"
          ) &&
          ((window.document.querySelector("#player_branding_top").innerHTML =
            '<a href="https://ad.doubleclick.net/ddm/trackclk/N873153.1864356CDA.PL/B21115792.289352162;dc_trk_aid=482758879;dc_trk_cid=141063125;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}" target="_blank"><img src="https://static.cda.pl/branding/vivus/413_PLVivus202011_Pierwsza_na61dni_Luty_CDA-634x75_2-2.png" /></a>'),
          (window.document.querySelector("#player_branding_bottom").innerHTML =
            '<a href="https://ad.doubleclick.net/ddm/trackclk/N873153.1864356CDA.PL/B21115792.289352162;dc_trk_aid=482682062;dc_trk_cid=141063125;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}" target="_blank"><img src="https://static.cda.pl/branding/vivus/413_PLVivus202011_Old_CDA-634x75_2.png" /></a>'),
          this.sm(),
          this.qm(),
          (this.i.Yf = T(
            window.document.querySelector("#player_branding_bottom"),
            "click",
            this.pm,
            this
          )),
          (this.i.Re = T(
            window.document.querySelector("#player_branding_top"),
            "click",
            this.rm,
            this
          )));
      } catch (g) {}
      if (
        -1 <
        this.b.tag.indexOf(
          "MTg3_N2Q1MDAwNTMwZDE3MjRmYzI2MjkxYzg3ZDU4N2I2NDk_Mjc5OQ"
        )
      )
        try {
          (window.document.querySelector("#player_branding_top").innerHTML =
            '<a href="https://ad.doubleclick.net/ddm/trackclk/N542601.3487212LEVELUPDISPLAY/B24256105.275212015;dc_trk_aid=469492119;dc_trk_cid=133371240;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=" target="_blank"><img src="https://scdn2.cda.pl/branding/monini_cda_01.png" /></a>'),
            this.qh(),
            (this.i.Re = T(
              window.document.querySelector("#player_branding_top"),
              "click",
              this.Qe,
              this
            ));
        } catch (g) {}
      if (
        -1 <
          this.b.tag.indexOf(
            "NTc_OGIyNDIyYWFlNzAxNzcyMzMwNjgwYTcwZmUxMzAxODc_NTM0"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "NTc_OGYxYzdmZWY2NTIyMDllOWM1YWQ4NTQ1MGQyODg2NTA_NTM3"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "NTc_MWM1ZjEwYjg5ZGM1ZjVkZDA3YjJmYjI5MzBhOGEwMWE_NTc2"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "NTc_MGQ4ZWRhMjJlMmJlODAwNWVjYjhlMGJjZDU2MjcyYTI_NTcz"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "NTc_ZjBmNmZkOTYzOTQ1ZTcwMzQ0YWJjN2VlYzg1Y2NiZDE_NTcw"
          ) ||
        -1 <
          this.b.tag.indexOf(
            "NTc_NTc3YWZmOWQ5ZDkyMjljYjNjMmRkYWUxNzYwMGIzNzk_NTY3"
          )
      )
        this.a.w.ma.show(),
          (this.a.w.ma.innerHTML =
            "Dowiedz si\u0119 wi\u0119cej na myphone.pl");
      -1 <
        this.b.tag.indexOf(
          "NjM_NDhlOGU2YzE4M2Q0N2RhMWEyZjg0YjlhM2NlMmM5Mjc_NTc5"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = "Sprawa Chrystusa - ju\u017c w kinach!"));
      -1 <
        this.b.tag.indexOf(
          "MjA_ZmFlNGExNDQ3ODg3ZmM1MmZhZTExMWQxMjhkNGY2NWI_NTg1"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML =
          "Zosta\u0144 wsp\u00f3\u0142w\u0142a\u015bcicielem CDA! Zapisy do 8 grudnia"));
      -1 <
        this.b.tag.indexOf(
          "Njk_OTVkOTRkOGU0NmJkN2VlMGFkNDA5ZTE1YmM5YmIwYWI_NjAz"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML =
          '"Najlepszy" - nowy film tw\u00f3rcy "Bog\u00f3w". Ju\u017c w kinach!'));
      -1 <
        this.b.tag.indexOf(
          "MjA_YmQ3NzhiNzUyMmRiNmE3NTljNDg3YzBhMDVhNTk0Y2Q_NjA1"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = "CDA Premium - nowo\u015bci na luty 2018!"));
      -1 <
        this.b.tag.indexOf(
          "MjA_YmVhOWFjNzQ3NWFlZmQ4ZTllNmNlNDdkMThhNTA3ZTM_NjQ5"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = "CDA Premium - nowo\u015bci na marzec 2018!"));
      -1 <
        this.b.tag.indexOf(
          "MjA_MTI3M2FjYjVmMzI3YTljMzI1Y2NmYWZkMTIyM2RhOGE_NjIz"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = '"The Boy" - ogl\u0105daj w CDA Premium!'));
      -1 <
        this.b.tag.indexOf(
          "MjA_ZGMyN2E2NmFhYjZhNjE3YTE1N2E0ZTgzODk2ZTVlNWI_NjE3"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML =
          '"Summer Camp" - ogl\u0105daj w CDA Premium!'));
      -1 <
        this.b.tag.indexOf(
          "MjA_Y2YyYmM1ZmJiOTJkNzU1ZDgwMmJmYzgxOGNmNzZiMjQ_NjE0"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML =
          '"Robinson Crusoe" - ogl\u0105daj ju\u017c teraz w CDA Premium!'));
      -1 <
        this.b.tag.indexOf(
          "MjA_YTk1ZjkwZGViMmZkZDc4YmE4MzhiM2U1MmY0NjhkODY_NjA4"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = '"Modelka" - ogl\u0105daj w CDA Premium!'));
      -1 <
        this.b.tag.indexOf(
          "MjA_MDk1ODNhM2U4MDdmNjJjODBhMWIxMTAzNDk3ZjdkNTE_NjMy"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML =
          '"Ma\u0142y ksi\u0105\u017c\u0119" - ogl\u0105daj ju\u017c teraz w CDA Premium!'));
      -1 <
        this.b.tag.indexOf(
          "MTg3_YjU5OTJlYWVlYjI5MjNiNWI3M2YzNmQ4MDhkNjdmZDM_MjUxNQ"
        ) &&
        (this.a.w.ma.show(),
        (this.a.w.ma.innerHTML = "Z mi\u0142o\u015bci do oliwy od 100 lat"),
        (this.a.w.ma.style["pointer-events"] = "auto"),
        (this.i.Bj = T(this.a.w.ma, "click", this.Bj, this)));
      this.ud && !this.a.ta() && this.a.w.kc.show();
      -1 <
        this.b.tag.indexOf(
          "MjA_N2JhODc3Y2U3NTJkNTI4Yjc4NmZiMTdjYzFlNDJhYWU_MTIyMQ"
        ) && this.a.w.kc.show();
      this.u.na("Startuje reklam\u0119");
      try {
        this.ja("impression");
      } catch (g) {}
      try {
        if (this.a.Sd) {
          var a = this;
          window.setTimeout(function () {
            a.a.Sd && a.ja("viewableImpression");
          }, 2e3);
        }
      } catch (g) {}
      if (this.a.cc)
        try {
          this.S(
            "https://g.cda.pl/g.php?pixel&vi=MTcwYjVmZjFjMTA0MzU5NDExMjcwNDQ3MWZjZDc4NzQ_Nzc4&pl=impression&ct=[timestamp]"
          );
        } catch (g) {}
      if (
        this.b.hasOwnProperty("counter") &&
        this.b.counter &&
        this.b.hasOwnProperty("key") &&
        this.b.hasOwnProperty("displayAs")
      ) {
        var b = "";
        0 < this.Nb.length
          ? (b = this.Nb[0])
          : 0 < this.eb.start.length
          ? (b = this.eb.start[0])
          : 0 < this.eb.creativeView.length && (b = this.eb.creativeView[0]);
        var d =
          "2017premium-wakacje 2017premium-recepcjonista 2017premium-gosc 2017premium-wakacje 2017premium-piekna 2017premium-frankenstein 2017premium-dziendobry 2017premium-kobietawklatce 2017premium-nikoratujebrata 2017premium-kumba 2017premium-body 2017premium-sonofagun 2017premium wosp_25 2017premium-facetniepotrzebnyodzaraz 2017premium-carteblanche 2017premium-sarila 2017premium-anatomia-zla 2017premium-popek 2017premium-maruderzy 2017premium-loft 2017premium-to-wlasnie-seks 2017premium-kroczac-wsrod-cieni 2017premium-kevin 2017premium-upsarka 2017premium-honorisila 2017premium-dawcapamieci 2017premium-kochanek 2017premium-wszystkowidzaca 2017premium-72godziny 2017premium-naukaspadania 2017premium-boy7 2017premium-przekret 2017premium-poslancy 2017premium-wakacjemikolajka 2017premium_cda24 2017premium_cdapopcorntv grudzien2016premium 2017premium_hugoilowcyduchow 2017premium_nieracjonalnymezczyzna 2017premium_pantameron 2017premium_transporternowamoc 2017premium_zycnieumierac 2017premium_7psychopatow 2017premium_theduff 2017premium_asterixiobelix 2017premium_teostatniegodziny 2017premium_marsylskilacznik 2017premium_juzzatobatesknie 2017premium_whoami 2017premium_bananki 2017premium_wdrodzenagielde35s 2017premium_bonypodarunkowe 2017premium_cda24swieta 2018premium_ofertaluty 2018premium_theboy 2018premium_sypiajaczinnymi 2018premium_summercamp 2018premium_robinsoncrusoe 2018premium_racheticlank 2018premium_modelka 2018premium_misiek 2018premium_malyksiaze 2018premium_ojcowieicorki 2018premium_sypiajaczinnymi 2018premium_sprawachrystusa 2018premium_poradynazdrady YmY3OGEwODRkOTNkNDAwNTI4YjE5ZDM1MDdmNWY2M2E_NjAw N2U3ODlkZjNkOTI3OGMzZjQ2NzYyZjNlNTU1NzliN2Q_NTk0 NzY0ZWYwNjRjNzJhZDU0MWYzYWI5NDYxM2Q4YzNmMmU_NDkz MGM4YjFmYTA3OTU5ZDI4MWQyZDgzMGE3MTc3N2Y3MzU_NDk2 ZGRkZGZhN2Q0OTZhMDBjOThkMzFhZGU2YTYzMDZiNWQ_NDk5 ZGFhN2ZmZTEzMzQ0Nzc3MDIzNjgxOWJiYzE4OThlNTY_NTAy NWU5MjlhNDAyOGY5MTZlYjI0ODAxMzRkMDNjZGU0Yjc_NTA1 YmFjMDk2ZTA4MGRjMzJjODlkZWVjODMwMDI5ZjkyZmY_NDg3 N2NkZjEzZDIwNDliNWY3MDc1YzQzYmM3ZmViYTc0NTM_NDg0 MjAwZTljNDMzYThjOGFlYWVlNmNiZjQ0MTljNzY3ZWM_Mzgy ZjZmMWU5ZjI1MzQzNWNkMDU2MGU0NjkyZTg4MDVjMDY_Mzg1 OTU2MjBjNjMwMDZjZDY1YjBjNjJkZmVmYzMzZWNmYjU_Mzcx MzJkOGIxYTI3NWU3Y2Q3NTY2YTllYzkyYTQ3NDY1NjE_Mzcz YTJmMGI4ODFkZGZkNzkzMGNiNDE3Y2QyZDhlZjEwZjE_NDAw M2ZkZjJhNTk0MjBhMjY4NWFlNjk1ZTAxYWEyNmJkN2Q_NDAz OTNiM2VkYTY1Y2M0YWFlYWI4MjQ4NDlkNTIxMGNjOGI_MjYz ZmY2MzA0MGJmNDQ3ZjcwZmQwNjdmNTdiMmNlOTQ1OGQ_NDA2 NGRkYTQzMTMzODcxOGM0YmZmMGJlNTliYTA0YzNlNDI_NDA5 ODIwMzdhNjQ5ZmRkMWQyOGI5NDE2YjExN2MxODhkOGY_NDE1 YmE1NTJmOTQzZDE3ODg4YmMwZTZjNGVlMTkyNjcxZWE_NDI0 M2M1MTQyYmIxNDZjYjQ0YjIzYTM4YWU4OGRjNGIwNmU_NDIx NjE1ZjUwZTQ5OTU4MzE0MTYwOTM0NmM2YjIzNDUwOWY_NDQy NWNmYTVhOGUwYmVmOGMxYjA4ZmMxYTAxZjUwMDU5ZTc_NDMz NWQwM2I4MTFlNTAzZWY3OWQ2ZWIxMjQ0OTlkNGZlZGE_NDM5 OTFlNzgxMDhmMmMwNWFhMjQzMDEwNjQwYjhiMDRhNTY_NDM2 NjNjNmJhZmQwZTc1NDViM2E3MmJhYmE5YzliOTE0MTU_NDU0 ZmI4ZTNmOGI5ZTAyOGM5MTgwODhmZjMwMDEwZWExZjI_NDYy ZjcyODk1N2NjMWUyMzYwODZkZjg2OTkwZjAwNzRlOTg_NDYz MWFhOWQyYzM3NWQyZWM0N2ZlODkzNDE0ZDExZTFiOGE_NTIy NmEyODVhMzgzZDI1Y2FjYmYxYjI3YmJiMDBjMDg2ZDY_NTMx NTNhZjNmY2NiYmE5ZTVmZDEwY2FlYTQyNWYxYmM3MzI_NTI4 OGIyMWVkNGMwNzhhZjA0YTc2Y2Y1N2EzYmEwYjI3Y2Y_NTI1 MjRkZDcxOGQ4MmFhYTQ0NWU0OGFhYmVjMjM1ZGJlM2Q_NTQz M2YzNTJmZDMwOGVhNDgyMjllZmFlNjNlOTQ2OThmZTY_NTQ2 MzY1ZmIzZGNhMzhhZmY0ZmI2NWE2NTdjMmQ0YWQzMDI_NTQ5 OGJkM2RkZTI5YjIxNjE5ZDYxZGUzYjU3ZDUwOGVhYzk_NTUy ZjE5Mzk4YmM3ZmRiZTdiMTZhNzIxYjlmY2M1ZGQ3NjU_NTU1 ZmFlNGExNDQ3ODg3ZmM1MmZhZTExMWQxMjhkNGY2NWI_NTg1 YmQ3NzhiNzUyMmRiNmE3NTljNDg3YzBhMDVhNTk0Y2Q_NjA1 MTI3M2FjYjVmMzI3YTljMzI1Y2NmYWZkMTIyM2RhOGE_NjIz OWE1NjRmYjBmODhhZDRjMWVlNzU2MGUzNDFkNDk4YmM_NjIw ZGMyN2E2NmFhYjZhNjE3YTE1N2E0ZTgzODk2ZTVlNWI_NjE3 Y2YyYmM1ZmJiOTJkNzU1ZDgwMmJmYzgxOGNmNzZiMjQ_NjE0 ZDY5ODE4MjM2MmEzMjEwMzIwOTU3YzJkMTYzMDU0ZmU_NjEx YTk1ZjkwZGViMmZkZDc4YmE4MzhiM2U1MmY0NjhkODY_NjA4 NTI5NzU2NDQ2YzEwY2Y1OGZlZmRlNjU1MzEzNDQzODc_NjI2 MDk1ODNhM2U4MDdmNjJjODBhMWIxMTAzNDk3ZjdkNTE_NjMy Nzc3ZDhkYzYyYjUwNzQ4ZmRiMmVhNDgxOWJiOWYwMTk_NjM0 ZGNiMTBiMjJhOTdjMDlhY2I2YTBlNDUxMWM4MGRiODc_NjM3 NjFlYzhlYzQ3OTM1ODhkMzIyN2ViYzM5OGYxNzY3ZTk_NjM5 NDg0ZGE4ZTI5MWRlMTdiY2IyNGU3YzE3N2Q1ODZlNDA_NjQy YmVhOWFjNzQ3NWFlZmQ4ZTllNmNlNDdkMThhNTA3ZTM_NjQ5 MGI4MThkZjU2MmEwM2Y2MzY4NDllM2RkYjhjYzM1MDQ_NjU1 NDhmZDZlY2U2YTIwZWExMTlkMjAzZDJkM2IzMGZkYzU_NjY0 YjY5NGNjZmJjN2NmMDJmMDU2YzkyNmY3OGE1YTE1MWY_Njcw N2Q2MjY3ZDQwZmQzNDVkZDhlZDM5YzNhNmQ0YWI0MGE_NjY3 MWNkNGIwMGE4NzQxYmU2NTA5MGIxZDFmYTA0MDk1Njc_Njc5 YTk4NGJhMGMxM2RmOThmZDQ0MjAxNzMyOWM1ODlkYTA_Njk0 ODljOGQ2MzdkZWQxOWRiZTlmNmIxYTc0OGUyODViOTM_Njkx MmNjNTU5NDc5NDc0ZDU4NzAyNTFmYmVlYTQ1ZDJiNjc_Njg4 NTQzOGNiNDViZmY5NjVjZTk4MTFlMzdkZWU4NWE0YzI_Njg1 N2NmNWZiMzU0OGYyZTNjODQ4NTI3NGQ4YmU4MmY3YTA_Njgy N2QxZTE0NTg4NTdmNmM5MTY3NDdkOTdmNmViMzA5NTY_NzE3 ZDhiMDVhYzRkMGJjNTFjZTQyZGU4Y2ZhNjNmZWM5YWQ_NzIw ZDc0MDdlMmQ5NDBiNzZiYjg2MjE4ZjgxMTgxOGYwMDc_NzMw ZTY5YWQ3NzljMzMzMjI4OGQ0NzIzZGM1ZjUwZjRhMDg_NzI3 NTY1ZWFkMjJjNDFiMDM2MGYzNGE3MzVhYjEzNDY3M2Q_ODA1 MjMxYTdmYTg2ZDFmYTJkNTE2Yjc5MDYzZGViMGNhNDg_ODE3 ZTZhNzM4NmI4YTk1ZWMwZWM0NGYxYjg5ZTY0MGUwYzU_ODE0 YjYzOTQ5M2Q0NDhkZmY3NGNmOTVkZjhmYWYzMzEyODg_ODQx MWRkNTQyMWM3NWZiZGQyMDJkYzRmZGVhNzgwNDYxNWE_ODY4 MDdkMzkxM2RlNTQyODBmMzM3NWIyNmM2NjY1ZDNlYWI_ODY1 NDIzNTk0OGM1NjM2MzExM2UzZGNkMjUzNGZlMGYxOTk_ODYy YmI5ZWM3MDRmM2YxYWQxYzdmN2YyMTRhNjA1NDZlYWU_ODU5 YTQwNjQ1YWYwNTA4ZDE3OGRlYThjYWU2ZjU0ZTM4YmY_OTUy YTU4YmQ2NjI0MzEwZWVmNTIwM2I0ODFkYTdmZDAxMmQ_OTU1 M2M3MTBiMWI3ZjhmOWUzNDA3ZTVlMDJmYWRmOWRkMTc_OTMx MGNmYjBhNDEwOWQ1M2YyMzcyNjVhYmQ5MzBiYjM1ZmE_OTI4 NzFjOTMzYzIyM2YzMzdhM2NhM2ExNzJhNjAwZDliMTc_ODU2 M2MxZjhlNzA4YWY1MjA3NzYwNjE2YzJjZjJkMmI2NjQ_OTkx OTBmNmQ5ODA1MjQ3ZTYxNzRiNDA2Mjk3YTNiNTUwZDE_OTg4 Y2RmM2M2ZWYyNWZlMDVmNTBhNzgzODQ1ZGQxM2ZkZDU_OTg1 MDIzYjAwODgzMDdhNmVkZDg2NDZkMjlmYjM1OWVhNTE_MTAxOQ MDRjN2Y5MGVkNTA5N2I4OGRmMDgwMmE2NTIyNGM0Njk_MTAzNA NzM4ODI4ZGNjY2JjOTZiOGQwYTc4ZWY3ZjY5OWY3Zjc_MTA3NA NGNkZmZhYjFmMzIxMjM3MjdiNzM0MDQyNGFmYmEyNWQ_MTA3Nw NzhkODVkNzQ1OGVkNzYwYTY5MGRhY2ZlMzA2MzJkMGY_MTA4Mw YTBlNGZlNTE1ZjA1YThiY2RkZWQ0ZDBmMWRiNWJjNTg_MTA4MA ZTZiMDE1YjA1OTliMTJkYjE3ZGE2YWRhNmNkZmVjZTQ_MTA4Ng NDliODM4ODBmZjY2ZTliNDYwYThkMWQwNjM4ZGUzMTk_MTExOA NGU3NTJmNTM3M2I1ZTQ0MDhiN2MyNjdmOGJlZjRiYTA_MTEyNA OWJhZWJjNjdiYjVhYTBkNzMyZjhhMTUyY2MxNDJhN2I_MTEyNg YmMyYmIxMWVhNWQ5YjkxYzE5ZjczNDk5NmU3YmQ1ZmI_MTEyOA MjM1Zjc1MTAxZDZjMzU3ZDI4NDYxMTg5MTI4NTYyMDU_MTEzMA ZTI2YWQxOTRmZjY4YmJjZTBlYjk3MDE4MDRjODE4NDA_MTEzNg YjdkMGFkNjc1ZWQzMzQ2MTg4NDNmN2RlOThlNzYwMWE_MTEzMw Y2VmOWVmY2VhNWM0NzZhZjE5NjE1YzQxMzI2ZDg2ZGY_MTM2NQ ODRmOWEwN2ViOTcwYmE1Mzg1YjQyMmNmNWMyOTIzY2Y_MTM2Mg NWYzMjY4OWYyYjI2OGFkZWY4NDNkMDQwMmY4YWNhOTE_MTM1OQ MDYwYTEyMmU5MmU1YzdhNTg0ZWU5MDNmNDcyZGQzNDg_MTM1Ng YmFmMzI3N2EyMDYyZjMwNWU0ZDE5YzhlMzhhMzdhZjY_MTM1Mw MzkzNDg5OWI5MGQ1YTk4NTBlNjg5Y2I2M2I3MWUwNTc_MTQ4Mw NzYwZDhjMzU1ZjRjNWExYWRjMWM3MzQ3MzkzY2YxMzQ_MTY5MA NjFlYjM3OWIxNDRjY2U5MmE1YTAzYzY0YmQ0Zjc4ZGE_MTgxNg YjM1YWIxMWNkZDk5NTcwYTcyYWYyOWM5NjcwZmM1Mzk_MTkzOQ YzQ0MzgzNGNhMDIxMjVhMGExNWM2YTBiMjRkZTI4ZWQ_MTk0Mg YjI2NzhhMDMzMDY2OTVhNzUyZmYyYjM5NTRmN2QzZDc_MTk0NQ N2JhODc3Y2U3NTJkNTI4Yjc4NmZiMTdjYzFlNDJhYWU_MTIyMQ ZDMwYzA2NTg5NTBiNmU0MzMyMDU4MjQ4OGZhZjQ0MjQ_MjM5NQ MGYzNWQyMzlhN2U0NThlMGQ3OTNiYTMwYzQ3ZmU3NmI_MjUyOQ YjcxYjg4ODFlYmUwNmYwYWM0ZWVhZWYzZGRlMWExYjY_MjUzOQ YTg0ZmRmMDg5ZjM4MjI2NzkyZWUzODMwYzExNmNjZjc_MjY0MQ MDIzODI5OGQ1ZDI5NDY3MjI4MjVhZDAxOWU5YTMyMzQ_MjgxMQ ODU0NjY0MDQwNmUzNTRiOWYwODhkYTQ2NGVlNDgxZDA_MjgzNg YmNjNDZhZjY2YThkYTllYTVlMDlmYThmNWM2ZDEzOTc_Mjk0Nw YzA3ZjNhNzE1NzM3ZDYyMjNmNTMyNDE4M2E0NjY1MzY_MzAyNQ NjkwOWIyOTVkOTkyNzVhODI1ODEyMmRmYzA0YmUwOWU_MzA4OA MDZiYWRiODMyODhiMDkxMWE5YzM2MGJkNDBiYmMwNGM_MzA5MQ YTc4YzZhOGIwN2U0ZjVjZTBkOGNlNTQ1ZWJkMGZhMTc_MzA5NA NzFlYzcyMDJmYzlhODE0NzVmNTM2NWQ3MzJiZjBmMjc_MzA5Nw NjNkNDgyZjU4YTJhZGE5ZTY2NGM4MTc4ZDQyNDk2Zjk_MzEwMA YTQ1MDkxYmJiZjgxOGFkNDdlNGQzZTgwMWIxMjc1ZDE_MzE2Ng MGE0OTJhMzc0YjZmOGQ5YjRlNWE1MTc4OTkwMDk2Y2Y_MzIxNA Y2I2YjBkNjVkZTA5M2U1NGQ3ZTY2YjkwYTQ1NTI1ZWY_MzIxNw YjE1NTVlOGZhY2YyYTAxZmVjYWJiNDQ1NzYzZTExOTM_MzI0NA ZWU3YjlhZWMyMmVmYzk1MDdiY2E2NDJhZTM1YmZiM2Q_MzI0Nw OTQyM2VhYzkyZWJmNGY5MWJiNDE1ZTBhNGJjMTFmM2U_MzI1MA YmMwYTA5NzAyYTA4MTQwMzMzYTMzNWFjYWI5MjM3MTA_MzI1Mw YzliYjJkMmVhMWRlNmU5Y2Q2NDA0YjU1ZjJlMDgzNTg_MzI1Ng YjEyNWI0N2Y1NzE4M2Q0ZTAxYWQ3MmI3OWEzMDc5ODM_MzI1OQ OTMxMmQ3ZDg4ZDY5MTEzMmJiZGIwYjc4YzY0ZDM1MzA_MzI5OA YTcxYWY5ZTYwNzcwN2ZkMzZmNWUyODdhMjdkNjk2MWM_MzMwMQ N2RjOThkZWEzMDhkOTgyMzdjZGEzMTcwODU3MDEyODA_MzM0OQ MzVlNmJjNDU1ODc4YzAwNzIxNDNhNjMzYzljNWNhZmM_MzM1OA MzczNmVhMTlhZTlhNDY3YTg1MjhlMzEyYzFiN2MyNGE_MzM2MQ NmRjMjUyYmU2NGZhOWUzZTU4NDM2MDY3MDIwODk2NWY_MzM5NA NjQ3ZGZmYzcwNTQ3Zjk4ZjZhY2I4ZTQ1ZmMzMGY4Yzk_MzM5Nw MzEzY2U3NjBmYWM0MTZlZmRlN2YwMDAyOGZkNGZlMzU_MzQzNw MGQxMGZjMTA4NjViZDhjYzEzMDgxZTVmMWYzYTI2OGQ_MzQzNA NjgzNWIyMzA3YzVhNzA4NjMzZDU5MTBlZjFkMWE3MDk_MzQ2NA NmJkNTA5YmJmNWRjYWNmZDFhNGI4Y2RiOWMxMzVlYmE_MzQ2Nw OGU1NWQxYThlYjFjMzgxMzY2ZGRjNjI2MTdhZWQyYTk_MzUxNA ODQ0ODUxZjY1MmJlNmZkNThmMjM1Nzk1MmNmYmYyNDM_MzUxNw NmI1ZjE1NzA0YmExMGUwMGRmNzFhNmRjYzM0NDEzNWY_MzUyMA Y2U5ODIxYWI5MmQ3ZGMyZGQzNGEzY2E3MmQyZDlhOTM_MzUzNQ OGNkZDAwOTZhOTc0NjRkOGYyNGFlZjNhYWQxNjcxNWQ_MzUzOA NjZjMTkyNGE3ZjE2NzRmY2Y4MDA2YjE4YjZhNmUzNjE_MzU0MQ ZWEzOWFmMjk4NmFlZjAyM2M2ZGQ2NjAyOWM2ODU4ODU_MzU0NA OThlMzJlMmIzZDY4MzMwNzQyOWNmYWYzZDNkNzdiMjg_MzU2Mg NDFhY2RkYzRmMmY3MjQ2YzA4MDA1MTgzMTY5YzYzZWU_MzU4Mw MjViYzE2MmM4OGI5NDBmNTUxOTg1NmJlMzFkZmM3ZTQ_MzU4Ng ODQ2YTc3YzEwYTg0NTI0YTU4OGIxYzg3NzAxODcyNDU_MzU4OQ OWFmMTRjMjViMDZlMjBhM2JmMmNhNDAyOTAzMWY4ODY_MzU5Mg YmFmN2IwNGNkNzRlYTAxODdiMTg5OGE5MmZkMmFmN2Y_MzU5NQ OTlmYjJhMzdmZGJiNTJmMGI4NmRlMDM2OWVjOWNhM2Y_MzYwMQ YWFlOTFkYjUwMjE5NjBlODVkOWU2NThmNWYwZDEzZGE_MzYxNw N2FlYjQ0NGYyNjczN2RjZmYyODU0MTcyYmUxOWZkZGI_MzYzNQ OWVkODllZTc0ZTU1OWMzYzQwZDFlOGExYmI4MzI3YjQ_MzY1OQ N2FlYjQ0NGYyNjczN2RjZmYyODU0MTcyYmUxOWZkZGI_MzYzNQ NDBhZjY5YzkzODc5YTMzYjU5NjNlODY1ZTdlMTJhZjg_MzY2Mg MGI3ZTAxY2Y2MGNjYzdjM2RlOTI3ODBmYTI2YTJkMDQ_MzczOQ NjQwZjA3Y2RkMWIwZmM0YTdmZDAwODM5NmY5Zjk0ZDI_Mzc5Mw ZDNhNmI2NjMwZTRhMzgxZTMxYWRhMTc3MTBiZTNmZTY_MzgwOA MWNkM2JmYThmYjFkYWFhZDViOGFlNTk0NGM3YzRmZGE_Mzg1Ng YTg0NzMyMGFmNjUyZThmYmZhN2NiNDk2MDY4YzQyYTA_Mzg1OQ MzFhODQwN2RmYmUwNDYyM2JmNDQyNzQxZWY5M2YxZmQ_Mzg2OA ODUyOWNhYmFjMzQxNTU2YmNmMDkzYzVkNjI2NTlmZTM_Mzg3MQ YzkxMDQ5NDhhNTNkNDg1ZTAzNDMzNDIyN2I2MjZlYWM_Mzg5NQ YjU2OTkzNzVhZTdmOGMyN2RjYzViYTdjMGUwOGM4NWU_Mzg5OA YTg1OTM3ZjZiZDc5ZmZmOTY5MjQzOWU2MzNlZmE1MmM_Mzk5MQ MTMwYjRhMzMwODg1N2YwYmQzYzE1ZTllNzZiNzcyY2U_Mzk5NA YTUwOWY4ZmNmMDUwOTJmNDdkYzQ4NTY5MmU2ZWFhODk_NDAxNQ YTcxNjdiZTU1ODlmNzg5OTFlZDYxMmViZDFlMWRjNWE_NDAxOA".split(
            " "
          );
        E(b) && (b = b.trim());
        if ("" != b && null != b && "undefined" != typeof b)
          for (
            var f = 0;
            f < d.length &&
            (!this.a.f.hasOwnProperty("partner_id") ||
              1060857 != this.a.f.partner_id);
            f++
          )
            if (-1 < b.indexOf(d[f])) {
              b = "";
              break;
            }
        "" != b &&
          null != b &&
          "undefined" != typeof b &&
          (this.ud ||
            (this.a.ta() && window.location.search.indexOf("aju")
              ? this.Xd("aju_" + b, this.b.key, "display")
              : this.a.ta() && window.location.search.indexOf("obcas")
              ? this.Xd("obcas_" + b, this.b.key, "display")
              : this.a.ta() &&
                window.location.search.indexOf("kobieceinspiracje")
              ? this.Xd("ki_" + b, this.b.key, "display")
              : this.Xd(b, this.b.key, this.b.displayAs)));
      }
      try {
        this.ja("start"), this.ja("creativeView");
      } catch (g) {}
      if (null != this.video && (0 == this.video.volume || this.video.muted))
        try {
          this.ja("mute");
        } catch (g) {}
    }
  };
  P.sh = function () {
    this.a.log(this.c, "onLoad");
    this.ra = !1;
    this.ab = !0;
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (a) {}
  };
  P.vh = function () {
    this.a.log(this.c, "onLoadstart");
    this.ra = !1;
    this.ab = !0;
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (d) {}
    this.a.fa &&
      !this.a.controls.aa.R() &&
      (this.a.controls.aa.show(), this.a.controls.N.m(), this.play());
    var a = this,
      b = window.setTimeout(function () {
        a.Rd = !0;
        window.clearTimeout(b);
        b = null;
      }, 1e3);
    y(this.Aa) &&
      (this.Aa = window.setTimeout(function () {
        window.clearTimeout(a.Aa);
        a.Aa = null;
        return a.Ra(a.error.ri);
      }, 8e3));
    this.a.controls.Ua(0);
    this.a.controls.Eb(0);
  };
  P.Cm = function () {
    this.a.log(this.c, "onLoadedMetaData");
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (a) {}
    y(this.Aa) || (window.clearTimeout(this.Aa), (this.Aa = null));
    z(this.video.duration) ||
      ((this.ra = !0),
      (this.Rd = !1),
      (this.duration = isNaN(this.video.duration) ? 0 : this.video.duration));
    this.a.controls.Ua(0);
    this.a.controls.Eb(0);
  };
  P.Yj = function () {
    this.a.log(this.c, "onLoadedData");
    y(this.Aa) || (window.clearTimeout(this.Aa), (this.Aa = null));
    z(this.video.duration) ||
      ((this.ra = !0),
      (this.Rd = !1),
      (this.duration = isNaN(this.video.duration) ? 0 : this.video.duration));
    this.a.controls.Ua(0);
    this.a.controls.Eb(0);
  };
  P.We = function () {
    this.a.controls.H(!0);
  };
  P.oe = function () {
    var a = this.video;
    "undefined" !== a.buffered &&
    0 < a.buffered.length &&
    "undefined" !== a.buffered.end
      ? ((a = (a.buffered.end(a.buffered.length - 1) / this.K()) * 100),
        100 < a ? (a = 100) : 0 > a && (a = 0),
        this.a.controls.$c(a))
      : this.a.controls.$c(0);
  };
  P.rh = function () {
    this.a.log(this.c, "onCanplay");
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (a) {}
    this.a.controls.aa.R() && (this.a.controls.H(!1), this.a.controls.N.show());
    y(this.Aa) || (window.clearTimeout(this.Aa), (this.Aa = null));
    if (isNaN(this.duration) || 0 >= this.duration || !D(this.duration))
      this.duration = isNaN(this.video.duration) ? 0 : this.video.duration;
    this.autoplay &&
      this.ab &&
      this.ra &&
      this.video.paused &&
      ((this.Rd = this.ab = !1), this.a.controls.ba(!0), this.Qb());
    this.autoplay &&
      this.ra &&
      2 < this.lb &&
      0 >= this.l() &&
      ((this.video.muted = "muted"),
      (this.video.autoplay = "autoplay"),
      this.Qb());
  };
  P.Se = function () {
    this.a.log(this.c, "onCanplaythrough");
    try {
      this.u.a.ta() && window.parent.postMessage("player-ad-playing", "*");
    } catch (a) {}
    this.a.controls.aa.R() && (this.a.controls.H(!1), this.a.controls.N.show());
    y(this.Aa) || (window.clearTimeout(this.Aa), (this.Aa = null));
    if (isNaN(this.duration) || 0 >= this.duration || !D(this.duration))
      this.duration = isNaN(this.video.duration) ? 0 : this.video.duration;
    this.autoplay &&
      this.ab &&
      this.ra &&
      this.video.paused &&
      ((this.Rd = this.ab = !1), this.a.controls.ba(!0), this.Qb());
    this.autoplay &&
      this.ra &&
      2 < this.lb &&
      0 >= this.l() &&
      ((this.video.muted = "muted"),
      (this.video.autoplay = "autoplay"),
      this.Qb());
  };
  P.Ra = function (a, b) {
    this.a.log(this.c, "onAdError", arguments);
    this.u.gb = !1;
    this.Ih();
    window.clearTimeout(this.Fb);
    this.Fb = null;
    window.clearInterval(this.qb);
    this.qb = null;
    window.clearTimeout(this.Aa);
    this.Aa = null;
    this.a.w.m(this.a.w.Na);
    this.a.w.m(this.a.w.Be);
    this.a.w.m(this.a.w.ma);
    this.a.w.m(this.a.w.Da);
    this.a.h.F() || (this.video = null);
    return this.u.Ra(a, b);
  };
  P.Hc = function () {
    this.a.log(this.c, "onAdComplete");
    this.u.na("Koniec reklamy");
    this.u.Pc++;
    if (!y(this.Ia) && B(this.Ia)) {
      if ("vast" == this.Ia.type) return this.u.Zb++, this.u.af(this.Ia);
      if ("pool" == this.Ia.type)
        return this.u.Zb++, this.u.Kf(this.Ia.tag, !0);
    }
    return this.u.Hc();
  };
  P.Cj = function () {
    this.a.log(this.c, "onAdSkipped");
    this.u.na("Reklama przewini\u0119ta");
    try {
      this.ja("skip");
    } catch (a) {
      this.a.log(this.c, a);
    }
    if (this.video.muted || 0 == this.video.volume)
      (this.video.muted = !1), (this.video.volume = 0.1), this.Bh();
    return this.u.Cj();
  };
  P.random = function (a, b) {
    return Math.random(Math.random() * (b - a) + a);
  };
  P.Xd = function (a, b, d) {
    this.a.log(this.c, "adHit", arguments);
    if (null !== this.a.X && !1 === this.Ud) {
      var f = this;
      try {
        window[this.a.X.client].zliczReklame(a, b, d, {
          success: function (a) {
            f.Ud = !0;
            f.a.log(f.c, "adHit", "response: " + a);
          },
          error: function (a) {
            f.a.log(f.c, "adHit", "erorr: " + a);
          },
        });
      } catch (g) {
        this.a.log(this.c, "adHit", "error: " + g);
      }
    }
  };
  P.Ic = function () {
    return window.open(
      "https://premium.cda.pl/rejestracja?cd2_sid=1&cd2_n=baner-wideoadpremium&cd2_hash=40fc7a5638fc18189a3a00d9892e30fde92da781",
      "_blank"
    );
  };
  P.Jd = function () {
    if (this.Od) {
      try {
        this.ja("skip");
      } catch (a) {
        this.a.log(this.c, a);
      }
      if (this.video.muted || 0 == this.video.volume)
        (this.video.muted = !1), (this.video.volume = 0.1), this.Bh();
      clearTimeout(this.Fb);
      this.Fb = null;
      window.clearInterval(this.qb);
      this.qb = null;
      this.Nd = !1;
      this.ed().m();
      this.a.view.Da.m();
      this.qf = !0;
      A(window.videoAdSkip) && window.videoAdSkip(this.a.id);
      return this.Hd();
    }
  };
  P.Zd = function () {
    this.a.log(this.c, "check autoplay");
    null == this.video ||
      0 < this.l() ||
      2 < this.lb ||
      ((this.lb += 1),
      (this.video.muted = !0),
      (this.video.autoplay = "autoplay"),
      (this.a.video.muted = !0),
      (this.a.Ab = !0),
      this.a.L(0, !0),
      this.a.controls.L(0, !0),
      this.a.controls.H(!0),
      this.play(),
      this.Cg());
  };
  P.qd = function () {
    this.a.log(this.c, "check scroll");
    this.play();
    this.Kd();
  };
  P.Kd = function () {
    z(this.i.Fe) || U(window, "touchstart", this.i.Fe);
    z(this.i.Ee) || U(window, "scroll", this.i.Ee);
    z(this.i.De) || U(window, "resize", this.i.De);
  };
  P.Cg = function () {
    this.i.Fe = T(window, "touchstart", this.qd, this);
    this.i.Ee = T(window, "scroll", this.qd, this);
    this.i.De = T(window, "resize", this.qd, this);
  };
  P.rm = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=NjZjNTc3NGY4OWY0MzRkNjkwZWY3M2JjNTkzODYxMmM_MzQ4Mg&pl=clickTracking&ct=" +
      new Date().getTime();
  };
  P.pm = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=OGRmNjFkYTU4MDg0MjJkMmQ5NWYzNjMwZjhjODQ4Y2U_MzQ4NQ&pl=clickTracking&ct=" +
      new Date().getTime();
  };
  P.Qe = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=YzhhMjg5ZTQzMWQ1Mjg1Njk4NDRlYzU0ZDdhZGI0YTE_Mzg0MQ&pl=clickTracking&ct=" +
      new Date().getTime();
  };
  P.sm = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=NjZjNTc3NGY4OWY0MzRkNjkwZWY3M2JjNTkzODYxMmM_MzQ4Mg&pl=impression&ct=" +
      new Date().getTime();
    var b = new Image(1, 1);
    b.onload = b.onerror = function () {
      delete b;
    };
    b.src =
      "https://ad.doubleclick.net/ddm/trackimp/N873153.1864356CDA.PL/B21115792.289352162;dc_trk_aid=482758879;dc_trk_cid=141063125;ord=" +
      new Date().getTime() +
      ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}?";
  };
  P.qm = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=OGRmNjFkYTU4MDg0MjJkMmQ5NWYzNjMwZjhjODQ4Y2U_MzQ4NQ&pl=impression&ct=" +
      new Date().getTime();
    var b = new Image(1, 1);
    b.onload = b.onerror = function () {
      delete b;
    };
    b.src =
      "https://ad.doubleclick.net/ddm/trackimp/N873153.1864356CDA.PL/B21115792.289352162;dc_trk_aid=482682062;dc_trk_cid=141063125;ord=" +
      new Date().getTime() +
      ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}?";
  };
  P.qh = function () {
    var a = new Image(1, 1);
    a.onload = a.onerror = function () {
      delete a;
    };
    a.src =
      "https://g.cda.pl/g.php?pixel&vi=YzhhMjg5ZTQzMWQ1Mjg1Njk4NDRlYzU0ZDdhZGI0YTE_Mzg0MQ&pl=impression&ct=" +
      new Date().getTime();
  };
  P.Bj = function () {
    try {
      return (
        window.open(
          "https://ad.doubleclick.net/ddm/trackclk/N542601.3487212LEVELUPDISPLAY/B23796369.266785103;dc_trk_aid=465732965;dc_trk_cid=130809051;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=",
          "_blank"
        ),
        !0
      );
    } catch (a) {}
  };
  function La() {
    this.Hf = window.document;
  }
  P = La.prototype;
  P.$k = function () {
    return "function" === typeof this.Hf.createElement
      ? this.Hf.createElement("video")
      : !1;
  };
  P.video = function () {
    var a = this.$k(),
      b = !1;
    if ("object" === typeof a)
      try {
        "function" === typeof a.canPlayType &&
          ((b = !!a.canPlayType),
          (b = new Boolean(b)),
          (b.Nl = a
            .canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"')
            .replace(/^no$/, "")),
          (b.Eq = a
            .canPlayType('video/webm; codecs="vp8, vorbis"')
            .replace(/^no$/, "")),
          (b.Mp = a
            .canPlayType('video/ogg; codecs="theora"')
            .replace(/^no$/, "")),
          (b.Aq = a
            .canPlayType('video/webm; codecs="vp9"')
            .replace(/^no$/, "")),
          (b.vp = a
            .canPlayType('application/x-mpegURL; codecs="avc1.42E01E"')
            .replace(/^no$/, "")));
      } catch (d) {}
    return b;
  };
  P.Gl = function () {
    var a = !1,
      b = window.navigator;
    if ("ActiveXObject" in window)
      try {
        a = !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } catch (d) {}
    else
      try {
        "undefined" !== typeof b.plugins &&
          "object" === typeof b.plugins["Shockwave Flash"] &&
          "undefined" !== typeof b.mimeTypes &&
          "undefined" !== b.mimeTypes["application/x-shockwave-flash"] &&
          b.mimeTypes["application/x-shockwave-flash"].enabledPlugin &&
          (a = !0);
      } catch (d) {}
    return a;
  };
  P.fullScreen = function () {
    for (
      var a = [
          "fullscreenEnabled",
          "fullScreenEnabled",
          "mozFullScreenEnabled",
          "webkitFullscreenEnabled",
          "msFullscreenEnabled",
        ],
        b = 0;
      b < a.length;
      b++
    )
      if ("undefined" !== typeof this.Hf[a[b]]) return this.Hf[a[b]];
    return !1;
  };
  P.Ql = function () {
    try {
      if (!y(window.frameElement) || window.self != window.top) return !0;
    } catch (a) {
      if (window.self != window.top) return !0;
    }
    return !1;
  };
  P = function (a) {
    if (y(a) || z(a)) throw new TypeError("Options can not be null.");
    this.c = "cda.Player.Flash";
    this.W = a.id;
    this.options = a;
    this.$n = "/jw5/jw5.js";
    this.protocol = window.location.protocol;
    this.a = null;
    this.za();
  }.prototype;
  P.za = function () {
    "function" === typeof window.jwplayer
      ? ((this.a = window.jwplayer(this.options.id)), this.Rh())
      : this.load();
  };
  P.load = function () {
    var a =
        document.getElementsByTagName("head")[0] ||
        document.head ||
        document.documentElement,
      b = document.createElement("script"),
      d = this;
    b.src = this.$n;
    b.type = "text/javascript";
    b.async = !0;
    b.onload = b.onreadystatechange = function () {
      (this.readyState &&
        "loaded" !== this.readyState &&
        "complete" !== this.readyState) ||
        ((b.onload = b.onreadystatechange = null),
        a && b.parentNode && a.removeChild(b),
        d.za());
    };
    b.onerror = function () {
      d.za();
    };
    a.insertBefore(b, a.firstChild);
    a.appendChild(b);
  };
  P.Rh = function () {
    var a = 620,
      b = 371;
    qa() &&
      -1 < window.location.href.indexOf("ebd.cda.pl") &&
      ((b = ta()), (a = b.width), (b = b.height));
    -1 == this.options.video.file.indexOf("http") &&
      (this.options.video.file = L(this.options.video.file));
    -1 == this.options.video.file.indexOf(".mp4") &&
      (this.options.video.file += ".mp4");
    -1 < this.options.video.file.indexOf("adc.mp4") &&
      (this.options.video.file = this.options.video.file.replace(
        "adc.mp4",
        ".mp4"
      ));
    this.a.setup({
      width: a,
      height: b - 19,
      "logo.file": "//static.cda.pl/v001/img/player/logo-player-creme.png",
      "logo.position": "top-left",
      "logo.link": "",
      "logo.hide": !1,
      "logo.over": 0.7,
      "logo.out": 0.4,
      dock: !0,
      autostart: this.options.autoplay,
      "controlbar.position": "bottom",
      "controlbar.idlehide": "false",
      modes: [
        {
          type: "flash",
          src: "//static.cda.pl/player5.9/player.swf",
          config: {
            file: this.options.video.file,
            duration: this.options.video.durationFull,
            provider: "http",
          },
        },
      ],
      plugins: {
        "https://static.cda.pl/timeslidertooltipplugin.swf": {
          marginbottom: 0,
        },
      },
    });
  };
  P.Zp = function (a, b, d) {
    return {
      "http://static.cda.pl/ova-jw.swf": {
        canFireEventAPICalls: !0,
        useV2APICalls: !0,
        overlays: {
          regions: [
            {
              id: "czas",
              verticalAlign: "bottom",
              horizontalAlign: "center",
              backgroundColor: "black",
              width: 250,
              height: 20,
              padding: "0 0 -10 2",
              opacity: 0.7,
            },
          ],
        },
        debug: {
          levels: "fatal, config, vast_template, vpaid, http_calls",
        },
        ads: {
          skipAd: {
            enabled: b,
            showAfterSeconds: 5,
            image: "http://static.cda.pl/images/close-btn-video3.png",
            width: 22,
            height: 17,
          },
          notice: {
            message:
              '<p class="smalltext" align="center">Reklama zniknie za _countdown_ sekund</p>',
            type: "countdown",
            region: "czas",
          },
          schedule: a,
          clickSign: {
            html: "KLIKNIJ",
            width: 62,
            enabled: d,
          },
          companions: {
            restore: !1,
            regions: {
              id: "companion" + new Date().getTime(),
              width: 1,
              heigth: 1,
            },
          },
        },
      },
    };
  };
  P.$e = function () {};
  P = function (a) {
    if (y(a) && z(a)) throw new TypeError("Options can not be null.");
    this.c = "cda.Player.Flash.SF";
    this.id = a.id + "-flash";
    this.W = document.querySelector("#" + a.id);
    this.options = a;
    this.a = null;
    this.Dg = 0;
    this.al = this.options.flash.swf;
    this.Ai = this.options.flash.js;
    this.za();
  }.prototype;
  P.za = function () {
    A(window.flowplayer)
      ? this.Rh()
      : this.load(
          this.Ai[0],
          function () {
            this.load(
              this.Ai[1],
              function () {
                this.za();
              }.bind(this)
            );
          }.bind(this)
        );
  };
  P.load = function (a, b) {
    var d =
        document.getElementsByTagName("head")[0] ||
        document.head ||
        document.documentElement,
      f = document.createElement("script"),
      g = this;
    f.src = a;
    f.type = "text/javascript";
    f.async = !0;
    f.onload = f.onreadystatechange = function () {
      (this.readyState &&
        "loaded" !== this.readyState &&
        "complete" !== this.readyState) ||
        ((f.onload = f.onreadystatechange = null),
        d && f.parentNode && d.removeChild(f),
        b());
    };
    f.onerror = function () {
      g.za();
    };
    d.insertBefore(f, d.firstChild);
    d.appendChild(f);
  };
  P.ib = function (a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = new RegExp("[\\?&]" + a + "=([^&#]*)").exec(window.location.href);
    return null == a ? null : a[1];
  };
  P.tl = function () {
    return {
      canvas: {
        backgroundGradient: "none",
        borderRadius: 20,
      },
      key: "#$13db964f8eb518e52fc",
      play: {
        opacity: 1,
      },
      wmode: "opaque",
      clip: {
        autoplay: this.options.autoplay,
        url: this.options.video.file,
        scaling: "fit",
        provider: "pseudo",
        duration: this.options.video.duration,
        metadata: !1,
        autoBuffering: !1,
      },
      logo: {
        url: this.options.logo,
        linkUrl: "http://superfilm.pl",
        linkWindow: "_blank",
        fullscreenOnly: !1,
        displayTime: 0,
        fadeSpeed: 0,
        top: 5,
        right: 5,
        opacity: "0.7",
      },
      plugins: {
        pseudo: {
          url: "/flowplayer/flowplayer.pseudostreaming-3.2.12.swf",
        },
        controls: {
          bufferGradient: "none",
          volumeSliderColor: "#ffffff",
          durationColor: "#a3a3a3",
          timeColor: "#ffffff",
          sliderGradient: "none",
          callType: "default",
          sliderColor: "#000000",
          timeBorder: "0px solid rgba(0, 0, 0, 0.3)",
          timeBgColor: "rgb(0, 0, 0, 0)",
          volumeColor: "#ffffff",
          progressColor: "#BD0F1C",
          bufferColor: "#BD0F1C",
          progressGradient: "none",
          scrubberBarHeightRatio: "0.6",
          scrubberHeightRatio: "0.38",
          tooltipColor: "#000000",
          buttonOffColor: "rgba(130,130,130,1)",
          timeSeparator: " ",
          borderRadius: "0",
          buttonOverColor: "#ffffff",
          backgroundColor: "#222222",
          tooltipTextColor: "#ffffff",
          disabledWidgetColor: "#555555",
          volumeBorder: "1px solid rgba(128, 128, 128, 0.7)",
          sliderBorder: "1px solid rgba(128, 128, 128, 0.7)",
          buttonColor: "#ffffff",
          volumeSliderGradient: "none",
          backgroundGradient: "none",
          height: 42,
          opacity: "1.0",
          autoHide: {
            fullscreenOnly: !0,
            hideDelay: 2e3,
          },
        },
        myContent: {
          url: "/flowplayer/flowplayer.content-3.2.9.swf",
          top: 5,
          left: 5,
          width: 275,
          height: 30,
          border: 0,
          borderRadius: 0,
          backgroundColor: "#000000",
          zIndex: 9999,
          style: {
            ".title": {
              "text-decoration": "outline",
              fontSize: 12,
              color: "#FFFFFF",
              "font-weight": "bold",
              "z-index": 99999,
            },
          },
          html: '<p class="title">Dzi\u0119ki tej reklamie ogl\u0105dasz legalnie i za darmo</p>',
        },
        myContent2: {
          url: "/flowplayer/flowplayer.content-3.2.9.swf",
          bottom: 47,
          right: 5,
          width: 195,
          height: 30,
          border: 0,
          borderRadius: 0,
          backgroundColor: "#000000",
          zIndex: 9999,
          style: {
            ".title": {
              "text-decoration": "outline",
              fontSize: 12,
              color: "#FFFFFF",
              "font-weight": "bold",
            },
          },
        },
        myContent3: {
          url: "/flowplayer/flowplayer.content-3.2.9.swf",
          bottom: 47,
          left: 5,
          width: 100,
          height: 30,
          border: 0,
          borderRadius: 0,
          backgroundColor: "#000000",
          zIndex: 9999,
          style: {
            ".title": {
              "text-decoration": "outline",
              fontSize: 12,
              color: "#FFFFFF",
              "font-weight": "bold",
            },
          },
        },
        ova: this.ul(),
      },
    };
  };
  P.ul = function () {
    return {
      debug: {
        levels: "none",
      },
      url: "/flowplayer/ova.swf",
      player: {
        modes: {
          linear: {
            controls: {
              enablePlay: !1,
              enablePause: !1,
              enableMute: !0,
              enableVolume: !0,
            },
          },
        },
      },
      autoPlay: !0,
      delayAdRequestUntilPlay: !1,
      canFireEventAPICalls: !0,
      fireTrackingEvents: !0,
      regions: {
        id: "adnotice",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        backgroundColor: "transparent",
        height: 0,
        width: 0,
        style: ".normaltext { font-style: italic; font-size:40px; }",
      },
      ads: {
        pauseOnClickThrough: !1,
        linearScaling: "fill",
        clickSign: {
          html: '<p class="smalltext" align="center">KLIKNIJ</p>',
          style: ".smalltext { font-size:12; margin-bottom:50px }",
        },
        notice: {
          region: "adnotice",
          message:
            '<p class="normaltext" style="color:green;" align="right"></p>',
        },
        schedule: [
          {
            position: "pre-roll",
            tag: window.encodeURIComponent(
              "http://go.goldbachpoland.bbelements.com/please/showit/7502/1/1/43/?typkodu=js&_xml=1"
            ),
            type: "direct",
          },
          {
            position: "pre-roll",
            tag: window.encodeURIComponent(
              "http://myao.adocean.pl/ad.xml?id=Uq2mbZcb8fWVw3..rnMiwPKIL.ofr9BixO3PavJI363.E7/aocodetype=1"
            ),
            type: "direct",
          },
          {
            position: "pre-roll",
            tag: window.encodeURIComponent(
              "http://go.goldbachpoland.bbelements.com/please/showit/7502/1/1/43/?typkodu=js&_xml=1"
            ),
            type: "direct",
          },
          {
            position: "pre-roll",
            tag: window.encodeURIComponent(
              "http://myao.adocean.pl/ad.xml?id=Uq2mbZcb8fWVw3..rnMiwPKIL.ofr9BixO3PavJI363.E7/aocodetype=1"
            ),
            type: "direct",
          },
        ],
      },
    };
  };
  P.Rh = function () {
    this.W.ha('<div class="pb-flash-wrapper" id="' + this.id + '"></div>');
    try {
      (this.a = window.flowplayer(
        this.id,
        {
          src: this.al,
          wmode: "opaque",
        },
        this.tl()
      )),
        this.a.ipad(),
        this.Bg();
    } catch (a) {
      console.log(a);
    }
  };
  P.Bg = function () {
    this.a.onLoad(this.sh.bind(this));
    this.a.onResume(this.ag.bind(this));
    this.a.onPause(this.oc.bind(this));
    this.a.onStop(this.en.bind(this));
    this.a.onStart(this.dn.bind(this));
  };
  P.sh = function () {
    var a = this.ib("vol");
    y(a) ||
      "" == a ||
      ((a = Number(a)), 0 <= a && 100 >= a && this.a.setVolume(a));
    this.a.getPlugin("myContent").hide();
    this.a.getPlugin("myContent2").hide();
    this.a.getPlugin("myContent3").hide();
    this.Dg = this.a.np().length - 1;
  };
  P.ag = function () {
    this.a.getPlugin("myContent").hide();
    this.a.getPlugin("myContent2").hide();
    this.a.getPlugin("myContent3").hide();
  };
  P.oc = function () {
    this.a.getPlugin("myContent").hide();
    this.a.getPlugin("myContent2").hide();
    this.a.getPlugin("myContent3").hide();
  };
  P.en = function () {
    this.a.getPlugin("myContent").hide();
    this.a.getPlugin("myContent2").hide();
    this.a.getPlugin("myContent3").hide();
  };
  P.dn = function (a) {
    a.$p ||
      (this.a.getPlugin("myContent").hide(),
      this.a.getPlugin("myContent2").hide(),
      this.a.getPlugin("myContent3").hide());
  };
  try {
    var Ha = function (a) {
      this.c = "cda.Player.Chromecast";
      this.a = a;
      this.lg = this.kb = this.Ce = null;
      this.dh = !0;
      this.pd = this.wa = this.Mh = null;
      this.hi = !1;
    };
    P = Ha.prototype;
    P.Ze = function (a) {
      this.a.log(this.c, "setView: " + a);
      a
        ? this.a.view.content.s("pb-ccast-posible")
        : this.a.view.content.C("pb-ccast-posible");
    };
    P.cd = function (a) {
      a
        ? this.a.view.Sc.s("pb-ccast-float-on")
        : this.a.view.Sc.C("pb-ccast-float-on");
    };
    P.qk = function (a) {
      this.a.view.od.s("pb-info-ccast-show");
      this.a.view.content.C("pb-frame-posible");
      this.a.controls.N.R() && this.a.controls.N.m();
      null != a
        ? (this.a.view.Cf.ha("Trwa \u0142\u0105czenie z urz\u0105dzeniem:"),
          this.a.view.Bf.ha(a))
        : (this.a.view.Cf.ha("Trwa \u0142\u0105czenie z urz\u0105dzeniem..."),
          this.a.view.Bf.ha(""));
    };
    P.fo = function (a) {
      this.a.view.Cf.ha("Odtwarzanie na urz\u0105dzeniu:");
      this.a.view.Bf.ha(a);
      this.a.view.Oi.s("pb-cast-inline-ico-on");
    };
    P.bj = function () {
      this.a.view.od.C("pb-info-ccast-show");
      this.a.view.Oi.C("pb-cast-inline-ico-on");
      this.a.view.Cf.ha("");
      this.a.view.Bf.ha("");
    };
    P.eo = function (a) {
      this.a.log(this.c, "set cast available: " + a);
      this.dh = !!a;
    };
    P.gp = function () {
      return A(window.__onGCastApiAvailable)
        ? window.__onGCastApiAvailable
        : null;
    };
    P.bh = function () {
      if ("undefined" === typeof window.chrome)
        return this.a.log(this.c, "isApiAvailable: false"), !1;
      if ("undefined" === typeof window.chrome.cast)
        return (
          null != this.pd && (window.clearInterval(this.pd), (this.pd = null)),
          (this.pd = window.setInterval(this.a.D.I(this.ql, this), 100)),
          !1
        );
      try {
        return (
          window.chrome.cast &&
          window.chrome.cast.isAvailable &&
          window.cast &&
          window.cast &&
          window.cast.framework
        );
      } catch (a) {
        return this.a.log(this.c, a), !1;
      }
    };
    P.ql = function () {
      "undefined" !== typeof window.chrome.cast &&
        window.chrome.cast.isAvailable &&
        window.cast &&
        "undefined" !== typeof window.cast.framework &&
        (null != this.pd && (window.clearInterval(this.pd), (this.pd = null)),
        this.mc(),
        this.Ze(!0));
    };
    P.isConnected = function (a) {
      return this.hi && "undefined" == typeof a && y(this.wa)
        ? !1
        : y(this.kb) ||
          y(this.kb) ||
          this.kb.status != window.chrome.cast.SessionStatus.CONNECTED
        ? !1
        : !0;
    };
    P.td = function () {
      this.a.log(this.c, "initEvents");
      T(this.a.view.ml, "click", this.nc, this);
      T(this.a.view.Sc, "click", this.nc, this);
      T(this.a.view.nl, "click", this.nc, this);
      var a = this;
      this.Ce.addEventListener(
        window.cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        function () {}
      );
      this.Ce.addEventListener(
        window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        function (b) {
          b.sessionState == window.cast.framework.SessionState.SESSION_RESUMED
            ? a.Rm(b.session)
            : b.sessionState ==
                window.cast.framework.SessionState.SESSION_STARTING &&
              a.qk(null);
        }
      );
    };
    P.za = function () {
      if ((this.a.h.Rf() || this.a.h.vd()) && !this.a.h.Ja())
        if (this.bh()) this.mc();
        else {
          var a = this;
          window.__onGCastApiAvailable = function (b) {
            (a.dh = b) &&
            "undefined" !== typeof window.chrome.cast &&
            window.chrome.cast.isAvailable &&
            window.cast &&
            "undefined" !== typeof window.cast.framework
              ? ((a.Ce = window.cast.framework.CastContext.getInstance()),
                a.mc())
              : window.setTimeout(function () {
                  a.bh() && a.mc();
                }, 1e3);
          };
        }
    };
    P.mc = function () {
      null == this.Ce &&
        (this.Ce = window.cast.framework.CastContext.getInstance());
      this.Ze(!0);
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: "89B0DA1D",
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      this.td();
    };
    P.Rm = function (a) {
      this.a.log(this.c, "onSessionResumed", a);
      a &&
        (a = a.getSessionObj()) &&
        a.status == window.chrome.cast.SessionStatus.CONNECTED &&
        a.statusText &&
        a.statusText.replace("Casting: ", "") ==
          window.decodeURIComponent(this.a.f.title) &&
        (this.a.view.Sc.s("pb-ccast-float-on"), (this.kb = a), (this.hi = !0));
    };
    P.nc = function () {
      this.dh
        ? (this.isConnected(!0)
            ? (this.cd(!0), this.a.controls.ba(!0))
            : (this.cd(!1),
              this.a.getState() == this.a.state.ga
                ? this.a.pause()
                : this.a.h.F() && this.a.video.load()),
          y(this.kb) || (this.Mh = this.kb.status),
          this.isConnected(!0)
            ? this.fn()
            : window.chrome.cast.requestSession(
                this.a.D.I(this.dk, this),
                this.Bm
              ))
        : alert(
            "Materia\u0142 chwilowo niedost\u0119pny dla urz\u0105dzenia Chromecast.\n\nNajnowsza wersja Chromecast 2.0 oraz Chromecast 4K wraz z aktualizacj\u0105 1.28 przesta\u0142a wspiera\u0107 filmy wideo w formacie .mp4 i d\u017awi\u0119kiem AAC 5.1 (wci\u0105\u017c dzia\u0142a .mp4 z d\u017awi\u0119kiem stereo 2.0).\n\nZdecydowali\u015bmy si\u0119 na zmian\u0119 formatu wideo z .mp4 na technologi\u0119 MediaSource z obs\u0142ug\u0105 d\u017awi\u0119ku 5.1, analogicznie robi to np. serwis YouTube.\n\nJest to do\u015b\u0107 problematyczne rozwi\u0105zanie, kt\u00f3re wymaga przekonwertowania wszystkich plik\u00f3w, co zajmie kilkana\u015bcie dni. Nie mniej jednak problem w najbli\u017cszym czasie powinien znikn\u0105\u0107, prosimy o cierpliwo\u015b\u0107."
          );
    };
    P.Fo = function () {
      this.cf();
      this.dk(null);
    };
    P.dk = function (a) {
      a && (this.kb = a);
      this.qk(this.kb.receiver.friendlyName);
      var b = this.a.src;
      !b && this.a.da && (b = this.a.da);
      null != this.a.Uh && (b = this.a.Uh);
      a = null;
      this.a.da &&
        -1 < this.a.da.indexOf("vp9") &&
        (a = this.a.da + "/cast.mpd");
      null != this.a.Sf
        ? ((b = this.a.Sf), (b = b.replace("/stereo", "")))
        : this.a.da && ((b = this.a.da), (b = b.replace("/stereo", "")));
      if (null != this.a.Sf || this.a.da)
        this.a.M ? this.a.ie() : null == this.a.Z && this.a.ie();
      this.a.log(this.c, "file: " + b);
      this.a.log(this.c, "vp9File: " + a);
      b = new window.chrome.cast.media.MediaInfo(b, "video/mp4");
      this.a.da &&
        ((b.customData = {
          licenseUrl: this.a.Wc,
          licenseHeader: this.a.Db,
          vp9File: a,
        }),
        this.a.M
          ? (b.streamType = window.chrome.cast.media.StreamType.LIVE)
          : (b.duration = this.a.f.duration));
      a = new window.chrome.cast.media.MovieMediaMetadata();
      a.type = window.chrome.cast.media.MetadataType.MOVIE;
      this.a.f.hasOwnProperty("title") &&
        null != this.a.f.title &&
        (a.title = window.decodeURIComponent(this.a.f.title));
      this.a.M
        ? ((a.images = [new window.chrome.cast.Image(this.a.ka.logo)]),
          (a.title = window.decodeURIComponent(this.a.ka.title)))
        : (a.images = [new window.chrome.cast.Image(this.a.f.thumb)]);
      b.metadata = a;
      a = new window.chrome.cast.media.LoadRequest(b);
      a.autoplay = !0;
      this.a.M ||
        (a.currentTime =
          null != this.wa && 0 < this.wa.currentTime ? this.wa.currentTime : 0);
      this.kb.loadMedia(a, this.Dm.bind(this, "loadMedia"), this.Em.bind(this));
    };
    P.fn = function () {
      this.cf();
      this.Mh == window.chrome.cast.SessionStatus.STOPPED;
      this.bj();
      if (y(this.wa)) {
        var a =
          window.cast.framework.CastContext.getInstance().getCurrentSession();
        a && (a.endSession(!0), this.cd(!1), this.a.controls.qa(!0));
      } else {
        this.a.video.currentTime = this.wa.currentTime;
        this.a.controls.currentTime.innerHTML = this.a.controls.qc(
          this.wa.currentTime
        );
        this.a.controls.ob.$a(
          (100 / this.a.video.duration) * this.wa.currentTime + "%"
        );
        var b = this;
        this.kb.stop(
          function () {
            b.cd(!1);
            b.a.controls.qa(!0);
            b.kb = null;
          },
          function () {}
        );
      }
    };
    P.Sp = function () {
      this.a.view.Sc.C("pb-ccast-float-on");
    };
    P.Rp = function () {
      this.a.view.Sc.C("pb-ccast-float-on");
    };
    P.Bm = function () {};
    P.cf = function () {
      y(this.lg) || (window.clearInterval(this.lg), (this.lg = null));
    };
    P.Dm = function (a, b) {
      if (
        null != b &&
        b.media.metadata.title == window.decodeURIComponent(this.a.f.title)
      ) {
        this.a.view.Sc.s("pb-ccast-float-on");
        this.fo(this.kb.receiver.friendlyName);
        this.a.getState() == this.a.state.ga &&
          (this.a.pause(), this.a.controls.N.m());
        this.wa = b;
        this.wa.addUpdateListener(this.Fm.bind(this));
        this.cf();
        var d = this;
        this.lg = window.setInterval(function () {
          y(d.wa) ||
            d.wa.getStatus(
              new window.chrome.cast.media.GetStatusRequest(),
              function () {},
              function () {}
            );
        }, 1e3);
        0 < this.a.l() &&
          0 == this.wa.currentTime &&
          (this.cb(this.a.l()),
          (a = this.a.video.volume),
          this.L(100 * a, 0 >= a));
        this.a.controls.ba(!0);
      }
    };
    P.Em = function () {
      this.a.view.Sc.C("pb-ccast-float-on");
      this.bj();
    };
    P.Fm = function () {
      y(this.kb) || (this.Mh = this.kb.status);
      this.isConnected(!0)
        ? (this.a.getState() == this.a.state.ga && this.a.pause(), this.cd(!0))
        : this.cd(!1);
      this.a.controls.N.R() && this.a.controls.N.m();
      0 < this.kb.media.length &&
        ((this.wa = this.kb.media[0]),
        (this.a.controls.currentTime.innerHTML = this.a.controls.qc(
          this.wa.currentTime
        )),
        this.a.controls.ob.$a(
          (100 / this.a.video.duration) * this.wa.currentTime + "%"
        ));
    };
    P.Qp = function () {
      this.cd(!1);
      this.a.controls.qa(!0);
      this.cf();
    };
    P.play = P.resume = function () {
      y(this.wa) ||
        this.wa.play(
          null,
          function () {},
          function () {}
        );
    };
    P.pause = function () {
      y(this.wa) ||
        this.wa.pause(
          null,
          function () {},
          function () {}
        );
    };
    P.stop = function () {
      this.cf();
      y(this.wa) ||
        this.wa.stop(
          null,
          function () {},
          function () {}
        );
    };
    P.cb = function (a) {
      if (!y(this.wa)) {
        var b = new window.chrome.cast.media.SeekRequest();
        b.currentTime = a;
        this.wa.seek(
          b,
          function () {},
          function () {}
        );
      }
    };
    P.L = function (a, b) {
      1 >= a && (a *= 100);
      if (!y(this.wa)) {
        var d = new window.chrome.cast.Volume();
        a = Number(a);
        0 < a && (a /= 100);
        d.level = a;
        d.muted = b;
        a = new window.chrome.cast.media.VolumeRequest();
        a.volume = d;
        this.wa.setVolume(
          a,
          function () {},
          function () {}
        );
      }
    };
  } catch (a) {}
  (function () {
    var a = "";
    a =
      "undefined" !== typeof window.document.querySelectorAll
        ? window.document.querySelectorAll("div[id^='mediaplayer']")
        : (function (a, b) {
            var d = [];
            b = new RegExp("(^| )" + b + "( |$)");
            a = a.getElementsByTagName("*");
            for (var f = 0, g = a.length; f < g; f++)
              b.test(a[f].className) && d.push(a[f]);
            return d;
          })(window.document, "mediaplayers");
    var b = "",
      d = null;
    "function" === typeof La && (d = new La());
    null !== d &&
      (d.video() && "" != d.video().Nl
        ? (b = "html5")
        : d.Gl() && (b = "flash"));
    d.Ql() && (b = "html5");
    -1 != window.navigator.userAgent.indexOf("Android") && (b = "html5");
    for (d = 0; d < a.length; d++)
      if (a[d].hasAttribute("player_data"))
        if ("html5" === b && "function" === typeof Q)
          new Q(JSON.parse(a[d].getAttribute("player_data")), a[d]);
        else {
          a[d].innerHTML =
            '\x3c!--googleoff: all--\x3e<div class="pb-info-error-plug"><img class="pb-resp-width-max" src="//static.cda.pl/v001/img/mobile/v16x9.png"><div class="pb-info-error-plug-txt">Aby ogl\u0105da\u0107 zaaktualizuj swoj\u0105 przegl\u0105dark\u0119.</div></div>\x3c!--googleon: all--\x3e';
          try {
            var f = new Image(1, 1);
            f.onload = function () {};
            f.src =
              "https://g.cda.pl/g.php?pixel&vi=YmNiYjM2NTFlZjdjN2QxZGQzZGNkNmE3ZmIwMmQ2OWE_MTUyOA&pl=impression&ct=" +
              new Date().getTime();
          } catch (g) {}
        }
  })();
}.call(window));