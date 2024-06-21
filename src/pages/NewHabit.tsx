import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonToggle, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonList, IonItem, IonButton, IonIcon, useIonRouter, IonRange } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './NewHabit.css';
import DayPicker from '../components/DayPicker';
import BackButton from '../components/CloseButton';
import FinancialModal from '../components/FinancialModal';
import { useHabitContext } from '../contexts/Context';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { HabitType } from '../types/types';

const NewHabit: React.FC = () => {
  const router = useIonRouter();

  const { habitList, setHabitList } = useHabitContext();

  const [habit, setHabit] = useState<HabitType>({
    id: 0,
    finalGoal: '',
    steps: [],
    selectedDays: [false, false, false, false, false, false, false],
    reminder: false,
    habitTimes: [],
    financialIncentive: {
      active: false,
      amount: 0,
      lockTimeNumber: 0,
      lockTimeType: 'day'
    }
  })
  const [habitTimes, setHabitTimes] = useState<String[]>([]);
  const [steps, setSteps] = useState<String[]>([]);

  let pos: number = 0;
  // const addNewHabit = () => {
  //   setHabitTimes([...habitTimes, newHabit]);
  // };

  const handleDaySelect = (selectedDays: boolean[]) => {
    console.log('Selected days:', selectedDays);
    setHabit({ ...habit, selectedDays: selectedDays })
    // You can perform any additional logic here based on the selected days
  };

  const addNewHabit = () => {
    console.log(habit.finalGoal);

    if (habit.finalGoal && habit.finalGoal !== '') {
      const newHabit: HabitType = { ...habit, id: habitList.length + 1, steps: steps, habitTimes: habitTimes };
      setHabitList([...habitList, newHabit]);
      // bug: not resetting properly
      setHabit({
        id: 0,
        finalGoal: '',
        steps: [],
        selectedDays: [false, false, false, false, false, false, false],
        reminder: false,
        habitTimes: [],
        financialIncentive: {
          active: false,
          amount: 0,
          lockTimeNumber: 0,
          lockTimeType: 'day'
        }
      });
      router.goBack();
    }
    else {
      alert('Please enter a habit')
    }
  };

  useEffect(() => {
    console.log(habit);

  }, [habit]);

  return (
    <IonPage>
      <IonContent fullscreen className="main-page">
        <span style={{ position: 'absolute', right: '10px', top: '10px', }}>
          <BackButton />
        </span>
        <div className='top-text-container'>
          <p style={{ color: '#626262' }}>Your Final Goal</p>
          <IonInput class="custom" aria-label="Main Habit" placeholder="Run a marathon" onIonInput={(e) => setHabit({ ...habit, finalGoal: e.target.value })}></IonInput>
        </div>

        <div className='steps-block'>
          <div className='end-line'>
            <svg viewBox="0 0 65 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.999999 17C1.62235 13.7096 6.69749 6.54057 22.168 2.95C31.7545 0.725058 45.6431 1.01207 64 1.01207" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p>Steps to goal</p>
          <div className='start-line'>
            <svg viewBox="0 0 65 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.999999 17C1.62235 13.7096 6.69749 6.54057 22.168 2.95C31.7545 0.725058 45.6431 1.01207 64 1.01207" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <IonGrid class="step-grid">
          <IonRow class="ion-justify-content-center ion-align-items-center">
            {steps.map((step, index) => (
              <IonCol size="auto" key={index} className={`step-col`}>

                <button className="step-button">
                  {/* bug: when deleted, the array is updated correctly, but the shown times are incorrect  */}
                  {/* <IonIcon onClick={() => setSteps(prevSteps => {
                    const updatedSteps = [...prevSteps];
                    updatedSteps.splice(index, 1);
                    return updatedSteps;
                  })} icon={closeOutline}></IonIcon> */}

                  <IonButton onClick={() => setSteps(prevSteps => {
                    const updatedSteps = [...prevSteps];
                    updatedSteps.splice(index, 1);
                    return updatedSteps;
                  })} className="step-close close-button ">
                    <IonIcon icon={closeOutline}></IonIcon>
                  </IonButton>

                  <p>{index + 1}</p>
                  <IonInput
                    onIonChange={(e) => setSteps(prevStep => {
                      let updatedStep = [...prevStep];
                      updatedStep[index] = e.detail.value;
                      return updatedStep;
                    })}
                    placeholder="small step..."></IonInput>
                </button>
              </IonCol>
            ))}
            <IonButton className="add-step-button" onClick={() => setSteps([...steps, ''])}>+ Add</IonButton>
          </IonRow>
        </IonGrid>

        <p style={{ fontSize: '.8125rem', display: 'flex', justifyContent: 'center' }}>Repeat</p>
        <DayPicker onSelect={handleDaySelect} />

        <div className='time-block'>
          {habit.selectedDays.includes(true) && <IonToggle onIonChange={(e) => setHabit({ ...habit, reminder: e.detail.checked })}>Want a reminder?</IonToggle>}

          {habit.reminder && (
            <>
              <p style={{ fontSize: '1rem' }}>How about at a certain time?</p>
              <IonGrid>
                <IonRow class="ion-justify-content-center">
                  {habitTimes.map((_habit, index) => (
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
                  <IonButton className="add-time-button" onClick={() => setHabitTimes([...habitTimes, new Date().toISOString()])}>+ Add</IonButton>
                </IonRow>
              </IonGrid>
            </>
          )}
        </div>

        <div className='fin-block'>
          {habit.financialIncentive.active &&
            <IonButton onClick={() => setHabit({ ...habit, financialIncentive: { active: false, lockTimeNumber: 0, lockTimeType: 'day', amount: 0 } })} className="close-button">
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
            // <IonIcon onClick={() => setHabit({ ...habit, financialIncentive: { active: false, lockTime: 0, amount: 0 } })} icon={closeOutline}></IonIcon>
          }
          <IonButton id='open-financial' expand='block'>
            {habit.financialIncentive.active ?
              <p>Locking ${habit.financialIncentive.amount} for {habit.financialIncentive.lockTimeNumber} {habit.financialIncentive.lockTimeNumber === 1 ? habit.financialIncentive.lockTimeType : habit.financialIncentive.lockTimeType + 's'}</p> :
              <p>$ Financial Incentive?</p>}
          </IonButton>
        </div>

        <FinancialModal habit={habit} setHabit={setHabit} />
        <IonButton className='save-button' expand='block' onClick={addNewHabit} routerDirection='none'>Start New Habit</IonButton>
      </IonContent>
    </IonPage>
  )
};

export default NewHabit;
