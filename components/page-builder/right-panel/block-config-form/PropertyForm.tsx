'use client'

import PropertyFormContainer from "@/components/page-builder/right-panel/block-config-form/PropertyFormContainer";
import { usePreviewContext } from "@/context/preview.context";
import { useBuilderContext } from "@/context/builder.context";
import { useEffect, useState } from "react";
import { type BlockConfig, BlockConfigField } from "@/types/block-props.types";
import PropertyFieldRenderer from "@/components/page-builder/right-panel/block-config-form/PropertyFieldRenderer";

export default function PropertyForm() {
  const { state: previewState } = usePreviewContext();
  const { state: builderState, setState: setBuilderState } = useBuilderContext();
  const [blockConfig, setBlockConfig] = useState<BlockConfig | null>(null);
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
          case "list":
            fieldValue.array_value = value;
            break;
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
      {blockConfig && blockConfig.fields && Object.entries(blockConfig.fields).map(([key, field]) => (
        <PropertyFieldRenderer
          key={key}
          fieldKey={key}
          field={field}
          currentValue={activeBlockData?.value?.[key]}
          onFieldChange={handleFieldChange}
        />
      ))}
    </PropertyFormContainer>
  );
}