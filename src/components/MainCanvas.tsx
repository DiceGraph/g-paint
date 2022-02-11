import { Canvas, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { useEffect, useRef } from 'react';
import { useModel } from 'umi';
import useDropImage from './useDropImage';

export default function MainCanvas() {
  const {setCanvas, setCanvasReady} = useModel('useCanvas');
  const el = useRef<HTMLDivElement | null>(null);
  useDropImage();

  useEffect(() => {
    if (el.current) {
      const element = el.current;
      const width = element.clientWidth;
      const height = element.clientHeight;
      const c = new Canvas({
        container: element,
        renderer: new Renderer(),
        width,
        height
      })
      // c.appendChild(new Rect({
      //   style: {
      //     width, height, fill: '#fff'
      //   }
      // }))
      //@ts-ignore
      window['__g_instances__'] = [c]
      setCanvas(c);
      
      setCanvasReady(true)
    }

    return () => {
      setCanvas(undefined);
      setCanvasReady(false);
    }
  }, [el])

  return <div className='transparent-mask' style={{ width: '100%', height: '100%' }} ref={el}/>
}
