import type { IElement } from '@antv/g';

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

type CanvasItem = {
  key: string;
  name: string;
  origin: IElement;
  children?: CanvasItem[];
};
