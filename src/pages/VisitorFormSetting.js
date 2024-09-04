import React, { useState } from "react";
import { Button, Form, Input, Select, Space, Card, Tabs } from "antd";

const { Option } = Select;

// 필수 항목
const requiredFields = [
  { id: 1, label: "날짜", type: "date" },
  { id: 2, label: "방문시간", type: "time" },
  { id: 3, label: "어르신명", type: "text" },
  { id: 4, label: "방문자", type: "text" },
  { id: 5, label: "관계", type: "text" },
  { id: 6, label: "연락처", type: "text" },
];

// 추가 항목
const additionalFields = [
  { id: 7, label: "체온", type: "text" },
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
  { id: 10, label: "호흡기증상", type: "select", options: ["예", "아니오"] },
  { id: 11, label: "해외방문", type: "select", options: ["예", "아니오"] },
  {
    id: 12,
    label: "확진자 접촉 여부",
    type: "select",
    options: ["예", "아니오"],
  },
];

// 필드 타입
const fieldTypes = ["text", "number", "date", "time", "select"];

const VisitorFormSetting = ({ onSave }) => {
  const [customFields, setCustomFields] = useState([]);
  const [title, setTitle] = useState("");

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
    const allFields = [...requiredFields, ...additionalFields, ...customFields];
    const formData = {
      title,
      fields: allFields,
    };
    onSave(formData); // 기록지 타이틀과 모든 필드를 저장
  };

  return (
    <Form layout="horizontal" labelAlign="left" style={{ padding: "16px" }}>
      {/* 기록지 타이틀 입력 필드 */}
      <Form.Item label="기록지 타이틀">
        <Input
          placeholder="Enter the title for the form"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="필수 항목" key="1">
          <Card style={{ marginBottom: 16 }}>
            {requiredFields.map((field) => (
              <Space
                key={field.id}
                style={{ display: "flex", marginBottom: 8, width: "100%" }}
                align="baseline"
              >
                <Form.Item
                  label={field.label}
                  labelAlign="left" // 레이블을 왼쪽 정렬
                  labelCol={{ span: 12 }} // 레이블 컬럼의 너비 설정
                  wrapperCol={{ span: 24 }} // 입력 필드 컬럼의 너비 설정
                  style={{ flex: 1 }}
                >
                  <Input placeholder={field.label} />
                </Form.Item>
                <Form.Item
                  style={{
                    flex: 1,
                    marginLeft: "16px", // 입력 필드 간의 간격을 추가
                  }}
                >
                  <Select defaultValue={field.type}>
                    <Option value={field.type}>{field.type}</Option>
                  </Select>
                </Form.Item>
              </Space>
            ))}
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="추가 항목" key="2">
          <Card style={{ marginBottom: 16 }}>
            {additionalFields.map((field) => (
              <Space
                key={field.id}
                style={{ display: "flex", marginBottom: 8, width: "100%" }}
                align="baseline"
              >
                <Form.Item label={field.label} style={{ flex: 1 }}>
                  <Input placeholder={field.label} />
                </Form.Item>
                <Form.Item style={{ flex: 1 }}>
                  <Select defaultValue={field.type}>
                    <Option value={field.type}>{field.type}</Option>
                  </Select>
                </Form.Item>
              </Space>
            ))}
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="선택 항목 (사용자 정의)" key="3">
          <Card style={{ marginBottom: 16 }}>
            {customFields.map((field, index) => (
              <Space
                key={field.id}
                style={{ display: "flex", marginBottom: 8, width: "100%" }}
                align="baseline"
              >
                <Form.Item
                  label={`Field Label ${index + 1}`}
                  style={{ flex: 1 }}
                >
                  <Input
                    placeholder="Enter field label"
                    value={field.label}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "label", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={`Field Type ${index + 1}`}
                  style={{ flex: 1 }}
                >
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
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
        Save Settings
      </Button>
    </Form>
  );
};

export default VisitorFormSetting;
