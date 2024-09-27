import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "content", "submitButton" ]

  connect() {
    this.element.addEventListener(
      "turbo:submit-start",
      this.handleSubmitStart.bind(this)
    );

    this.element.addEventListener(
      "turbo:submit-end",
      this.handleSubmitEnd.bind(this)
    );
  }

  send(e) {
    e.preventDefault()

    if (this.contentTarget.value.trim() != '') {
      this.element.requestSubmit()

      this.contentTarget.value = ''
    }
  }

  handleSubmitStart() {
    this.contentTarget.disabled = true;
    this.submitButtonTarget.disabled = true;
    this.contentTarget.placeholder = 'Slonito is typing...';
  }

  handleSubmitEnd() {
    this.contentTarget.disabled = false;
    this.submitButtonTarget.disabled = false;
    this.contentTarget.placeholder = 'Message Slonito';
  }

  disconnect() {
    this.element.removeEventListener(
      "turbo:submit-start",
      this.handleSubmitStart.bind(this)
    );

    this.element.removeEventListener(
      "turbo:submit-end",
      this.handleSubmitEnd.bind(this)
    );
  }
}
