import AtrributesPanel from '@/components/AttributesPanel/AttributesPanel';
import DescriptionFooter from '@/components/DescriptionFooter';
import LayerTreePad from '@/components/LayerTreePad';
import SelectBox from '@/components/SelectBox/SelectBox';
import MainCanvas from '../components/MainCanvas';
import ToolSidebar from '../components/ToolSidebar';
import './index.less';

export default function IndexPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <MainCanvas />
      <DescriptionFooter />
      <SelectBox />
      <ToolSidebar />
      <LayerTreePad />
      <AtrributesPanel />
    </div>
  );
}
