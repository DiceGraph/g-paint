import { Element, Image as GImage } from '@antv/g';
import { message } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

export default function useDropImage() {
  const { isCanvasReady, canvas } = useModel('useCanvas');
  const { addItem } = useModel('useCanvasAction');

  useEffect(() => {
    if (isCanvasReady && canvas) {
      const containerElement = canvas.getContextService().getDomElement();
      if (containerElement) {
        const dragover = (event: DragEvent) => {
          event.preventDefault();
          message.info({ content: 'You Can Drop Image Directly On Canvas', key: 'tip'});
        }
        const drop = (event: DragEvent) => {
          event.preventDefault();
          const file = event.dataTransfer?.files[0];
          if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const img = new Image();
              img.src = reader.result as string;
              img.addEventListener('load', () => {
                const p = canvas.client2Viewport({
                  x: event.clientX,
                  y: event.clientY,
                });
                const shape = new GImage({
                  style: {
                    img: img,
                    x: p.x,
                    y: p.y,
                    height: img.height,
                    width: img.width,
                  },
                }) as Element;

                addItem(shape, canvas as any);
              });
            });
            reader.readAsDataURL(file);
          }
        }
        containerElement.addEventListener('dragover', dragover);
        containerElement.addEventListener('drop', drop);

        return () => {
          containerElement.removeEventListener('dragover', dragover);
          containerElement.removeEventListener('drop', drop);
        }
      }
    }
  }, [isCanvasReady, canvas]);
}
