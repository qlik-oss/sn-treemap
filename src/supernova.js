/* eslint-disable react-hooks/rules-of-hooks */
import {
  useLayout,
  useElement,
  useEffect,
  useState,
  useTheme,
  useSelections,
  useRect,
} from '@nebula.js/stardust';
import {createPicasso} from './picasso-def/createPicasso';
import {picassoDef} from './picasso-def';
import {treemap, tooltip, nativeLegend} from './picasso-def/components';
import {qae} from './qae';
import {picassoSelections} from './picassoSelections';

const supernova = (env) => {
  const {pic, picassoQ} = createPicasso({renderer: env.renderer});
  let showLegend = true;
  let invalidMessage = 'This chart cannot be displayed.';
  pic.component('treemap', treemap());
  if (env.carbon) {
    pic.component('floating', tooltip());
    pic.component('nativeLegend', nativeLegend());
    showLegend = env.showLegend;
    invalidMessage = env.invalidMessage;
  }

  let mounted = false;
  let selectBrush;
  let lassoBrush;

  return {
    qae,
    component() {
      const theme = useTheme();
      const layout = useLayout();
      const element = useElement();
      const selections = useSelections();
      const rect = useRect();
      const [chart, setChart] = useState(undefined);

      useEffect(() => {
        return () => {
          if (chart) {
            chart.destroy();
          }
        };
      }, [element, chart]);

      useEffect(() => {
        if(chart && layout?.qHyperCube) {
          chart.update();
        }
      }, [rect.width, rect.height, chart])

      useEffect(() => {
        if (!mounted && selections !== undefined && layout.qHyperCube) {
          mounted = true;
          const settings = picassoDef({
            layout,
            theme,
            env,
            picassoQ,
            selectionsApi: selections,
            showLegend,
            invalidMessage,
          });
          const data = {type: 'q', data: layout.qHyperCube, key: 'qHyperCube'};
          const c = pic.chart({element, settings, data});

          selectBrush = c.brush('dataContext');
          lassoBrush = c.brush('lassoContext');
          selections.addListener('cleared', () => {
            selectBrush.clear();
            lassoBrush.clear();
          });

          selections.addListener('aborted', () => {
            selectBrush.end();
            lassoBrush.end();
          });

          picassoSelections({selectBrush, picassoQ, selections});
          picassoSelections({
            selectBrush: lassoBrush,
            picassoQ,
            selections,
            lasso: true,
          });

          setChart(c);
        }
      }, [element, layout, selections, theme]);

      useEffect(() => {
        if (chart) {
          if (!layout.qSelectionInfo.qInSelections) {
            const settings = picassoDef({
              layout,
              theme,
              env,
              picassoQ,
              selectionsApi: selections,
              showLegend,
              invalidMessage,
            });
            const data = {type: 'q', data: layout.qHyperCube};
            chart.update({data, settings});
            selectBrush.end();
            lassoBrush.end();
          }
        }
      }, [layout, chart, theme, selections]);
    },
  };
};

export default supernova;
