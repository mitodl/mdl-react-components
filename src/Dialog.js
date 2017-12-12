// @flow
import React from "react"
import { MDCDialog } from "@material/dialog/dist/mdc.dialog"

import Button from "./Button"

import type { ChildrenArray } from "react"

type DialogProps = {
  id: string,
  title: string,
  open: boolean,
  validateOnClick?: boolean,
  cancelText?: string,
  submitText?: string,
  children: ChildrenArray<any>,
  onAccept?: () => void,
  onCancel?: () => void,
  hideDialog: () => void
}

type DialogState = {
  style: ?Object
}

export default class Dialog extends React.Component<*, *> {
  props: DialogProps
  state: DialogState

  dialog = null
  dialogRoot = null

  constructor(props: DialogProps) {
    super(props)
    // this avoids showing the dialog before the CSS has loaded
    this.state = {
      style: {
        display: "none"
      }
    }
  }

  componentDidMount() {
    const { open } = this.props

    // Hack to get dialog to play nicely with JS tests
    if (!this.dialogRoot || !this.dialogRoot.dataset) return

    this.dialog = new MDCDialog(this.dialogRoot)
    this.attachDialogListeners(this.dialog)

    if (open) {
      this.showMdc()
    }
  }

  componentWillUnmount() {
    this.destroyMdc()
  }

  componentWillReceiveProps(nextProps: DialogProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        this.showMdc()
      } else {
        this.closeMdc()
      }
    }
  }

  // This function only exists because of false Flow errors
  attachDialogListeners = (dialog: Object) => {
    const { onAccept, onCancel, hideDialog, validateOnClick } = this.props

    if (onAccept) {
      dialog.listen("MDCDialog:accept", onAccept)
    }
    if (!validateOnClick) {
      dialog.listen("MDCDialog:accept", hideDialog)
    }
    if (onCancel) {
      dialog.listen("MDCDialog:cancel", onCancel)
    }
    dialog.listen("MDCDialog:cancel", hideDialog)
  }

  showMdc() {
    this.setState({ style: null })
    if (this.dialog) {
      this.dialog.show()
    }
  }

  destroyMdc() {
    if (this.dialog) {
      this.dialog.close()
    }
  }

  closeMdc() {
    if (this.dialog) {
      this.dialog.close()
    }
  }

  renderFooterButtons() {
    const {
      cancelText,
      submitText,
      onCancel,
      onAccept,
      validateOnClick
    } = this.props
    return (
      <footer className="mdc-dialog__footer">
        <Button
          type="button"
          onClick={onCancel}
          className={`mdc-dialog__footer__button cancel-button
            ${!validateOnClick ? "mdc-dialog__footer__button--cancel" : ""}`}
        >
          {cancelText || "Cancel"}
        </Button>
        {onAccept ? (
          <Button
            type="button"
            onClick={onAccept}
            className={`mdc-dialog__footer__button edit-button
              ${!validateOnClick ? "mdc-dialog__footer__button--accept" : ""}`}
          >
            {submitText || "Save"}
          </Button>
        ) : null}
      </footer>
    )
  }

  render() {
    const { title, children, id } = this.props
    const { style } = this.state

    return (
      <aside
        id={id}
        className="mdc-dialog"
        role="alertdialog"
        aria-labelledby="my-mdc-dialog-label"
        aria-describedby="my-mdc-dialog-description"
        style={style}
        ref={node => (this.dialogRoot = node)}
      >
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="my-mdc-dialog-label" className="mdc-dialog__header__title">
              {title}
            </h2>
          </header>
          <section id="my-mdc-dialog-description" className="mdc-dialog__body">
            {children}
          </section>
          {this.renderFooterButtons()}
        </div>
        <div className="mdc-dialog__backdrop" />
      </aside>
    )
  }
}
