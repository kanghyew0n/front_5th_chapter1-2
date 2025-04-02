const eventHandler = {};

export function setupEventListeners(root) {
  if (!root) {
    return;
  }

  Object.keys(eventHandler).forEach((eventType) => {
    root.addEventListener(eventType, handleEvent);
  });
}

function handleEvent(event) {
  const { type, target } = event;
  if (eventHandler[type] && eventHandler[type][target]) {
    eventHandler[type][target](event);
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventHandler[eventType]) {
    eventHandler[eventType] = {};
  }
  eventHandler[eventType][element] = handler;
}

export function removeEvent(element, eventType, handler) {
  if (eventHandler[eventType][element] === handler) {
    delete eventHandler[eventType][element];
  }
}
