import { EditOutlined, GroupOutlined } from '@ant-design/icons';
import { Space, Tree, Typography } from 'antd';
import { useModel } from 'umi';
import { CircleIcon, EllipseIcon, RectIcon } from './Icons';

const iconMap: Record<any, any> = {
  group: <GroupOutlined />,
  rect: <RectIcon />,
  circle: <CircleIcon />,
  path: <EditOutlined />,
  ellipse: <EllipseIcon />,
};

export default function LayerTreePad() {
  const { canvasStruct } = useModel('useCanvas');
  const { selectedItem, setSelectedItem } = useModel('useSelectItem');

  return (
    <div
      className="hover-opacity"
      style={{
        position: 'absolute',
        width: 256,
        height: 196,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius: 16,
        background: 'white',
        padding: 8,
        right: 24,
        bottom: 24,
        maxHeight: '90vh',
      }}
    >
      <div style={{ height: 32, padding: 6, userSelect: 'none' }}>
        <Typography.Text type="secondary">Layers</Typography.Text>
      </div>
      <Tree
        defaultExpandedKeys={['root']}
        selectedKeys={[selectedItem?.key]}
        onSelect={(_, { selectedNodes }) => {
          setSelectedItem(selectedNodes[0]);
        }}
        style={{ borderTop: 'solid 1px #eee' }}
        height={140}
        treeData={canvasStruct}
        defaultExpandAll
        titleRender={(n) => (
          <Space>
            {iconMap[n.name]}
            <span>{n.name}</span>
          </Space>
        )}
      />
    </div>
  );
}
