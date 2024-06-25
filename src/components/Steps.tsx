import React, { useEffect, useRef, useState } from 'react';
import './Steps.css'

const Steps: React.FC<{ stepArrray: string[], currentStep: number }> = ({ stepArrray, currentStep = 0 }) => {

    const elipse = () => {
        return <div className='elipse'>
            <div />
            <div />
            <div />
        </div>
    }

    return (
        <div className='habit-steps'>
            <div className='current-step'>
                <p className='current-step-text'>{stepArrray[currentStep]}</p>
                <div className='progress-bar'>
                    <div className='progress-fill'>
                        <svg height="100%" viewBox="0 0 10 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0H5C5 0 10 4 10 12.5C10 21 0 34.5 0 42C0 49.5 5 54 5 54H10V0Z" fill="#404D5E" />
                        </svg>
                    </div>
                </div>
                {/* todo: hook up to actual progress counter based on days completed */}
                <p className='progress-count'>5/10</p>
            </div>

            {elipse()}

            {(stepArrray.length - 1 > currentStep + 1) &&
                <>
                    <div className='next-step'>
                        <p>{stepArrray[currentStep + 1]}</p>
                    </div>

                    {(stepArrray.length - 1 > currentStep + 2) ?
                        <div className='following-steps'>
                            {elipse()}
                            <div>
                                <p>{stepArrray.length - 3}more step{stepArrray.length - 3 === 1 ? '' : 's'}</p>
                            </div>
                            {elipse()}
                        </div>
                        :
                        elipse()
                    }
                </>
            }


            <div className='final-goal-block'>
                <p style={{ color: '#626262' }}>Final Goal</p>
                <p className='final-goal'>{stepArrray[stepArrray.length - 1]}</p>
            </div>
        </div>
    )
};

export default Steps;
