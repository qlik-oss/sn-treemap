import pp from './property-definition';

export default function ext(env) {
  return {
    definition: pp(env),
    // TODO soft properties
    support: {
      // TODO
    },
    // TODO: object conversion
  };
}
