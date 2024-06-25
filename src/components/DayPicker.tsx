import React, { useEffect, useState } from 'react';
import './DayPicker.css';

interface DayPickerProps {
  onSelect?: (days: boolean[]) => void;
  selectedDaysProp?: boolean[]
}

const DayPicker: React.FC<DayPickerProps> = ({ onSelect, selectedDaysProp }) => {
  const [selectedDays, setSelectedDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDayClick = (index: number) => {
    if (!onSelect) {
      return
    }

    let newSelectedDays = [...selectedDays]
    newSelectedDays[index] = !newSelectedDays[index];

    setSelectedDays(newSelectedDays);
    
    onSelect(newSelectedDays);
  };

  useEffect(() => {
    if (selectedDaysProp) {
      setSelectedDays(selectedDaysProp);
    }
  }, []);

  return (
    <div className="day-picker">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          onClick={() => handleDayClick(index)}
          style={{
            background: selectedDays[index] ? '#60B3FF' : '#FFFFFF'
          }}
          className='dynamic-height'
        >
          <div className="day">
            {day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayPicker;