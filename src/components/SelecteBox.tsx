import { Element } from '@antv/g';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export default function SelectBox() {
  const [display, setDisplay] = useState('none');
  const { selectedItem, selectBoxRef } = useModel('useSelectItem');
  const [bbox, setBBox] = useState<DOMRect | Record<string, number>>({});

  useEffect(() => {
    const shape = selectedItem?.origin as Element;
    const element = selectBoxRef.current;

    if (shape && element) {
      const box = shape.getBoundingClientRect();
      setDisplay('block');
      setBBox(box);
      const startPos = { allowFlag: 0 } as Record<string, number>;

      const events = {
        pointerdown: (event: PointerEvent) => {
          startPos.allowFlag = 1;
          startPos.x = event.clientX;
          startPos.y = event.clientY;
          startPos.shapeX = shape.getAttribute('x');
          startPos.shapeY = shape.getAttribute('y');
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
          startPos.allowFlag = 0;
        },
      };

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

  return (
    <div
      ref={selectBoxRef}
      style={{
        display,
        position: 'absolute',
        background: '#2f54eb10',
        border: 'dashed #2f54eb 2px',
        top: bbox.top - 2,
        left: bbox.left - 2,
        width: bbox.width + 4,
        height: bbox.height + 4,
        zIndex: 8,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -4,
          bottom: -4,
          width: 8,
          height: 8,
          borderRadius: 8,
          border: '4px solid #2f54eb',
          background: 'white',
          cursor: 'pointer',
        }}
      ></div>
    </div>
  );
}
