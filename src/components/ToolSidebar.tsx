import { Space, Button, Tooltip } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useModel } from 'umi';

export default function ToolSidebar() {
  const { tools, setSelectedIndex, selectedIndex } = useModel('useTools');
  const [collapsed, setCollapsed] = useState(false);
  const showingTool = [tools.find(e => e.index === selectedIndex) || tools[0]]

  return (
    <Space
      direction="vertical"
      className='hover-opacity'
      style={{
        position: 'absolute',
        width: 48,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius: 32,
        background: 'white',
        padding: 8,
        top: 24,
        left: 24,
        maxHeight: '90vh',
      }}
    >
      { (collapsed ? showingTool : tools).map((tool) => {
        const selected = selectedIndex === tool.index;
        const Icon = tool.Icon;
        return (
          <Tooltip key={tool.index} placement="right" title={tool.title}>
            <Button
              shape="circle"
              onClick={() =>
                setSelectedIndex(selected ? undefined : tool.index)
              }
              type={selected ? 'primary' : 'text'}
            >
              <Icon />
            </Button>
          </Tooltip>
        );
      })}
      <Tooltip placement="right" title="Collapse/Expand">
        <Button
          onClick={() => setCollapsed(!collapsed)}
          shape="circle"
          type="text"
        >
          {collapsed ? <DownOutlined /> : <UpOutlined />}
        </Button>
      </Tooltip>
    </Space>
  );
}
