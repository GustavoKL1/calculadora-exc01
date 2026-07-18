type DisplayProps = {
  expression: string
  value: string
}

export const Display = ({ expression, value }: DisplayProps) => (
  <div className="display">
    <div className="expression">{expression}</div>
    <div className="value">{value}</div>
  </div>
)
