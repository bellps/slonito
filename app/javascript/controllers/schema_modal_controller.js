import { Controller } from "@hotwired/stimulus"
import { CopyClipboard } from 'flowbite';

export default class extends Controller {
  static targets = ["copyButton", "content"]

  connect() {
    this.clipboard = new CopyClipboard(this.copyButtonTarget, this.contentTarget, { contentType: 'innerHTML' })

    const $defaultMessage = document.getElementById('copy-button-default-message');
    const $successMessage = document.getElementById('copy-button-success-message');

    this.clipboard.updateOnCopyCallback((_clipboard) => {
      showSuccess();

      setTimeout(() => {
        resetToDefault();
      }, 2000);
    })

    const showSuccess = () => {
      $defaultMessage.classList.add('hidden');
      $successMessage.classList.remove('hidden');
    }

    const resetToDefault = () => {
      $defaultMessage.classList.remove('hidden');
      $successMessage.classList.add('hidden');
    }
  }

  copy() {
    this.clipboard.copy();
  }
}
