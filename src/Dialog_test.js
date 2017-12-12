import React from "react"
import test from "ava"
import { mount } from "enzyme"

import Dialog from "./Dialog"
import { wait } from "./test_utils"

const renderDialog = (props = {}) =>
  mount(
    <Dialog id="mydialog" title="mytitle" {...props}>
      <p>Here's some text to render</p>
    </Dialog>
  )

test("<Dialog/> should render with passed props", t => {
  const wrapper = renderDialog()
  t.true(wrapper.is("#mydialog"))
  t.is(wrapper.find("p").text(), "Here's some text to render")
})
;[true, false].forEach(open => {
  test(`<Dialog/> ${
    open ? "should" : "should not"
  } open on mount when open=${open}`, t => {
    const wrapper = renderDialog({ open })
    t.deepEqual(wrapper.state("style"), open ? null : { display: "none" })
    t.is(wrapper.instance().dialog.open, open)
  })
})
;[true, false].forEach(open => {
  test(`<Dialog/> should ${
    open ? "open" : "close"
  } when open prop changes to ${open}`, async t => {
    const wrapper = renderDialog({ open: !open })
    await wait(5)
    t.deepEqual(wrapper.state("style"), !open ? null : { display: "none" })
    t.is(wrapper.instance().dialog.open, !open)
    wrapper.setProps({ open })
    await wait(5)
    t.is(wrapper.state("style"), null)
    t.is(wrapper.instance().dialog.open, open)
  })
})
