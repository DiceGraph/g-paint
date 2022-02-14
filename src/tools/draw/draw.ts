import { Canvas, Element, Path } from '@antv/g';
import { EditOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { CanvasActions } from '@/models/useCanvasAction';

export default class DrawAction {
  static index = -999;

  static title = 'Draw';

  static Icon: FC = EditOutlined;

  once = false;

  flags: Record<string, any> = {};

  canvas: Canvas | null = null;

  actions: CanvasActions | null = null;

  constructor(canvas: Canvas, actions: CanvasActions) {
    this.canvas = canvas;
    this.actions = actions;
  }

  createInitialShape = (x: number, y: number): Element => {
    this.flags.path = [[x, y]];
    return new Path({
      style: {
        ...(this.actions?.getAttrs() || {}),
        path: '',
        x: x,
        y: y,
      },
    }) as Element;
  };

  createModifyShape = (x: number, y: number, shape: Element) => {
    this.flags.path.push([x, y]);
    shape.setAttribute(
      'path',
      this.flags.path
        .map((p: number[], i: number, ps: number[][]) => {
          if (i === 0) {
            return `M ${p.join(',')}`;
          }
          const [x1, y1] = ps[i - 1];
          const [x2, y2] = p;

          return `l ${x2 - x1},${y2 - y1}`;
        })
        .join(' '),
    );
  };

  events = {
    pointerdown: (evt: any) => {
      const globalFlag = this.flags;
      const canvas = this.canvas;
      if (!canvas) {
        return;
      }
      const { canvas: outtercanvas } = evt;

      const item = this.createInitialShape(
        outtercanvas.x,
        outtercanvas.y,
      ) as Element;
      this.actions?.addItem(item, canvas);

      globalFlag.pointermove = (innerevt: any) => {
        const { canvas: nowcanvas } = innerevt;
        this.createModifyShape(nowcanvas.x, nowcanvas.y, item);
      };

      canvas.addEventListener('pointermove', globalFlag.pointermove);
    },
    pointerup: () => {
      this.canvas?.removeEventListener('pointermove', this.flags.pointermove);
    },
  };

  mount() {
    const globalFlag = this.flags;
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    Object.entries(this.events).forEach(([key, func]) => {
      canvas.addEventListener(key, func);
    });
    this.flags.pointerout = () => {
      canvas.removeEventListener('pointermove', globalFlag.pointermove);
    };
    canvas
      ?.getContextService()
      ?.getDomElement()
      ?.addEventListener('pointerout', this.flags.pointerout);
  }

  unmount() {
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    Object.entries(this.events).forEach(([key, func]) => {
      canvas.removeEventListener(key, func);
    });
    canvas
      ?.getContextService()
      ?.getDomElement()
      ?.removeEventListener('pointerout', this.flags.pointerout);
  }
}
