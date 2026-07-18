import { useCalculator } from '../hooks/useCalculator'
import { Display } from './Display'
import { ButtonPad } from './ButtonPad'

export const Calculator = () => {
  const {
    display,
    expression,
    onDigit,
    onDecimal,
    onOperator,
    onEquals,
    onSqrt,
    onClear,
  } = useCalculator()

  return (
    <div className="calculator">
      <Display value={display} expression={expression} />
      <ButtonPad
        onDigit={onDigit}
        onDecimal={onDecimal}
        onOperator={onOperator}
        onEquals={onEquals}
        onSqrt={onSqrt}
        onClear={onClear}
      />
    </div>
  )
}
