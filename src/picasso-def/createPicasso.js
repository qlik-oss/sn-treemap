import Hammer from 'hammerjs'
import picassoHammer from 'picasso-plugin-hammer';
import picasso from 'picasso.js';
import picassoQ from 'picasso-plugin-q';

export const createPicasso = ({renderer}) => {
  const pic = picasso({
    renderer: {
      prio: [renderer || 'canvas'],
    },
  });
  pic.use(picassoQ);
  pic.use(picassoHammer);
  return {pic, picassoQ};
};
