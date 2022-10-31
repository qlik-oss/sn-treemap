import event from './event';

export default (cfg, opts) => {
  if (!cfg.targets) {
    throw new Error("Missing 'targets' property");
  }

  const e = event(cfg, opts);

  return {
    interactions: [e],
    components: [],
  };
};
