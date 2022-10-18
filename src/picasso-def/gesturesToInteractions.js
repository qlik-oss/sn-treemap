export default function gesturesToInteractions(interactionType, gestures) {
  return {
    type: interactionType,
    key: 'hammer',
    gestures,
  };
}
