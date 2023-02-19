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
}
