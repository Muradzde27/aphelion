/**
 * New-moon times via the truncated Meeus algorithm (Astronomical Algorithms,
 * ch. 49). The principal periodic terms bring the error down to a few
 * minutes — far tighter than the "dark window" we print, which is the span
 * of nights around the new moon when the sky is dark enough for deep-sky
 * work.
 */
const SYNODIC_DAYS = 29.530588861;
const DEG = Math.PI / 180;

function newMoonJDE(k) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  let jde =
    2451550.09766 + SYNODIC_DAYS * k + 0.00015437 * T2 - 0.00000015 * T3 + 0.00000000073 * T4;

  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const M = (2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3) * DEG;
  const Mp =
    (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4) * DEG;
  const F =
    (160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4) * DEG;
  const O = (124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3) * DEG;

  jde +=
    -0.4072 * Math.sin(Mp) +
    0.17241 * E * Math.sin(M) +
    0.01608 * Math.sin(2 * Mp) +
    0.01039 * Math.sin(2 * F) +
    0.00739 * E * Math.sin(Mp - M) -
    0.00514 * E * Math.sin(Mp + M) +
    0.00208 * E * E * Math.sin(2 * M) -
    0.00111 * Math.sin(Mp - 2 * F) -
    0.00057 * Math.sin(Mp + 2 * F) +
    0.00056 * E * Math.sin(2 * Mp + M) -
    0.00042 * Math.sin(3 * Mp) +
    0.00042 * E * Math.sin(M + 2 * F) +
    0.00038 * E * Math.sin(M - 2 * F) -
    0.00024 * E * Math.sin(2 * Mp - M) -
    0.00017 * Math.sin(O);

  return jde;
}

function jdeToDate(jde) {
  // JD 2440587.5 = 1970-01-01T00:00Z. TT–UTC (~69 s) is far below our needs.
  return new Date((jde - 2440587.5) * 86400 * 1000);
}

/**
 * The next `count` new moons on or after `from` (default: now).
 * Returns [{ date, windowStart, windowEnd }] — the window is the nine
 * darkest nights, new moon ± 4 days.
 */
export function nextNewMoons(count = 4, from = new Date()) {
  const jdNow = from.getTime() / 86400000 + 2440587.5;
  let k = Math.floor((jdNow - 2451550.09766) / SYNODIC_DAYS) - 1;

  const result = [];
  while (result.length < count) {
    const date = jdeToDate(newMoonJDE(k));
    if (date >= from) {
      result.push({
        date,
        windowStart: new Date(date.getTime() - 4 * 86400000),
        windowEnd: new Date(date.getTime() + 4 * 86400000),
      });
    }
    k += 1;
  }
  return result;
}
