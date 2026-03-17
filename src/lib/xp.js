export function xpForLevel(level) {
  return level * 100
}

export function levelFromTotalXP(totalXP) {
  let level = 1
  let remaining = totalXP
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level)
    level++
  }
  return { level, xp: remaining }
}

export function xpProgressPercent(xp, level) {
  return Math.min((xp / xpForLevel(level)) * 100, 100)
}
