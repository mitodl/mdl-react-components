// @flow
import React from "react"

type RadioOption = {
  value: any,
  label: string
}

type RadioProps = {
  name: string,
  className?: string,
  options: Array<RadioOption>,
  onChange: Function,
  value: any
}

export default class Radio extends React.Component<RadioProps, *> {
  renderOptions = ({ value, label }: RadioOption, idx: number) => {
    const { name, onChange } = this.props
    const currentValue = this.props.value

    return (
      <div key={idx}>
        <div className="mdc-radio">
          <input
            className="mdc-radio__native-control"
            type="radio"
            id={`radio-${idx}`}
            name={name}
            value={value}
            checked={value === currentValue}
            onChange={onChange}
          />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        <label id={`radio-${idx}-label`} htmlFor={`radio-${idx}`}>
          {label}
        </label>
      </div>
    )
  }

  render() {
    const { className, options } = this.props

    return (
      <div className={className || ""}>{options.map(this.renderOptions)}</div>
    )
  }
}
