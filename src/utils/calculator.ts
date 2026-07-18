import type { CalculatorState, Operator } from '../types'
import { sqrt as sqrtOp } from './operations'
import { evaluate } from './evaluator'

export const createInitialState = (): CalculatorState => ({
  display: '0',
  expression: '',
  overwrite: false,
})

function formatResult(value: number): string {
  if (!isFinite(value)) return 'Error'
  let str = value.toPrecision(10)
  if (str.includes('.')) str = str.replace(/\.?0+$/, '')
  if (str.length > 12 || str.includes('e')) str = value.toExponential(6)
  return str
}

export const inputDigit = (
  state: CalculatorState,
  digit: string,
): CalculatorState => {
  if (state.display === 'Error') {
    return { ...createInitialState(), display: digit }
  }

  if (state.expression.endsWith(' = ')) {
    return { display: digit, expression: '', overwrite: false }
  }

  if (state.overwrite) {
    return { ...state, display: digit, overwrite: false }
  }

  if (state.display === '0' && digit !== '.') {
    return { ...state, display: digit }
  }

  if (state.display.length >= 14) return state

  return { ...state, display: state.display + digit }
}

export const inputDecimal = (state: CalculatorState): CalculatorState => {
  if (state.display === 'Error') {
    return { ...createInitialState(), display: '0.' }
  }

  if (state.expression.endsWith(' = ')) {
    return { display: '0.', expression: '', overwrite: false }
  }

  if (state.overwrite) {
    return { ...state, display: '0.', overwrite: false }
  }

  if (!state.display.includes('.')) {
    return { ...state, display: state.display + '.' }
  }

  return state
}

export const inputOperator = (
  state: CalculatorState,
  operator: Operator,
): CalculatorState => {
  if (state.display === 'Error') {
    return { ...createInitialState(), expression: '0 ' + operator + ' ', overwrite: true }
  }

  if (state.expression.endsWith(' = ')) {
    return { display: '0', expression: state.display + ' ' + operator + ' ', overwrite: true }
  }

  if (state.overwrite && state.display === '0' && state.expression.length > 0) {
    const trimmed = state.expression.trimEnd()
    const spaceIdx = trimmed.lastIndexOf(' ')
    if (spaceIdx !== -1) {
      return { ...state, expression: trimmed.slice(0, spaceIdx + 1) + operator + ' ' }
    }
  }

  return {
    ...state,
    expression: state.expression + state.display + ' ' + operator + ' ',
    display: '0',
    overwrite: true,
  }
}

export const inputEquals = (state: CalculatorState): CalculatorState => {
  if (state.display === 'Error') return state
  if (state.expression === '' || state.expression.endsWith(' = ')) return state

  const fullExpr = state.expression + state.display
  const result = evaluate(fullExpr)

  return {
    ...state,
    display: formatResult(result),
    expression: fullExpr + ' = ',
    overwrite: true,
  }
}

export const inputSqrt = (state: CalculatorState): CalculatorState => {
  if (state.display === 'Error') return state

  const currentValue = parseFloat(state.display)
  const result = sqrtOp(currentValue)

  return {
    ...state,
    display: formatResult(result),
    overwrite: true,
  }
}

export const clear = (): CalculatorState => createInitialState()
