import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonToggle, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonDatetimeButton, IonModal, IonDatetime, IonInput, IonList, IonItem, IonButton, IonIcon, IonRange, IonFab, IonFabButton, IonPopover, IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/react';
import './FinancialModal.css';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { HabitType } from '../types/types';
import { informationCircleOutline, closeOutline } from 'ionicons/icons';
import { useKeyboardState } from '@ionic/react-hooks/keyboard'
import Popup from './popup';

interface ModalComponentProps {
    habit: HabitType
    setHabit: (habit: HabitType) => void;
}

const FinancialModal: React.FC<ModalComponentProps> = ({ habit, setHabit }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    // const amount = useRef<HTMLIonInputElement>(null);
    // const timeLocked = useRef<HTMLIonInputElement>(null);
    const { isOpen, keyboardHeight } = useKeyboardState();
    let count = 0;

    const [amount, setAmount] = useState(habit.financialIncentive.amount);
    const [timeLocked, setTimeLocked] = useState(habit.financialIncentive.lockTimeNumber);
    const [timeframe, setTimeframe] = useState(habit.financialIncentive.lockTimeType);


    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };




    function confirm() {
        console.log(typeof amount, typeof timeLocked);
        if (amount !== 0 && timeLocked !== 0) {
            modal.current?.dismiss({ active: true, amount: amount, lockTimeNumber: timeLocked, lockTimeType: timeframe, }, 'confirm');
        }
    }
    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            console.log(ev.detail.data);
            setHabit({ ...habit, financialIncentive: ev.detail.data });
        }
    }

    useEffect(() => {
        console.log(isOpen);
        count = count + 1;
    }, [isOpen])

    return (
        <IonModal className='fin-modal' ref={modal} trigger="open-financial" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonContent>
                <div className='card-width financial'>
                    <svg className='pig-svg' width="185" height="152" viewBox="0 0 185 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 47.1935L42 35.1935L54 28.1935L99 135.193H84.5L71.5 134.193L67 141.693L59 147.693H47L38 143.193L33.5 132.693C33.6667 130.027 33.3 122.593 30.5 114.193C22 107.693 18.1667 96.6935 16.5 92.6935L15 68.1935L26 47.1935Z" fill="#FF9EB1" />
                        <path d="M82.5 137.194C77.7 147.594 67.1667 149.527 62.5 149.194L71 135.694C71.6667 135.194 74.9 134.794 82.5 137.194Z" fill="#FF758F" />
                        <path d="M121.5 148.693C111.5 151.093 104 140.693 101.5 135.193L114.5 134.693C116.667 138.027 121.1 145.493 121.5 148.693Z" fill="#FF9EB1" />
                        <path d="M68.5 24.1935C41.5003 80.6935 79.4998 120.193 95.4996 135.193L112.499 133.193L114.999 137.693C118.166 142.527 127.399 151.493 138.999 148.693C150.599 145.893 152.499 131.86 151.999 125.193C151.499 118.86 152.699 105.793 161.499 104.193C170.299 102.593 177.833 97.8601 180.499 95.6935V75.6935L176.999 68.6935L171.499 66.6935L162.499 61.6935L156.999 53.6935L146.499 41.6935L130.499 30.1935L94.4994 21.6935H83.9994L68.5 24.1935Z" fill="#FFC9D4" />
                        <ellipse cx="136" cy="78.1935" rx="11.5" ry="9" fill="white" />
                        <path d="M35.4999 59.1935C34.9999 54.6935 39.3333 52.36 41.9999 50.1935L54 61.9351C52.7772 62.5264 51.4703 63.1181 49.9999 63.6935C38.4999 68.1935 35.8219 62.0914 35.4999 59.1935Z" fill="#FF758F" />
                        <path d="M86 54.1935C88.9482 48.985 90.0808 44.1049 89.895 39.6935C100.5 38.1935 107 54.6935 92.5 55.1935L86 54.1935Z" fill="#FF9EB1" />
                        <path d="M42.9999 32.1935C37.7999 45.7935 46 56.3601 51 60.1935C51.5 60.8601 53.8999 61.4935 59.4999 58.6935C58.2999 48.6935 66.6665 28.1935 70.9999 19.1935L68.4999 18.1935C62 15.1935 48.1999 18.5935 42.9999 32.1935Z" fill="#FFCF6B" />
                        <path d="M82.4998 23.1935C87.9998 29.6935 91.2 40.5935 86 54.1935L59.4998 58.6936C58.2998 48.6936 66.6665 28.1936 70.9998 19.1936L82.4998 23.1935Z" fill="#FCEC78" />
                        <path d="M137.75 8.71955C133.725 5.5585 126.073 11.8714 122 18.1935C122 26.0961 135.833 34.6666 143.5 35.1934C143.26 27.6859 141.775 11.8806 137.75 8.71955Z" fill="#FF758F" />
                        <path d="M121 4.69346C115.4 0.69346 102.667 15.6935 97 23.6935C97 33.6934 118.333 37.5268 129 38.1935C128.667 28.6935 126.6 8.69346 121 4.69346Z" fill="#FF9EB1" />
                        <path d="M81 22.1934C84 21.8601 91.3 21.3934 96.5 22.1934M96.5 22.1934C101.333 15.1934 116 1.19361 121.5 3.19352C123.758 4.01444 124.667 7.69984 125.37 12.6935M96.5 22.1934C97 34.6935 131.833 40.6935 130.5 37.6935C129.311 35.0178 128.456 32.1261 127.806 29.1935M125.37 12.6935C127.414 11.1935 133.5 8.19348 137.5 8.19348C142.425 8.19348 140.559 33.4156 147.667 42.2973M125.37 12.6935C126.04 17.454 126.523 23.4034 127.806 29.1935M147.667 42.2973C147.776 42.4333 147.887 42.5654 148 42.6935M147.667 42.2973C140.27 35.5213 132.39 31.0497 127.806 29.1935M147.667 42.2973C153.553 47.6891 159.132 54.5401 162.5 62.6935C169 70.6935 179.414 62.1132 181.5 80.1935C183 93.1935 180.006 101.748 167 103.193C153.5 104.693 152.5 111.807 152 118.307V132.693C152 138.193 144 148.693 136 148.693C131.736 148.693 128.331 148.627 125.5 147.765M102 135.193C105.333 134.693 113.375 130.693 116.5 138.193C118.922 144.006 121.691 146.605 125.5 147.765M102 135.193C99.0936 135.629 91.4485 136.217 84.5 135.565M102 135.193C106 150.393 119.333 149.908 125.5 147.765M24.5 108.193C30.9 113.393 33 119.193 33 121.193L33.5 132.693C33.5 137.193 38.7 149.193 51.5 149.193C54.4545 149.193 56.9242 148.741 59 147.989M59 147.989C65.8638 145.502 68.4219 139.745 69.964 136.275L70 136.193C71.042 133.849 73.9 133.993 81.5 135.193C82.4735 135.347 83.4792 135.47 84.5 135.565M59 147.989C64 150.305 76.1 151.063 84.5 135.565M138.5 68.1935C138.333 66.3601 139.2 62.6935 144 62.6935C148.8 62.6935 149.667 66.3601 149.5 68.1935M71.5 32.1935C70.1815 30.875 67.8697 30.1951 65.5 30.1271M65.5 30.1271C62.5 30.041 57.8865 31.7149 57.5 35.1935C57 39.6935 61.8333 40.6935 65.5 40.6935C69.1667 40.6935 74 42.1935 73.5 46.6935C73.1135 50.1721 68.5 51.846 65.5 51.7599M65.5 30.1271V27.1935M59.5 49.6935C60.8185 51.012 63.1304 51.6918 65.5 51.7599M65.5 51.7599L65.5 54.6935" stroke="black" strokeWidth="5" strokeLinecap="round" />
                        <path d="M18.5 98.194C15 91.6939 8.5 73.6939 23 51.8674M42 35.1939C33.5958 39.5196 27.1354 45.9757 23 51.8674M23 51.8674C18.3333 50.4763 8.7 45.5939 9.5 35.1939C10.3 24.7939 17 22.8605 20 23.6938C21.3883 24.0795 25.5 26.494 25.5 31.694C25.5 36.894 20.3333 38.6939 18 38.6939C14.3333 38.5272 7.5 34.694 3 23.6939M47.5 24.6935C40.5 31.694 35.4 50.4938 53 61.6938M55.5 18.6938C66.3466 11.4625 89.1356 21.6608 89.895 39.6935M86 54.1935C88.9482 48.985 90.0808 44.1048 89.895 39.6935M42 50.1935C39.3333 52.36 35 54.6935 35.5 59.1935C35.822 62.0914 38.5 68.1935 50 63.6935C61.5 59.1935 63 53.6935 92.5 55.1935C107 54.6935 100.5 38.1935 89.895 39.6935" stroke="black" strokeWidth="5" strokeLinecap="round" />
                    </svg>

                    {/* <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton> */}
                    {/* <IonFab>
                        <IonFabButton>
                            <IonIcon className='close-button' onClick={() => modal.current?.dismiss()} icon={closeOutline}></IonIcon>
                        </IonFabButton>
                    </IonFab> */}
                    <IonButton onClick={() => modal.current?.dismiss()} className="close-button">
                        <IonIcon icon={closeOutline}></IonIcon>
                    </IonButton>
                    <p style={{ textAlign: 'center', fontWeight: '500' }}>Lock away some cash to incentivize you to keep with your goals!</p>
                    <div className="input-container">
                        {/* <IonInput className="dollar-input" label="$" type="number" onIonInput={(e) => setAmount(parseInt(e.detail.value!))} value={amount}></IonInput>
                        <IonInput type="number" pattern="\d+" onIonInput={(e) => setTimeLocked(parseInt(e.detail.value!))} value={timeLocked}></IonInput> */}
                        <div className='fin-boxes dollar' style={{ fontSize: amount.toString().length > 2 ? 4 - amount.toString().length + 3 + 'rem' : '6rem' }}>
                            {/* length: 2, 6rem
                                length: 3, 4rem
                                length: 4, 3rem 
                                length: 5, 2rem 
                                
                                4-length + 3
                                */}
                            {/* $<p className='dollar-input' contentEditable={true} onInput={(e) => setAmount(e.target.value < 0 ? 0 : e.target.value)}>{amount}</p> */}
                            $<input className='dollar-input' style={{ width: amount.toString().length + '.1ch' }} type="number" min={0} onInput={(e) => e.target.value ? setAmount(e.target.value < 0 ? 0 : e.target.value) : setAmount(0)} placeholder='0'></input>
                        </div>
                        <div id="time-lock-trigger" className='fin-boxes time' onClick={handleOpenPopup}>
                            <p>{timeLocked}</p>
                            <p>{timeLocked === 1 ? timeframe : `${timeframe}s`}</p>
                        </div>
                        <IonPopover trigger="time-lock-trigger" triggerAction="click" arrow={false}>
                            <IonContent class="time-popover">
                                <IonPicker>
                                    <IonPickerColumn value={timeLocked} onIonChange={(e) => setTimeLocked(e.detail.value)}>
                                        {Array.from({ length: timeframe === 'day' ? 31 : 13 }, (_, index) => (
                                            <IonPickerColumnOption key={index} value={index}>{index}</IonPickerColumnOption>
                                        ))}
                                    </IonPickerColumn>
                                    <IonPickerColumn value={timeframe} onIonChange={(e) => setTimeframe(e.detail.value)}>
                                        <IonPickerColumnOption value="day">{timeLocked === 1 ? 'day' : 'days'}</IonPickerColumnOption>
                                        <IonPickerColumnOption value="month">{timeLocked === 1 ? 'month' : 'months'}</IonPickerColumnOption>
                                        <IonPickerColumnOption value="year">{timeLocked === 1 ? 'year' : 'years'}</IonPickerColumnOption>
                                    </IonPickerColumn>
                                </IonPicker>
                            </IonContent>
                        </IonPopover>
                        {/* {showPopup && (
                            <Popup onClose={handleClosePopup}>
                                <h1>Hello, world!</h1>
                            </Popup>
                        )} */}
                    </div>

                    <ul>
                        <li>{count} Locked cash earns 1% apy interest</li>
                        <li>Cash pulled early incurs fees <IonIcon onClick={() => console.log('info')} icon={informationCircleOutline}></IonIcon></li>
                    </ul>
                    <IonButton className='confirm' strong={true} onClick={() => confirm()}>
                        <span className='confirm-text'>
                            <p>Continue</p>
                            <p>confirmation on next screen</p>
                        </span>
                    </IonButton>
                </div>
            </IonContent>
        </IonModal>
    )
}

export default FinancialModal