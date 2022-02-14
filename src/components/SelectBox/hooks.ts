import { Element, ElementEvent } from '@antv/g';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useModel } from 'umi';

export const useMovingBox = ({
  setDisplay,
  setBBox,
}: {
  setDisplay: Dispatch<SetStateAction<string>>;
  setBBox: Dispatch<SetStateAction<DOMRect | Record<string, number>>>;
}) => {
  const { selectedItem, selectBoxRef, setSelectedItem } =
    useModel('useSelectItem');
  const { changeItemAttrs } = useModel('useCanvasAction');

  useEffect(() => {
    const shape = selectedItem?.origin as Element;
    const element = selectBoxRef.current;

    if (shape && element) {
      let box = shape.getBoundingClientRect();
      let oldAttr = shape.attributes;
      setDisplay('block');
      setBBox(box);
      const startPos = { allowFlag: 0 } as Record<string, number>;

      const events = {
        pointerdown: (event: PointerEvent) => {
          box = shape.getBoundingClientRect();
          oldAttr = { ...shape.attributes };
          startPos.allowFlag = 1;
          startPos.x = event.clientX;
          startPos.y = event.clientY;
          startPos.shapeX = shape.getAttribute('x');
          startPos.shapeY = shape.getAttribute('y');
          element.style.cursor = 'grabbing';
        },
        pointermove: (event: PointerEvent) => {
          if (startPos.allowFlag === 1) {
            const nbox = { ...box };
            const deltaX = event.clientX - startPos.x;
            const deltaY = event.clientY - startPos.y;

            nbox.top += deltaY;
            nbox.left += deltaX;
            shape.setAttribute('y', startPos.shapeY + deltaY);
            shape.setAttribute('x', startPos.shapeX + deltaX);

            setBBox(nbox);
          }
        },
        pointerup: () => {
          changeItemAttrs(shape, oldAttr, shape.attributes);
          startPos.allowFlag = 0;
          element.style.cursor = 'grab';
        },
      };

      shape.addEventListener(ElementEvent.REMOVED, () =>
        setSelectedItem(undefined),
      );

      element.addEventListener('pointerdown', events.pointerdown);
      element.addEventListener('pointermove', events.pointermove);
      window.addEventListener('pointerup', events.pointerup);

      return () => {
        element.removeEventListener('pointerdown', events.pointerdown);
        element.removeEventListener('pointermove', events.pointermove);
        window.removeEventListener('pointerup', events.pointerup);
        setDisplay('none');
      };
    }
  }, [selectedItem]);
};
