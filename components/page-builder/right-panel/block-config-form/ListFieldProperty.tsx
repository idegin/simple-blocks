'use client'

import { BlockConfigField } from "@/types/block-props.types";
import { Input, Textarea, Button, Switch, Checkbox } from "@heroui/react";
import { useMemo, useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

type PropertyFieldRendererProps = {
  fieldKey: string;
  field: BlockConfigField | Record<any, BlockConfigField>[];
  currentValue: any;
  onFieldChange: (key: string, value: any, fieldType: string) => void;
}

function ListFieldProperty(
  {
    fieldKey,
    field,
    currentValue,
    onFieldChange
  }: {
    fieldKey: string;
    field: Record<any, BlockConfigField>[];
    currentValue: any[];
    onFieldChange: (key: string, value: any[], fieldType: string) => void;
  }) {
  //@ts-ignore
  const [items, setItems] = useState<any[]>(currentValue?.array_value || []);

  const fieldTemplate = field[0];

  // Find the first input or textarea field to use for item titles
  const titleFieldKey = useMemo(() => {
    const inputFields = Object.entries(fieldTemplate)
      .filter(([_, fieldConfig]) =>
        fieldConfig.formType === "input" || fieldConfig.formType === "textarea");

    return inputFields.length > 0 ? inputFields[0][0] : null;
  }, [fieldTemplate]);

  const getItemTitle = (item: any, index: number) => {
    if (titleFieldKey && item?.[titleFieldKey]?.string_value) {
      return item[titleFieldKey].string_value;
    }
    return `Item ${index + 1}`;
  };

  const addItem = () => {
    // Create a new item with default values from template
    const newItem: Record<string, any> = {};

    Object.entries(fieldTemplate).forEach(([key, fieldConfig]) => {
      newItem[key] = {
        string_value: fieldConfig.defaultValue as string,
      };
    });

    const newItems = [...items, newItem];
    setItems(newItems);
    onFieldChange(fieldKey, newItems, "list");
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    onFieldChange(fieldKey, newItems, "list");
  };

  const updateItemField = (itemIndex: number, fieldName: string, value: any, fieldType: string) => {
    const newItems = [...items];

    // Initialize the item if it doesn't exist
    if (!newItems[itemIndex]) {
      newItems[itemIndex] = {};
    }

    // Initialize the field if it doesn't exist
    if (!newItems[itemIndex][fieldName]) {
      newItems[itemIndex][fieldName] = {};
    }

    // Update the appropriate value based on field type
    switch(fieldType) {
      case "input":
      case "textarea":
        newItems[itemIndex][fieldName].string_value = value;
        break;
      case "number":
        newItems[itemIndex][fieldName].number_value = value;
        break;
      case "checkbox":
        newItems[itemIndex][fieldName].boolean_value = value;
        break;
    }

    setItems(newItems);
    onFieldChange(fieldKey, newItems, "list");
  };

  return (
    <div className="bg-content2 hover:bg-content3 border-border/40 rounded-md p-4 space-y-4 group transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="font-medium">{fieldKey}</div>
        <Button
          size="sm"
          variant="bordered"
          onPress={addItem}
          className="flex items-center gap-1 group-hover:bg-content1"
        >
          <PlusIcon size={16} />
          Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted">
          No items added. Click the "Add Item" button to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, itemIndex) => (
            <Popover key={itemIndex} placement="left" offset={50}>
              <PopoverTrigger>
                <div className="border border-divider rounded-xl p-3 flex justify-between items-center group-hover:bg-content1 bg-content3 cursor-pointer">
                  <h3 className="font-medium truncate max-w-[80%]" title={getItemTitle(item, itemIndex)}>
                    {getItemTitle(item, itemIndex)}
                  </h3>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      removeItem(itemIndex);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Edit </h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(fieldTemplate).map(([fieldName, fieldConfig]) => (
                      <div key={fieldName}>
                        <PropertyFieldRendererInternal
                          fieldKey={fieldName}
                          field={fieldConfig}
                          currentValue={item?.[fieldName]}
                          onFieldChange={(key, value, fieldType) =>
                            updateItemField(itemIndex, key, value, fieldType)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyFieldRendererInternal({ fieldKey, field, currentValue, onFieldChange }: PropertyFieldRendererProps) {
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

    case "switch":
      return (
        <div key={fieldKey} className="flex items-center justify-between">
          <label className="text-sm font-medium">{field.label}</label>
          <Switch
            checked={boolValue}
            onChange={(checked) => onFieldChange(fieldKey, checked, "checkbox")}
          />
        </div>
      );

    case "list":
      return (
        <div key={fieldKey} className="border border-border/40 rounded-md p-3">
          <div className="font-medium mb-2">{field.label}</div>
          <p className="text-sm text-muted mb-2">List editor not implemented</p>
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

export default function PropertyFieldRenderer(props: PropertyFieldRendererProps) {
  return <PropertyFieldRendererInternal {...props} />;
}