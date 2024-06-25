import React, { useEffect, useRef, useState } from 'react';
import './HabitLog.css'

const HabitLog: React.FC<{ selectedDays: boolean[] }> = ({ selectedDays }) => {

    // todo: change to prop that gets passed in
    // const selectedDays = [
    //     false,
    //     false,
    //     true,
    //     true,
    //     false,
    //     false,
    //     false
    // ]
    const scheduledDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].filter((day, index) => selectedDays[index]);
    // todo: get the current date and 2 prev months
    const threeMonth = ['June', 'May', 'April']
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    function countWeekdaysInMonth(monthsBack, dayName) {
        // const [daysInMonth, dayName] = monthInfo(monthIndex)
        let date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth();


        const weekdays = { "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6 };
        const weekdayNumber = weekdays[dayName];

        let count = 0;

        date = new Date(year, month - monthsBack, 1);

        const dateDiff = weekdays[dayName] - weekdays[date.toString().split(' ')[0].toLowerCase()]
        const dateShift = dateDiff < 0 ? dateDiff + 7 : dateDiff;

        date.setDate(date.getDate() + dateShift); // move to first day in month matching dayName

        while (date.getMonth() === month - monthsBack) {

            if (date.getDay() === weekdayNumber) {
                count = count + 1;
            }
            date.setDate(date.getDate() + 7); // move to next week
        }
        return count;
    }


    return (
        // todo: on mobile view have this be scrollable instead of a vertical grid
        // similar view to desktop, just scrollable
        <div className='logBlock'>
            {threeMonth.map((month, monthIndex) => (
                <div className='monthBlock'>
                    <p className='month'>{month}</p>
                    <div className='weekBlock'>
                        {scheduledDays.map((day, dayIndex) => (
                            <>
                                {monthIndex === threeMonth.length - 1 && <p className='logDay'>{day}</p>}
                                {/* <p className='logDay'>{day}</p> */}
                                <div className='weekBoxes'>
                                    {Array.from({ length: countWeekdaysInMonth(monthIndex, day) }, (_, index) => {
                                        // todo: use actual values that represent days of task completion
                                        return index %2 === 0 ? <div style={{ backgroundColor: '#FFD25D' }} /> : <div />
                                    })}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default HabitLog;
