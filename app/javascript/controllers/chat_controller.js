import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "content" ]

  send(e) {
    e.preventDefault()

    if (this.contentTarget.value.trim() != '') {
      this.element.requestSubmit()

      this.contentTarget.value = ''
    }
  }
}
