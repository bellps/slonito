import { Application } from "@hotwired/stimulus"

import 'highlight.js/styles/agate.css';

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
