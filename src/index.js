import {
  useLayout,
  useElement,
  useEffect,
  useState,
  useTheme,
  useOptions,
  useSelections,
  useRect,
  useTranslator,
} from '@nebula.js/stardust';
import { createPicasso } from './picasso-def/createPicasso';
import { picassoDef } from './picasso-def';
import { treemap, tooltip, nativeLegend } from './picasso-def/components';
import { qae } from './qae';
import { picassoSelections } from './picassoSelections';
import ext from './ext/ext';

const supernova = (env) => {
  const { pic, picassoQ } = createPicasso({ renderer: env.renderer });
  let showLegend = true;
  let invalidMessage = 'This chart cannot be displayed.';
  pic.component('treemap', treemap());
  if (env.carbon) {
    pic.component('floating', tooltip());
    pic.component('nativeLegend', nativeLegend());
    showLegend = env.showLegend;
    invalidMessage = env.invalidMessage;
  }

  return {
    qae,
    ext: ext(env),
    component() {
      const theme = useTheme();
      const layout = useLayout();
      const element = useElement();
      const selections = useSelections();
      const translator = useTranslator();
      const rect = useRect();
      const options = useOptions();
      const [chart, setChart] = useState(undefined);
      const state = useState({ mounted: false });

      useEffect(
        () => () => {
          if (chart) {
            chart.destroy();
          }
        },
        [element, chart]
      );

      useEffect(() => {
        if (chart && layout?.qHyperCube) {
          chart.update();
        }
      }, [rect.width, rect.height, chart]);

      useEffect(() => {
        if (!state.mounted && selections !== undefined && layout.qHyperCube) {
          state.mounted = true;
          const settings = picassoDef({
            layout,
            theme,
            env,
            picassoQ,
            selectionsApi: selections,
            showLegend,
            invalidMessage,
            translator,
            options,
          });
          const data = { type: 'q', data: layout.qHyperCube, key: 'qHyperCube' };
          const c = pic.chart({ element, settings, data });
          state.selectBrush = c.brush('dataContext');
          state.lassoBrush = c.brush('lassoContext');
          selections.addListener('cleared', () => {
            state.selectBrush.clear();
            state.lassoBrush.clear();
          });

          selections.addListener('aborted', () => {
            state.selectBrush.end();
            state.lassoBrush.end();
          });

          picassoSelections({ selectBrush: state.selectBrush, picassoQ, selections });
          picassoSelections({
            selectBrush: state.lassoBrush,
            picassoQ,
            selections,
            lasso: true,
          });

          setChart(c);
        }
      }, [element, layout, selections, theme, options]);

      useEffect(() => {
        if (!chart || layout.qSelectionInfo.qInSelections) {
          return;
        }

        const settings = picassoDef({
          layout,
          theme,
          env,
          picassoQ,
          selectionsApi: selections,
          showLegend,
          invalidMessage,
          translator,
          options,
        });
        const data = { type: 'q', data: layout.qHyperCube };
        chart.update({ data, settings });
        state.selectBrush.end();
        state.lassoBrush.end();
      }, [layout, chart, theme, selections, options]);
    },
  };
};

export default supernova;
