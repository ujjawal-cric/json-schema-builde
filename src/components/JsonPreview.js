import React from "react";
import { Card } from "antd";
import { generateJson } from "../utils/jsonGenerator";

const JsonPreview = ({ schema }) => {
  return (
    <Card className="json-preview">
      <pre>{JSON.stringify(generateJson(schema), null, 2)}</pre>
    </Card>
  );
};

export default JsonPreview;
