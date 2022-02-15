import { useRef, useState } from 'react';

export default function useSelectItem() {
  const [selectedItem, setSelectedItem] = useState<any>();
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const resizeBoxRef = useRef<HTMLDivElement | null>(null);

  return {
    selectedItem,
    setSelectedItem,
    selectBoxRef,
    resizeBoxRef,
  };
}
