export interface IButton {
  customTitle: string;
  customWidth?: string;
  customColor: "primary" | "secondary";
  onClick?: (e: any) => void;
}
