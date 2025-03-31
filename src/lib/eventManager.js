let _root;

const eventHandlers = {};

export function setupEventListeners(root) {
  if (!root) {
    return;
  }

  _root = root;

  Object.keys(eventHandlers).forEach((eventType) => {
    Object.keys(eventHandlers[eventType]).forEach((selector) => {
      const handler = eventHandlers[eventType][selector];
      if (handler) {
        root.addEventListener(eventType, handler);

        return function cleanup() {
          root.removeEventListener(eventType, handler);
        };
      }
    });
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }
  eventHandlers[eventType][element] = handler;
}

export function removeEvent(element, eventType, handler) {
  if (eventHandlers[eventType][element] === handler) {
    _root.removeEventListener(eventType, handler);
    eventHandlers[eventType][element] = {};
  }
}
