import React, { useEffect, useState } from 'react';
import { IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './CloseButton.css';

const CloseButton: React.FC<{ deafaultHref?: string }> = ({ deafaultHref }) => {
    return (
        <IonBackButton defaultHref={deafaultHref ? deafaultHref : '/'} text="" icon={closeOutline} color={'dark'} className='close-button'></IonBackButton>
    )
}

export default CloseButton