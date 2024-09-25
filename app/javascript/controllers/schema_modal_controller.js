import { Controller } from "@hotwired/stimulus"
import { CopyClipboard } from 'flowbite';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

export default class extends Controller {
  static targets = ["copyButton", "content"]

  connect() {
    this.clipboard = new CopyClipboard(this.copyButtonTarget, this.contentTarget, { contentType: 'textContent' })

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

    this.initializeMarked()
  }

  contentTargetConnected(e) {
    this.initializeMarked()

    e.innerHTML = this.marked.parse(e.textContent);
  }

  initializeMarked() {
    if (this.marked != undefined) return

    this.marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, _info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );
  }

  copy() {
    this.clipboard.copy();
  }
}
