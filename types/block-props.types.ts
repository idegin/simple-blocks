export interface BlockConfigField {
  label: string;
  defaultValue: Record<any, BlockConfigField> | Record<any, BlockConfigField>[] | string | number | boolean;
  formType: ConfigFormType;

  string_value?: string;
  boolean_value?: boolean;
  number_value?: number;
  array_value?: BlockConfigField[];
  object_value?: BlockConfigField;
}

export interface BlockConfig {
  label: string;
  description?: string;
  fields: Record<any, BlockConfigField | Record<any, BlockConfigField>[]>;
}

export type ConfigFormType = "input" | "textarea" | "list" | "dropdown" | "switch";
