import type { Operator } from '../types'

type ButtonPadProps = {
  onDigit: (d: string) => void
  onDecimal: () => void
  onOperator: (op: Operator) => void
  onEquals: () => void
  onSqrt: () => void
  onClear: () => void
}

export const ButtonPad = ({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onSqrt,
  onClear,
}: ButtonPadProps) => (
  <div className="button-pad">
    <button className="fn" onClick={() => onClear()}>
      C
    </button>
    <button className="fn" onClick={() => onSqrt()}>
      √
    </button>
    <button className="fn" onClick={() => onOperator('^')}>
      ^
    </button>
    <button className="op" onClick={() => onOperator('/')}>
      /
    </button>

    <button onClick={() => onDigit('7')}>7</button>
    <button onClick={() => onDigit('8')}>8</button>
    <button onClick={() => onDigit('9')}>9</button>
    <button className="op" onClick={() => onOperator('*')}>
      *
    </button>

    <button onClick={() => onDigit('4')}>4</button>
    <button onClick={() => onDigit('5')}>5</button>
    <button onClick={() => onDigit('6')}>6</button>
    <button className="op" onClick={() => onOperator('-')}>
      −
    </button>

    <button onClick={() => onDigit('1')}>1</button>
    <button onClick={() => onDigit('2')}>2</button>
    <button onClick={() => onDigit('3')}>3</button>
    <button className="op" onClick={() => onOperator('+')}>
      +
    </button>

    <button className="zero" onClick={() => onDigit('0')}>
      0
    </button>
    <button onClick={() => onDecimal()}>.</button>
    <button className="eq" onClick={() => onEquals()}>
      =
    </button>
  </div>
)
