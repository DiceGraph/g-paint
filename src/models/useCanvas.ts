import { Canvas, ElementEvent, IElement } from '@antv/g';
import { useEffect, useRef, useState } from 'react';
import { CanvasItem } from 'typings';

const getCanvasStructure = (canvas: Canvas) => {
  const getElementStructure = (el: IElement): CanvasItem => {
    const key = el.getAttribute('key') || Math.random().toString(16).slice(-6);
    el.setAttribute('key', key);
    return {
      name: el.nodeName || 'unknown',
      origin: el,
      key: key,
      children: el.children?.map((e) => getElementStructure(e)) || undefined,
    };
  };

  canvas.getRoot().setAttribute('key', 'root');

  return [getElementStructure(canvas.getRoot())];
};

export default function useCanvas() {
  const [isCanvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<Canvas>();
  const setCanvas = (canvas: Canvas | undefined) => {
    canvasRef.current = canvas;
  };
  const [canvasStruct, setCanvasStruct] = useState<any[]>([]);
  const updateCanvas = () =>
    canvasRef.current && setCanvasStruct(getCanvasStructure(canvasRef.current));

  useEffect(() => {
    if (isCanvasReady) {
      updateCanvas();
      canvasRef.current?.addEventListener(ElementEvent.MOUNTED, updateCanvas);
      canvasRef.current?.addEventListener(ElementEvent.UNMOUNTED, updateCanvas);
      canvasRef.current?.addEventListener(
        ElementEvent.CHILD_REMOVED,
        updateCanvas,
      );
      canvasRef.current?.addEventListener(ElementEvent.REMOVED, updateCanvas);
    }
  }, [isCanvasReady]);

  return {
    setCanvasReady,
    canvas: canvasRef.current,
    isCanvasReady,
    setCanvas,
    canvasStruct,
    updateCanvas,
  };
}
