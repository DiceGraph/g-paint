import Mousetrap from 'mousetrap';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import toolList from '../tools';

let lastIndex = 1;

export default function useTools() {
  const { canvas, isCanvasReady, updateCanvas } = useModel('useCanvas');
  const actions = useModel('useCanvasAction');
  const [tools, setTools] = useState(toolList);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  useEffect(() => {
    const target = tools.find((e) => e.index === selectedIndex);
    if (target && isCanvasReady && canvas) {
      const TargetClass = target;
      const action = new TargetClass(canvas, actions);
      if (action.once) {
        action.mount();
        setSelectedIndex(lastIndex || 1);
        setTimeout(updateCanvas, 200)
      } else {
        lastIndex = selectedIndex || 1;
        action.mount();
        return () => {
          action.unmount();
        };
      }
    }
  }, [selectedIndex, canvas, isCanvasReady]);

  useEffect(() => {
    Mousetrap.bind('command+1', () => setSelectedIndex(1))
    Mousetrap.bind('ctrl+1', () => setSelectedIndex(1))
    Mousetrap.bind('command+2', () => setSelectedIndex(2))
    Mousetrap.bind('ctrl+2', () => setSelectedIndex(2))
    setSelectedIndex(1)
  }, [])

  return {
    tools,
    setTools,
    selectedIndex,
    setSelectedIndex,
  };
}
