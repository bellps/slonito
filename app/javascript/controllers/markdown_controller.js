import { Controller } from "@hotwired/stimulus"
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

export default class extends Controller {
  static targets = ["item"]

  connect() {
    this.initializeMarked()
  }

  itemTargetConnected(e) {
    this.initializeMarked()

    e.innerHTML = this.marked.parse(e.innerHTML);
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
}
