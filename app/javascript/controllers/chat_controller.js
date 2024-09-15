import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "contentField" ]

  send(e) {
    e.preventDefault()

    if (e.target.value.trim() != '') {
      this.element.requestSubmit()

      e.target.value = ''
    }
  }
}
