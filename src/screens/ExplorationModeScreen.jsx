import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import PracticeNotice from '../components/PracticeNotice';
import { EXPLORATION_DOMAINS } from '../data/explorationActions';
import styles from './ExplorationModeScreen.module.css';

export default function ExplorationModeScreen({
  onBack,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';

  const [activeDomainId, setActiveDomainId] = useState('gallery');
  const [selectedAction, setSelectedAction] = useState(EXPLORATION_DOMAINS[0].actions[0]);
  const [activeSimulationState, setActiveSimulationState] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  const activeDomain = EXPLORATION_DOMAINS.find(d => d.id === activeDomainId) || EXPLORATION_DOMAINS[0];

  const headingText = isUrdu
    ? "اگر میں یہ دباؤں تو کیا ہوگا؟ (What Happens If...?)"
    : isRoman
    ? "Agar Main Yeh Dabaon Toh Kya Hoga?"
    : "What Happens If...? Exploration Sandbox";

  const subText = isUrdu
    ? "بغیر کسی ٹیوٹوریل کے، آزادی سے کسی بھی بٹن کا اثر دیکھیں اور سمجھیں۔ یہاں کچھ بھی خراب یا ضائع نہیں ہو سکتا۔"
    : isRoman
    ? "Bina kisi tutorial ke, azaadi se buttons ka result explore karein. Yahan kuch kharab nahi hoga."
    : "Freely test and understand the consequences of phone buttons without following a strict tutorial. 100% safe.";

  const handleSelectAction = (action) => {
    setSelectedAction(action);
    setFeedbackToast(null);
    setActiveSimulationState(null);
  };

  const handleShowMe = () => {
    setActiveSimulationState(selectedAction.consequenceType);
    setFeedbackToast(selectedAction.demoFeedback[language] || selectedAction.demoFeedback.en);
  };

  const handleLetMeTry = () => {
    setActiveSimulationState(selectedAction.consequenceType);
    setFeedbackToast(selectedAction.demoFeedback[language] || selectedAction.demoFeedback.en);
  };

  const handleResetSim = () => {
    setActiveSimulationState(null);
    setFeedbackToast(null);
  };

  const handleHear = () => {
    const q = selectedAction.question[language] || selectedAction.question.en;
    const exp = selectedAction.explanation[language] || selectedAction.explanation.en;
    onHear(`${q}. ${exp}`, `explore_${selectedAction.id}`);
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      <PracticeNotice message="Exploration Playground: Test any action consequence-free. Real phone remains completely unaffected." />

      <div className={styles.headerArea}>
        

        <div className={styles.badgeWrap}>
          <span className={styles.badge}>🔬 {isUrdu ? 'کھوج اور تلاش کا میدان' : 'CONSEQUENCE-FREE EXPLORATION'}</span>
        </div>

        <h1 className={styles.heading}>{headingText}</h1>
        <p className={styles.subheading}>{subText}</p>
      </div>

      {/* Domain Navigation Tabs */}
      <div className={styles.domainTabs} role="tablist" aria-label="Exploration categories">
        {EXPLORATION_DOMAINS.map((domain) => (
          <button
            key={domain.id}
            type="button"
            role="tab"
            aria-selected={activeDomainId === domain.id}
            className={`${styles.domainTab} ${activeDomainId === domain.id ? styles.domainTabActive : ''}`}
            onClick={() => {
              setActiveDomainId(domain.id);
              setSelectedAction(domain.actions[0]);
              setActiveSimulationState(null);
              setFeedbackToast(null);
            }}
          >
            <span>{domain.title[language] || domain.title.en}</span>
          </button>
        ))}
      </div>

      <div className={styles.workspaceLayout}>
        {/* Left Column: Action Selector & Explanation Panel */}
        <div className={styles.leftColumn}>
          {/* Action List */}
          <div className={styles.actionsPanel}>
            <h2 className={styles.sectionTitle}>
              {isUrdu ? 'کوئی بٹن یا عمل منتخب کریں:' : isRoman ? 'Koi action choose karein:' : 'Choose a button or action to test:'}
            </h2>
            <div className={styles.actionsList} role="radiogroup" aria-label="Available phone actions">
              {activeDomain.actions.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  className={`${styles.actionItem} ${selectedAction.id === act.id ? styles.actionItemActive : ''}`}
                  onClick={() => handleSelectAction(act)}
                  role="radio"
                  aria-checked={selectedAction.id === act.id}
                >
                  <span className={styles.actionItemIcon}>
                    {selectedAction.id === act.id ? '👉' : '•'}
                  </span>
                  <span className={styles.actionItemLabel}>{act.label[language] || act.label.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Panel */}
          <div className={styles.explanationCard}>
            <div className={styles.questionHeader}>
              <h3 className={styles.questionText}>
                {selectedAction.question[language] || selectedAction.question.en}
              </h3>

              {!isRoman && (
                <AudioButton
                  label={isUrdu ? 'وضاحت سنیں' : 'Hear explanation'}
                  onClick={handleHear}
                  isPlaying={isSpeaking}
                />
              )}
            </div>

            <p className={styles.explanationText}>
              {selectedAction.explanation[language] || selectedAction.explanation.en}
            </p>

            {/* 3 Action Buttons */}
            <div className={styles.choiceButtonsRow}>
              <PrimaryButton onClick={handleShowMe} className={styles.choiceBtn}>
                👁️ {isUrdu ? 'مجھے دکھائیں کیا ہوگا' : isRoman ? 'Mujhe dikhayein kya hoga' : 'Show me what happens'}
              </PrimaryButton>

              <SecondaryButton onClick={handleLetMeTry} className={styles.choiceBtn}>
                👆 {isUrdu ? 'مجھے خود آزمانے دیں' : isRoman ? 'Mujhe khud try karne dein' : 'Let me try it'}
              </SecondaryButton>

              <SecondaryButton onClick={handleHear} className={styles.choiceBtn}>
                🔊 {isUrdu ? 'دوبارہ سنیں' : isRoman ? 'Dobara sunein' : 'Explain it again'}
              </SecondaryButton>
            </div>

            {feedbackToast && (
              <div className={styles.toastNotice}>
                <span className={styles.toastIcon}>💡</span>
                <p className={styles.toastText}>{feedbackToast}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Phone Sandbox */}
        <div className={styles.phoneColumn}>
          <div className="phone-chassis">
            <div className="phone-screen">
              {/* Phone Status Bar */}
              <div className="phone-status-bar">
                <span>10:35</span>
                <span>
                  {activeSimulationState === 'wifi' ? '●●● Offline (Wi-Fi Off)' : '●●● WiFi 100%'}
                </span>
              </div>

              {/* Sandbox Top Label */}
              <div style={{ backgroundColor: '#FEF6E9', borderBottom: '1px solid #F6D69E', padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#704400', textAlign: 'center' }}>
                🔬 EXPLORATION SANDBOX — SAFE SIMULATION
              </div>

              {/* 1. Gallery Domain Simulator */}
              {activeDomainId === 'gallery' && (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#1E293B' }}>
                      {activeSimulationState === 'trash' ? '🗑️ Recently Deleted Trash' : '📷 Camera Gallery'}
                    </span>
                    {activeSimulationState && (
                      <button
                        type="button"
                        onClick={handleResetSim}
                        style={{ fontSize: 12, color: 'var(--color-primary)', fontWeight: 600, background: '#EBF4F0', padding: '3px 8px', borderRadius: 4 }}
                      >
                        Reset Phone ↺
                      </button>
                    )}
                  </div>

                  {activeSimulationState === 'trash' ? (
                    <div style={{ backgroundColor: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                      <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 10px' }}>
                        1 photo in trash · Will wait safely for 30 days
                      </p>
                      <img src="/images/photo_cat.svg" alt="Deleted cat" style={{ width: 80, height: 80, borderRadius: 8, opacity: 0.8 }} />
                      <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSimulationState('restore');
                            setFeedbackToast(selectedAction.demoFeedback[language] || selectedAction.demoFeedback.en);
                          }}
                          style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 700 }}
                        >
                          Restore Photo ↺
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div
                        style={{
                          border: activeSimulationState === 'select' ? '3px solid var(--color-primary)' : '1px solid #E2E8F0',
                          borderRadius: 10,
                          padding: 8,
                          textAlign: 'center',
                          backgroundColor: activeSimulationState === 'select' ? 'var(--color-primary-light)' : '#F8FAFC',
                          position: 'relative'
                        }}
                      >
                        {activeSimulationState === 'select' && (
                          <span style={{ position: 'absolute', top: 4, right: 4, backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '50%', width: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            ✓
                          </span>
                        )}
                        <img src="/images/photo_cat.svg" alt="Cat" style={{ width: '100%', height: 90, objectFit: 'contain' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', display: 'block', marginTop: 4 }}>
                          My Cat
                        </span>
                      </div>

                      <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 8, textAlign: 'center', backgroundColor: '#F8FAFC' }}>
                        <img src="/images/photo_family.svg" alt="Family" style={{ width: '100%', height: 90, objectFit: 'contain' }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', display: 'block', marginTop: 4 }}>
                          Family Trip
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Simulated Delete Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState('trash');
                        setFeedbackToast("Deleted: Photo moved to Recently Deleted folder safely.");
                      }}
                      style={{
                        backgroundColor: '#FEE2E2',
                        color: '#991B1B',
                        border: '1px solid #FCA5A5',
                        borderRadius: 8,
                        padding: '10px 16px',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      <span>Tap to Delete Photo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Messaging Domain Simulator */}
              {activeDomainId === 'messaging' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      S
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Sara (Daughter)</div>
                      <div style={{ fontSize: 11, color: activeSimulationState === 'block' ? '#991B1B' : '#16A34A' }}>
                        {activeSimulationState === 'block' ? '🚫 Blocked Contact' : 'Online'}
                      </div>
                    </div>
                  </div>

                  <div style={{ flex: 1, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeSimulationState !== 'msg-delete' && (
                      <div style={{ alignSelf: 'flex-start', backgroundColor: '#F1F5F9', padding: '8px 12px', borderRadius: 12, fontSize: 13, maxWidth: '80%' }}>
                        Hi Mom! How are you feeling today?
                      </div>
                    )}
                    {activeSimulationState === 'send' && (
                      <div style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '8px 12px', borderRadius: 12, fontSize: 13, maxWidth: '80%', fontWeight: 600 }}>
                        I am doing great! Thinking of you. ✓✓
                      </div>
                    )}
                    {activeSimulationState === 'attach' && (
                      <div style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-primary)', borderRadius: 8, padding: 8, marginTop: 'auto' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-primary)' }}>📷 Photo Tray Open:</span>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <img src="/images/photo_cat.svg" alt="Cat" style={{ width: 40, height: 40, borderRadius: 4 }} />
                          <img src="/images/photo_garden.svg" alt="Garden" style={{ width: 40, height: 40, borderRadius: 4 }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 8, borderTop: '1px solid #E2E8F0' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState('attach');
                        setFeedbackToast("Attachment icon tapped: Photo tray opened as preview.");
                      }}
                      style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 16 }}
                      title="Attach photo"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(-45deg)" }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={activeSimulationState === 'send' ? '' : 'Type a message...'}
                      style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState('send');
                        setFeedbackToast("Send tapped: Message delivered to recipient.");
                      }}
                      style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', padding: '8px 12px', borderRadius: 8, fontWeight: 700 }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Settings Domain Simulator */}
              {activeDomainId === 'settings' && (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: '#0F172A' }}>⚙️ Phone Settings</span>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Wi-Fi Wireless Internet</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        {activeSimulationState === 'wifi' ? 'Disconnected (Safe)' : 'Connected to Home'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState(activeSimulationState === 'wifi' ? null : 'wifi');
                        setFeedbackToast("Wi-Fi toggled: Phone went offline. No personal data affected.");
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        backgroundColor: activeSimulationState === 'wifi' ? '#CBD5E1' : 'var(--color-primary)',
                        color: activeSimulationState === 'wifi' ? '#475569' : '#FFF',
                        fontWeight: 700,
                        fontSize: 12
                      }}
                    >
                      {activeSimulationState === 'wifi' ? 'OFF' : 'ON'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Text & Display Size</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        {activeSimulationState === 'text-size' ? 'Large (Comfortable)' : 'Standard'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState(activeSimulationState === 'text-size' ? null : 'text-size');
                        setFeedbackToast("Text size enlarged for clear reading.");
                      }}
                      style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 700, fontSize: 13 }}
                    >
                      A+
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Sound & Notifications</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        {activeSimulationState === 'notifications' ? 'Silenced (Quiet)' : 'Enabled'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState(activeSimulationState === 'notifications' ? null : 'notifications');
                        setFeedbackToast("Notifications silenced: Alerts won't ring.");
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 20,
                        backgroundColor: activeSimulationState === 'notifications' ? '#CBD5E1' : '#F59E0B',
                        color: activeSimulationState === 'notifications' ? '#475569' : '#FFF',
                        fontWeight: 700,
                        fontSize: 12
                      }}
                    >
                      {activeSimulationState === 'notifications' ? 'OFF' : 'ON'}
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Safety Domain Simulator */}
              {activeDomainId === 'safety' && (
                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>📩 Text Message from Unknown</span>

                  <div style={{ backgroundColor: '#FEF2F2', border: '1.5px solid #FCA5A5', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#991B1B', marginBottom: 4 }}>
                      ⚠️ URGENT BANK ALERT
                    </div>
                    <p style={{ fontSize: 12, color: '#450A0A', margin: 0, lineHeight: 1.4 }}>
                      Your account has unusual activity. Reply with your 6-digit OTP code immediately to avoid suspension.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}>
                    <strong>Safety Question:</strong>
                    <p style={{ margin: '4px 0 0', color: '#475569' }}>
                      Notice how the message creates panic? Real banks never ask for secret OTP codes via SMS.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState('otp-warning');
                        setFeedbackToast("Good choice! You protected your secret code and stayed safe.");
                      }}
                      style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '10px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}
                    >
                      🛡️ Keep OTP Secret (Do not reply)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSimulationState('msg-inspect');
                        setFeedbackToast("You safely read the message without clicking any links.");
                      }}
                      style={{ backgroundColor: '#E2E8F0', color: '#1E293B', padding: '8px', borderRadius: 8, fontWeight: 600, fontSize: 12 }}
                    >
                      🔍 Inspect Message Warning Signs
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
