import {
  useApp,
  useAppLayout,
  useLayout,
  useElement,
  useEffect,
  useModel,
  useState,
  usePromise,
  useTheme,
  useOptions,
  useSelections,
  useRect,
  useTranslator,
} from '@nebula.js/stardust';
import { colorService as createColorService } from 'qlik-chart-modules';
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
      const app = useApp();
      const model = useModel();
      const rect = useRect();
      const options = useOptions();
      const { qLocaleInfo: localeInfo } = useAppLayout();
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
          const c = pic.chart({ element, settings: {}, data: [] });
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

      usePromise(async () => {
        if (!chart || layout.qSelectionInfo.qInSelections) {
          return;
        }
        const colorService = createColorService({
          picasso: pic,
          model,
          app,
          translator,
          config: {
            auto: false, // prevents default auto() to be called internally
            key: 'fill',
          },
        });

        const createConfig = ({ getUseBaseColors }) => ({
          theme,
          legendProps: layout.legend,
          layout,
          localeInfo,
          hc: layout.qHyperCube,
          colorProps: {
            ...layout.color,
            useBaseColors: getUseBaseColors(layout),
          },
        });

        await colorService.initialize({ createConfig });

        const settings = picassoDef({
          layout,
          theme,
          env,
          picassoQ,
          selectionsApi: selections,
          showLegend,
          invalidMessage,
          translator,
          colorService,
          chart,
          options,
        });
        const data = [
          {
            type: 'q',
            key: 'qHyperCube',
            data: layout.qHyperCube,
            config: {
              localeInfo,
            },
          },
          ...colorService.getData(),
        ];
        chart.update({ data, settings });
        state.selectBrush.end();
        state.lassoBrush.end();
      }, [layout, chart, theme, selections, options]);
    },
  };
};

export default supernova;
