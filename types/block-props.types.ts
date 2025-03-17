
export interface BlockConfigField {
    label: string;
    string_value: string;
    boolean_value: boolean;
    number_value: number;
    array_value: BlockConfigField[];
    object_value: BlockConfigField;
}
