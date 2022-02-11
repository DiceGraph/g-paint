import { Ellipse, Element } from '@antv/g';
import DrawAction from './draw';
import { EllipseIcon } from '@/components/Icons';

export default class EllipseAction extends DrawAction {
  static index = 7;

  static title = 'Circle';

  static Icon = EllipseIcon;

  once = false;

  createInitialShape = (x: number, y: number) => {
    this.flags.start = [x, y];
    return new Ellipse({
      style: {
        ...(this.actions?.getAttrs() || {}),
        x: x,
        y: y,
        rx: 0,
        ry: 0
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
    shape.setAttribute('rx', width / 2);
    shape.setAttribute('ry', height / 2);
    shape.setAttribute('x', realx);
    shape.setAttribute('y', realy);
  };
}
