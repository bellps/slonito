import { Controller } from "@hotwired/stimulus";
import * as flowbite from 'flowbite';

export default class extends Controller {
  static targets = ["chatItem"]

  connect() {
    this.updateActiveChat();

    document.addEventListener(
      "turbo:visit",
      this.handleTurboEvents.bind(this)
    );

    document.addEventListener(
      "turbo:frame-load",
      this.handleTurboEvents.bind(this)
    );
  }

  updateActiveChat() {
    const currentUrl = window.location.pathname;
    const chatIdMatch = currentUrl.match(/\/chats\/(\d+)/);

    if (!chatIdMatch) return;

    const chatId = `chat_instance_${chatIdMatch[1]}`;

    this.chatItemTargets.forEach(chatItem => {
      chatItem.classList.remove("bg-stone-700");

      let oldCollapse = new flowbite.Collapse(
        document.getElementById(`dropdown_from_${chatItem.dataset.chatId}`),
        chatItem
      );

      if (oldCollapse._visible) oldCollapse.collapse();
    });

    const activeChat = this.chatItemTargets.find(
      chatItem => chatItem.dataset.chatId === chatId
    );

    if (!activeChat) return;

    const collapse = new flowbite.Collapse(
      document.getElementById(`dropdown_from_${chatId}`),
      activeChat
    )

    activeChat.classList.add("bg-stone-700");
    collapse.expand();
  }

  handleTurboEvents() {
    this.updateActiveChat();
  }

  disconnect() {
    document.removeEventListener(
      "turbo:visit",
      this.handleTurboEvents.bind(this)
    );
    document.removeEventListener(
      "turbo:frame-load",
      this.handleTurboEvents.bind(this)
    );
  }
}
