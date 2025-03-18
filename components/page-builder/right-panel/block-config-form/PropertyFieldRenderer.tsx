'use client'

import { BlockConfigField } from "@/types/block-props.types";
import { Input, Textarea } from "@heroui/react";
import ListFieldProperty from "./ListFieldProperty";

type PropertyFieldRendererProps = {
  fieldKey: string;
  field: BlockConfigField | Record<any, BlockConfigField>[];
  currentValue: any;
  onFieldChange: (key: string, value: any, fieldType: string) => void;
}

export default function PropertyFieldRenderer({ fieldKey, field, currentValue, onFieldChange }: PropertyFieldRendererProps) {
  if (Array.isArray(field)) {
    return (
      <ListFieldProperty
        fieldKey={fieldKey}
        field={field}
        currentValue={currentValue}
        onFieldChange={onFieldChange}
      />
    );
  }

  const value = currentValue?.string_value ?? field.defaultValue ?? '';
  const boolValue = currentValue?.boolean_value ?? field.defaultValue ?? false;
  const numValue = currentValue?.number_value ?? field.defaultValue ?? 0;

  switch (field.formType) {
    case "input":
      return (
        <Input
          key={fieldKey}
          label={field.label}
          size="sm"
          type="text"
          value={value}
          onChange={(e) => onFieldChange(fieldKey, e.target.value, "input")}
        />
      );

    case "textarea":
      return (
        <Textarea
          key={fieldKey}
          label={field.label}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          value={value}
          onChange={(e) => onFieldChange(fieldKey, e.target.value, "textarea")}
        />
      );

    case "list":
      if (field.defaultValue && Array.isArray(field.defaultValue)) {
        return (
          <ListFieldProperty
            fieldKey={fieldKey}
            // @ts-ignore
            field={[{ ...field }]}
            currentValue={currentValue}
            onFieldChange={onFieldChange}
          />
        );
      }
      return (
        <div key={fieldKey} className="border border-border/40 rounded-md p-3">
          <div className="font-medium mb-2">{field.label}</div>
          <p className="text-sm text-muted mb-2">List editor not implemented for this field type</p>
        </div>
      );

    default:
      return (
        <div key={fieldKey} className="text-sm text-muted">
          Unknown field type: {field.formType}
        </div>
      );
  }
}