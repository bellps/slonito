import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    document.addEventListener(
      'turbo:load',
      this.scrollAndStartObserver.bind(this)
    );

    document.addEventListener(
      'turbo:before-render',
      this.scrollToBottom.bind(this)
    );
  }

  scrollAndStartObserver() {
    if (this.element) {
      // Chama a função de scroll ao carregar
      this.scrollToBottom();

      // Criar um observador de mutações
      const observer = new MutationObserver(() => {
        this.scrollToBottom();
      });

      // Configura o observador para observar adições de filhos
      observer.observe(this.element, {
        childList: true, // Observa mudanças na lista de filhos
        subtree: true // Observa também os filhos dos filhos
      });
    }
  }

  scrollToBottom() {
    if (this.element) this.element.scrollTop = this.element.scrollHeight;
  }

  disconnect() {
    document.removeEventListener(
      'turbo:load', 
      this.scrollAndStartObserver.bind(this)
    );

    document.removeEventListener(
      'turbo:before-render',
      this.scrollToBottom.bind(this)
    );
  }
}
