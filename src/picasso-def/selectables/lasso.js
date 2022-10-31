import { lasso } from '../../interactive';

export default function lassoConfig({ actions, isDimensionLocked }) {
  if (isDimensionLocked) {
    return { components: [], interactions: [] };
  }

  const config = {
    key: 'lasso',
    componentTargetKey: 'treemap',
    components: [
      {
        key: 'treemap',
        action: 'add',
        contexts: ['selection'],
        data: ['select'],
      },
    ],
  };

  const options = {
    actions,
  };

  return lasso(config, options);
}
