import warning from 'warning'

import * as rules from './rules'

const MJMLRulesCollection = rules

export function registerRule(rule, name) {
  if (typeof rule !== 'function' || rule.length !== 1) {
    return warning(
      false,
      'Your rule must be a function and must have one parameter which is the element to validate',
    )
  }

  if (name) {
    MJMLRulesCollection[name] = rule
  } else {
    MJMLRulesCollection[rule.name] = rule
  }

  return true
}

export default MJMLRulesCollection
