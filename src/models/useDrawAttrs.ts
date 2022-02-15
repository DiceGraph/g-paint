import { BaseStyleProps } from '@antv/g';
import { useEffect, useRef, useState } from 'react';

export default function useDrawAttrs() {
  const [attrs, setAttrs] = useState<Record<string, any>>({
    stroke: '#000',
    lineWidth: 2,
  });
  const attrsRef = useRef<BaseStyleProps>();
  attrsRef.current = attrs;
  const getAttrs: () => BaseStyleProps | undefined = () => attrsRef.current;

  return {
    getAttrs,
    attrs,
    setAttrs,
  };
}
