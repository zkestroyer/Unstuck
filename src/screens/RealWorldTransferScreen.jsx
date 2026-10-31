import React from 'react';
import RealWorldTransferCard from '../components/RealWorldTransferCard';
import PracticeNotice from '../components/PracticeNotice';
import styles from './RealWorldTransferScreen.module.css';

export default function RealWorldTransferScreen({
  taskId = 'send-picture',
  language = 'en',
  onConfirmTransfer,
  onHear,
  isSpeaking = false
}) {
  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Bridge to Real Life: Moving from safe sandbox practice to your actual smartphone." />

      <div className={styles.inner}>
        <RealWorldTransferCard
          taskId={taskId}
          language={language}
          onConfirmTransfer={onConfirmTransfer}
          onHear={onHear}
          isSpeaking={isSpeaking}
        />
      </div>
    </div>
  );
}
