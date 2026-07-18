export type Operator = '+' | '-' | '*' | '/' | '^'

export type CalculatorState = {
  display: string
  expression: string
  overwrite: boolean
}
