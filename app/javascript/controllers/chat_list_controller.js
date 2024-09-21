import { Controller } from "@hotwired/stimulus";
import { Collapse } from 'flowbite';

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

    this.unselectChats();

    const activeChat = this.chatItemTargets.find(
      chatItem => chatItem.dataset.chatId === chatId
    );

    if (!activeChat) return;

    this.selectChat(activeChat);
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

  selectChat(element) {
    const collapse = new Collapse(
      document.getElementById(`dropdown_from_${element.dataset.chatId}`),
      element
    )

    element.classList.add("current", "bg-stone-700");

    collapse.expand();
  }

  unselectChats() {
    this.chatItemTargets.forEach(chatItem => {
      if (!chatItem.classList.contains("current")) return;

      chatItem.classList.remove("current", "bg-stone-700");

      let oldCollapse = new Collapse(
        document.getElementById(`dropdown_from_${chatItem.dataset.chatId}`),
        chatItem
      );

      if (oldCollapse._visible) oldCollapse.collapse();
    });
  }
}
