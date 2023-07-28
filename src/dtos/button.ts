export interface IButton {
  customTitle: string;
  customWidth?: string;
  customColor: "primary" | "secondary";
  disabled?: boolean;
  onClick?: (e: any) => void;
}
