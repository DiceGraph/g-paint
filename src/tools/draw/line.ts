import { Element, Path } from '@antv/g';
import { MinusOutlined } from '@ant-design/icons';
import DrawAction from './draw';

export default class LineAction extends DrawAction {
  static index = 4;

  static title = 'Line';

  static Icon = MinusOutlined;

  once = false;

  createInitialShape = (x: number, y: number) => {
    this.flags.start = [x, y];
    return new Path({
      style: {
        ...(this.actions?.getAttrs() || {}),
        path: `M ${x},${y}`,
        x: x,
        y: y,
      },
    }) as Element;
  };

  createModifyShape = (x: number, y: number, shape: Element) => {
    const start = this.flags.start;
    shape.setAttribute(
      'path',
      `M ${start[0]},${start[1]} l ${x - start[0]},${y - start[1]}`,
    );
  };
}
