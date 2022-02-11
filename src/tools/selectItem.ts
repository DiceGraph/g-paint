import { Canvas } from '@antv/g';
import { SelectOutlined } from '@ant-design/icons';

export default class SelectItemAction {
  static index = 0;
  
  static title = 'Select Item';

  static Icon = SelectOutlined;

  once = false;

  flags: Record<string, any> = {};

  canvas: Canvas | null = null;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  events = {
  };

  // mount() {
  //   const globalFlag = this.flags;
  //   const canvas = this.canvas;
  //   if (!canvas) {
  //     return;
  //   }
  //   Object.entries(this.events).forEach(([key, func]) => {
  //     canvas.addEventListener(key, func);
  //   });
  // }

  // unmount() {
  //   const canvas = this.canvas;
  //   if (!canvas) {
  //     return;
  //   }
  //   Object.entries(this.events).forEach(([key, func]) => {
  //     canvas.removeEventListener(key, func);
  //   });
  // }
}


