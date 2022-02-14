import { Canvas, Path } from '@antv/g';
import { UndoOutlined } from '@ant-design/icons';
import { CanvasActions } from '@/models/useCanvasAction';

export default class UndoAction {
  static index = 3;

  static title = 'Undo';

  static Icon = UndoOutlined;

  once = true;

  flags: Record<string, any> = {};

  canvas: Canvas | null = null;

  actions: CanvasActions | null = null;

  constructor(canvas: Canvas, actions: CanvasActions) {
    this.canvas = canvas;
    this.actions = actions;
  }

  mount() {
    this.actions?.undo();
  }

  unmount() {}
}
