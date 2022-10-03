export const setupBrushes = (brush, chartInstance) => {
  const kinesics = chartInstance.interactions.instances.find((interaction) => interaction.key === 'kinesics');
  if (kinesics) {
    kinesics.setupBrushes(brush, chartInstance);
  }
};
