import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHabitContext } from '../contexts/Context';
import './Home.css';

interface MainPageProps {
  habits: number;
}

const Home: React.FC<MainPageProps> = ({ habits }) => {
  const { habitList, setHabitList } = useHabitContext();


  // const [habitList, setHabitList] = useState<string[]>(Array.from({ length: habits }, (_, index) => `Habit ${index + 1}`));

  const addNewHabit = () => {
    const newHabit = `New Habit ${habitList.length + 1}`;
    setHabitList([...habitList, newHabit]);
  };

    useEffect(() => {
    console.log(habitList);

  }, [habitList]);

  return (
    <IonPage>
      <IonContent fullscreen className="main-page">
        <div className="button-container">
          {/* <IonButton className="add-button" onClick={addNewHabit}> */}
          <IonButton className="add-button" routerLink='/habit/new'>
            +
          </IonButton>
          <span className="button-label">Habits</span>
        </div>
        <IonGrid>
          <IonRow>
          {habitList.map((habit, index) => (
            <IonCol size="6" size-md="4" key={index} className={`grid-item ${index % 2 === 0 ? 'square' : 'rectangle'}`}>
              <IonButton routerLink={`/habits/${habit.id}`}>{habit.finalGoal}</IonButton>
            </IonCol>
          ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
