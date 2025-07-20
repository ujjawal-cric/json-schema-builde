import React from "react";
import { Card, Input, Select, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function FieldBuilder({ fields, setFields }) {
  const updateFields = (newFields) => setFields(JSON.parse(JSON.stringify(newFields)));

  const handleKeyChange = (id, value) => {
    const updateKey = (arr) =>
      arr.map((field) =>
        field.id === id
          ? { ...field, key: value }
          : field.type === "Nested"
          ? { ...field, children: updateKey(field.children) }
          : field
      );
    updateFields(updateKey(fields));
  };

  const handleTypeChange = (id, value) => {
    const updateType = (arr) =>
      arr.map((field) => {
        if (field.id === id) {
          return value === "Nested"
            ? { ...field, type: value, children: field.children || [] }
            : { ...field, type: value };
        }
        return field.type === "Nested"
          ? { ...field, children: updateType(field.children) }
          : field;
      });
    updateFields(updateType(fields));
  };

  const addField = (parentId = null) => {
    const newField = {
  id: Date.now() + Math.random(),
  key: "",
  type: "String",
};


    const addToParent = (arr) =>
      arr.map((field) => {
        if (field.id === parentId && field.type === "Nested") {
          return { ...field, children: [...field.children, newField] };
        }
        return field.type === "Nested"
          ? { ...field, children: addToParent(field.children) }
          : field;
      });

    parentId ? updateFields(addToParent(fields)) : updateFields([...fields, newField]);
  };

  const deleteField = (id) => {
    const removeField = (arr) =>
      arr.filter((field) => field.id !== id).map((field) =>
        field.type === "Nested" ? { ...field, children: removeField(field.children) } : field
      );
    updateFields(removeField(fields));
  };

  return (
    <div style={{ marginLeft: "5px" }}>
      {fields.map((field) => (
        <Card key={field.id} size="small" className="field-card">
          <div className="field-row">
            <Input
  placeholder="Enter field name"
  value={field.key}
  onChange={(e) => handleKeyChange(field.id, e.target.value)}
  className="field-input"
/>

            <Select
              value={field.type}
              onChange={(value) => handleTypeChange(field.id, value)}
              className="field-select"
            >
              <Option value="String">String</Option>
              <Option value="Number">Number</Option>
              <Option value="Nested">Nested</Option>
            </Select>
            <Button danger icon={<DeleteOutlined />} onClick={() => deleteField(field.id)} />
            {field.type === "Nested" && (
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addField(field.id)}
              >
                Add Nested
              </Button>
            )}
          </div>

          {field.type === "Nested" && (
            <div className="nested-fields">
              <FieldBuilder
                fields={field.children}
                setFields={(newChildren) => {
                  const updateChildren = (arr) =>
                    arr.map((f) =>
                      f.id === field.id ? { ...f, children: newChildren } : f
                    );
                  updateFields(updateChildren(fields));
                }}
              />
            </div>
          )}
        </Card>
      ))}
      <Button type="primary" icon={<PlusOutlined />} onClick={() => addField()} className="add-btn">
        Add Field
      </Button>
    </div>
  );
}
