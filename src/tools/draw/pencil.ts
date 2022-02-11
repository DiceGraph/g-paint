import { EditOutlined } from '@ant-design/icons';
import DrawAction from './draw';

export default class PencilAction extends DrawAction {
  static index = 1;
  
  static title = 'Pencil';

  static Icon = EditOutlined;

  once = false;


}


