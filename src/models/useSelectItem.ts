import { useEffect, useRef, useState } from 'react';

export default function useSelectItem() {
  const [selectedItem, setSelectedItem] = useState<any>();
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const resizeBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return {
    selectedItem,
    setSelectedItem,
    selectBoxRef,
    resizeBoxRef,
  };
}
