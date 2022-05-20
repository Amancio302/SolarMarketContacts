export interface ISelectItem {
  text: string | number | object;
  value: string | number | object;
  disabled?: boolean;
  divider?: boolean;
  header?: string;
}
