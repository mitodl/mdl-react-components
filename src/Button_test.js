import React from "react"
import test from "ava"
import { shallow } from "enzyme"

import Button from "./Button"

const renderButton = (label: string, props = {}) =>
  shallow(<Button {...props}>{label}</Button>)

test("<Button/> should render with children", t => {
  const wrapper = renderButton("button label")
  t.is(wrapper.text(), "button label")
  "mdc-button mdc-button--raised blue-button".split(" ").forEach(className => {
    t.true(wrapper.hasClass(className))
  })
})

test("<Button/> should render with an optional className", t => {
  const wrapper = renderButton("button label", { className: "mybutton" })
  t.true(wrapper.hasClass("mybutton"))
})
