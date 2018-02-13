import React from "react"
import test from "ava"
import { mount } from "enzyme"
import sinon from "sinon"

import Radio from "./Radio"

const options = [
  { value: "first", label: "First" },
  { value: "second", label: "Second" }
]

const renderRadio = (props = {}) =>
  mount(
    <Radio
      onChange={onChangeStub}
      name="radiotest"
      options={options}
      {...props}
    />
  )

let onChangeStub

test.beforeEach(() => {
  onChangeStub = sinon.stub()
})

test("Radio should render the options", t => {
  const wrapper = renderRadio()
  t.true(wrapper.exists())

  wrapper.find("input").forEach((wrapper, idx) => {
    const { name, value } = wrapper.props()
    t.is(name, "radiotest")
    t.is(value, options[idx].value)
  })
  wrapper.find("label").forEach((wrapper, idx) => {
    t.is(wrapper.text(), options[idx].label)
  })
})

test("Radio should render a className if passed in", t => {
  const wrapper = renderRadio({
    className: "weeee"
  })

  t.is(
    wrapper
      .find("div")
      .at(0)
      .props().className,
    "weeee"
  )
})

test("Radio should call onChange func on click", t => {
  const wrapper = renderRadio()
  const event = {
    target: { value: "first" }
  }
  wrapper
    .find("input")
    .at(1)
    .simulate("change", event)
  t.true(onChangeStub.called)
})

test("Radio should have the input checked for the value prop", t => {
  const wrapper = renderRadio({
    value: "second"
  })
  const [first, second] = wrapper.find("input")
  t.false(first.props.checked)
  t.true(second.props.checked)
})
