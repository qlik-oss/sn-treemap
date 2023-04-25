import {
  useApp,
  useAppLayout,
  useConstraints,
  useLayout,
  useElement,
  useEffect,
  useEmbed,
  useModel,
  useState,
  usePromise,
  useTheme,
  useOptions,
  useSelections,
  useRect,
  useTranslator,
} from '@nebula.js/stardust';
import {
  colorService as createColorService,
  themeService as createThemeService,
  layoutService as createLayoutService,
} from 'qlik-chart-modules';
import { createPicasso } from './picasso-def/createPicasso';
import { picassoDef } from './picasso-def';
import { treemap, tooltip, nativeLegend } from './picasso-def/components';
import { qae } from './qae';
import { auto } from './colors/auto';
import useActions from './hooks/use-actions';
import useSelectionService from './hooks/use-selections';
import createStyleService from './hooks/use-style';
import useViewState from './hooks/use-viewstate';
import setupSnapshot from './snapshot';
import ext from './ext/ext';
import createCustomTooltipService from './custom-tooltip/service';
import customTooltipMigrators from './custom-tooltip/migrators';
import disclaimer from './picasso-def/disclaimer-component';
import locale from './locale';

const supernova = (env) => {
  locale(env.translator);
  const { pic, picassoQ } = createPicasso({ renderer: env.renderer });
  let showLegend = true;
  let invalidMessage = 'This chart cannot be displayed.';
  pic.component('treemap', treemap());
  if (env.carbon) {
    pic.component('floating', tooltip());
    pic.component('nativeLegend', nativeLegend());
    showLegend = env.showLegend;
    invalidMessage = env.invalidMessage;
  } else {
    pic.component('disclaimer', disclaimer);
  }

  return {
    qae: qae(env),
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
      const constraints = useConstraints();
      const { qLocaleInfo: localeInfo } = useAppLayout();
      const [chart, setChart] = useState(undefined);
      const state = useState({ mounted: false });
      const actions = useActions({ lassoIsAlwaysActive: env.carbon });
      const selectionService = useSelectionService({ chart, actions });
      const embed = useEmbed();
      const viewState = useViewState();
      const colorService = createColorService({
        picasso: pic,
        model,
        app,
        translator,
        config: {
          auto,
          key: 'fill',
        },
      });
      const { flags } = env;

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
          setChart(c);
        }
      }, [element, layout, selections, theme, options]);

      const [, error] = usePromise(async () => {
        if (!chart || !selectionService || layout.qSelectionInfo.qInSelections) {
          return;
        }

        const layoutService = createLayoutService({
          source: layout,
        });

        const themeService = createThemeService({
          theme,
          config: {
            id: 'object.treemap',
            resolve: [
              ['object', 'branch.label', 'color'],
              ['object', 'branch.label', 'fontFamily'],
              ['object', 'branch.label', 'fontSize'],
              ['object', 'branch', 'backgroundColor'],
              ['object', 'leaf.label', 'color'],
              ['object', 'leaf.label', 'fontFamily'],
              ['object', 'leaf.label', 'fontSize'],
            ],
          },
        });

        const styleService = createStyleService({ layoutService, themeService, flags });

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

        const customTooltipService = createCustomTooltipService({
          flags: env.flags,
          layout,
          app,
          model,
          picasso: pic,
          chart,
          translator,
          localeInfo,
          embed,
          options,
        });

        const properties = model && !layout.snapshotData ? await model.getEffectiveProperties() : undefined;
        await colorService.initialize({ createConfig });
        const colorField = colorService.getSettings().field;
        selectionService.setBrushAliases({ colorField });

        customTooltipMigrators.attrExpr.updateProperties(model, layout);

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
        const dataset = pic.data('q')(data[0]);
        const settings = picassoDef({
          layout,
          theme,
          env,
          picassoQ,
          selectionsApi: selections,
          showLegend,
          invalidMessage,
          translator,
          viewState,
          colorService,
          chart,
          options,
          actions,
          customTooltipService,
          properties,
          rtl: options.direction === 'rtl',
          dataset,
          styleService,
        });
        chart.update({ data, settings });
      }, [layout, chart, selectionService, theme.name(), selections, options, actions, constraints]);

      if (error) {
        throw error;
      }
      setupSnapshot({ element, chart, viewState, colorService });
    },
  };
};

export default supernova;
