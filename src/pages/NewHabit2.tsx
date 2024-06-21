// Example.tsx
import React, { useState } from 'react';
import {
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
} from '@ionic/react';
import ModalComponent from '../components/ModalComponent'; // Adjust the import path as necessary

function Example() {
  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>
        <p>{message}</p>
        <ModalComponent message={message} setMessage={setMessage} />
      </IonContent>
    </IonPage>
  );
}

export default Example;