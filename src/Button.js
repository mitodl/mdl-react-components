// @flow
import React from "react"

import type { ChildrenArray } from "react"

type ButtonProps = {
  children: ChildrenArray<any>,
  className?: string
}

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={`mdc-button mdc-button--raised blue-button ${
      className ? className : ""
    }`}
    {...props}
  >
    {children}
  </button>
)

export default Button
