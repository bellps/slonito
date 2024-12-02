import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["chatWindow"]

  chatWindowTargetConnected() {
    this.scrollAndStartObserver()

    document.addEventListener(
      'turbo:load',
      this.scrollAndStartObserver.bind(this)
    );

    document.addEventListener(
      'turbo:before-render',
      this.scrollToBottom.bind(this)
    );
  }

  chatWindowTargetDisconnect() {
    document.removeEventListener(
      'turbo:load',
      this.scrollAndStartObserver.bind(this)
    );

    document.removeEventListener(
      'turbo:before-render',
      this.scrollToBottom.bind(this)
    );
  }

  scrollAndStartObserver() {
    if (this.chatWindowTarget) {
      // Chama a função de scroll ao carregar
      this.scrollToBottom();

      // Criar um observador de mutações
      const observer = new MutationObserver(() => {
        this.scrollToBottom();
      });

      // Configura o observador para observar adições de filhos
      observer.observe(this.chatWindowTarget, {
        childList: true, // Observa mudanças na lista de filhos
        subtree: true // Observa também os filhos dos filhos
      });
    }
  }

  scrollToBottom() {
    if (this.chatWindowTarget) {
      this.chatWindowTarget.scrollTop = this.chatWindowTarget.scrollHeight;
    }
  }
}
