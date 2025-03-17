'use client'

import { Input, Textarea } from "@heroui/react";
import PropertyFormContainer from "@/components/page-builder/right-panel/block-config-form/PropertyFormContainer";
import { usePreviewContext } from "@/context/preview.context";
import { useBuilderContext } from "@/context/builder.context";
import { useEffect, useState } from "react";
import { BlockConfigField } from "@/types/block-props.types";

export default function PropertyForm() {
  const { state: previewState } = usePreviewContext();
  const { state: builderState, setState: setBuilderState } = useBuilderContext();
  const [blockConfig, setBlockConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [blockName, setBlockName] = useState<string>("");

  useEffect(() => {
    async function loadBlockConfig() {
      if (!previewState.activeBlockRef) {
        setBlockConfig(null);
        setBlockName("");
        return;
      }

      const blockData = builderState.blocks.find(
        block => block._id === previewState.activeBlockRef?.block
      );

      if (!blockData) {
        setBlockConfig(null);
        return;
      }

      setBlockName(blockData.component);
      setLoading(true);

      try {
        // Dynamically import the component to get its config
        const module = await import(`@/blocks/${blockData.folder}/${blockData.component}`);
        setBlockConfig(module.config || null);
      } catch (error) {
        console.error("Failed to load block config:", error);
        setBlockConfig(null);
      } finally {
        setLoading(false);
      }
    }

    loadBlockConfig();
  }, [previewState.activeBlockRef, builderState.blocks]);

  const handleFieldChange = (key: string, value: any, fieldType: string) => {
    if (!previewState.activeBlockRef) return;

    const updatedBlocks = builderState.blocks.map(block => {
      if (block._id === previewState.activeBlockRef?.block) {
        // Create new field value based on the field type
        const fieldValue: Partial<BlockConfigField> = {};

        switch(fieldType) {
          case "input":
          case "textarea":
            fieldValue.string_value = value;
            break;
          case "number":
            fieldValue.number_value = value;
            break;
          case "checkbox":
            fieldValue.boolean_value = value;
            break;
          // Add more cases for other field types as needed
        }

        return {
          ...block,
          value: {
            ...block.value,
            [key]: {
              ...block.value?.[key],
              ...fieldValue
            }
          }
        };
      }
      return block;
    });

    setBuilderState(prev => ({
      ...prev,
      blocks: updatedBlocks
    }));
  };

  if (!previewState.activeBlockRef) {
    return (
      <PropertyFormContainer leftComponent={<h3>No block selected</h3>}>
        <div className="flex items-center justify-center h-64">
          <p className="text-neutral opacity-70">Select a block in the preview to configure it</p>
        </div>
      </PropertyFormContainer>
    );
  }

  if (loading) {
    return (
      <PropertyFormContainer leftComponent={<h3>Loading configuration...</h3>}>
        <div className="flex items-center justify-center h-64">
          <p className="text-neutral opacity-70">Loading block configuration...</p>
        </div>
      </PropertyFormContainer>
    );
  }

  if (!blockConfig) {
    return (
      <PropertyFormContainer leftComponent={<h3>{blockName}</h3>}>
        <div className="flex items-center justify-center h-64">
          <p className="text-neutral opacity-70">
            No configuration available for this block.
            Make sure the block exports a config object.
          </p>
        </div>
      </PropertyFormContainer>
    );
  }

  const activeBlockData = builderState.blocks.find(
    block => block._id === previewState.activeBlockRef?.block
  );

  return (
    <PropertyFormContainer leftComponent={<h3>{blockConfig.label || blockName}</h3>}>
      {blockConfig && blockConfig.fields && Object.entries(blockConfig.fields).map(([key, field]: [string, any]) => {
        const currentValue = activeBlockData?.value?.[key]?.string_value || field.defaultValue || '';

        if (field.formType === "input") {
          return (
            <Input
              key={key}
              label={field.label}
              size="sm"
              type="text"
              value={currentValue}
              onChange={(e) => handleFieldChange(key, e.target.value, "input")}
            />
          );
        }

        if (field.formType === "textarea") {
          return (
            <Textarea
              key={key}
              label={field.label}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              value={currentValue}
              onChange={(e) => handleFieldChange(key, e.target.value, "textarea")}
            />
          );
        }

        // Add other field types here as needed

        return null;
      })}
    </PropertyFormContainer>
  );
}