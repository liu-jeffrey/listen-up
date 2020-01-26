export interface dialogProps {
  date: string;
  guestName: string;
  keyWords: string[];
  transcript: string;
  isOpen: boolean;
  toggleDialog: () => void;
}
