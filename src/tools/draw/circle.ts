import { Circle, Element } from '@antv/g';
import DrawAction from './draw';
import { CircleIcon } from '@/components/Icons';

export default class CircleAction extends DrawAction {
  static index = 6;

  static title = 'Circle';

  static Icon = CircleIcon;

  once = false;

  createInitialShape = (x: number, y: number) => {
    this.flags.start = [x, y];
    return new Circle({
      style: {
        ...(this.actions?.getAttrs() || {}),
        x: x,
        y: y,
        r: 0,
      },
    }) as Element;
  };

  createModifyShape = (x: number, y: number, shape: Element) => {
    const start = this.flags.start;
    const [sx, sy] = start;
    const width = Math.abs(x - sx);
    const height = Math.abs(y - sy);
    const realx = (sx + x) / 2;
    const realy = (sy + y) / 2;
    const r = Math.sqrt(width ** 2 + height ** 2) / 2;
    shape.setAttribute('r', r);
    shape.setAttribute('x', realx);
    shape.setAttribute('y', realy);
    shape.setAttribute('origin', [-r, -r, 0]);
  };
}
