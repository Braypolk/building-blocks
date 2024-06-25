import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonToggle, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonList, IonItem, IonButton, IonIcon, useIonRouter, IonRange } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './Habit.css';
import DayPicker from '../components/DayPicker';
import BackButton from '../components/CloseButton';
import FinancialModal from '../components/FinancialModal';
import { useHabitContext } from '../contexts/Context';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { HabitType } from '../types/types';
import { useParams } from 'react-router';
import HabitLog from '../components/HabitLog';
import Steps from '../components/Steps';

const Habit: React.FC = () => {
    //   const router = useIonRouter();

    const [editMode, setEditMode] = useState(false);

    let { habitId } = useParams();

    const { habitList, setHabitList } = useHabitContext();
    let habitIndex: number;
    habitList.forEach((h, index) => {
        if (h.id == habitId) {
            habitIndex = index;
        }
    });

    console.log(habitList[habitIndex]);


    const handleDaySelect = (selectedDays: boolean[]) => {
        habitList[habitIndex] = { ...habitList[habitIndex], selectedDays: selectedDays }
        // You can perform any additional logic here based on the selected days
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonButton onClick={() => { setEditMode(!editMode) }}>{editMode ? 'Save' : 'Edit'}</IonButton>
                <span style={{ position: 'absolute', right: '10px', top: '10px', }}>
                    <BackButton />
                </span>
                <div style={{ textAlign: 'center', width: '90%', margin: '0 auto', borderBottom: '1px solid rgba(53, 53, 53, 0.3)' }}>
                    <p style={{ fontSize: '2rem', color: '#626262' }}>{habitList[habitIndex].finalGoal}</p>
                </div>
                <p style={{ fontSize: '0.8125rem', fontWeight: '600', textAlign: 'center' }}>Repeat</p>
                {editMode ?
                    <DayPicker onSelect={handleDaySelect} selectedDaysProp={habitList[habitIndex].selectedDays} /> :
                    <DayPicker selectedDaysProp={habitList[habitIndex].selectedDays} />
                }
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        {habitList[habitIndex].habitTimes.length > 0 && <p style={{ margin: 'auto 0' }}>at</p>}
                        {habitList[habitIndex].habitTimes.map((_habit, index) => (
                            <IonCol size="auto" key={index} className={`grid-item ${index % 2 === 0 ? 'square' : 'rectangle'}`}>
                                <div className='time-button'>
                                    {/* bug: when deleted, the array is updated correctly, but the shown times are incorrect  */}
                                    <IonIcon onClick={() => setHabitTimes(prevHabitTimes => {
                                        const updatedHabitTimes = [...prevHabitTimes];
                                        updatedHabitTimes.splice(index, 1);
                                        return updatedHabitTimes;
                                    })} icon={closeOutline}></IonIcon>
                                    <IonDatetimeButton key={index} datetime={`datetime-${index}`}></IonDatetimeButton>
                                    <IonModal keepContentsMounted={true}>
                                        <IonDatetime
                                            onIonChange={(e) => setHabitTimes(prevHabitTimes => {
                                                let updatedHabitTimes = [...prevHabitTimes];
                                                updatedHabitTimes[index] = e.detail.value;
                                                return updatedHabitTimes;
                                            })}
                                            id={`datetime-${index}`}
                                            presentation="time"
                                            formatOptions={{
                                                time: {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                },
                                            }}
                                        ></IonDatetime>
                                    </IonModal>
                                </div>
                            </IonCol>
                        ))}
                        {/* todp: make time edit functional */}
                        {editMode &&
                            <IonButton className="add-time-button" onClick={() => setHabitTimes([...habitTimes, new Date().toISOString()])}>+ Add</IonButton>
                        }
                    </IonRow>
                </IonGrid>
                {/* todo: hook up to real vars */}
                <div className='top-blocks'>
                    <div className='stats'>
                        <div>
                            <p>Current Streak</p>
                            <p className='big-font'>10</p>
                        </div>
                        <div className='line' />
                        <div>
                            <p>Monthly Completion</p>
                            <p className='big-font'>50%</p>
                        </div>
                    </div>
                    <div className='history-small'>
                        <p>Log</p>
                        <HabitLog selectedDays={habitList[habitIndex].selectedDays} />
                        <p>Total: 5</p>
                        {/* <p>Total: {total}</p> */}
                    </div>
                </div>

                <Steps stepArrray={habitList[habitIndex].steps} currentStep={0} />
            </IonContent>
        </IonPage>
    )
};

export default Habit;
