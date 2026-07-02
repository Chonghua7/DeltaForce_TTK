(() => {
  var ie = {
      1: {
        base: 1.1,
        armor: {
          1: { armorMult: 0.6, pen: 0.5 },
          2: { armorMult: 0.6, pen: 0 },
          3: { armorMult: 0.4, pen: 0 },
          4: { armorMult: 0.3, pen: 0 },
          5: { armorMult: 0.2, pen: 0 },
          6: { armorMult: 0.2, pen: 0 },
        },
      },
      2: {
        base: 1.1,
        armor: {
          1: { armorMult: 0.7, pen: 0.75 },
          2: { armorMult: 0.7, pen: 0.5 },
          3: { armorMult: 0.7, pen: 0 },
          4: { armorMult: 0.5, pen: 0 },
          5: { armorMult: 0.4, pen: 0 },
          6: { armorMult: 0.3, pen: 0 },
        },
      },
      3: {
        base: 1,
        armor: {
          1: { armorMult: 0.9, pen: 1 },
          2: { armorMult: 0.9, pen: 0.75 },
          3: { armorMult: 0.9, pen: 0.5 },
          4: { armorMult: 0.9, pen: 0 },
          5: { armorMult: 0.5, pen: 0 },
          6: { armorMult: 0.4, pen: 0 },
        },
      },
      4: {
        base: 1,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      5: {
        base: 1,
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 0.75 },
          5: { armorMult: 1.1, pen: 0.5 },
          6: { armorMult: 1.1, pen: 0 },
        },
      },
      M61: {
        base: 1,
        armor: {
          1: { armorMult: 1.2, pen: 1 },
          2: { armorMult: 1.2, pen: 1 },
          3: { armorMult: 1.2, pen: 1 },
          4: { armorMult: 1.2, pen: 1 },
          5: { armorMult: 1.2, pen: 0.75 },
          6: { armorMult: 1.2, pen: 0.5 },
        },
      },
      AP: {
        base: 1,
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 1 },
          5: { armorMult: 1.1, pen: 0.75 },
          6: { armorMult: 1.1, pen: 0.5 },
        },
      },
      RIP45: {
        base: 1.35,
        armor: {
          1: { armorMult: 0.4, pen: 0 },
          2: { armorMult: 0.3, pen: 0 },
          3: { armorMult: 0.2, pen: 0 },
          4: { armorMult: 0.2, pen: 0 },
          5: { armorMult: 0.2, pen: 0 },
          6: { armorMult: 0.2, pen: 0 },
        },
      },
      RIP: {
        base: 1.4,
        armor: {
          1: { armorMult: 0.4, pen: 0 },
          2: { armorMult: 0.3, pen: 0 },
          3: { armorMult: 0.2, pen: 0 },
          4: { armorMult: 0.2, pen: 0 },
          5: { armorMult: 0.2, pen: 0 },
          6: { armorMult: 0.2, pen: 0 },
        },
      },
      "R37.F": {
        base: 1.4,
        armor: {
          1: { armorMult: 0.4, pen: 0 },
          2: { armorMult: 0.3, pen: 0 },
          3: { armorMult: 0.2, pen: 0 },
          4: { armorMult: 0.2, pen: 0 },
          5: { armorMult: 0.2, pen: 0 },
          6: { armorMult: 0.2, pen: 0 },
        },
      },
      Double: {
        base: 0.66,
        armorBase: 0.1,
        penetrationLevel: 4,
        blunt: true,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0.4 },
          6: { armorMult: 1, pen: 0.3 },
        },
      },
      "BT +P": {
        base: 1.1,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      "ACP SUPER": {
        base: 0.85,
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 0.75 },
          5: { armorMult: 1.1, pen: 0.5 },
          6: { armorMult: 1.3, pen: 0 },
        },
      },
      "7.62×39 BP SUB": {
        base: 1.05,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      "7.62×39 AP SUB": {
        base: 1.05,
        armorBase: 1.1,
        armor: {
          1: { armorMult: 0.95, pen: 1 },
          2: { armorMult: 0.95, pen: 1 },
          3: { armorMult: 0.95, pen: 1 },
          4: { armorMult: 0.95, pen: 0.75 },
          5: { armorMult: 0.95, pen: 0.5 },
          6: { armorMult: 0.95, pen: 0 },
        },
      },
      ".300BLK V SUB": {
        base: 1.05,
        armor: {
          1: { armorMult: 0.9, pen: 1 },
          2: { armorMult: 0.9, pen: 0.75 },
          3: { armorMult: 0.9, pen: 0.5 },
          4: { armorMult: 0.9, pen: 0 },
          5: { armorMult: 0.5, pen: 0 },
          6: { armorMult: 0.4, pen: 0 },
        },
      },
      ".300BLK BCP SUB": {
        base: 1.05,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      "45-70 Govt FMJ": {
        base: 1,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      "45-70 Govt FTX": {
        base: 1,
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 0.75 },
          5: { armorMult: 1.1, pen: 0.5 },
          6: { armorMult: 1.1, pen: 0 },
        },
      },
      "M855A1 APC": {
        base: 1,
        armorBase: 1.15,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 0.75 },
          3: { armorMult: 1, pen: 0.5 },
          4: { armorMult: 1, pen: 0 },
          5: { armorMult: 0.6, pen: 0 },
          6: { armorMult: 0.5, pen: 0 },
        },
      },
      "M855A1 APC+": {
        base: 1.1,
        armorBase: 1.15,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.7, pen: 0 },
        },
      },
      "5.45×39mm BT ST": {
        base: 1,
        partMult: { head: 2.2, limbs: 0.35 },
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.75 },
          4: { armorMult: 1, pen: 0.5 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      "5.45×39mm BS ST+": {
        base: 1,
        partMult: { head: 2.2, stomach:1, limbs: 0.35 },
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 0.75 },
          5: { armorMult: 1.1, pen: 0.5 },
          6: { armorMult: 1.1, pen: 0 },
        },
      },
    },
    caliberMap = {
      M61: "7.62×51", AP: "6.8×51", RIP45: ".45", RIP: "9×19",
      Double: "12.7×55", "BT +P": "5.45×39", "ACP SUPER": ".45",
      "M855A1 APC": "5.56×45", "M855A1 APC+": "5.56×45",
      "R37.F": "5.7×28", "7.62×39 BP SUB": "7.62×39", "7.62×39 AP SUB": "7.62×39",
      ".300BLK V SUB": ".300 BLK", ".300BLK BCP SUB": ".300 BLK",
      "45-70 Govt FMJ": "45-70 Govt", "45-70 Govt FTX": "45-70 Govt",
      "5.45×39mm BT ST": "5.45×39", "5.45×39mm BS ST+": "5.45×39",
    },
    marlinAmmoProfiles = {
      4: {
        base: 1,
        armor: {
          1: { armorMult: 1, pen: 1 },
          2: { armorMult: 1, pen: 1 },
          3: { armorMult: 1, pen: 0.9 },
          4: { armorMult: 1, pen: 0.75 },
          5: { armorMult: 1, pen: 0 },
          6: { armorMult: 0.6, pen: 0 },
        },
      },
      5: {
        base: 1,
        armor: {
          1: { armorMult: 1.1, pen: 1 },
          2: { armorMult: 1.1, pen: 1 },
          3: { armorMult: 1.1, pen: 1 },
          4: { armorMult: 1.1, pen: 0.9 },
          5: { armorMult: 1.1, pen: 0.75 },
          6: { armorMult: 1.1, pen: 0 },
        },
      },
    };
  function getAmmoProfile(e, a) {
    return /^Marlin/.test(e.name) && (a === 4 || a === 5)
      ? marlinAmmoProfiles[a]
      : ie[a];
  }
  function isSpecialAmmoKey(e) {
    return typeof e == "string";
  }
  function isDoubleBluntAmmo(e) {
    return !!(e && e.blunt === true);
  }
  function getDoubleProjectileRawFlesh(e, a) {
    if (!isDoubleBluntAmmo(a)) return null;
    return e.flesh * (typeof a.base == "number" ? a.base : 1);
  }
  function getDoubleProjectileFlesh(e, a) {
    let t = getDoubleProjectileRawFlesh(e, a);
    return typeof t == "number" ? Math.round(t) : null;
  }
  function getDoubleProjectileArmorDamage(e, a) {
    if (!isDoubleBluntAmmo(a)) return null;
    return e.armor * (typeof a.armorBase == "number" ? a.armorBase : 1);
  }
  function getProjectileBaseFlesh(e, a) {
    let t = getDoubleProjectileRawFlesh(e, a);
    return typeof t == "number"
      ? t
      : e.flesh *
          ((e.name === "P90" || e.name === "AR57") &&
          (a === ie[1] || a === ie[2])
            ? 1.2
            : a.base);
  }
  function roundDamageValue(e) {
    if (typeof e != "number" || !isFinite(e)) return e;
    return Math.round((e + Number.EPSILON) * 100) / 100;
  }
  function roundDoubleBluntDamage(e) {
    if (typeof e != "number" || !isFinite(e)) return e;
    return Math.round((e + Number.EPSILON) * 10) / 10;
  }
  function getEffectivePartMultiplier(e, a, t) {
    let n = a == null ? void 0 : a.partMult,
      o = n && Object.prototype.hasOwnProperty.call(n, t) ? n[t] : void 0;
    return typeof o == "number" ? o : e.mult[t];
  }
  function getSpecialAmmoDisplayStats(e, a, t) {
    if (!isSpecialAmmoKey(a)) return null;
    let n = getAmmoProfile(e, a);
    if (!n) return null;
    let o = isDoubleBluntAmmo(n) ? getDoubleProjectileFlesh(e, n) : getProjectileBaseFlesh(e, n),
      r = n.armor?.[String(t.armorLevel)] || n.armor?.[t.armorLevel],
      s =
        (typeof n.armorBase == "number" ? n.armorBase : 1) *
        (typeof (r == null ? void 0 : r.armorMult) == "number"
          ? r.armorMult
          : 1),
      i =
        typeof getDoubleProjectileArmorDamage(e, n) == "number"
          ? getDoubleProjectileArmorDamage(e, n)
          : e.armor * s,
      u = Math.abs(o - e.flesh) > 1e-9,
      m = Math.abs(i - e.armor) > 1e-9,
      l = ["head", "chest", "stomach", "limbs"].reduce((d, g) => {
        let y = getEffectivePartMultiplier(e, n, g);
        return (d[g] = roundDamageValue(y)), d;
      }, {}),
      d = ["head", "chest", "stomach", "limbs"].some(
        (g) => Math.abs(l[g] - e.mult[g]) > 1e-9,
      );
    return u || m || d
      ? {
          flesh: roundDamageValue(o),
          armor: roundDamageValue(i),
          partMult: l,
          showFlesh: u,
          showArmor: m,
          showPartMult: d,
        }
      : null;
  }
  var me = ["head", "chest", "stomach", "limbs"];
  var _ = {
      MAX_DISTANCE: 100,
      CUTOFF_DISTANCE: 35,
      TOP_WEAPONS_COUNT: 10,
      PADDING_TOP: 40,
    },
    G = { DEFAULT_SIM_COUNT: 2e4, DISTANCE_SIM_COUNT: 2e4 },
    ce = 1.09,
    E = { SECONDS_TO_MS: 1e3, MINUTES_TO_SECONDS: 60 },
    z = {
      NO_MISS_FIRE: "rgba(54, 162, 235, 0.7)",
      EMPTY_DELAY: "rgba(75, 192, 192, 0.7)",
      FLIGHT_DELAY: "rgba(255, 159, 64, 0.7)",
      BURST_INTERVAL: "rgba(255, 99, 132, 0.7)",
      TRIGGER_DELAY: "rgba(153, 102, 255, 0.7)",
    },
    W = { NO_CHANGE: "#000000", RANK_UP: "#ff0000", RANK_DOWN: "#00ff00" };
  var U = 12345;
  function j() {
    U = 12345;
  }
  function Q() {
    return (
      (U = (1664525 * U + 1013904223) % Math.pow(2, 32)),
      U / Math.pow(2, 32)
    );
  }
  var k = class {
      static calculate(e, a) {
        let { ranges: t, decays: n } = a;
        return e < t[0]
          ? n[0]
          : e < t[1]
            ? n[1]
            : e < t[2]
              ? n[2]
              : e < t[3]
                ? n[3]
                : n[4];
      }
    },
    q = class {
      static calculate(e, a, t, n) {
        let o = getEffectivePartMultiplier(e, a, t);
        return getProjectileBaseFlesh(e, a) * o * n;
      }
    },
    x = class {
      static calculate(e, a, t, n) {
        if (t >= n) {
          let o = n / t;
          return { finalDamage: o * a + (1 - o) * e, remainingArmor: 0 };
        } else return { finalDamage: a, remainingArmor: n - t };
      }
    },
    H = class {
      static select(e) {
        let a = Q(),
          t = 0;
        for (let n of ["head", "chest", "stomach", "limbs"])
          if (((t += e[n]), a <= t)) return n;
        return "chest";
      }
    };
  var le = class {
      static calculateHitDamage(e, a, t, n, o, r) {
        let { armorLevel: s } = a,
          { armorVal: i } = r;
        return {
          damage: q.calculate(e, t, "limbs", n),
          newArmorState: { ...r },
          hitPart: "limbs",
        };
      }
    },
    oe = class {
      static calculateHitDamage(e, a, t, n, o, r) {
        let s = { ...r },
          i = 0,
          u = [];
        for (let m = 0; m < 2; m++) {
          let l = H.select(o),
            d = q.calculate(e, t, l, n),
            g = getDoubleProjectileArmorDamage(e, t);
          if (isDoubleBluntAmmo(t)) {
            if (l === "limbs") i += roundDoubleBluntDamage(d);
            else {
              let y = l === "head" ? a.helmetLevel : a.armorLevel,
                b = t.armor[y].pen,
                p = roundDoubleBluntDamage(d * b),
                v = t.armor[y].armorMult,
                h = g * v;
              if (l === "head")
                if (s.helmetVal <= 0) i += roundDoubleBluntDamage(d);
                else {
                  let f = x.calculate(d, p, h, s.helmetVal);
                  ((i += roundDoubleBluntDamage(f.finalDamage)), (s.helmetVal = f.remainingArmor));
                }
              else if (s.armorVal <= 0) i += roundDoubleBluntDamage(d);
              else {
                let f = x.calculate(d, p, h, s.armorVal);
                ((i += roundDoubleBluntDamage(f.finalDamage)), (s.armorVal = f.remainingArmor));
              }
            }
          } else {
            let y = l === "head" ? a.helmetLevel : a.armorLevel,
              b = t.armor[y].pen,
              p = d * b;
            if (l === "limbs") i += d;
            else if (l === "head")
              if (s.helmetVal <= 0) i += d;
              else {
                let v = t.armor[y].armorMult,
                  h = e.armor * (t.armorBase || 1) * v,
                  f = x.calculate(d, p, h, s.helmetVal);
                ((i += f.finalDamage), (s.helmetVal = f.remainingArmor));
              }
            else if (s.armorVal <= 0) i += d;
            else {
              let v = t.armor[y].armorMult,
                h = e.armor * (t.armorBase || 1) * v,
                f = x.calculate(d, p, h, s.armorVal);
              ((i += f.finalDamage), (s.armorVal = f.remainingArmor));
            }
          }
          u.push(l);
        }
        return { damage: i, newArmorState: s, hitPart: u[0] || "chest" };
      }
    },
    se = class {
      static calculateHitDamage(e, a, t, n, o, r) {
        let { armorLevel: s, helmetLevel: i } = a,
          { armorVal: u, helmetVal: m } = r,
          l = H.select(o),
          d = q.calculate(e, t, l, n),
          g = t.armor[s].pen,
          y = t.armor[i].pen,
          b = d * (l === "head" ? y : g),
          p,
          v = { ...r };
        if (l === "limbs") p = d;
        else if (l === "head") {
          let h = t.armor[i].armorMult,
            f = e.armor * (t.armorBase || 1) * h,
            M = x.calculate(d, b, f, m);
          ((p = M.finalDamage), (v.helmetVal = M.remainingArmor));
        } else {
          let h = t.armor[s].armorMult,
            f = e.armor * (t.armorBase || 1) * h,
            M = x.calculate(d, b, f, u);
          ((p = M.finalDamage), (v.armorVal = M.remainingArmor));
        }
        return { damage: p, newArmorState: v, hitPart: l };
      }
    },
    N = class {
      static getStrategy(e) {
        return e && /RIP/i.test(e) ? le : e === "Double" ? oe : se;
      }
    };
  var R = class {
      static simulateOneTTK(e, a, t, n = !1) {
        let o = a.healthValue || 100,
          r = { armorVal: a.armorValue, helmetVal: a.helmetValue },
          { bulletLevel: s, distance: i, hitProb: u } = a,
          m = typeof e.hitRate == "number" ? e.hitRate : a.hitRate,
          l = getAmmoProfile(e, s),
          d = e.fireMode === "burst" && e.burstCount && e.burstInternalROF,
          g = this._calculateShotInterval(e, d),
          y = k.calculate(i, e),
          b = 0,
          p = 0,
          v = { count: 0, totalTime: 0 },
          h = n ? [] : null;
        for (; o > 0; ) {
          if ((b++, d && this._updateBurstInterval(e, b, v), Q() > m)) continue;
          p++;
          let {
            damage: f,
            newArmorState: M,
            hitPart: I,
          } = t.calculateHitDamage(e, a, l, y, u, r);
          (n && h.push(I || "chest"), (o -= f), (r = M));
        }
        let w = i / e.velocity;
        return {
          time: this._calculateTotalTime(w, g, b, d, v, e),
          shots: b,
          hits: p,
          burstIntervalTime: v.totalTime,
          hitParts: h,
        };
      }
      static _calculateShotInterval(e, a) {
        return a ? 60 / e.burstInternalROF : 60 / e.rof;
      }
      static _updateBurstInterval(e, a, t) {
        a <= e.burstCount ||
          (a % e.burstCount === 1 &&
            ((t.count += 1), (t.totalTime += e.burstInterval)));
      }
      static _calculateTotalTime(e, a, t, n, o, r) {
        if (r && r.initialRof && r.initialRofShots && !n)
          return e + this._calculateVariableFireTime(r, t);
        let s = o.count,
          i = a * (t - 1 - s);
        return e + i + o.totalTime;
      }
      static _calculateVariableFireTime(e, a) {
        if (a <= 1) return 0;
        let t = 0;
        for (let n = 2; n <= a; n++) {
          let o = n <= e.initialRofShots ? e.initialRof : e.rof;
          t += 60 / o;
        }
        return t;
      }
      static calculateAvgStats(e, a, t = G.DEFAULT_SIM_COUNT, n) {
        let o = 0,
          r = 0,
          s = 0,
          i = 0;
        for (let u = 0; u < t; u++) {
          let m = this.simulateOneTTK(e, a, n);
          ((o += m.time),
            (r += m.shots),
            (s += m.shots - m.hits),
            (i += m.burstIntervalTime || 0));
        }
        return {
          weapon: { ...e },
          avgTime: o / t,
          avgShots: r / t,
          avgMisses: s / t,
          avgBurstInterval: i / t,
        };
      }
      static calculateWeaponsTTK(e, a, t) {
        return e
          .map((o, r) => {
            let s = a[r],
              i = this.getRealBulletKey(s.bulletType, o, t);
            if (!i) return null;
            let u = s.hitRate ?? t.hitRate,
              m = { ...t, hitRate: u, bulletLevel: i },
              l = N.getStrategy(i);
            return {
              ...this.calculateAvgStats(o, m, void 0, l),
              weapon: o,
              name: o.name,
              bulletKey: i,
              usedHitRate: u,
              ammoDisplayInfo: getSpecialAmmoDisplayStats(o, i, m),
            };
          })
          .filter(Boolean)
          .sort((o, r) => o.avgTime - r.avgTime);
      }
      static getRealBulletKey(e, a, t) {
        return e === "__EXCLUDE__"
          ? null
          : e ||
              ((a.allowedBullets || []).includes(t.bulletLevel)
                ? t.bulletLevel
                : null);
      }
    },
    Le = k.calculate,
    _e = R.simulateOneTTK.bind(R);
  var de = [
      { name: "\u65E0", mult: 0 },
      { name: "\u6B7B\u5BC2", mult: 0.24 },
      { name: "\u5148\u8FDB/\u8F7B\u8BED/\u52C7\u706B", mult: 0.18 },
      { name: "\u51B2\u950B\u67AA\u56DE\u58F0\u6D88\u97F3\u5668", mult: 0.3 },
    ],
    ge = [
      {
        name: "SR-3M",
        type: "冲锋枪",
        ranges: [15, 31, 1 / 0, 1 / 0],
        decays: [1, 0.75, 0.65, 0.65, 0.65],
        velocity: 330,
        flesh: 36,
        armor: 48,
        rof: 747,
        triggerDelay: 0,
        barrels: [
          {
            name: "SR-3M铸钢战术枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "勇士",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.7, 0.6, 0.5, 0.4],
        velocity: 500,
        flesh: 36,
        armor: 35,
        rof: 700,
        triggerDelay: 0,
        barrels: [
          {
            name: "勇士海狸枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
      {
        name: "MK4",
        type: "冲锋枪",
        ranges: [20, 30, 40, 1 / 0],
        decays: [1, 0.9, 0.8, 0.7, 0.7],
        velocity: 475,
        flesh: 34,
        armor: 30,
        rof: 793,
        triggerDelay: 0,
        burstCount: 3,
        burstInternalROF: 1200,
        burstInterval: 0.127,
        fireMode: "burst",
        barrels: [
          {
            name: "深空镀铬枪管",
            rangeMult: 1.18,
            damageBonus: -2,
            armorDamageBonus: -3,
            rofMult: 1.1,
            partMultAdd: { head: -0.1, stomach: -0.1, limbs: -0.1 },
            fireMode: "auto",
          },
          {
            name: "击剑手枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2, chest: 1, stomach: 1, limbs: 0.5 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "QCQ171",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 450,
        flesh: 36,
        armor: 33,
        rof: 763,
        fireControls: [
          { name: "高速导气箍", rof: 848 },
          { name: "稳固导气箍", rof: 694 },
        ],
        triggerDelay: 0,
        barrels: [
          {
            name: "新式渗透一体消音枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "新式红缨战术长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
      {
        name: "P90",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 450,
        flesh: 32,
        armor: 35,
        rof: 898,
        triggerDelay: 0,
        barrels: [
          {
            name: "重攻长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长弓精钢枪管",
            rangeMult: 1.333,
            ranges: [35, 60, 1 / 0, 1 / 0],
            decays: [1, 0.85, 0.7, 0.7, 0.7],
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 0.870824,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "R37.F"],
      },
      {
        name: "AR57",
        type: "步枪",
        ranges: [35, 50, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.75, 0.75, 0.75],
        velocity: 525,
        flesh: 30,
        armor: 31,
        rof: 900,
        triggerDelay: 0,
        barrels: [
          {
            name: "夜莺一体消音组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "AR57激流超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "R37.F"],
      },
      {
        name: "野牛",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 500,
        flesh: 32,
        armor: 35,
        rof: 659,
        triggerDelay: 0,
        barrels: [
          {
            name: "野牛刀锋超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
      {
        name: "Vector",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 500,
        flesh: 32,
        armor: 28,
        rof: 1091,
        triggerDelay: 0,
        barrels: [
          {
            name: "导轨枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长剑超长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP45", "ACP SUPER"],
      },
      {
        name: "MP7",
        type: "冲锋枪",
        ranges: [20, 27, 40, 1 / 0],
        decays: [1, 0.75, 0.65, 0.55, 0.55],
        velocity: 450,
        flesh: 32,
        armor: 28,
        rof: 950,
        triggerDelay: 0,
        barrels: [
          {
            name: "增强枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "蜂刺长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "月影镀铬枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "HVK格斗套件",
            rangeMult: 1,
            damageBonus: 5,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "MP5",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 450,
        flesh: 30,
        armor: 32,
        rof: 820,
        triggerDelay: 0,
        barrels: [
          {
            name: "战术枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "性能枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "斥候长枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "特勤一体消音枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
      {
        name: "UZI",
        type: "冲锋枪",
        ranges: [20, 27, 40, 55],
        decays: [1, 0.75, 0.65, 0.55, 0.45],
        velocity: 450,
        flesh: 28,
        armor: 35,
        rof: 780,
        triggerDelay: 67,
        barrels: [
          {
            name: "军需长枪管",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "竞赛性能长枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
      {
        name: "SMG-45",
        type: "冲锋枪",
        ranges: [27, 54, 90, 1 / 0],
        decays: [1, 0.75, 0.65, 0.55, 0.55],
        velocity: 500,
        flesh: 35,
        armor: 40,
        rof: 605,
        triggerDelay: 0,
        barrels: [
          {
            name: "实用重枪管",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "裂变长枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长弩超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP45", "ACP SUPER"],
      },
      {
        name: "K416",
        type: "步枪",
        ranges: [27, 54, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 31,
        armor: 35,
        rof: 880,
        triggerDelay: 0,
        barrels: [
          {
            name: "精英重枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "A8枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "A8长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "AS Val",
        type: "步枪",
        ranges: [21, 40, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.8, 0.8, 0.8],
        velocity: 300,
        flesh: 28,
        armor: 44,
        rof: 972,
        triggerDelay: 0,
        barrels: [
          {
            name: "VSS海啸长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "刺客高级枪管",
            ranges: [40, 60, 1 / 0, 1 / 0],
            decays: [1, 0.85, 0.75, 0.75, 0.75],
            rangeMult: 1.4,
            damageBonus: 8,
            armorDamageBonus: 0,
            rofMult: 0.7,
            partMultAdd: { head: -0.2, stomach: 0.1, limbs: 0.2 },
            burstCount: 4,
            burstInternalROF: 845,
            burstInterval: 0.14,
            fireMode: "burst",
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "腾龙",
        type: "步枪",
        ranges: [35, 62, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 35,
        armor: 38,
        rof: 706,
        fireControls: [
          { name: "高速导气箍", rof: 759 },
          { name: "稳固导气箍", rof: 660 },
        ],
        triggerDelay: 0,
        barrels: [
          {
            name: "新式蛟龙战术长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2.1, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5],
      },
      {
        name: "K437",
        type: "步枪",
        ranges: [35, 60, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 36,
        armor: 32,
        rof: 780,
        triggerDelay: 0,
        barrels: [
          {
            name: "特攻一体消音枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长矛手长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, ".300BLK V SUB", ".300BLK BCP SUB"],
      },
      {
        name: "MCX LT",
        type: "步枪",
        ranges: [30, 50, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 450,
        flesh: 34,
        armor: 26,
        rof: 840,
        triggerDelay: 0,
        barrels: [
          {
            name: "焰魂枪管",
            rangeMult: 1,
            damageBonus: 2,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: 30,
          },
          {
            name: "猎手枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.35 },
        allowedBullets: [3, 4, 5, ".300BLK V SUB", ".300BLK BCP SUB"],
      },
      {
        name: "SG552",
        type: "步枪",
        ranges: [35, 65, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.75, 0.75, 0.75],
        velocity: 575,
        flesh: 25,
        armor: 34,
        rof: 906,
        triggerDelay: 0,
        barrels: [
          {
            name: "骑士重枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "M250",
        type: "轻机枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 630,
        flesh: 55,
        armor: 53,
        rof: 550,
        triggerDelay: 100,
        barrels: [
          {
            name: "钛金长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            partMultAdd: { stomach: 0.2 },
          },
        ],
        mult: { head: 1.82, chest: 1, stomach: 0.7, limbs: 0.4 },
        allowedBullets: [4, 5, "AP"],
      },
      {
        name: "PKM",
        type: "轻机枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 630,
        flesh: 45,
        armor: 42,
        rof: 669,
        triggerDelay: 50,
        barrels: [
          {
            name: "地平线重枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "AKM",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 525,
        flesh: 40,
        armor: 42,
        rof: 600,
        triggerDelay: 0,
        barrels: [
          {
            name: "性能枪管组合",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            partMultAdd: { head: 0.6 },
          },
          {
            name: "超然长枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "海狸长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "实用长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "7.62×39 BP SUB", "7.62×39 AP SUB"],
      },
      {
        name: "MK47",
        type: "步枪",
        ranges: [30, 45, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 525,
        flesh: 42,
        armor: 46,
        rof: 625,
        triggerDelay: 0,
        barrels: [
          {
            name: "鏖战枪管",
            rangeMult: 0.82,
            damageBonus: 4,
            armorDamageBonus: 1,
            rofMult: 1,
          },
          {
            name: "余烬枪管",
            rangeMult: 1.18,
            decays: [1, 0.9, 0.7, 0.7, 0.7],
            damageBonus: 3,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "7.62×39 BP SUB", "7.62×39 AP SUB"],
      },
      {
        name: "SCAR-H",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.75, 0.75, 0.75],
        velocity: 630,
        flesh: 40,
        armor: 41,
        rof: 585,
        triggerDelay: 0,
        barrels: [
          {
            name: "实用标准枪管",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "海狸长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "M14",
        type: "精确射手步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.8, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 39,
        armor: 41,
        rof: 727,
        triggerDelay: 0,
        barrels: [
          {
            name: "漫游标准枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "洞察超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "PTR-32",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 630,
        flesh: 36,
        armor: 37,
        rof: 632,
        triggerDelay: 0,
        barrels: [
          {
            name: "G3守卫标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3加强长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3平台神射枪管组合",
            rangeMult: 1.36,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 0.87,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "7.62×39 BP SUB", "7.62×39 AP SUB"],
      },
      {
        name: "AKS-74U",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.8, 0.6, 0.6, 0.6],
        velocity: 500,
        flesh: 34,
        armor: 36,
        rof: 533,
        triggerDelay: 0,
        barrels: [],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "BT +P"],
      },
      {
        name: "QJB201",
        type: "轻机枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 32,
        armor: 38,
        rof: 785,
        fireControls: [
          { name: "高速导气箍", rof: 873 },
          { name: "稳固导气箍", rof: 714 },
        ],
        triggerDelay: 50,
        barrels: [
          {
            name: "新式重锤战术枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "新式獠牙短枪管",
            rangeMult: 1,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            triggerDelayDelta: -50,
          },
        ],
        mult: { head: 2.1, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5],
      },
      {
        name: "M249",
        type: "轻机枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 30,
        armor: 38,
        rof: 858,
        triggerDelay: 50,
        barrels: [
          {
            name: "犀牛长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "HVK链锯套件",
            rangeMult: 1,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: 86,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "AK-12",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.75, 0.75, 0.75],
        velocity: 575,
        flesh: 30,
        armor: 42,
        rof: 735,
        triggerDelay: 0,
        barrels: [
          {
            name: "精英脚架长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.45 },
        allowedBullets: [1, 2, 3, 4, 5, "BT +P"],
      },
      {
        name: "M4A1",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 31,
        armor: 33,
        rof: 800,
        triggerDelay: 0,
        barrels: [
          {
            name: "AR特勤一体消音组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            partMultAdd: { head: 0.6 },
          },
          {
            name: "AR战壕标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "AR碳纤维枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "AR加百列长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "BT +P"],
      },
      {
        name: "CAR-15",
        type: "步枪",
        ranges: [40, 70, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 27,
        armor: 32,
        rof: 632,
        triggerDelay: 0,
        barrels: [
          {
            name: "AR特勤一体消音组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            partMultAdd: { head: 0.6 },
          },
          {
            name: "AR战壕标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "AR碳纤维枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "AR加百列长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "M7",
        type: "步枪",
        ranges: [50, 85, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.8, 0.8, 0.8],
        velocity: 630,
        flesh: 37,
        armor: 40,
        rof: 649,
        triggerDelay: 0,
        barrels: [
          {
            name: "实用长枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "堤风超长枪管组合",
            rangeMult: 1.3,
            damageBonus: 2,
            armorDamageBonus: 2,
            rofMult: 1,
          },
          {
            name: "灵蜥短枪管",
            rangeMult: 0.7,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 1, limbs: 0.35 },
        allowedBullets: [4, 5, "AP"],
      },
      {
        name: "RM277",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.8, 0.8, 0.8],
        velocity: 650,
        flesh: 41,
        armor: 42,
        rof: 550,
        triggerDelay: 0,
        barrels: [
          {
            name: "RM277鲸鲨枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "RM277重型一体枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 1, limbs: 0.4 },
        allowedBullets: [4, 5, "AP"],
      },
      {
        name: "ASh-12",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.85, 0.85, 0.85],
        velocity: 340,
        flesh: 56,
        armor: 55,
        rof: 500,
        triggerDelay: 0,
        barrels: [
          {
            name: "歼灭高精长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "战斧重型枪管",
            rangeMult: 1.47,
            ranges: [55, 90, 1 / 0, 1 / 0],
            damageBonus: 19,
            armorDamageBonus: -15,
            partMultAdd: { head: 0.15, stomach: -0.2, limbs: -0.2 },
            rofMult: 0.8,
          },
        ],
        mult: { head: 1.6, chest: 1, stomach: 0.9, limbs: 0.45 },
        allowedBullets: [3, 4, 5, "Double"],
      },
      {
        name: "G3",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.8, 0.8, 0.8],
        velocity: 630,
        flesh: 39,
        armor: 42,
        rof: 533,
        triggerDelay: 0,
        barrels: [
          {
            name: "G3守卫标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3加强长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3平台神射枪管组合",
            rangeMult: 1.36,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 0.87,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "AUG",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.8, 0.8, 0.8],
        velocity: 575,
        flesh: 32,
        armor: 35,
        rof: 679,
        triggerDelay: 0,
        barrels: [
          {
            name: "实用集成三倍镜枪管",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "晨零一体消音管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "精英脚架长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2, chest: 1.1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "KC17",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 31,
        armor: 48,
        rof: 740,
        triggerDelay: 0,
        barrels: [
          {
            name: "影舞者消音",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长剑枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "BT +P"],
      },
      {
        name: "QBZ95-1",
        type: "步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 28,
        armor: 42,
        rof: 679,
        triggerDelay: 0,
        barrels: [
          {
            name: "战术枪管",
            rangeMult: 1.06,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "长弓枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2.3, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5],
      },
      {
        name: "Marlin",
        type: "精确射手步枪",
        ranges: [30, 50, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.75, 0.75, 0.75],
        velocity: 750,
        flesh: 70,
        armor: 25,
        rof: 100,
        triggerDelay: 0,
        barrels: [
          {
            name: "猎鹿人枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.45 },
        allowedBullets: [4, 5],
      },
      {
        name: "Marlin犀牛",
        type: "精确射手步枪",
        ranges: [20, 40, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.75, 0.75, 0.75],
        velocity: 750,
        flesh: 100,
        armor: 25,
        rof: 75,
        triggerDelay: 0,
        barrels: [
          {
            name: "猎鹿人枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.4, chest: 1, stomach: 0.67, limbs: 0.34 },
        allowedBullets: [4, 5],
      },
      {
        name: "Marlin蜂鸟",
        type: "精确射手步枪",
        ranges: [30, 50, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.75, 0.75, 0.75],
        velocity: 750,
        flesh: 75,
        armor: 59,
        rof: 200,
        triggerDelay: 0,
        barrels: [
          {
            name: "猎鹿人枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.5, chest: 1, stomach: 0.9, limbs: 0.45 },
        allowedBullets: [4, 5],
      },
      {
        name: "PSG-1",
        type: "精确射手步枪",
        ranges: [90, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.85, 0.85, 0.85],
        velocity: 550,
        flesh: 50,
        armor: 55,
        rof: 300,
        triggerDelay: 0,
        barrels: [
          {
            name: "G3平台神射枪管组合",
            rangeMult: 1.36,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: -39,
          },
          {
            name: "G3加强长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3守卫标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2.1, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "SR9",
        type: "精确射手步枪",
        ranges: [90, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.85, 0.85, 0.85],
        velocity: 550,
        flesh: 50,
        armor: 55,
        rof: 261,
        triggerDelay: 0,
        barrels: [
          {
            name: "G3平台神射枪管组合",
            rangeMult: 1.36,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: -34,
          },
          {
            name: "G3加强长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "G3守卫标准枪管组合",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "SR-25",
        type: "精确射手步枪",
        ranges: [60, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.85, 0.85, 0.85],
        velocity: 550,
        flesh: 50,
        armor: 55,
        rof: 364,
        triggerDelay: 0,
        barrels: [
          {
            name: "SR25瞬息短枪管",
            rangeMult: 0.82,
            damageBonus: 5,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: 84,
            damageBonus: 5,
            armorDamageBonus: 0,
            rofMult: 1,
            rofAdd: 84,
          },
          {
            name: "SR25追风长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "SR25新星超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2.1, chest: 1, stomach: 1, limbs: 0.5 },
        allowedBullets: [2, 3, 4, 5, "M61"],
      },
      {
        name: "SKS",
        type: "精确射手步枪",
        ranges: [55, 90, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.7, 0.7, 0.7],
        velocity: 575,
        flesh: 48,
        armor: 49,
        rof: 510,
        triggerDelay: 0,
        barrels: [
          {
            name: "SKS瞬息超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, 5, "7.62×39 BP SUB", "7.62×39 AP SUB"],
      },
      {
        name: "SVD",
        type: "精确射手步枪",
        ranges: [70, 90, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.625, 0.625, 0.625],
        velocity: 500,
        flesh: 56,
        armor: 56,
        rof: 300,
        triggerDelay: 0,
        barrels: [
          {
            name: "SVD黑刺超长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
          {
            name: "SVD实用长枪管",
            rangeMult: 1.18,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 2.3, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "SVCH",
        type: "精确射手步枪",
        ranges: [65, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.9, 0.9, 0.9, 0.9],
        velocity: 680,
        flesh: 47,
        armor: 46,
        rof: 600,
        fireControls: [
          { name: "镀铬爆发扳机", initialRof: 700, initialRofShots: 4 },
        ],
        triggerDelay: 0,
        barrels: [
          {
            name: "SVCH碳纤长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
            fireMode: "auto",
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "VSS",
        type: "精确射手步枪",
        ranges: [120, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.85, 0.85, 0.85],
        velocity: 330,
        flesh: 40,
        armor: 48,
        rof: 480,
        triggerDelay: 0,
        barrels: [
          {
            name: "VSS海啸长枪管组合",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 1, limbs: 0.5 },
        allowedBullets: [3, 4, 5],
      },
      {
        name: "Mini-14",
        type: "精确射手步枪",
        ranges: [90, 1 / 0, 1 / 0, 1 / 0],
        decays: [1, 0.85, 0.85, 0.85, 0.85],
        velocity: 650,
        flesh: 34,
        armor: 38,
        rof: 590,
        triggerDelay: 0,
        barrels: [
          {
            name: "mini-14增强枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.5 },
        allowedBullets: [1, 2, 3, 4, 5],
      },
      {
        name: "G18",
        type: "手枪",
        ranges: [10, 20, 30, 1 / 0],
        decays: [1, 0.85, 0.7, 0.6, 0.6],
        velocity: 400,
        flesh: 23,
        armor: 16,
        rof: 1172,
        triggerDelay: 0,
        barrels: [
          {
            name: "冲击长枪管",
            rangeMult: 1.3,
            damageBonus: 0,
            armorDamageBonus: 0,
            rofMult: 1,
          },
        ],
        mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
        allowedBullets: [1, 2, 3, 4, "RIP"],
      },
    ];
  function _appendUniqueBulletsToWeapons(e, a) {
    let t = new Set(e);
    ge.forEach((n) => {
      if (!t.has(n.name)) return;
      a.forEach((r) => {
        n.allowedBullets.includes(r) || n.allowedBullets.push(r);
      });
    });
  }
  var Y = class {
    constructor() {
      ((this.weapons = ge),
        (this.muzzles = de),
        (this.clonedWeapons = []),
        (this.maxClones = 5),
        this._initSpecialBullets());
    }
    _initSpecialBullets() {
      _appendUniqueBulletsToWeapons(
        ["K416", "SG552", "M249", "M4A1", "CAR-15", "AUG", "Mini-14"],
        ["M855A1 APC", "M855A1 APC+"],
      );
      _appendUniqueBulletsToWeapons(["AKS-74U", "AK-12", "KC17"], [
        "5.45×39mm BT ST",
        "5.45×39mm BS ST+",
      ]);
    }
    addClone(e, a, t) {
      if (this.clonedWeapons.length >= this.maxClones) return !1;
      let n = this.weapons[e],
        o = this.getNextCloneNumber(e),
        r = document.querySelector(
          `.velocity-precision-slider[data-weapon="${e}"]`,
        ),
        s = r ? parseFloat(r.value) : 0,
        i = {
          ...n,
          name: `${n.name} [\u526F\u672C${o}]`,
          isClone: !0,
          originalIndex: e,
          cloneNumber: o,
          attachmentConfig: { ...a, velocityPrecision: s },
        };
      return (this.clonedWeapons.push(i), !0);
    }
    removeClone(e) {
      e >= 0 &&
        e < this.clonedWeapons.length &&
        (this.clonedWeapons.splice(e, 1), this.renumberClones());
    }
    getNextCloneNumber(e) {
      return this.clonedWeapons.filter((t) => t.originalIndex === e).length + 1;
    }
    renumberClones() {
      let e = {};
      (this.clonedWeapons.forEach((a) => {
        (e[a.originalIndex] || (e[a.originalIndex] = []),
          e[a.originalIndex].push(a));
      }),
        Object.values(e).forEach((a) => {
          a.forEach((t, n) => {
            ((t.cloneNumber = n + 1),
              (t.name = `${this.weapons[t.originalIndex].name} [\u526F\u672C${t.cloneNumber}]`));
          });
        }));
    }
    getAllWeapons() {
      return [...this.weapons, ...this.clonedWeapons];
    }
    getWeaponVelocityPrecision(e, a, t) {
      if (a) {
        let n = this.clonedWeapons[e];
        if (
          n &&
          n.attachmentConfig &&
          n.attachmentConfig.velocityPrecision !== void 0
        )
          return n.attachmentConfig.velocityPrecision;
      } else {
        let n = document.querySelector(
          `.velocity-precision-slider[data-weapon="${e}"]`,
        );
        if (n) return parseFloat(n.value);
      }
      return 0;
    }
    getClonedWeapons() {
      return this.clonedWeapons;
    }
    canAddClone() {
      return this.clonedWeapons.length < this.maxClones;
    }
    readAttachmentsWithBullet(e, a, t, n, o) {
      return this.weapons.map((r, s) => {
        let i = e[s] || "",
          u = a[s] || "",
          m = o ? o[s] || "" : "",
          [, l] = i.split("|").map(Number),
          [, d] = u.split("|").map(Number),
          [, g] = m.split("|").map(Number),
          y = t[s] === "" ? null : Number(t[s]),
          b = n ? n[s] : null;
        return {
          barrelIndex: l === -1 ? 0 : l,
          muzzleIndex: d === -1 ? 0 : d,
          fireControlIndex: g === -1 || isNaN(g) ? 0 : g,
          hitRate: y,
          bulletType: b,
        };
      });
    }
    _computeAttachmentStats(e, a, t, n, o) {
      let r = a ? a.rangeMult : 1,
        s = t ? t.mult : 0,
        i = r + s,
        u = i * (1 + o),
        m = a ? a.rofMult : 1,
        l = a && a.damageBonus !== void 0 ? a.damageBonus : 0,
        d = a && a.armorDamageBonus !== void 0 ? a.armorDamageBonus : 0,
        g = a && a.partMultAdd ? a.partMultAdd : null,
        y = { ...e.mult };
      if (g) for (let D in g) y[D] = (y[D] ?? 1) + g[D];
      let b = e.triggerDelay || 0,
        p = a && typeof a.triggerDelayDelta == "number" ? a.triggerDelayDelta : 0,
        v = Math.max(0, Math.round(b + p)),
        h;
      a && Array.isArray(a.ranges) && a.ranges.length > 0
        ? (h = a.ranges)
        : (h = e.ranges.map((D) => D * i));
      let f = a && Array.isArray(a.decays) && a.decays.length > 0 ? a.decays : e.decays,
        M = e.velocity * u,
        I = a && a.fireMode !== void 0 ? a.fireMode : e.fireMode || null,
        w = a && a.burstCount !== void 0 ? a.burstCount : e.burstCount,
        O = a && a.burstInternalROF !== void 0 ? a.burstInternalROF : e.burstInternalROF,
        V = a && a.burstInterval !== void 0 ? a.burstInterval : e.burstInterval;
      I === "auto" && ((w = void 0), (O = void 0), (V = void 0));
      let F = n && typeof n.rof == "number" ? n.rof : e.rof,
        L = n && typeof n.initialRof == "number" ? n.initialRof : e.initialRof,
        R0 = n && typeof n.initialRofShots == "number" ? n.initialRofShots : e.initialRofShots,
        C = a && typeof a.rofAdd == "number" ? a.rofAdd : 0;
      return {
        velocity: M,
        ranges: h,
        decays: f,
        rof: F * m + C,
        flesh: e.flesh + l,
        armor: e.armor + d,
        mult: y,
        triggerDelay: v,
        fireMode: I,
        burstCount: w,
        burstInternalROF: O,
        burstInterval: V,
        initialRof: L,
        initialRofShots: R0,
        activeBarrelName: a ? a.name : null,
        activeFireControlName: n ? n.name : null,
      };
    }
    applyAttachments(e, a) {
      let t = this.weapons.map((r, s) => {
          let { barrelIndex: i, muzzleIndex: u, hitRate: m, fireControlIndex: fcIndex } = e[s],
            l = i > 0 ? r.barrels[i - 1] : null,
            d = u > 0 ? this.muzzles[u] : null,
            fc = fcIndex > 0 && r.fireControls ? r.fireControls[fcIndex - 1] : null,
            g = this.getWeaponVelocityPrecision(s, !1, a),
            y = this._computeAttachmentStats(r, l, d, fc, g);
          return { ...r, ...y, hitRate: m ?? r.hitRate };
        }),
        n = this.clonedWeapons.map((r, s) => {
          let { barrelIndex: i, muzzleIndex: u, hitRate: m, fireControlIndex: fcIndex } = r.attachmentConfig,
            l = i > 0 ? r.barrels[i - 1] : null,
            d = u > 0 ? this.muzzles[u] : null,
            fc = fcIndex > 0 && r.fireControls ? r.fireControls[fcIndex - 1] : null,
            g = this.getWeaponVelocityPrecision(s, !0, a),
            y = this._computeAttachmentStats(r, l, d, fc, g);
          return { ...r, ...y, hitRate: m ?? r.hitRate };
        });
      return [...t, ...n];
    }
    getWeapons() {
      return this.weapons;
    }
    getMuzzles() {
      return this.muzzles;
    }
    validateWeaponHitRates(e) {
      for (let a = 0; a < e.length; a++) {
        let { hitRate: t } = e[a];
        if (t != null && (t < 0 || t > 1))
          throw new Error(
            `\u6B66\u5668 ${a + 1} \u7684\u547D\u4E2D\u7387\u5FC5\u987B\u5728 0 \u5230 1 \u4E4B\u95F4`,
          );
      }
      return !0;
    }
    calculateCloneDisplayData(e, a = {}) {
      let { barrelIndex: t, muzzleIndex: n, hitRate: o, fireControlIndex: fcIndex } = e.attachmentConfig,
        r = t > 0 ? e.barrels[t - 1] : null,
        s = n > 0 ? this.muzzles[n] : null,
        fc = fcIndex > 0 && e.fireControls ? e.fireControls[fcIndex - 1] : null,
        i = a.muzzlePrecisionEnable && r ? 0.09 : 0,
        u = this._computeAttachmentStats(e, r, s, fc, i);
      return {
        velocity: Math.round(u.velocity),
        ranges: u.ranges,
        decays: u.decays,
        rof: Math.round(u.rof * 100) / 100,
        flesh: Math.round(u.flesh),
        armor: Math.round(u.armor),
        hitRate: o ?? e.hitRate,
        mult: u.mult,
        triggerDelay: u.triggerDelay,
      };
    }
  };
  function K(c) {
    return c.map((e) => (e === 1 / 0 ? "\u221E" : e)).join(", ");
  }
  function $(c, e = "ms") {
    switch (e) {
      case "ms":
        return `${Math.round(c * E.SECONDS_TO_MS)}ms`;
      case "ms_raw":
        return Math.round(c * E.SECONDS_TO_MS);
      case "s":
        return `${c.toFixed(3)}s`;
      case "min":
        return `${(c / 60).toFixed(3)}min`;
      default:
        return `${Math.round(c * E.SECONDS_TO_MS)}ms`;
    }
  }
  function P(c) {
    if (!c) return "";
    let e = (r, s = 2) => {
        if (typeof r != "number") return r;
        let i = s === 2 ? 100 : Math.pow(10, s);
        return Math.round((r + Number.EPSILON) * i) / i;
      },
      a = e(c.head),
      t = e(c.chest),
      n = e(c.stomach),
      o = e(c.limbs);
    return `${a}/${t}/${n}/${o}`;
  }
  var Z = class {
    constructor() {
      ((this.lastResults = []),
        (this.previousResults = []),
        (this.chart = null),
        this.initialize());
    }
    initialize() {
      (this.registerPlugins(), this.createChart());
    }
    registerPlugins() {
      let e = {
        id: "rankDelayPlugin",
        afterDatasetsDraw: (a) => this.drawRankDelayPlugin(a),
      };
      if ((Chart.register(e), typeof ChartDataLabels > "u")) {
        (this._datalabelRetryCount = (this._datalabelRetryCount || 0) + 1) < 50 ? setTimeout(() => this.registerPlugins(), 100) : console.warn("ChartDataLabels 加载超时");
        return;
      }
      Chart.register(ChartDataLabels);
    }
    createChart() {
      let e = this.getChartContext("ttkChart");
      this.chart = new Chart(e, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "无空枪射击延迟",
              backgroundColor: z.NO_MISS_FIRE,
              data: [],
            },
            {
              label: "平均连发间隔",
              backgroundColor: z.BURST_INTERVAL,
              data: [],
            },
            { label: "平均空枪延迟", backgroundColor: z.EMPTY_DELAY, data: [] },
            { label: "飞行延迟", backgroundColor: z.FLIGHT_DELAY, data: [] },
            { label: "扳机延迟", backgroundColor: z.TRIGGER_DELAY, data: [] },
          ],
        },
        options: {
          layout: { padding: { top: _.PADDING_TOP } },
          onClick: (a, t) => {
            if (
              !t ||
              !t.length ||
              !window.app ||
              typeof window.app.handleTtkBarClick != "function"
            )
              return;
            window.app.handleTtkBarClick(t[0].index);
          },
          plugins: {
            datalabels: {
              display: (a) => a.datasetIndex === 4,
              anchor: "end",
              align: "end",
              color: "#000",
              formatter: (a, t) => this.formatTTKLabel(a, t),
            },
            tooltip: {
              mode: "index",
              intersect: !1,
              callbacks: this.getTooltipCallbacks(),
            },
          },
          responsive: !0,
          scales: {
            x: { stacked: !0 },
            y: {
              stacked: !0,
              beginAtZero: !0,
              ticks: { callback: (a) => $(a, "ms") },
            },
          },
        },
      });
    }
    update(e, a) {
      this.previousResults = this.lastResults.slice();
      let t = e.map((n) => this.calculateDelays(n, a));
      (t.sort((n, o) => n.totalTime - o.totalTime),
        (t = sharedRankFilter(t, a)),
        this.calculateRankChanges(t),
        (this.lastResults = t),
        this.updateChartData(t));
    }
    calculateDelays(e, a) {
      let {
          weapon: t,
          avgTime: n,
          avgShots: o,
          avgMisses: r,
          avgBurstInterval: s,
          bulletKey: i,
          ammoDisplayInfo: u,
          usedHitRate: m,
        } = e,
        l = a.distance / t.velocity,
        d = a.triggerDelayEnable ? t.triggerDelay / 1e3 : 0,
        g = s || 0,
        y = t.fireMode === "burst" && t.burstCount && t.burstInternalROF,
        { noMissFireDelay: b, emptyDelay: p } = this._calculateShootingDelays(
          t,
          n,
          o,
          r,
          l,
          g,
          y,
        );
      return {
        name: t.name,
        weapon: t,
        bulletKey: i,
        ammoDisplayInfo: u,
        usedHitRate: m,
        noMissFireDelay: b,
        flight: l,
        emptyDelay: p,
        burstInterval: g,
        triggerDelay: d,
        avgShots: o,
        totalTime: n + d,
      };
    }
    _calculateShootingDelays(e, a, t, n, o, r, s) {
      let i = s ? a - o - r : a - o;
      return n === 0
        ? { noMissFireDelay: i, emptyDelay: 0 }
        : s
          ? this._calculateBurstModeDelays(e, t, n, i)
          : this._calculateAutoModeDelays(t, n, i);
    }
    _calculateBurstModeDelays(e, a, t, n) {
      let o = Math.floor((a - 1) / e.burstCount),
        r = a - 1 - o;
      if (r <= 0) return { noMissFireDelay: 0, emptyDelay: 0 };
      let s = Math.min(1, Math.max(0, t / r)),
        i = n * s;
      return { noMissFireDelay: n * (1 - s), emptyDelay: i };
    }
    _calculateAutoModeDelays(e, a, t) {
      let n = e - 1;
      if (n <= 0) return { noMissFireDelay: 0, emptyDelay: 0 };
      let o = Math.min(1, Math.max(0, a / n)),
        r = t * o;
      return { noMissFireDelay: t * (1 - o), emptyDelay: r };
    }
    calculateRankChanges(e) {
      e.forEach((a, t) => {
        let n = this.previousResults.findIndex((o) => o.name === a.name);
        n >= 0
          ? ((a.rankChange = t - n),
            (a.delayChange = Math.round(
              (a.totalTime - this.previousResults[n].totalTime) *
                E.SECONDS_TO_MS,
            )))
          : ((a.rankChange = 0), (a.delayChange = 0));
      });
    }
    updateChartData(e) {
      this.chart.data.labels = e.map((t) => t.name);
      let a = [
        "noMissFireDelay",
        "burstInterval",
        "emptyDelay",
        "flight",
        "triggerDelay",
      ];
      (this.chart.data.datasets.forEach((t, n) => {
        t.data = e.map((o) => o[a[n]]);
      }),
        this.chart.update());
    }
    drawRankDelayPlugin(e) {
      if (e.config.type !== "bar") return;
      let { ctx: a } = e;
      e.getDatasetMeta(4).data.forEach((n, o) => {
        let r = this.lastResults[o];
        if (!r) return;
        let s = r.rankChange,
          i,
          u;
        s === 0
          ? ((i = "0"), (u = W.NO_CHANGE))
          : s > 0
            ? ((i = `↓${Math.abs(s)}`), (u = W.RANK_DOWN))
            : ((i = `↑${Math.abs(s)}`), (u = W.RANK_UP));
        let m = r.delayChange,
          l = m === 0 ? "0" : m > 0 ? "+" + m : m.toString();
        ((a.textAlign = "center"), (a.textBaseline = "bottom"));
        let d = n.x,
          g = n.y;
        ((a.fillStyle = W.NO_CHANGE),
          a.fillText(l, d, g - 40),
          (a.fillStyle = u),
          a.fillText(i, d, g - 55));
      });
    }
    getChartContext(e) {
      return document.getElementById(e).getContext("2d");
    }
    formatTTKLabel(e, a) {
      let t = this.lastResults.map((s) => s.totalTime),
        n = t[a.dataIndex],
        o = Math.min(...t);
      return `${Math.round((n / o) * 100)}%
${$(n, "ms_raw")}`;
    }
    getTooltipCallbacks() {
      return {
        title: (e) => e[0].label,
        label: (e) => `${e.dataset.label}: ${$(e.raw, "ms")}`,
        afterBody: (e) => {
          let a = e[0].dataIndex,
            t = this.lastResults[a],
            n = a + 1,
            o = this.lastResults.length,
            r =
              t.weapon.fireMode === "burst" &&
              t.weapon.burstCount &&
              t.weapon.burstInternalROF,
            s = [
              `当前排名: ${n}/${o}`,
              `子弹初速: ${Math.round(t.weapon.velocity)} m/s`,
              `肉伤: ${t.weapon.flesh}`,
              `甲伤: ${t.weapon.armor}`,
            ];
          if (t.ammoDisplayInfo) {
            (t.ammoDisplayInfo.showFlesh &&
              s.push(`实际肉伤: ${t.ammoDisplayInfo.flesh}`),
              t.ammoDisplayInfo.showArmor &&
                s.push(`实际甲伤: ${t.ammoDisplayInfo.armor}`),
              t.ammoDisplayInfo.showPartMult &&
                s.push(
                  `实际倍率: ${formatWeaponMultsForModal(t.ammoDisplayInfo.partMult)}`,
                ));
          }
          s.push(
            `射速: ${t.weapon.rof}`,
            `平均致死枪数: ${t.avgShots.toFixed(2)}`,
            `点击柱子可查看详细击杀信息`,
          );
          t.weapon.initialRof &&
            t.weapon.initialRofShots &&
            s.push(`前${t.weapon.initialRofShots}发射速: ${t.weapon.initialRof}`);
          if (r) {
            let i = t.weapon.burstInterval || 0,
              u = t.weapon.burstInternalROF || 0;
            s.push(`连发间隔: ${$(i, "ms")}`, `内部射速: ${u}`);
          }
          return s;
        },
      };
    }
    destroy() {
      this.chart && (this.chart.destroy(), (this.chart = null));
    }
  };
  function sharedRankFilter(e, a) {
    let t = a.rankFilterMode || "none",
      n = Math.max(0, Math.floor(a.keepTopCount || 0)),
      o = Math.max(0, Math.floor(a.trimBottomCount || 0));
    return t === "keepTop" && n > 0
      ? e.slice(0, Math.min(e.length, n))
      : t === "trimBottom" && o > 0
        ? e.slice(0, Math.max(0, e.length - o))
        : e;
  }
  var be = {
      id: "verticalLine",
      afterDraw(c) {
        let e = c.ctx,
          a = c.tooltip;
        if (!a._active || !a._active.length) return;
        let t = a._active[0].element.x,
          n = c.scales.y.top,
          o = c.scales.y.bottom;
        (e.save(),
          e.beginPath(),
          e.moveTo(t, n),
          e.lineTo(t, o),
          (e.lineWidth = 1),
          (e.strokeStyle = "rgba(33, 15, 199, 0.89)"),
          e.stroke(),
          e.restore());
      },
    },
    J = class {
      constructor() {
        this.chart = null;
      }
      update(e, a, t) {
        j();
        let n = Array.from({ length: 101 }, (r, s) => s),
          o = this.calculateDistanceStats(e, a, t, n);
        (o.sort((r, s) => r.avg35 - s.avg35),
          (o = sharedRankFilter(o, t)),
          (this.lastResults = o),
          this.renderChart(n, o));
      }
      calculateDistanceStats(e, a, t, n) {
        return e
          .map((o, r) => {
            let s = a[r].bulletType,
              i = R.getRealBulletKey(s, o, t);
            if (!i) return null;
            let u = a[r].hitRate != null ? a[r].hitRate : t.hitRate,
              m = N.getStrategy(i),
              d = [
                0,
                ...o.ranges.filter((h) => h !== 1 / 0 && h <= _.MAX_DISTANCE),
              ],
              g = new Map();
            d.forEach((h) => {
              let f = { ...t, distance: h, hitRate: u, bulletLevel: i },
                { avgTime: M } = R.calculateAvgStats(
                  o,
                  f,
                  G.DISTANCE_SIM_COUNT,
                  m,
                ),
                I = t.triggerDelayEnable ? o.triggerDelay / E.SECONDS_TO_MS : 0;
              g.set(h, M + I);
            });
            let y = n.map((h) =>
                g.has(h) ? g.get(h) : this.calculateTTKByFormula(o, h, t, m, g),
              ),
              b = n.findIndex((h) => h > _.CUTOFF_DISTANCE),
              p = b === -1 ? y : y.slice(0, b),
              v = p.reduce((h, f) => h + f, 0) / p.length;
            return { weapon: o, times: y, avg35: v };
          })
          .filter(Boolean);
      }
      renderChart(e, a) {
        let t = a.map((o, r) => ({
          label: o.weapon.name,
          data: o.times,
          fill: !1,
          tension: 0,
          hidden: r >= _.TOP_WEAPONS_COUNT,
          pointRadius: 0,
          pointHoverRadius: 3,
        }));
        this.chart && this.chart.destroy();
        let n = this.getChartContext("distanceChart");
        this.chart = new Chart(n, {
          type: "line",
          data: { labels: e, datasets: t },
          options: {
            scales: {
              x: { title: { display: !0, text: "\u8DDD\u79BB (m)" } },
              y: {
                beginAtZero: !0,
                title: { display: !0, text: "\u5E73\u5747 TTK" },
                ticks: { callback: (o) => $(o, "ms_raw") },
              },
            },
            plugins: {
              datalabels: { display: !1 },
              tooltip: {
                mode: "index",
                intersect: !1,
                itemSort: (o, r) => o.parsed.y - r.parsed.y,
                callbacks: {
                  title: (o) => `${o[0].label}m`,
                  label: (o) => `${o.dataset.label}: ${$(o.raw, "ms")}`,
                },
              },
              legend: { position: "bottom", labels: { usePointStyle: !0 } },
            },
            hover: { mode: "index", intersect: !1 },
            interaction: { mode: "index", intersect: !1 },
          },
          plugins: [ChartDataLabels, be],
        });
      }
      calculateTTKByFormula(e, a, t, n, o) {
        let r = Array.from(o.keys()).filter((m) => m <= a),
          s = r.length ? Math.max(...r) : 0,
          i = o.get(s);
        if (!i)
          return (
            console.error(
              "\u7F13\u5B58\u4E2D\u7F3A\u5C11\u5173\u952E\u70B9\u6570\u636E:",
              { startDistance: s, startTTK: i },
            ),
            0
          );
        if (a === s) return i;
        let u = (a - s) / e.velocity;
        return i + u;
      }
      getChartContext(e) {
        return document.getElementById(e).getContext("2d");
      }
      destroy() {
        this.chart && (this.chart.destroy(), (this.chart = null));
      }
    };
  var X = class {
    constructor() {
      ((this.ttkChart = new Z()), (this.distanceChart = new J()));
    }
    updateTtkChart(e, a) {
      this.ttkChart.update(e, a);
    }
    updateDistanceChart(e, a, t) {
      this.distanceChart.update(e, a, t);
    }
  };
  var ee = class {
    renderAttachmentTable(e, a, t, n = [], o = null, r = null) {
      let s = document.querySelector("#attachmentTable tbody");
      s.innerHTML = "";
      let i = document.getElementById("globalBarrelType")?.value || "longest";
      (e.forEach((u, m) => {
        let l = 0;
        if (i === "longest") {
          let p = (h, f) => {
            if (!f) return -1 / 0;
            let I = typeof f.rangeMult == "number" ? f.rangeMult : 1;
            let C = h.ranges.map((S) => S === 1 / 0 ? 1 / 0 : Math.round(S * I));
            return C.filter(Number.isFinite).length ? Math.max(...C.filter(Number.isFinite)) : -1 / 0;
          };
          l =
            u.barrels.reduce((h, f, M) => {
              let I = p(u, u.barrels[h]);
              return p(u, f) > I ? M : h;
            }, 0) + 1;
        }
        let d = [{ name: "\u65E0", rangeMult: 0 }, ...u.barrels],
          g = a,
          y = [{ name: "\u65E0" }, ...(u.fireControls || [])],
          fcDefaultIndex = 0,
          B = u.allowedBullets || [],
          b = document.createElement("tr");
        if (u.fireControls && u.fireControls.length > 0) {
          let h = (f) => {
            if (!f) return u.rof || 0;
            if (typeof f.rof == "number") return f.rof;
            if (typeof f.initialRof == "number") return f.initialRof;
            return u.rof || 0;
          };
          fcDefaultIndex = y.reduce((f, M, I) => (h(M) > h(y[f]) ? I : f), 0);
        }
        (b.dataset.weaponName = u.name),
          (b.dataset.rowOrder = String(m)),
          ((b.innerHTML = `
        <td>${u.name}</td>
        <td>${u.type}</td>
        <td class="currentRof" data-weapon="${m}">${u.rof}</td>
        <td class="currentVelocity" data-weapon="${m}">${u.velocity}</td>
        <td class="currentRanges" data-weapon="${m}">${K(u.ranges)}</td>
        <td class="currentFlesh" data-weapon="${m}">${u.flesh}</td>
        <td class="currentArmor" data-weapon="${m}">${u.armor}</td>
        <td class="multipliers" data-weapon="${m}">${P(u.mult)}</td>
        <td>${this.createSelectHTML("barrelSel", m, d, l)}</td>
        <td>${this.createSelectHTML("fireControlSel", m, y, fcDefaultIndex)}</td>
        <td>${this.createSelectHTML("muzzleSel", m, g, 0)}</td>
        <td>${this.createSelectHTML("bulletSel", m, B, 0)}</td>
        <td><input type="number" data-weapon="${m}" class="hitRateInput" min="0" max="1" step="0.01" /></td>
        <td>${this.createVelocityPrecisionSlider(m, !1, 0)}</td>
        <td>${this.createActionButton(m, "add", o)}</td>
      `),
          s.appendChild(b));
      }),
        n.forEach((u, m) => {
          let l = document.createElement("tr");
          ((l.className = "clone-row"),
            (l.dataset.weaponName = u.name),
            (l.dataset.rowOrder = String(e.length + m)),
            (l.innerHTML = `
        <td>${u.name}</td>
        <td>${u.type}</td>
        <td class="currentRof" data-clone="${m}">${u.rof}</td>
        <td class="currentVelocity" data-clone="${m}">${u.velocity}</td>
        <td class="currentRanges" data-clone="${m}">${K(u.ranges)}</td>
        <td class="currentFlesh" data-clone="${m}">${u.flesh}</td>
        <td class="currentArmor" data-clone="${m}">${u.armor}</td>
        <td class="multipliers" data-clone="${m}">${P(u.mult)}</td>
        <td>${u.attachmentConfig.barrelIndex > 0 ? u.barrels[u.attachmentConfig.barrelIndex - 1].name : "\u65E0"}</td>
        <td>${u.attachmentConfig.fireControlIndex > 0 && u.fireControls ? u.fireControls[u.attachmentConfig.fireControlIndex - 1].name : "\u65E0"}</td>
        <td>${u.attachmentConfig.muzzleIndex > 0 ? a[u.attachmentConfig.muzzleIndex].name : "\u65E0"}</td>
        <td>${u.attachmentConfig.bulletType || "\u5168\u5C40"}</td>
        <td>${u.attachmentConfig.hitRate || ""}</td>
        <td>-</td>
        <td>${this.createActionButton(m, "remove", r)}</td>
      `),
            s.appendChild(l));
        }),
        this.bindAttachmentChangeListeners(t),
        this.bindCloneActionListeners(o, r));
    }
    createActionButton(e, a, t) {
      return a === "add"
        ? `<button class="add-clone-btn" data-weapon="${e}" title="\u6DFB\u52A0\u526F\u672C">+</button><button class="exclude-weapon-btn" data-weapon="${e}" title="\u5220\u9664\u6B66\u5668">\u00D7</button>`
        : `<button class="remove-clone-btn" data-clone="${e}" title="\u5220\u9664\u526F\u672C">-</button>`;
    }
    createVelocityPrecisionSlider(e, a = !1, t = 0) {
      let n = a ? `data-clone="${e}"` : `data-weapon="${e}"`,
        o = Math.round(t * 100);
      return `
      <div class="velocity-precision-container">
        <input type="range" 
               class="velocity-precision-slider" 
               ${n}
               min="-0.09" 
               max="0.09" 
               step="0.01" 
               value="${t}" />
        <span class="velocity-precision-value">${o}%</span>
      </div>
    `;
    }
    createVelocityPrecisionDisplay(e = 0) {
      return `
      <div class="velocity-precision-display">
        <span class="velocity-precision-value">${Math.round(e * 100)}%</span>
      </div>
    `;
    }
    bindCloneActionListeners(e, a) {
      (e &&
        document.querySelectorAll(".add-clone-btn").forEach((n) => {
          n.addEventListener("click", (o) => {
            let r = parseInt(o.target.dataset.weapon);
            e(r);
          });
        }),
        a &&
          document.querySelectorAll(".remove-clone-btn").forEach((n) => {
            n.addEventListener("click", (o) => {
              let r = parseInt(o.target.dataset.clone);
              a(r);
            });
          }),
        document.querySelectorAll(".exclude-weapon-btn").forEach((n) => {
          n.addEventListener("click", (o) => {
            let r = parseInt(o.target.dataset.weapon),
              s = o.target.closest("tr");
            s && ((s.dataset.excluded = "1"), (s.style.display = "none"));
          });
        }));
    }
    updateWeaponStats(e) {
      let a = document.querySelectorAll(".currentRof[data-weapon]").length;
      e.forEach((t, n) => {
        if (t.isClone) {
          let r = n - a,
            s = document.querySelector(`.currentRof[data-clone="${r}"]`);
          s && (s.textContent = Math.round(t.rof));
          let i = document.querySelector(`.currentVelocity[data-clone="${r}"]`);
          i && (i.textContent = Math.round(t.velocity));
          let u = document.querySelector(`.currentRanges[data-clone="${r}"]`);
          u && (u.textContent = K(t.ranges.map((g) => Math.round(g))));
          let m = document.querySelector(`.currentFlesh[data-clone="${r}"]`);
          m && (m.textContent = t.flesh);
          let l = document.querySelector(`.currentArmor[data-clone="${r}"]`);
          l && (l.textContent = t.armor);
          let d = document.querySelector(`.multipliers[data-clone="${r}"]`);
          d && (d.textContent = P(t.mult));
        } else {
          let r = document.querySelector(`.currentRof[data-weapon="${n}"]`);
          r && (r.textContent = Math.round(t.rof));
          let s = document.querySelector(
            `.currentVelocity[data-weapon="${n}"]`,
          );
          s && (s.textContent = Math.round(t.velocity));
          let i = document.querySelector(`.currentRanges[data-weapon="${n}"]`);
          i && (i.textContent = K(t.ranges.map((d) => Math.round(d))));
          let u = document.querySelector(`.currentFlesh[data-weapon="${n}"]`);
          u && (u.textContent = t.flesh);
          let m = document.querySelector(`.currentArmor[data-weapon="${n}"]`);
          m && (m.textContent = t.armor);
          let l = document.querySelector(`.multipliers[data-weapon="${n}"]`);
          l && (l.textContent = P(t.mult));
        }
      });
    }
    createSelectHTML(e, a, t, n) {
      let o;
      return (
        e === "bulletSel"
          ? (o = ['<option value="">\u5168\u5C40</option>']
              .concat(t.map((r) => `<option value="${r}">${caliberMap && caliberMap[r] ? r + ' (' + caliberMap[r] + ')' : r}</option>`))
              .join(""))
          : (o = t
              .map((r, s) => {
                let i = s === n ? " selected" : "";
                return `<option value="${s === 0 ? `${r.name}|-1` : `${r.name}|${s}`}"${i}>${r.name}</option>`;
              })
              .join("")),
        `<select data-weapon="${a}" class="${e}">${o}</select>`
      );
    }
    bindAttachmentChangeListeners(e) {
      (document.querySelectorAll(".barrelSel").forEach((s) => {
        s.addEventListener("change", () => {
          e();
        });
      }),
        document.querySelectorAll(".muzzleSel").forEach((s) => {
          s.addEventListener("change", () => {
            e();
          });
        }),
        document.querySelectorAll(".fireControlSel").forEach((s) => {
          s.addEventListener("change", () => {
            e();
          });
        }));
      let n = document.getElementById("muzzlePrecisionEnable");
      (n &&
        n.addEventListener("change", () => {
          e();
        }),
        document.querySelectorAll(".bulletSel").forEach((s) => {
          s.addEventListener("change", () => {
            e();
          });
        }),
        document.querySelectorAll(".velocity-precision-slider").forEach((s) => {
          s.addEventListener("input", (i) => {
            let u = i.target.parentElement.querySelector(
                ".velocity-precision-value",
              ),
              m = Math.round(i.target.value * 100);
            ((u.textContent = `${m}%`), e());
          });
        }));
    }
    sortAttachmentTableByRanking(e = []) {
      let a = document.querySelector("#attachmentTable tbody");
      if (!a) return;
      let t = Array.from(a.querySelectorAll("tr"));
      if (!t.length) return;
      let n = new Map();
      e.forEach((o, r) => {
        let s = typeof o == "string" ? o : o?.name || o?.weapon?.name;
        s && !n.has(s) && n.set(s, r);
      });
      t.sort((o, r) => {
        let s = o.dataset.weaponName || "",
          i = r.dataset.weaponName || "",
          u = n.has(s) ? n.get(s) : Number.MAX_SAFE_INTEGER,
          m = n.has(i) ? n.get(i) : Number.MAX_SAFE_INTEGER;
        if (u !== m) return u - m;
        let l = o.dataset.excluded === "1" || o.dataset.trimExcluded === "1" ? 1 : 0,
          d = r.dataset.excluded === "1" || r.dataset.trimExcluded === "1" ? 1 : 0;
        if (l !== d) return l - d;
        return Number(o.dataset.rowOrder || 0) - Number(r.dataset.rowOrder || 0);
      }),
        t.forEach((o) => a.appendChild(o));
    }
  };
  var te = class {
    constructor() {
      ((this.storageKey = "ttk_calculator_config"),
        (this.defaultConfig = this.getDefaultConfig()));
    }
    getDefaultConfig() {
      return {
        bulletLevel: 4,
        armorLevel: 4,
        armorValue: 110,
        helmetLevel: 4,
        helmetValue: 48,
        distance: 30,
        healthValue: 100,
        hitProb: { head: 0.18, chest: 0.33, stomach: 0.19, limbs: 0.3 },
        hitRate: 0.85,
        rankFilterMode: "none",
        keepTopCount: 0,
        trimBottomCount: 0,
        triggerDelayEnable: !0,
        globalBarrelType: "longest",
        velocityPrecisionSettings: { weaponSettings: {} },
      };
    }
    saveConfig(e) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(e));
      } catch (a) {
        console.error("\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:", a);
      }
    }
    loadConfig() {
      try {
        let e = localStorage.getItem(this.storageKey);
        if (e) {
          let a = JSON.parse(e);
          return { ...this.defaultConfig, ...a };
        }
      } catch (e) {
        console.error("\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25:", e);
      }
      return this.defaultConfig;
    }
  };
  var ae = class {
    constructor(e) {
      ((this.weaponManager = e),
        (this.viewRenderer = new ee()),
        (this.cacheManager = new te()),
        this._initConfigFields(),
        setTimeout(() => {
          this.loadSavedConfig();
        }, 0),
        this.setupAutoSave());
    }
    _initConfigFields() {
      this._configFields = [
        { id: "bulletLevel", key: "bulletLevel" },
        { id: "armorLevel", key: "armorLevel" },
        { id: "armorValue", key: "armorValue" },
        { id: "helmetLevel", key: "helmetLevel" },
        { id: "helmetValue", key: "helmetValue" },
        { id: "distance", key: "distance" },
        { id: "healthValue", key: "healthValue" },
        { id: "hitRate", key: "hitRate" },
        { id: "rankFilterMode", key: "rankFilterMode" },
        { id: "keepTopCount", key: "keepTopCount" },
        { id: "trimBottomCount", key: "trimBottomCount" },
        { id: "triggerDelayEnable", key: "triggerDelayEnable", type: "checkbox" },
        { id: "globalBarrelType", key: "globalBarrelType" },
      ];
      this._hitProbFields = [
        { id: "pHead", key: "head" },
        { id: "pChest", key: "chest" },
        { id: "pStomach", key: "stomach" },
        { id: "pLimbs", key: "limbs" },
      ];
    }
    loadSavedConfig() {
      try {
        let e = this.cacheManager.loadConfig();
        this.applyConfigToPage(e);
      } catch (e) {
        console.error("\u52A0\u8F7D\u914D\u7F6E\u65F6\u51FA\u9519:", e);
      }
    }
    applyConfigToPage(e) {
      this._configFields.forEach(({ id, key, type }) => {
        let el = document.getElementById(id);
        if (!el) return;
        if (type === "checkbox") el.checked = !!e[key];
        else {
          let val = e[key];
          if (key === "healthValue") val = val ?? 100;
          else if (key === "rankFilterMode") val = val ?? "none";
          else if (key === "globalBarrelType") val = typeof val === "string" ? val : "longest";
          else if (key === "keepTopCount" || key === "trimBottomCount") val = val ?? 0;
          el.value = val;
        }
      });
      this._hitProbFields.forEach(({ id, key }) => {
        let el = document.getElementById(id);
        if (el && e.hitProb) el.value = e.hitProb[key];
      });
      this.applyVelocityPrecisionSettings(e.velocityPrecisionSettings);
      this.syncRankFilterControls();
    }
    setupAutoSave() {
      this._configFields.forEach(({ id }) => {
        let el = document.getElementById(id);
        if (!el) return;
        el.addEventListener("change", () => this.saveCurrentConfig());
        el.type === "number" && el.addEventListener("input", () => this.saveCurrentConfig());
      });
      this._hitProbFields.forEach(({ id }) => {
        let el = document.getElementById(id);
        if (!el) return;
        el.addEventListener("change", () => this.saveCurrentConfig());
        el.addEventListener("input", () => this.saveCurrentConfig());
      });
      this.setupVelocityPrecisionAutoSave();
    }
    setupVelocityPrecisionAutoSave() {
      document.addEventListener("input", (e) => {
        e.target.classList.contains("velocity-precision-slider") &&
          this.saveCurrentConfig();
      });
    }
    saveCurrentConfig() {
      let e = this.readPageParams();
      this.cacheManager.saveConfig(e);
    }
    readPageParams() {
      let a = {},
        readNum = (id) => Number(document.getElementById(id)?.value ?? 0);
      this._configFields.forEach(({ id, key, type }) => {
        let el = document.getElementById(id);
        if (!el) { a[key] = type === "checkbox" ? !1 : 0; return; }
        if (type === "checkbox") a[key] = el.checked;
        else if (key === "rankFilterMode") a[key] = el.value || "none";
        else if (key === "globalBarrelType") a[key] = el.value;
        else if (key === "keepTopCount" || key === "trimBottomCount") a[key] = Number(el.value) || 0;
        else a[key] = readNum(id);
      });
      a.hitProb = {};
      this._hitProbFields.forEach(({ id, key }) => {
        a.hitProb[key] = Number(document.getElementById(id)?.value ?? 0);
      });
      return (a.velocityPrecisionSettings = this.getVelocityPrecisionSettings()), a;
    }
    getVelocityPrecisionSettings() {
      let e = { weaponSettings: {} };
      return (
        document.querySelectorAll(".velocity-precision-slider").forEach((t) => {
          let n = t.dataset.weapon,
            o = t.dataset.clone,
            r = parseFloat(t.value);
          n !== void 0
            ? (e.weaponSettings[`weapon_${n}`] = r)
            : o !== void 0 && (e.weaponSettings[`clone_${o}`] = r);
        }),
        e
      );
    }
    applyVelocityPrecisionSettings(e) {
      let a = document.querySelectorAll(".velocity-precision-slider");
      (e &&
        e.weaponSettings &&
        Object.keys(e.weaponSettings).forEach((t) => {
          let n = e.weaponSettings[t],
            o = null;
          if (t.startsWith("weapon_")) {
            let r = t.replace("weapon_", "");
            o = document.querySelector(
              `.velocity-precision-slider[data-weapon="${r}"]`,
            );
          } else if (t.startsWith("clone_")) {
            let r = t.replace("clone_", "");
            o = document.querySelector(
              `.velocity-precision-slider[data-clone="${r}"]`,
            );
          }
          if (o) {
            o.value = n;
            let r = o.parentElement.querySelector(".velocity-precision-value");
            r && (r.textContent = `${Math.round(n * 100)}%`);
          }
        }),
        a.forEach((t) => {
          if (t.value === "0" || t.value === "") {
            t.value = 0.09;
            let n = t.parentElement.querySelector(".velocity-precision-value");
            n && (n.textContent = "9%");
          } else {
            let n = t.parentElement.querySelector(".velocity-precision-value");
            if (n) {
              let o = Math.round(parseFloat(t.value) * 100);
              n.textContent = `${o}%`;
            }
          }
        }));
    }
    syncRankFilterControls() {
      let e = document.getElementById("rankFilterMode"),
        a = document.getElementById("keepTopCount"),
        t = document.getElementById("trimBottomCount");
      if (!e || !a || !t) return;
      let n = e.value || "none",
        o = n === "keepTop",
        r = n === "trimBottom";
      (a.disabled = !o,
        t.disabled = !r,
        o || (a.value = a.value || "0"),
        r || (t.value = t.value || "0"));
    }
    readWeaponBullets() {
      let e = Array(this.weaponManager.getWeapons().length).fill(null);
      return (
        document.querySelectorAll(".bulletSel").forEach((a) => {
          let t = Number(a.dataset.weapon);
          if (!Number.isInteger(t) || t < 0 || t >= e.length) return;
          let n = a.closest("tr")?.dataset || {};
          e[t] =
            n.excluded === "1" || n.trimExcluded === "1"
              ? "__EXCLUDE__"
              : a.value || null;
        }),
        e
      );
    }
    clearTrimmedWeaponSelection() {
      document.querySelectorAll('#attachmentTable tbody tr[data-trim-excluded="1"]').forEach((e) => {
        delete e.dataset.trimExcluded;
        e.style.display = e.dataset.excluded === "1" ? "none" : "";
      });
    }
    applyTrimmedWeaponSelection(e) {
      this.clearTrimmedWeaponSelection();
      if (!e || e.size === 0) return;
      document.querySelectorAll("#attachmentTable tbody tr").forEach((a) => {
        if (a.dataset.excluded === "1") return;
        let t = a.dataset.weaponName || a.cells?.[0]?.textContent?.trim() || "";
        e.has(t) || ((a.dataset.trimExcluded = "1"), (a.style.display = "none"));
      });
    }
    collectAttachmentData() {
      let e = this.weaponManager.getWeapons().length,
        a = Array(e).fill(""),
        t = Array(e).fill(""),
        n = Array(e).fill(""),
        o = Array(e).fill("");
      return (
        document.querySelectorAll(".barrelSel").forEach((o) => {
          let r = Number(o.dataset.weapon);
          Number.isInteger(r) && r >= 0 && r < e && (a[r] = o.value);
        }),
        document.querySelectorAll(".muzzleSel").forEach((o) => {
          let r = Number(o.dataset.weapon);
          Number.isInteger(r) && r >= 0 && r < e && (t[r] = o.value);
        }),
        document.querySelectorAll(".hitRateInput").forEach((r) => {
          let s = Number(r.dataset.weapon);
          Number.isInteger(s) && s >= 0 && s < e && (n[s] = r.value || "");
        }),
        document.querySelectorAll(".fireControlSel").forEach((r) => {
          let s = Number(r.dataset.weapon);
          Number.isInteger(s) && s >= 0 && s < e && (o[s] = r.value || "");
        }),
        { barrelValues: a, muzzleValues: t, hitRateValues: n, fireControlValues: o }
      );
    }
    renderAttachmentTable() {
      let e = this.weaponManager.getWeapons(),
        a = this.weaponManager.getMuzzles(),
        t = this.weaponManager.getClonedWeapons();
      (this.viewRenderer.renderAttachmentTable(
        e,
        a,
        () => this.updateWeaponStats(),
        t,
        (n) => this.handleAddClone(n),
        (n) => this.handleRemoveClone(n),
      ),
        this.syncRankFilterControls(),
        setTimeout(() => {
          this.updateWeaponStats();
        }, 0));
    }
    sortAttachmentTableByRanking(e) {
      this.viewRenderer.sortAttachmentTableByRanking(e);
    }
    handleAddClone(e) {
      if (!this.weaponManager.canAddClone()) {
        alert("\u6700\u591A\u6DFB\u52A05\u4E2A\u526F\u672C~");
        return;
      }
      let a = this.readWeaponBullets(),
        {
          barrelValues: t,
          muzzleValues: n,
          hitRateValues: o,
          fireControlValues: fcValues,
        } = this.collectAttachmentData(),
        r = {
          barrelIndex: this.parseBarrelIndex(t[e]),
          muzzleIndex: this.parseMuzzleIndex(n[e]),
          fireControlIndex: this.parseFireControlIndex(fcValues[e]),
          hitRate: o[e] === "" ? null : Number(o[e]),
          bulletType: a[e],
        },
        s = this.readCurrentWeaponState(e);
      this.weaponManager.addClone(e, r, s) &&
        (this.addCloneRow(e, r), this.updateWeaponStats());
    }
    handleRemoveClone(e) {
      (this.weaponManager.removeClone(e),
        this.removeCloneRow(e),
        this.updateWeaponStats());
    }
    parseBarrelIndex(e) {
      if (!e) return 0;
      let [, a] = e.split("|").map(Number);
      return a === -1 ? 0 : a;
    }
    parseMuzzleIndex(e) {
      if (!e) return 0;
      let [, a] = e.split("|").map(Number);
      return a === -1 ? 0 : a;
    }
    parseFireControlIndex(e) {
      if (!e) return 0;
      let [, a] = e.split("|").map(Number);
      return a === -1 || isNaN(a) ? 0 : a;
    }
    readCurrentWeaponState(e) {
      let a = Number(
          document.querySelector(`.currentRof[data-weapon="${e}"]`).textContent,
        ),
        t = Number(
          document.querySelector(`.currentVelocity[data-weapon="${e}"]`)
            .textContent,
        ),
        n = document.querySelector(
          `.currentRanges[data-weapon="${e}"]`,
        ).textContent,
        o = Number(
          document.querySelector(`.currentFlesh[data-weapon="${e}"]`)
            .textContent,
        ),
        r = Number(
          document.querySelector(`.currentArmor[data-weapon="${e}"]`)
            .textContent,
        ),
        s = n.split(",").map((m) => {
          let l = m.trim();
          if (l === "\u221E" || l === "Infinity") return 1 / 0;
          let d = Number(l);
          return isNaN(d) ? 0 : d;
        });
      return {
        ...this.weaponManager.getWeapons()[e],
        rof: a,
        velocity: t,
        ranges: s,
        flesh: o,
        armor: r,
      };
    }
    addCloneRow(e, a) {
      let t = this.weaponManager.getWeapons(),
        n = this.weaponManager.getMuzzles(),
        o = this.weaponManager.getClonedWeapons(),
        r = o[o.length - 1],
        s = o.length - 1,
        i = this.readPageParams(),
        u = this.weaponManager.calculateCloneDisplayData(r, i),
        m = document.querySelector("#attachmentTable tbody"),
        l = document.createElement("tr");
      ((l.className = "clone-row"),
        (l.dataset.weaponName = r.name),
        (l.innerHTML = `
      <td>${r.name}</td>
      <td>${r.type}</td>
      <td class="currentRof" data-clone="${s}">${u.rof}</td>
      <td class="currentVelocity" data-clone="${s}">${u.velocity}</td>
      <td class="currentRanges" data-clone="${s}">${this.formatRanges(u.ranges)}</td>
      <td class="currentFlesh" data-clone="${s}">${u.flesh}</td>
      <td class="currentArmor" data-clone="${s}">${u.armor}</td>
      <td class="multipliers" data-clone="${s}">${P(u.mult)}</td>
      <td>${a.barrelIndex > 0 ? t[e].barrels[a.barrelIndex - 1].name : "\u65E0"}</td>
      <td>${a.fireControlIndex > 0 && t[e].fireControls ? t[e].fireControls[a.fireControlIndex - 1].name : "\u65E0"}</td>
      <td>${a.muzzleIndex > 0 ? n[a.muzzleIndex].name : "\u65E0"}</td>
      <td>${a.bulletType || "\u5168\u5C40"}</td>
      <td>${a.hitRate || ""}</td>
      <td>-</td>
      <td><button class="remove-clone-btn" data-clone="${s}" title="\u5220\u9664\u526F\u672C">-</button></td>
    `),
        m.appendChild(l),
        l
          .querySelector(".remove-clone-btn")
          .addEventListener("click", () => this.handleRemoveClone(s)));
    }
    removeCloneRow(e) {
      let a = document.querySelectorAll(".clone-row");
      (a[e] && a[e].remove(), this.renumberCloneRows());
    }
    renumberCloneRows() {
      document.querySelectorAll(".clone-row").forEach((a, t) => {
        a.querySelectorAll("[data-clone]").forEach((r) => {
          r.setAttribute("data-clone", t);
        });
        let o = a.querySelector(".remove-clone-btn");
        o &&
          (o.setAttribute("data-clone", t),
          (o.onclick = () => this.handleRemoveClone(t)));
      });
    }
    formatRanges(e) {
      return e.map((a) => (a === 1 / 0 ? "\u221E" : Math.round(a))).join(", ");
    }
    updateWeaponStats() {
      let e = this.readWeaponBullets(),
        {
          barrelValues: a,
          muzzleValues: t,
          hitRateValues: n,
          fireControlValues: fcValues,
        } = this.collectAttachmentData(),
        o = {
          barrelValues: a,
          muzzleValues: t,
          hitRateValues: n,
          fireControlValues: fcValues,
          bulletTypes: e,
        },
        r = this.readPageParams(),
        s = this.weaponManager.readAttachmentsWithBullet(a, t, n, e, fcValues),
        i = this.weaponManager.applyAttachments(s, r);
      this.viewRenderer.updateWeaponStats(i);
    }
    showError(e) {
      alert(e);
    }
    getChartContext(e) {
      return document.getElementById(e).getContext("2d");
    }
    getGlobalBarrelType() {
      return document.getElementById("globalBarrelType").value;
    }
    updateGlobalBarrelSelections() {
      let e = this.getGlobalBarrelType(),
        a = document.querySelectorAll(".barrelSel");
      a.forEach((t) => {
        let n = Number(t.dataset.weapon),
          o = this.weaponManager.getWeapons()[n];
        if (!Number.isInteger(n) || !o) return;
        if (e === "none") t.value = "无|-1";
        else if (e === "longest")
          if (o.barrels && o.barrels.length > 0) {
            let r = (u, m) => {
                if (!m) return -1 / 0;
                let d = typeof m.rangeMult == "number" ? m.rangeMult : 1,
                  g = u.ranges.map((p) => p === 1 / 0 ? 1 / 0 : p * d);
                return g.filter(Number.isFinite).length ? Math.max(...g.filter(Number.isFinite)) : -1 / 0;
              },
              s = (() => {
                let u = o.barrels.map((A, T) => ({ b: A, idx: T })),
                  m = (A) => typeof A == "number" && !isNaN(A),
                  l = (A) =>
                    (m(A.damageBonus) && A.damageBonus < 0) ||
                    (m(A.armorDamageBonus) && A.armorDamageBonus < 0) ||
                    (m(A.rofMult) && A.rofMult < 1) ||
                    (m(A.rofAdd) && A.rofAdd < 0) ||
                    (m(A.triggerDelayDelta) && A.triggerDelayDelta > 0),
                  d = (A) =>
                    (m(A.damageBonus) && A.damageBonus > 0) ||
                    (m(A.armorDamageBonus) && A.armorDamageBonus > 0) ||
                    (m(A.rofMult) && A.rofMult > 1) ||
                    (m(A.rofAdd) && A.rofAdd > 0) ||
                    (m(A.triggerDelayDelta) && A.triggerDelayDelta < 0);
                u = u.filter((A) => !l(A.b));
                u.length === 0 &&
                  (u = o.barrels.map((A, T) => ({ b: A, idx: T })));
                let g = u.filter((A) => d(A.b));
                g.length > 0 && (u = g);
                let b = (A) =>
                  o.velocity + (m(A.velocityAdd) ? A.velocityAdd : 0);
                return u.reduce((A, T) => {
                  let Me = b(A.b),
                    Ee = b(T.b);
                  return Ee > Me
                    ? T
                    : Ee < Me
                      ? A
                      : r(o, T.b) > r(o, A.b)
                        ? T
                        : A;
                }, u[0]).idx;
              })();
            t.value = `${o.barrels[s].name}|${s + 1}`;
          } else t.value = "无|-1";
        t.dispatchEvent(new Event("change"));
      });
    }
  };
  var re = class {
    constructor() {
      this.handlers = new Map();
    }
    bindEventHandlers(e, a, t) {
      (this.handlers.set("calc", e), this.handlers.set("distChart", a));
      let n = document.getElementById("calcBtn");
      n &&
        n.addEventListener("click", () => {
          try {
            e();
          } catch (s) {
            console.error(
              "\u8BA1\u7B97\u6309\u94AE\u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",
              s,
            );
          }
        });
      let o = document.getElementById("distChartBtn");
      o &&
        o.addEventListener("click", () => {
          try {
            a();
          } catch (s) {
            console.error(
              "\u8DDD\u79BB\u56FE\u8868\u6309\u94AE\u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",
              s,
            );
          }
        });
      let r = document.getElementById("globalBarrelType");
      r &&
        t &&
        r.addEventListener("change", () => {
          try {
            t();
          } catch (s) {
            console.error(
              "\u5168\u5C40\u67AA\u7BA1\u7C7B\u578B\u53D8\u5316\u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",
              s,
            );
          }
        });
    }
    unbindEventHandlers() {
      let e = document.getElementById("calcBtn"),
        a = document.getElementById("distChartBtn");
      (e && e.removeEventListener("click", this.handlers.get("calc")),
        a && a.removeEventListener("click", this.handlers.get("distChart")),
        this.handlers.clear());
    }
    getHandler(e) {
      return this.handlers.get(e);
    }
    hasHandler(e) {
      return this.handlers.has(e);
    }
  };
  function he(c) {
    let e = me.reduce((a, t) => a + c.hitProb[t], 0);
    if (Math.abs(e - 1) > 1e-6)
      throw new Error(
        "\u547D\u4E2D\u7387\u603B\u548C\u5FC5\u987B\u4E3A 1\uFF01",
      );
    return !0;
  }
  function fe(c, e) {
    for (let a = 0; a < c.length; a++) {
      let { hitRate: t } = c[a];
      if (t != null && (t < 0 || t > 1))
        throw new Error(
          `${e[a].name} \u7684\u547D\u4E2D\u7387\u5FC5\u987B\u5728 0 \u5230 1 \u4E4B\u95F4`,
        );
    }
    return !0;
  }
  function ye(c) {
    if (c.distance < 0)
      throw new Error("\u8DDD\u79BB\u4E0D\u80FD\u4E3A\u8D1F\u6570");
    if (c.armorValue < 0 || c.armorValue > 200)
      throw new Error(
        "\u62A4\u7532\u503C\u5FC5\u987B\u5728 0 \u5230 200 \u4E4B\u95F4",
      );
    if (c.helmetValue < 0 || c.helmetValue > 100)
      throw new Error(
        "\u5934\u76D4\u503C\u5FC5\u987B\u5728 0 \u5230 100 \u4E4B\u95F4",
      );
    if (c.hitRate < 0 || c.hitRate > 1)
      throw new Error(
        "\u547D\u4E2D\u7387\u5FC5\u987B\u5728 0 \u5230 1 \u4E4B\u95F4",
      );
    if (![1, 2, 3, 4, 5].includes(c.bulletLevel))
      throw new Error(
        "\u5B50\u5F39\u7B49\u7EA7\u5FC5\u987B\u662F 1-5 \u4E4B\u95F4\u7684\u6574\u6570",
      );
    if (![1, 2, 3, 4, 5, 6].includes(c.armorLevel))
      throw new Error(
        "\u62A4\u7532\u7B49\u7EA7\u5FC5\u987B\u662F 1-6 \u4E4B\u95F4\u7684\u6574\u6570",
      );
    if (![1, 2, 3, 4, 5, 6].includes(c.helmetLevel))
      throw new Error(
        "\u5934\u76D4\u7B49\u7EA7\u5FC5\u987B\u662F 1-6 \u4E4B\u95F4\u7684\u6574\u6570",
      );
    return !0;
  }
  function roundDetailValue(c) {
    return roundDamageValue(c);
  }
  function formatDetailNumber(c) {
    return typeof c == "number" && isFinite(c)
      ? roundDetailValue(c)
          .toFixed(2)
          .replace(/\.00$/, "")
          .replace(/(\.\d*[1-9])0+$/, "$1")
      : c;
  }
  function formatWeaponRangesForModal(c) {
    return (c.ranges || [])
      .map((e) => (e === 1 / 0 ? "∞" : Math.round(e)))
      .join(" / ");
  }
  function formatWeaponMultsForModal(c) {
    let e = c.mult || c;
    return [
      `头 ${formatDetailNumber(e.head)}`,
      `胸 ${formatDetailNumber(e.chest)}`,
      `腹 ${formatDetailNumber(e.stomach)}`,
      `四肢 ${formatDetailNumber(e.limbs)}`,
    ].join(" ｜ ");
  }
  function getWeaponVisibleStatsForModal(c, e, a) {
    let t = [
      { label: "武器", value: c.name },
      { label: "类型", value: c.type },
      { label: "子弹", value: String(e.bulletKey ?? a.bulletLevel) },
      {
        label: "命中率",
        value:
          formatDetailNumber(
            (typeof e.usedHitRate == "number" ? e.usedHitRate : a.hitRate) *
              100,
          ) + "%",
      },
      { label: "射速", value: c.rof },
      c.initialRof && c.initialRofShots
        ? { label: `前${c.initialRofShots}发射速`, value: c.initialRof }
        : null,
      { label: "初速", value: Math.round(c.velocity) + " m/s" },
      { label: "射程", value: formatWeaponRangesForModal(c) },
      { label: "基础伤害", value: c.flesh },
      { label: "护甲伤害", value: c.armor },
      { label: "部位倍率", value: formatWeaponMultsForModal(c) },
    ].filter(Boolean);
    return (
      e.ammoDisplayInfo &&
        (e.ammoDisplayInfo.showFlesh &&
          t.push({
            label: "实际肉伤",
            value: formatDetailNumber(e.ammoDisplayInfo.flesh),
          }),
        e.ammoDisplayInfo.showArmor &&
          t.push({
            label: "实际甲伤",
            value: formatDetailNumber(e.ammoDisplayInfo.armor),
          }),
        e.ammoDisplayInfo.showPartMult &&
          t.push({
            label: "实际部位倍率",
            value: formatWeaponMultsForModal(e.ammoDisplayInfo.partMult),
          })),
      t
    );
  }
  function applyDetailedHit(c, e, a, t, n, o, r, s) {
    let i = q.calculate(c, e, a, t),
      u = 0,
      m = 0,
      l = { ...r },
      d = o,
      g = r.armorVal,
      y = r.helmetVal,
      B = getDoubleProjectileArmorDamage(c, e);
    if (isDoubleBluntAmmo(e)) {
      if (a === "limbs") u = roundDoubleBluntDamage(i);
      else {
        let p = a === "head",
          v = p ? n.helmetLevel : n.armorLevel,
          h = e.armor[v],
          f = roundDoubleBluntDamage(i * h.pen),
          M = B * h.armorMult,
          I = p ? r.helmetVal : r.armorVal;
        if (I <= 0) u = roundDoubleBluntDamage(i);
        else if (M >= I) {
          let w = I / M;
          ((u = roundDoubleBluntDamage(w * f + (1 - w) * i)),
            (m = I),
            p ? (l.helmetVal = 0) : (l.armorVal = 0));
        } else
          ((u = f), (m = M), p ? (l.helmetVal = I - M) : (l.armorVal = I - M));
      }
    } else if (a === "limbs") u = i;
    else {
      let p = a === "head",
        v = p ? n.helmetLevel : n.armorLevel,
        h = e.armor[v],
        f = i * h.pen,
        M = h.armorMult,
        I = c.armor * (e.armorBase || 1) * M,
        w = p ? r.helmetVal : r.armorVal;
      if (w <= 0) u = i;
      else if (I >= w) {
        let O = w / I;
        ((u = O * f + (1 - O) * i),
          (m = w),
          p ? (l.helmetVal = 0) : (l.armorVal = 0));
      } else
        ((u = f), (m = I), p ? (l.helmetVal = w - I) : (l.armorVal = w - I));
    }
    let b = Math.max(0, o - u);
    return {
      hitPart: a,
      fleshDamage: i,
      armorDamage: m,
      enemyDamage: u,
      newHealth: b,
      prevHealth: d,
      prevArmorVal: g,
      prevHelmetVal: y,
      remainingArmor: l.armorVal,
      remainingHelmet: l.helmetVal,
      newArmorState: l,
      shotIndex: s.shotIndex,
      projectileIndex: s.projectileIndex,
      projectileTotal: s.projectileTotal,
    };
  }
  function simulateDetailedKill(c, e, a) {
    let t = e.healthValue || 100,
      n = { armorVal: e.armorValue, helmetVal: e.helmetValue },
      o = typeof c.hitRate == "number" ? c.hitRate : e.hitRate,
      r = getAmmoProfile(c, a),
      s = k.calculate(e.distance, c),
      i = [],
      u = 0,
      m = 0;
    for (; t > 0; ) {
      if ((u++, Q() > o)) continue;
      m++;
      if (a && /RIP/i.test(a)) {
        let l = applyDetailedHit(c, r, "limbs", s, e, t, n, {
          shotIndex: u,
          projectileIndex: 1,
          projectileTotal: 1,
        });
        ((t = l.newHealth), (n = l.newArmorState), i.push(l));
        continue;
      }
      if (a === "Double") {
        for (let l = 0; l < 2; l++) {
          let d = H.select(e.hitProb),
            g = applyDetailedHit(c, r, d, s, e, t, n, {
              shotIndex: u,
              projectileIndex: l + 1,
              projectileTotal: 2,
            });
          ((t = g.newHealth), (n = g.newArmorState), i.push(g));
          if (t <= 0) break;
        }
        continue;
      }
      let l = H.select(e.hitProb),
        d = applyDetailedHit(c, r, l, s, e, t, n, {
          shotIndex: u,
          projectileIndex: 1,
          projectileTotal: 1,
        });
      ((t = d.newHealth), (n = d.newArmorState), i.push(d));
    }
    return {
      shots: u,
      hits: m,
      steps: i,
      sequenceKey: i.map((l) => l.hitPart).join(">"),
    };
  }
  function getModeValue(c) {
    let e = null,
      a = -1;
    for (let [t, n] of c.entries())
      (n > a || (n === a && Number(t) < Number(e))) && ((e = t), (a = n));
    return e == null ? null : Number(e);
  }
  function analyzeWeaponSimulationPatterns(c, e, a, t = G.DEFAULT_SIM_COUNT) {
    j();
    let n = new Map(),
      o = new Map(),
      r = new Map(),
      s = null;
    for (let i = 0; i < t; i++) {
      let u = simulateDetailedKill(c, e, a),
        m = n.get(u.sequenceKey);
      (m ? m.count++ : n.set(u.sequenceKey, { count: 1, simulation: u }),
        o.set(u.shots, (o.get(u.shots) || 0) + 1),
        r.set(u.hits, (r.get(u.hits) || 0) + 1));
    }
    let i = getModeValue(o),
      u = getModeValue(r),
      m = null,
      l = null;
    for (let d of n.values())
      ((!s || d.count > s.count) && (s = d),
        d.simulation.shots === i &&
          d.simulation.hits === u &&
          (!m || d.count > m.count) &&
          (m = d),
        d.simulation.shots === i && (!l || d.count > l.count) && (l = d));
    let d = m || l || s;
    return d
      ? {
          simCount: t,
          modeShots: i,
          modeHits: u,
          displayCount: d.count,
          displayFrequency: d.count / t,
          simulation: d.simulation,
          topCount: s.count,
          topFrequency: s.count / t,
          topSimulation: s.simulation,
        }
      : null;
  }
  function simulateManualSequence(c, e, a, t = []) {
    let n = e.healthValue || 100,
      o = { armorVal: e.armorValue, helmetVal: e.helmetValue },
      r = getAmmoProfile(c, a),
      s = k.calculate(e.distance, c),
      i = [];
    for (let u = 0; u < t.length && n > 0; u++) {
      let m = t[u],
        l = a === "Double" ? Math.floor(u / 2) + 1 : u + 1,
        d = a === "Double" ? (u % 2) + 1 : 1,
        g = a === "Double" ? 2 : 1,
        y = applyDetailedHit(c, r, m, s, e, n, o, {
          shotIndex: l,
          projectileIndex: d,
          projectileTotal: g,
        });
      ((n = y.newHealth), (o = y.newArmorState), i.push(y));
    }
    return {
      steps: i,
      killed: n <= 0,
      currentHealth: n,
      currentArmor: o.armorVal,
      currentHelmet: o.helmetVal,
      hits: i.length,
      shots: i.length ? i[i.length - 1].shotIndex : 0,
      sequence: t.slice(0, i.length),
    };
  }
  function renderWeaponDetailModalHTML(c, e, a = []) {
    let t = getWeaponVisibleStatsForModal(c.weapon, c, e),
      n = t
        .map(
          (C) =>
            `<div class="row"><span class="label">${C.label}</span><span class="value">${C.value}</span></div>`,
        )
        .join(""),
      o = simulateManualSequence(c.weapon, e, c.bulletKey, a),
      r = o.steps,
      s = r.length
        ? r.map((C) => formatHitPartLabel(C.hitPart)).join(" → ")
        : "尚未选择命中序列",
      i = r.length
        ? r
            .map(
              (C, B) =>
                `<tr><td>${B + 1}</td><td>第${C.shotIndex}枪</td><td>${C.projectileTotal > 1 ? `${C.projectileIndex}/${C.projectileTotal}` : "-"}</td><td>${formatHitPartLabel(C.hitPart)}</td><td>${formatDetailNumber(C.fleshDamage)}</td><td>${formatDetailNumber(C.armorDamage)}</td><td>${formatDetailNumber(C.enemyDamage)}</td><td>${formatDetailNumber(C.prevHealth)}</td><td>${formatDetailNumber(C.newHealth)}</td><td>${formatDetailNumber(C.prevArmorVal)}</td><td>${formatDetailNumber(C.remainingArmor)}</td><td>${formatDetailNumber(C.prevHelmetVal)}</td><td>${formatDetailNumber(C.remainingHelmet)}</td></tr>`,
            )
            .join("")
        : '<tr><td colspan="13" class="weapon-detail-empty">点击下方部位按钮，手动输入命中序列后会在这里逐条显示结算明细。</td></tr>',
      u = o.killed,
      m = u ? "已击杀" : r.length ? "未击杀" : "等待输入",
      l = u
        ? "weapon-detail-status success"
        : r.length
          ? "weapon-detail-status pending"
          : "weapon-detail-status idle",
      d = u ? " disabled" : "",
      g = r.length
        ? `已录入 ${o.hits} 次命中 / ${o.shots} 次击发`
        : "每点一次按钮代表一次命中；Double 按弹丸逐个记录。",
      y = u
        ? "目标已被击杀。你可以删除最后一次或清空序列，继续手动验证其他情况。"
        : "当前序列尚未击杀目标，可以继续点头、胸、腹、四肢按钮补完整条击杀链。",
      b = `头 ${formatDetailNumber(e.hitProb.head * 100)}% / 胸 ${formatDetailNumber(e.hitProb.chest * 100)}% / 腹 ${formatDetailNumber(e.hitProb.stomach * 100)}% / 四肢 ${formatDetailNumber(e.hitProb.limbs * 100)}%`;
    return `<div class="weapon-detail-header"><h3 id="weaponDetailTitle">${c.name} 详细击杀信息</h3><p class="weapon-detail-subtitle">用下方四个按钮手动输入命中部位，系统会按当前武器配置、特殊子弹规则和目标状态同步结算。</p><p class="weapon-detail-note">说明：这个面板按“命中序列”逐次计算，不包含空枪；Double 会按两枚弹丸分别记录在表格里；完整一枪同部位需要连续点两次。</p></div><div class="weapon-detail-grid"><section class="weapon-detail-card"><h4>当前可视数据</h4><div class="weapon-detail-list">${n}</div></section><section class="weapon-detail-card"><h4>当前目标参数</h4><div class="weapon-detail-list"><div class="row"><span class="label">生命值</span><span class="value">${e.healthValue}</span></div><div class="row"><span class="label">护甲</span><span class="value">${e.armorLevel}级 / ${e.armorValue}</span></div><div class="row"><span class="label">头盔</span><span class="value">${e.helmetLevel}级 / ${e.helmetValue}</span></div><div class="row"><span class="label">距离</span><span class="value">${e.distance} m</span></div><div class="row"><span class="label">部位概率</span><span class="value">${b}</span></div></div></section><section class="weapon-detail-card"><h4>当前剩余状态</h4><div class="weapon-detail-list"><div class="row"><span class="label">状态</span><span class="value"><span class="${l}">${m}</span></span></div><div class="row"><span class="label">当前血量</span><span class="value">${formatDetailNumber(o.currentHealth)}</span></div><div class="row"><span class="label">剩余胸甲</span><span class="value">${formatDetailNumber(o.currentArmor)}</span></div><div class="row"><span class="label">剩余头盔</span><span class="value">${formatDetailNumber(o.currentHelmet)}</span></div><div class="row"><span class="label">累计命中</span><span class="value">${o.hits}</span></div><div class="row"><span class="label">累计击发</span><span class="value">${o.shots}</span></div></div></section></div><section class="weapon-detail-sequence weapon-detail-controls"><strong>手动命中序列</strong><div class="weapon-detail-current-sequence">${s}</div><div class="weapon-detail-sequence-note">${g}</div><div class="weapon-detail-sequence-note">${y}</div><div class="weapon-detail-button-row"><button type="button" class="weapon-detail-action-btn sequence-hit-btn" data-hit-part="head"${d}>头部</button><button type="button" class="weapon-detail-action-btn sequence-hit-btn" data-hit-part="chest"${d}>胸部</button><button type="button" class="weapon-detail-action-btn sequence-hit-btn" data-hit-part="stomach"${d}>腹部</button><button type="button" class="weapon-detail-action-btn sequence-hit-btn" data-hit-part="limbs"${d}>四肢</button></div><div class="weapon-detail-button-row utility"><button type="button" class="weapon-detail-action-btn secondary" data-sequence-action="undo"${r.length ? "" : " disabled"}>删除最后一次</button><button type="button" class="weapon-detail-action-btn secondary" data-sequence-action="clear"${r.length ? "" : " disabled"}>清空序列</button></div></section><div class="weapon-detail-table-wrap"><table class="weapon-detail-table"><thead><tr><th>命中序号</th><th>击发</th><th>弹丸</th><th>部位</th><th>肉伤</th><th>甲伤</th><th>敌人扣血</th><th>命中前血量</th><th>敌人当前血量</th><th>命中前胸甲</th><th>剩余胸甲</th><th>命中前头盔</th><th>剩余头盔</th></tr></thead><tbody>${i}</tbody></table></div>`;
  }
  function formatHitPartLabel(c) {
    return c === "head"
      ? "头"
      : c === "chest"
        ? "胸"
        : c === "stomach"
          ? "腹"
          : c === "limbs"
            ? "四肢"
            : c;
  }
  var ue = class {
      constructor() {
        document.readyState === "loading"
          ? document.addEventListener("DOMContentLoaded", () =>
              this.waitForLibraries(),
            )
          : this.waitForLibraries();
      }
      waitForLibraries() {
        if (typeof Chart > "u") {
          (console.log("等待 Chart.js 加载..."),
            setTimeout(() => this.waitForLibraries(), 100));
          return;
        }
        if (typeof ChartDataLabels > "u") {
          (console.log("等待 ChartDataLabels 插件加载..."),
            setTimeout(() => this.waitForLibraries(), 100));
          return;
        }
        (console.log("所有库已加载完成，开始初始化应用"), this.initialize());
      }
      initialize() {
        try {
          (console.log("开始初始化应用..."),
            (this.weaponManager = new Y()),
            (this.domController = new ae(this.weaponManager)),
            (this.chartManager = new X()),
            (this.eventHandler = new re()),
            this.domController.renderAttachmentTable(),
            this.domController.updateGlobalBarrelSelections(),
            this.bindWeaponDetailModal(),
            this.bindPresetButtons(),
            this.eventHandler.bindEventHandlers(
              () => this.handleCalculate(),
              () => this.handleDistanceChart(),
              () => this.domController.updateGlobalBarrelSelections(),
            ));
          let a = document.getElementById("rankFilterMode");
          a &&
            a.addEventListener("change", () =>
              this.domController.syncRankFilterControls(),
            );
          console.log("应用初始化完成");
        } catch (e) {
          (console.error("应用初始化失败:", e),
            this.domController.showError("应用初始化失败: " + e.message));
        }
      }
      bindWeaponDetailModal() {
        let e = document.getElementById("weaponDetailModal"),
          a = document.getElementById("weaponDetailCloseBtn"),
          t = document.getElementById("weaponDetailContent");
        (a && a.addEventListener("click", () => this.hideWeaponDetailModal()),
          e &&
            e.addEventListener("click", (n) => {
              (n.target === e ||
                n.target.dataset.close === "weapon-detail-modal") &&
                this.hideWeaponDetailModal();
            }),
          t &&
            t.addEventListener("click", (n) => {
              let o = n.target.closest("[data-hit-part]"),
                r = n.target.closest("[data-sequence-action]");
              o
                ? this.appendWeaponDetailHitPart(o.dataset.hitPart)
                : r &&
                  (r.dataset.sequenceAction === "undo"
                    ? this.undoWeaponDetailHitPart()
                    : r.dataset.sequenceAction === "clear" &&
                      this.clearWeaponDetailSequence());
            }),
          document.addEventListener("keydown", (n) => {
            n.key === "Escape" && this.hideWeaponDetailModal();
          }));
      }
      bindPresetButtons() {
        let e = document.getElementById("avgHitProbBtn");
        e &&
          e.addEventListener("click", () =>
            this.applyAverageHitProbabilityModel(),
          );
      }
      applyAverageHitProbabilityModel() {
        let e = { head: 0.18, chest: 0.33, stomach: 0.19, limbs: 0.3 };
        (Object.entries(e).forEach(([a, t]) => {
          let n = document.getElementById(
            "p" + a.charAt(0).toUpperCase() + a.slice(1),
          );
          n && (n.value = String(t));
        }),
          this.domController &&
            typeof this.domController.saveCurrentConfig === "function" &&
            this.domController.saveCurrentConfig());
      }
      showWeaponDetailModal(e) {
        let a = document.getElementById("weaponDetailModal"),
          t = document.getElementById("weaponDetailContent");
        a && t && ((t.innerHTML = e), a.classList.remove("hidden"));
      }
      hideWeaponDetailModal() {
        let e = document.getElementById("weaponDetailModal");
        (e && e.classList.add("hidden"), (this.weaponDetailState = null));
      }
      refreshWeaponDetailModal() {
        if (!this.weaponDetailState) return;
        let { result: e, params: a, sequence: t } = this.weaponDetailState;
        this.showWeaponDetailModal(renderWeaponDetailModalHTML(e, a, t));
      }
      appendWeaponDetailHitPart(e) {
        if (!this.weaponDetailState) return;
        let { result: a, params: t, sequence: n } = this.weaponDetailState,
          o = simulateManualSequence(a.weapon, t, a.bulletKey, n);
        o.killed ||
          ((this.weaponDetailState.sequence = [...n, e]),
          this.refreshWeaponDetailModal());
      }
      undoWeaponDetailHitPart() {
        this.weaponDetailState &&
          this.weaponDetailState.sequence.length > 0 &&
          (this.weaponDetailState.sequence.pop(), this.refreshWeaponDetailModal());
      }
      clearWeaponDetailSequence() {
        this.weaponDetailState &&
          ((this.weaponDetailState.sequence = []), this.refreshWeaponDetailModal());
      }
      handleTtkBarClick(e) {
        try {
          let a =
            this.chartManager &&
            this.chartManager.ttkChart &&
            this.chartManager.ttkChart.lastResults
              ? this.chartManager.ttkChart.lastResults[e]
              : null;
          if (!a || !this.lastCalcParams) return;
          let t = {
            ...this.lastCalcParams,
            bulletLevel: a.bulletKey,
            hitRate:
              typeof a.usedHitRate === "number"
                ? a.usedHitRate
                : this.lastCalcParams.hitRate,
          };
          ((this.weaponDetailState = { result: a, params: t, sequence: [] }),
            this.refreshWeaponDetailModal());
        } catch (a) {
          this.handleError("武器详细击杀信息生成失败", a);
        }
      }
      handleCalculate() {
        try {
          let {
              params: e,
              armed: a,
              attachments: t,
            } = this.prepareWeaponData(),
            n = [];
          j();
          let o = R.calculateWeaponsTTK(a, t, e);
          ((this.lastCalcResults = o),
            (this.lastCalcParams = e),
            this.chartManager.updateTtkChart(o, e),
            (n =
              (this.chartManager &&
                this.chartManager.ttkChart &&
                this.chartManager.ttkChart.lastResults) ||
              o),
            this.domController.applyTrimmedWeaponSelection(
              new Set(n.map((r) => r.name)),
            ),
            this.domController.sortAttachmentTableByRanking(n));
        } catch (e) {
          this.handleError("计算失败", e);
        }
      }
      handleDistanceChart() {
        try {
          let {
              params: e,
              armed: a,
              attachments: t,
            } = this.prepareWeaponData(),
            n = [];
          (this.chartManager.updateDistanceChart(a, t, e),
            (n =
              (this.chartManager &&
                this.chartManager.distanceChart &&
                this.chartManager.distanceChart.lastResults) ||
              []),
            this.domController.applyTrimmedWeaponSelection(
              new Set(n.map((o) => o.weapon.name)),
            ),
            this.domController.sortAttachmentTableByRanking(
              n.map((o) => o.weapon.name),
            ));
        } catch (e) {
          this.handleError("距离图表生成失败", e);
        }
      }
      prepareWeaponData() {
        let e = this.domController.readPageParams();
        (ye(e), he(e), this.domController.clearTrimmedWeaponSelection());
        let a = this.domController.readWeaponBullets(),
          {
            barrelValues: t,
            muzzleValues: n,
            hitRateValues: o,
            fireControlValues: fcValues,
          } = this.domController.collectAttachmentData(),
          r = this.weaponManager.readAttachmentsWithBullet(t, n, o, a, fcValues),
          s = this.weaponManager.getWeapons();
        fe(r, s);
        let i = this.weaponManager.applyAttachments(r, e),
          u = this.buildCompleteAttachments(i, r);
        return { params: e, armed: i, attachments: u };
      }
      buildCompleteAttachments(e, a) {
        let t = [...a];
        return (
          e.slice(a.length).forEach((n, o) => {
            t.push(n.attachmentConfig);
          }),
          t
        );
      }
      handleError(e, a) {
        (this.domController.showError(a.message), console.error(`${e}:`, a));
      }
    },
    ve = new ue();
  window.app = ve;
  window.__ammo = ie;
  window.__caliber = caliberMap;
  window.__weapons = ge;
  window.__marlinAmmo = marlinAmmoProfiles;
})();
