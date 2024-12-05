export interface ShortcutButtonProps {
  shortcut: string;
  onClick: () => void;
  onRemove: (e: React.MouseEvent) => void;
  isOddIndex: boolean;
}

export interface PopupProps {
  inputUrl: string;
  errorMessage: string;
  setInputUrl: React.Dispatch<React.SetStateAction<string>>;
  setPopupIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleSaveUrl: () => void;
}
