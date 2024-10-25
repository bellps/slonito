import { Controller } from "@hotwired/stimulus";
import { Collapse } from 'flowbite';

export default class extends Controller {
  static targets = ["chatItem"]

  connect() {
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

    var currentChat = window.FlowbiteInstances.getInstance('Collapse', `dropdown_from_${chatId}`);

    if (!currentChat) return;

    currentChat.expand();

    this.chatItemTargets.forEach(function (chatItem) {
      var dropdownId = `dropdown_from_${chatItem.dataset.chatId}`

      if (window.FlowbiteInstances.instanceExists('Collapse', dropdownId)) {
        var chat = window.FlowbiteInstances.getInstance('Collapse', dropdownId)

        if (chat != currentChat) chat.collapse()
      }
    })
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

  chatItemTargetConnected(chatItem) {
    const currentUrl = window.location.pathname;
    const chatIdMatch = currentUrl.match(/\/chats\/(\d+)/);
    var item;

    if (!chatIdMatch) return;

    const chatId = `chat_instance_${chatIdMatch[1]}`;

    var controller = this;

    var dropdownId = `dropdown_from_${chatItem.dataset.chatId}`

    if (!window.FlowbiteInstances.instanceExists('Collapse', dropdownId)) {
      var dropdown = document.getElementById(`dropdown_from_${chatItem.dataset.chatId}`);
      var options = {
        onCollapse: (callback) => {
          controller.unselectChat(callback)
        },
        onExpand: (callback) => {
          controller.selectChat(callback)
        }
      };

      item = new Collapse(dropdown, chatItem, options);

      window.FlowbiteInstances.addInstance('Collapse', item, `dropdown_from_${chatItem.dataset.chatId}`)
    } else {
      item = window.FlowbiteInstances.getInstance('Collapse', dropdownId)
    }

    if (chatId == chatItem.dataset.chatId) item.expand();
  }

  chatItemTargetDisconnected(chatItem) {
    var dropdownId = `dropdown_from_${chatItem.dataset.chatId}`
    
    if (window.FlowbiteInstances.instanceExists('Collapse', dropdownId)) {
      window.FlowbiteInstances.destroyAndRemoveInstance('Collapse', `dropdown_from_${chatItem.dataset.chatId}`)
    }
  }

  getCurrentChatId() {
    const currentUrl = window.location.pathname;
    const chatIdMatch = currentUrl.match(/\/chats\/(\d+)/);

    if (chatIdMatch) {
      
    }

      return `chat_instance_${chatIdMatch[1]}`;
  }

  selectChat(callback) {
    callback._triggerEl.classList.add("current", "bg-stone-700");
    const iconEl = callback._triggerEl.querySelector(".arrow-icon");

    iconEl.classList.add('rotate-180')
  }

  unselectChat(callback) {
    callback._triggerEl.classList.remove("current", "bg-stone-700");
    const iconEl = callback._triggerEl.querySelector(".arrow-icon");

    iconEl.classList.remove('rotate-180')
  }
}
