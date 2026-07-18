import type { Operator } from '../types'

export const add = (a: number, b: number): number => a + b
export const subtract = (a: number, b: number): number => a - b
export const multiply = (a: number, b: number): number => a * b
export const divide = (a: number, b: number): number => (b === 0 ? NaN : a / b)
export const power = (a: number, b: number): number => Math.pow(a, b)
export const sqrt = (a: number): number => (a < 0 ? NaN : Math.sqrt(a))

export const operate = (operator: Operator, a: number, b: number): number => {
  switch (operator) {
    case '+': return add(a, b)
    case '-': return subtract(a, b)
    case '*': return multiply(a, b)
    case '/': return divide(a, b)
    case '^': return power(a, b)
  }
}
