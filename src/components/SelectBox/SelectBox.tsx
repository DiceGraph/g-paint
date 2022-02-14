import { useState } from 'react';
import { useModel } from 'umi';
import { useMovingBox } from './hooks';

export default function SelectBox() {
  const [display, setDisplay] = useState('none');
  const { selectBoxRef, resizeBoxRef } = useModel('useSelectItem');
  const [bbox, setBBox] = useState<DOMRect | Record<string, number>>({});

  useMovingBox({ setBBox, setDisplay });

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
        cursor: 'grab',
      }}
    >
      <div
        ref={resizeBoxRef}
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
