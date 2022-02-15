import { Element, ElementEvent, IElement } from '@antv/g';
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
  const { canvas } = useModel('useCanvas');
  const { setSelectedIndex } = useModel('useTools');
  useEffect(() => {
    if (selectedItem) {
      const clean = () => setSelectedItem(undefined);
      setSelectedIndex(0);
      canvas
        ?.getContextService()
        .getDomElement()
        ?.addEventListener('click', clean);
      return () => {
        canvas
          ?.getContextService()
          .getDomElement()
          ?.removeEventListener('click', clean);
      };
    }
  }, [selectedItem]);

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

const changeItemByDelta = (
  item: IElement,
  oldScale: any,
  ow: number,
  oh: number,
  dx: number,
  dy: number,
) => {
  const xScale = (dx / ow + 1) * oldScale[0];
  const yScale = (dy / oh + 1) * oldScale[1];

  item.setLocalScale(xScale, yScale);
};

export const useResizeBox = ({
  setBBox,
}: {
  setBBox: Dispatch<SetStateAction<DOMRect | Record<string, number>>>;
}) => {
  const { selectedItem, resizeBoxRef, setSelectedItem } =
    useModel('useSelectItem');
  const { changeItemAttrs } = useModel('useCanvasAction');

  useEffect(() => {
    const shape = selectedItem?.origin as Element;
    const element = resizeBoxRef.current;

    if (shape && element) {
      let box = shape.getBoundingClientRect();
      let oldScale = shape.getLocalScale();
      setBBox(box);
      const startPos = { allowFlag: 0 } as Record<string, number>;

      const events = {
        pointerdown: (event: PointerEvent) => {
          event.stopPropagation();
          box = shape.getBoundingClientRect();
          oldScale = { ...shape.getLocalScale() };
          startPos.allowFlag = 1;
          startPos.x = event.clientX;
          startPos.y = event.clientY;
          startPos.shapeX = shape.getAttribute('x');
          startPos.shapeY = shape.getAttribute('y');
        },
        pointermove: (event: PointerEvent) => {
          event.stopPropagation();
          if (startPos.allowFlag === 1) {
            const nbox = { ...box };
            const deltaX = event.clientX - startPos.x;
            const deltaY = event.clientY - startPos.y;

            nbox.height += deltaY;
            nbox.width += deltaX;
            changeItemByDelta(
              shape,
              oldScale,
              box.width,
              box.height,
              deltaX,
              deltaY,
            );
            setBBox(nbox);
          }
        },
        pointerup: () => {
          // changeItemAttrs(shape, oldAttr, shape.attributes);
          startPos.allowFlag = 0;
        },
      };

      shape.addEventListener(ElementEvent.REMOVED, () =>
        setSelectedItem(undefined),
      );

      element.addEventListener('pointerdown', events.pointerdown);
      window.addEventListener('pointermove', events.pointermove);
      window.addEventListener('pointerup', events.pointerup);

      return () => {
        element.removeEventListener('pointerdown', events.pointerdown);
        window.removeEventListener('pointermove', events.pointermove);
        window.removeEventListener('pointerup', events.pointerup);
      };
    }
  }, [selectedItem]);
};
