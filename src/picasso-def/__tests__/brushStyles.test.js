import { active, inactive } from '../brushStyles';

describe('brushStyles', () => {
  describe('inactive', () => {
    it('opacity - normal node', () => {
      const node = {};
      const opacity = inactive().opacity(node);
      expect(opacity).toEqual(0.5);
    });
  });

  describe('active', () => {
    describe('opacity', () => {
      it('label node', () => {
        const node = { type: 'text' };
        const opacity = active().opacity(node);
        expect(opacity).toEqual(1);
      });
      it('overlay label node', () => {
        const node = { type: 'text', data: { overlay: true } };
        const opacity = active().opacity(node);
        expect(opacity).toEqual(0.7);
      });
      it('rect node', () => {
        const node = { type: 'rect' };
        const opacity = active().opacity(node);
        expect(opacity).toEqual(1);
      });
    });

    describe('stroke', () => {
      it('label node - unchanged', () => {
        const node = { type: 'text', stroke: 'label stroke' };
        const stroke = active().stroke(node);
        expect(stroke).toEqual('label stroke');
      });
      it('rect node - black stroke', () => {
        const node = { type: 'rect' };
        const stroke = active().stroke(node);
        expect(stroke).toEqual('black');
      });
    });

    describe('strokeWidth', () => {
      it('label node - unchanged', () => {
        const node = { type: 'text', strokeWidth: 'label strokeWidth' };
        const strokeWidth = active().strokeWidth(node);
        expect(strokeWidth).toEqual('label strokeWidth');
      });
      it('rect node - increase stroke width', () => {
        const node = { type: 'rect', data: {} };
        const strokeWidth = active().strokeWidth(node);
        expect(strokeWidth).toEqual(2);
      });
      it('rect child node - no stroke width', () => {
        const node = { type: 'rect', data: { child: true } };
        const strokeWidth = active().strokeWidth(node);
        expect(strokeWidth).toEqual(0);
      });
    });
  });
});
