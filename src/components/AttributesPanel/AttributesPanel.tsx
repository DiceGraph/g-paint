import { Typography } from 'antd';
import AttributesForm from './AttributesForm';

export default function AttributesPanel() {
  return (
    <div
      style={{
        position: 'absolute',
        right: 24,
        top: 24,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius: 16,
        background: 'white',
        padding: 8,
        width: 256,
      }}
      className="hover-opacity"
    >
      <div
        style={{
          height: 32,
          padding: 6,
          userSelect: 'none',
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography.Text type="secondary">Attributes</Typography.Text>
      </div>
      <div style={{ padding: 6 }}>
        <AttributesForm />
      </div>
    </div>
  );
}
