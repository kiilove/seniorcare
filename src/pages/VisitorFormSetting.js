import React, { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";

const { Option } = Select;

// 1차 기본항목
const primaryFields = [
  { id: 1, label: "날짜", type: "date" },
  { id: 2, label: "방문시간", type: "time" },
  { id: 3, label: "어르신명", type: "text" },
  { id: 4, label: "방문자", type: "text" },
  { id: 5, label: "관계", type: "text" },
  { id: 6, label: "연락처", type: "text" },
];

// 2차 기본항목
const secondaryFields = [
  { id: 7, label: "체온", type: "text" }, // 체온 필드를 text로 변경
  {
    id: 8,
    label: "예방접종 확인",
    type: "select",
    options: ["완료", "미완료"],
  },
  {
    id: 9,
    label: "신속항원 검사결과",
    type: "select",
    options: ["음성", "양성"],
  },
  { id: 10, label: "호흡기증상", type: "select", options: ["예", "아니오"] }, // 호흡기증상을 예/아니오로 변경
  { id: 11, label: "해외방문", type: "select", options: ["예", "아니오"] },
  {
    id: 12,
    label: "확진자 접촉 여부",
    type: "select",
    options: ["예", "아니오"],
  },
];

const fieldTypes = ["text", "number", "date", "time", "select"];

const VisitorFormSetting = ({ onSave }) => {
  const [customFields, setCustomFields] = useState([]);

  const handleCustomFieldChange = (index, key, value) => {
    const newFields = [...customFields];
    newFields[index][key] = value;
    setCustomFields(newFields);
  };

  const handleAddCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: customFields.length + 1, label: "", type: "text" },
    ]);
  };

  const handleSave = () => {
    const allFields = [...primaryFields, ...secondaryFields, ...customFields];
    onSave(allFields); // 모든 필드(1차, 2차, 사용자 정의 필드)를 저장
  };

  return (
    <Form layout="vertical">
      <h3>1차 기본항목</h3>
      {primaryFields.map((field) => (
        <Space
          key={field.id}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item label={field.label}>
            <Input placeholder={field.label} disabled />
          </Form.Item>
          <Form.Item>
            <Select defaultValue={field.type} disabled>
              <Option value={field.type}>{field.type}</Option>
            </Select>
          </Form.Item>
        </Space>
      ))}

      <h3>2차 기본항목</h3>
      {secondaryFields.map((field) => (
        <Space
          key={field.id}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item label={field.label}>
            <Input placeholder={field.label} disabled />
          </Form.Item>
          <Form.Item>
            <Select defaultValue={field.type} disabled>
              <Option value={field.type}>{field.type}</Option>
            </Select>
          </Form.Item>
        </Space>
      ))}

      <h3>3차 기본항목 (사용자 정의)</h3>
      {customFields.map((field, index) => (
        <Space
          key={field.id}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item label={`Field Label ${index + 1}`}>
            <Input
              placeholder="Enter field label"
              value={field.label}
              onChange={(e) =>
                handleCustomFieldChange(index, "label", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label={`Field Type ${index + 1}`}>
            <Select
              value={field.type}
              onChange={(value) =>
                handleCustomFieldChange(index, "type", value)
              }
            >
              {fieldTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      ))}
      <Button type="dashed" onClick={handleAddCustomField} block>
        Add Custom Field
      </Button>
      <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
        Save Settings
      </Button>
    </Form>
  );
};

export default VisitorFormSetting;
