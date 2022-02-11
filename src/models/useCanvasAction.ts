import { Canvas, Element, Node } from '@antv/g';
import { useEffect, useRef, useState } from 'react';
import mousetrap from 'mousetrap';
import { useModel } from 'umi';

export default function useCanvasAction(canvas: Canvas) {
  const canvasRef = useRef(canvas);
  const [actionArr, setActionArr] = useState<any[]>([]);
  const drawAttr = useModel('useDrawAttrs');
  const actionArrRef = useRef(actionArr);
  actionArrRef.current = actionArr;
  canvasRef.current = canvas;

  const addItem = (item: Element, target: Element) => {
    const action = {
      item,
      target,
      redo: () => target.appendChild(item),
      undo: () => target.removeChild(item, false),
    };
    action.redo();
    setActionArr([...actionArrRef.current, action]);
  };

  const removeItem = (item: Node, target: Node) => {
    const action = {
      item,
      target,
      redo: () => target.appendChild(item),
      undo: () => target.removeChild(item, false),
    };
    action.redo();
    setActionArr([...actionArrRef.current, action]);
  };

  const undo = () => {
    const newArr = [...actionArrRef.current];

    const last = newArr.pop();

    last?.undo();
    setActionArr(newArr);
  };

  useEffect(() => {
    mousetrap.bind('ctrl+z', undo);
    mousetrap.bind('command+z', undo);
  }, [])

  return {
    addItem,
    removeItem,
    undo,
    getAttrs: drawAttr?.getAttrs
  };
}
