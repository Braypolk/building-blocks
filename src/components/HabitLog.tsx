import React, { useEffect, useRef, useState } from 'react';
import './HabitLog.css'

const HabitLog: React.FC = () => {

    // todo: change to prop that gets passed in
    const selectedDays = [
        false,
        false,
        true,
        true,
        false,
        false,
        false
    ]
    const scheduledDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].filter((day, index) => selectedDays[index]);
    // todo: get the current date and 2 prev months
    const threeMonth = ['April', 'May', 'June']


    return (
        <div className='logBlock'>
            {/* {threeMonth.map((month) => (

            ))} */}
            {threeMonth.map((month, index) => (
                <div className='monthBlock'>
                    <p className='month'>{month}</p>
                    <div className='weekBlock'>
                    {scheduledDays.map((day) => (
                        <>
                            {index === 0 && <p className='logDay'>{day}</p>}
                            <div className='weekBoxes'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
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
