import { useState, useCallback } from 'react'
import type { Operator } from '../types'
import {
  createInitialState,
  inputDigit,
  inputDecimal,
  inputOperator,
  inputEquals,
  inputSqrt,
  clear,
} from '../utils/calculator'

export const useCalculator = () => {
  const [state, setState] = useState(createInitialState)

  const onDigit = useCallback((digit: string) => {
    setState((prev) => inputDigit(prev, digit))
  }, [])

  const onDecimal = useCallback(() => {
    setState((prev) => inputDecimal(prev))
  }, [])

  const onOperator = useCallback((operator: Operator) => {
    setState((prev) => inputOperator(prev, operator))
  }, [])

  const onEquals = useCallback(() => {
    setState((prev) => inputEquals(prev))
  }, [])

  const onSqrt = useCallback(() => {
    setState((prev) => inputSqrt(prev))
  }, [])

  const onClear = useCallback(() => {
    setState(clear())
  }, [])

  return {
    display: state.display,
    expression: state.expression,
    onDigit,
    onDecimal,
    onOperator,
    onEquals,
    onSqrt,
    onClear,
  }
}
