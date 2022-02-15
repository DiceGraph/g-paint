import { BaseStyleProps } from '@antv/g';
import { Button, Form, InputNumber, Popover, Space } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useModel } from 'umi';

const ColorPicker: FC<{
  value?: string;
  onChange?: (val: string | undefined) => void;
}> = (props) => {
  const { value, onChange } = props;
  return (
    <Popover
      trigger="click"
      content={
        <Space direction="vertical">
          <ChromePicker
            color={value}
            onChange={(value) => onChange && onChange(value.hex)}
          />
          <Button
            size="small"
            block
            type={value === undefined ? 'primary' : 'dashed'}
            onClick={() => onChange && onChange(undefined)}
          >
            Transparent
          </Button>
        </Space>
      }
    >
      <div
        className={value === undefined ? 'transparent-mask' : ''}
        style={{
          width: 16,
          height: 16,
          backgroundColor: value,
          cursor: 'pointer',
          border: 'solid 1px #eee',
        }}
      ></div>
    </Popover>
  );
};

export default function AttributesForm() {
  const { attrs, setAttrs } = useModel('useDrawAttrs');
  const { selectedItem } = useModel('useSelectItem');
  const [form] = Form.useForm();

  useEffect(() => {
    if (attrs) {
      form.setFieldsValue(attrs);
    }
  }, [attrs]);

  return (
    <Form
      layout="inline"
      form={form}
      onFieldsChange={() => {
        setAttrs(form.getFieldsValue());
        if (selectedItem) {
          selectedItem.origin?.attr(form.getFieldsValue());
        }
      }}
    >
      <Form.Item name="stroke" label="Stroke">
        <ColorPicker />
      </Form.Item>
      <Form.Item name="fill" label="Fill">
        <ColorPicker />
      </Form.Item>
      <Form.Item name="lineWidth" label="Line Width">
        <InputNumber size="small" min={1} />
      </Form.Item>
    </Form>
  );
}
