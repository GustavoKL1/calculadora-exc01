type Token =
  | { type: 'number'; value: number }
  | { type: 'operator'; value: string }

function tokenize(expr: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < expr.length) {
    if (expr[i] === ' ') { i++; continue }
    if (/\d/.test(expr[i])) {
      let num = ''
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
        num += expr[i++]
      }
      tokens.push({ type: 'number', value: parseFloat(num) })
      continue
    }
    if ('+-*/^'.includes(expr[i])) {
      tokens.push({ type: 'operator', value: expr[i] })
      i++
      continue
    }
    i++
  }
  return tokens
}

class Parser {
  private tokens: Token[]
  private pos: number

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.pos = 0
  }

  parse(): number {
    const result = this.parseExpression()
    return isNaN(result) ? NaN : result
  }

  private parseExpression(): number {
    let left = this.parseTerm()
    while (this.pos < this.tokens.length) {
      const t = this.tokens[this.pos]
      if (t.type !== 'operator' || (t.value !== '+' && t.value !== '-')) break
      this.pos++
      const right = this.parseTerm()
      left = t.value === '+' ? left + right : left - right
    }
    return left
  }

  private parseTerm(): number {
    let left = this.parsePower()
    while (this.pos < this.tokens.length) {
      const t = this.tokens[this.pos]
      if (t.type !== 'operator' || (t.value !== '*' && t.value !== '/')) break
      this.pos++
      const right = this.parsePower()
      left = t.value === '*' ? left * right : (right === 0 ? NaN : left / right)
    }
    return left
  }

  private parsePower(): number {
    let left = this.parseNumber()
    while (this.pos < this.tokens.length) {
      const t = this.tokens[this.pos]
      if (t.type !== 'operator' || t.value !== '^') break
      this.pos++
      const right = this.parseNumber()
      left = Math.pow(left, right)
    }
    return left
  }

  private parseNumber(): number {
    const token = this.tokens[this.pos]
    if (token && token.type === 'number') {
      this.pos++
      return token.value
    }
    return NaN
  }
}

export function evaluate(expr: string): number {
  const tokens = tokenize(expr)
  if (tokens.length === 0) return NaN
  return new Parser(tokens).parse()
}
