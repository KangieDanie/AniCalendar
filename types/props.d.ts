interface ICalendarProps {
  refElement: React.Ref<HTMLInputElement>;
  year: string;
  month: string;
}

interface ICalendarButtonsProps {
  refElement: any; // TO DO add type
  year: string;
  month: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setLegendVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICalendarEventProps {
  activity: Activity;
  total: number;
}

interface ISettingModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAvatarProps {
  image: string;
}

interface IColorSelectorProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

interface ICalendarButtonProps {
  visible: boolean;
  content: string;
  icon: any;
  method: any;
}
