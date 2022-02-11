import LayerTreePad from '@/components/LayerTreePad';
import MainCanvas from '../components/MainCanvas';
import ToolSidebar from '../components/ToolSidebar';
import './index.less'

export default function IndexPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MainCanvas />
      <ToolSidebar />
      <LayerTreePad />
    </div>
  );
}
