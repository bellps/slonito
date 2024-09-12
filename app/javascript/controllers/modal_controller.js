import { Controller } from "@hotwired/stimulus"
import * as flowbite from 'flowbite';

export default class extends Controller {
  connect() {
    this.modal = new flowbite.Modal(this.element)
  }

  open() {
    if (this.modal.isHidden) {
      this.modal.show()
    }
  }

  cancel() {
    this.modal.hide()
  }

  close(event) {
    if (event.detail.success) {
      this.modal.hide()
    }
  }
}
