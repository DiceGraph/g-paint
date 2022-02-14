import { Typography } from 'antd';

export default function DescriptionFooter() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        opacity: 0.75,
        pointerEvents: 'none',
      }}
    >
      <Typography.Title level={3}>G Paint</Typography.Title>
      <Typography.Paragraph type="secondary">
        A drawing board powerd by @antv/g
      </Typography.Paragraph>
    </div>
  );
}
