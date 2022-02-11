import { Element, Rect } from '@antv/g';
import DrawAction from './draw';
import { RectIcon } from '@/components/Icons';

export default class RectAction extends DrawAction {
  static index = 5;

  static title = 'Rect';

  static Icon = RectIcon;

  once = false;

  createInitialShape = (x: number, y: number) => {
    this.flags.start = [x, y];
    return new Rect({
      style: {
        ...(this.actions?.getAttrs() || {}),
        x: x,
        y: y,
        width: 0,
        height: 0
      },
    }) as Element;
  };

  createModifyShape = (x: number, y: number, shape: Element) => {
    const start = this.flags.start;
    const [sx, sy] = start;
    const width = Math.abs(x - sx);
    const height = Math.abs(y - sy);
    const realx = Math.min(x, sx);
    const realy = Math.min(y, sy);
    shape.setAttribute('width', width);
    shape.setAttribute('height', height);
    shape.setAttribute('x', realx);
    shape.setAttribute('y', realy);
  };
}
