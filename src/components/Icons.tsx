import { createFromIconfontCN } from '@ant-design/icons';

const ShapeIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3175751_uedypwzsxwi.js',
});

const CircleIcon = () => <ShapeIcon type="gpaint-icon-tx-yuanxing" />
const RectIcon = () => <ShapeIcon type="gpaint-icon-tx-changfangxing" />
const EllipseIcon = () => <ShapeIcon type="gpaint-icon-tx-tuoyuanxing" />

export {
  CircleIcon, RectIcon, EllipseIcon
}
