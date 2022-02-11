import { Canvas } from '@antv/g';
import { DeleteOutlined } from '@ant-design/icons';


export default class CleanAction {
  static index = 2;

  static title = 'Clean';

  static Icon = DeleteOutlined;

  once = true;

  canvas: Canvas | null = null;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  mount() {
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    canvas.removeChildren(true);
  }

  unmount() {}
}
