import React, { useState } from "react";
import { Typography, Button, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import FieldBuilder from "./components/FieldBuilder";
import { generateJson } from "./utils/jsonGenerator";

const { Title } = Typography;

export default function App() {
  const [fields, setFields] = useState([
    { id: Date.now(), key: "", type: "String" }
  ]);

  const handleCopy = () => {
    const jsonData = JSON.stringify(generateJson(fields), null, 2);
    navigator.clipboard.writeText(jsonData);
    message.success("✅ JSON copied to clipboard!");
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(generateJson(fields), null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "schema.json";
    link.click();
    URL.revokeObjectURL(url);

    message.success("✅ JSON file downloaded!");
  };

  return (
    <div className="container">
  <Title level={2} className="heading">JSON Schema Builder</Title>
      <p className="hero-description">
        Easily create, edit, and preview JSON schemas—all in one place.Build visually, see live updates, copy instantly, and save for later.
      </p>

      <div className="split-container">
    <div className="builder-section pro-card">
          <h3 className="section-title">Schema Builder</h3>
          <FieldBuilder fields={fields} setFields={setFields} />
        </div>

        <div className="preview-section pro-card">
          <h3 className="section-title">Live JSON Preview</h3>
          <div className="json-preview">
            <pre>{JSON.stringify(generateJson(fields), null, 2)}</pre>
          </div>
          <div className="action-buttons">
            <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy}>
              Copy JSON
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              type="dashed"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Download JSON
            </Button>
      </div>
        </div>
      </div>
    </div>
  );
}
