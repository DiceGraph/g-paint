import { BaseStyleProps, Canvas, IElement, Node } from '@antv/g';
import { useEffect, useRef, useState } from 'react';
import mousetrap from 'mousetrap';
import { useModel } from 'umi';

export type CanvasActions = Record<string, (...action: any) => void>;

export default function useCanvasAction(canvas: Canvas) {
  const canvasRef = useRef(canvas);
  const [actionArr, setActionArr] = useState<any[]>([]);
  const drawAttr = useModel('useDrawAttrs');
  const actionArrRef = useRef(actionArr);
  actionArrRef.current = actionArr;
  canvasRef.current = canvas;

  const addItem = (item: IElement, target: IElement) => {
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

  const changeItemAttrs = (
    item: IElement,
    oldAttrs: BaseStyleProps,
    newAttrs: BaseStyleProps,
  ) => {
    const lastAttr = { ...oldAttrs };
    const depatruredItem = item as any;
    const action = {
      item: item,
      target: item,
      undo: () => depatruredItem.attr(lastAttr),
      redo: () => depatruredItem.attr(newAttrs),
    };
    action.redo();
    // setActionArr([...actionArrRef.current, action]);
  };

  useEffect(() => {
    mousetrap.bind('ctrl+z', undo);
    mousetrap.bind('command+z', undo);
  }, []);

  return {
    addItem,
    removeItem,
    undo,
    changeItemAttrs,
    getAttrs: drawAttr?.getAttrs,
  };
}
