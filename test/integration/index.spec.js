import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, expect, chromium } from '@playwright/test';
import createNebulaRoutes from '../utils/routes';
import { checkScreenshotBrushing, getTooltipContent } from '../utils/shared';

test.describe('sn-treemap: ui integration tests to test visual bugs', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, '../../'),
      type: 'treemap',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test.describe('Tooltip and brushing - ', () => {
      test('leaf single selection', async () => {
        const renderUrl = await route.renderFixture('multi_scenario_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        const source = await page.waitForSelector('[data-key="treemap"]');
        const sourceRect = await source.boundingBox();
        const clickArea = {
          x: Math.ceil(sourceRect.x + sourceRect.width / 2),
          y: Math.ceil(sourceRect.y + sourceRect.height / 2),
        };
        await page.mouse.move(clickArea.x, clickArea.y);
        await page.mouse.click(clickArea.x, clickArea.y);
        expect(await getTooltipContent(page)).toEqual('C Dim1: C');
        await checkScreenshotBrushing('[data-key="treemap"]', page, 'brush_single.png');
      });
      test('legend single selection', async () => {
        const renderUrl = await route.renderFixture('base_layout.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        const source = await page.waitForSelector('[data-key="legend-cat"] g g[data-label="b"]');
        const sourceRect = await source.boundingBox();
        const clickArea = {
          x: Math.ceil(sourceRect.x + sourceRect.width / 2),
          y: Math.ceil(sourceRect.y + sourceRect.height / 2),
        };
        await page.mouse.click(clickArea.x, clickArea.y);
        expect(await getTooltipContent(page)).toEqual('b');
        await checkScreenshotBrushing('[data-key="treemap"]', page, 'brush_legend_single.png');
      });
      test('fix for custom tooltop bug', async () => {
        const renderUrl = await route.renderFixture('custom-tooltip-bug.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        const source = await page.waitForSelector('[data-key="treemap"]');
        const sourceRect = await source.boundingBox();
        const clickArea = {
          x: Math.ceil(sourceRect.x + sourceRect.width / 2),
          y: Math.ceil(sourceRect.y + sourceRect.height / 2),
        };
        await page.mouse.move(clickArea.x, clickArea.y);
        expect(await getTooltipContent(page)).toEqual('C =1+2: 3');
      });
    });
  });
});
