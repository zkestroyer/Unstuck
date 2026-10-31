import React, { useState } from 'react';
import ProgressCard from '../components/ProgressCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AudioButton from '../components/AudioButton';
import { translations } from '../data/translations';
import { tasks } from '../data/tasks';
import { LEARNING_CATEGORIES } from '../data/categories';
import { buildConfidenceProfile, STATUS_LABELS } from '../logic/confidenceTracker';
import styles from './SummaryScreen.module.css';

export default function SummaryScreen({
  attemptHistory = [],
  completedTaskIds = [],
  selectedConcerns = [],
  recommendedTaskId = 'send-picture',
  recommendationReason,
  onTrySuggested,
  onPractiseAgain,
  onChangeConcerns,
  onOpenConfidenceMap,
  onOpenExploration,
  language = 'en',
  onHear,
  isSpeaking = false
}) {
  const isUrdu = language === 'ur';
  const isRoman = language === 'roman-ur';
  const t = translations[language]?.summary || translations.en.summary;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history' | 'categories'

  const profile = buildConfidenceProfile({
    selectedConcerns,
    attemptHistory,
    completedTaskIds
  });

  const nextTaskTitle = recommendedTaskId === 'check-message'
    ? (isUrdu ? 'مشکوک پیغامات کی جانچ' : 'Check a Suspicious Message')
    : (tasks[recommendedTaskId]?.title[language] || tasks[recommendedTaskId]?.title.en || 'Send a Picture in a Message');

  const reasonText = typeof recommendationReason === 'object'
    ? (recommendationReason[language] || recommendationReason.en)
    : recommendationReason;

  const handleHear = () => {
    const summaryNarrative = `${t.heading}. ${t.subheading}. ${t.nextSuggestionHeader}: ${nextTaskTitle}.`;
    onHear(summaryNarrative, 'summary');
  };

  const getModuleIllustration = (id) => {
    switch (id) {
      case 'explore-maps':
        return '/images/cards/module_maps.svg';
      case 'safe-delete':
        return '/images/cards/module_safe_delete.svg';
      case 'check-message':
        return '/images/cards/module_safety_scam.svg';
      case 'send-picture':
      default:
        return '/images/cards/module_messaging.svg';
    }
  };

  return (
    <div className={`screen-fade ${styles.container}`}>
      {/* Header Area */}
      <div className={styles.headerArea}>
        <span className={styles.badge}>
          🌱 {isUrdu ? 'پرسکون مشق کا ڈیش بورڈ' : 'SAFE PRACTICE JOURNAL & DASHBOARD'}
        </span>
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subheading}>{t.subheading}</p>

        {!isRoman && (
          <div className={styles.audioRow}>
            <AudioButton
              label={isUrdu ? 'خلاصہ سنیں' : 'Hear summary'}
              onClick={handleHear}
              isPlaying={isSpeaking}
            />
          </div>
        )}
      </div>

      {/* Dashboard Sub-Navigation Tabs */}
      <div className={styles.dashTabs} role="tablist" aria-label="Journal views">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overview'}
          className={`${styles.dashTab} ${activeTab === 'overview' ? styles.dashTabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          🌟 {isUrdu ? 'میرا سفر اور کامیابیاں' : isRoman ? 'Mera Safar' : 'Overview & Achievements'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'categories'}
          className={`${styles.dashTab} ${activeTab === 'categories' ? styles.dashTabActive : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          🧭 {isUrdu ? 'مہارتوں کا خلاصہ' : isRoman ? 'Skill Categories' : 'Skills I Explored'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'history'}
          className={`${styles.dashTab} ${activeTab === 'history' ? styles.dashTabActive : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📋 {isUrdu ? 'مکمل تاریخچہ' : isRoman ? 'History' : `Activity Log (${attemptHistory.length})`}
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW & ACHIEVEMENTS ── */}
      {activeTab === 'overview' && (
        <div className={styles.tabContent}>
          {/* Friendly Achievements Section */}
          <div className={styles.achievementsCard}>
            <h2 className={styles.sectionTitle}>
              🏆 {isUrdu ? 'آپ کی اہم کامیابیاں' : isRoman ? 'Aap Ki Kamyabiyan' : 'What You Have Explored'}
            </h2>
            <p className={styles.sectionSub}>
              {isUrdu
                ? 'کوئی فرضی گریڈ یا نمبر نہیں۔ یہ وہ حقیقی چیزیں ہیں جو آپ نے آزما کر دیکھی ہیں:'
                : isRoman
                ? 'Bina kisi score ke, yeh woh cheezein hain jo aap ne aazmaai hain:'
                : 'Honest milestones based on what you actually tried — no tests or grades:'}
            </p>

            {profile.friendlyAchievements.length === 0 ? (
              <div className={styles.emptyNotice}>
                <span style={{ fontSize: 24 }}>🌱</span>
                <span>
                  {isUrdu
                    ? 'آپ کا سفر ابھی شروع ہوا ہے! پہلی مشق مکمل کرتے ہی آپ کی کامیابیاں یہاں آئیں گی۔'
                    : 'Your practice journey is just beginning. As you try activities, friendly milestones appear here.'}
                </span>
              </div>
            ) : (
              <div className={styles.achievementsList}>
                {profile.friendlyAchievements.map((ach) => (
                  <div key={ach.id} className={styles.achievementItem}>
                    <span className={styles.achievementCheck} aria-hidden="true">✓</span>
                    <span className={styles.achievementText}>{ach[language] || ach.en}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className={styles.summaryStatsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{profile.totalAttempts}</span>
              <span className={styles.statLabel}>{isUrdu ? 'کل مشقیں' : 'Total Sessions'}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{profile.totalIndependent}</span>
              <span className={styles.statLabel}>{isUrdu ? 'بغیر کسی اشارے کے' : 'Independent Runs'}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{completedTaskIds.length} / 4</span>
              <span className={styles.statLabel}>{isUrdu ? 'ماڈیولز آزمائے' : 'Modules Explored'}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: SKILLS I HAVE EXPLORED ── */}
      {activeTab === 'categories' && (
        <div className={styles.tabContent}>
          <div className={styles.categoriesSummaryGrid}>
            {LEARNING_CATEGORIES.map((cat) => {
              const catProg = profile.categoriesProgress[cat.id];
              const statusLabel = STATUS_LABELS[catProg.status]?.[language] || STATUS_LABELS[catProg.status]?.en;

              return (
                <div key={cat.id} className={styles.catSummaryCard}>
                  <div className={styles.catSummaryTop}>
                    <span className={styles.catSummaryIcon} aria-hidden="true">{cat.badgeIcon}</span>
                    <div>
                      <h3 className={styles.catSummaryTitle}>{cat.title[language] || cat.title.en}</h3>
                      <span className={`${styles.statusBadge} ${styles['status_' + catProg.status]}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                  <p className={styles.catSummaryDesc}>{cat.description[language] || cat.description.en}</p>
                  <div className={styles.catSummaryMeta}>
                    <span>{isUrdu ? 'مشقیں:' : 'Attempts:'} <strong>{catProg.attemptsCount}</strong></span>
                    {catProg.independentCount > 0 && (
                      <span>{isUrdu ? 'آزادانہ:' : 'Independent:'} <strong>{catProg.independentCount}</strong></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {onOpenConfidenceMap && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <SecondaryButton onClick={onOpenConfidenceMap}>
                🗺️ {isUrdu ? 'مکمل اعتماد کا نقشہ کھولیں' : 'Open Full Confidence Map Screen'} →
              </SecondaryButton>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: CHRONOLOGICAL ACTIVITY LOG ── */}
      {activeTab === 'history' && (
        <div className={styles.tabContent}>
          <div className={styles.historySection}>
            {attemptHistory.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconCircle}>
                  <span className={styles.emptyIcon}>🌱</span>
                </div>
                <div className={styles.emptyTextContent}>
                  <h3 className={styles.emptyTitle}>
                    {isUrdu ? 'آپ کا سیکھنے کا سفر یہاں شروع ہوتا ہے!' : 'Welcome to your practice journal!'}
                  </h3>
                  <p className={styles.emptyDesc}>
                    {isUrdu
                      ? 'یہاں آپ کی ہر مشق بغیر کسی نمبر یا دباؤ کے محفوظ ہوگی۔ نیچے دی گئی سرگرمی شروع کریں۔'
                      : 'Whenever you try a practice, your gentle milestones appear here — no scores, no grades, no pressure.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.historyList}>
                {attemptHistory.map((attempt, index) => {
                  const title = attempt.taskId === 'check-message'
                    ? (isUrdu ? 'مشکوک پیغامات کی جانچ' : 'Check a Suspicious Message')
                    : (tasks[attempt.taskId]?.title[language] || tasks[attempt.taskId]?.title.en || 'Practice Task');

                  return (
                    <ProgressCard
                      key={index}
                      attempt={attempt}
                      taskTitle={title}
                      language={language}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggested Next Step Box */}
      <div className={styles.nextStepCard}>
        <div className={styles.nextCardBannerWrap}>
          <img
            src={getModuleIllustration(recommendedTaskId)}
            alt=""
            className={styles.nextCardBanner}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <div className={styles.nextStepHeader}>
          <div>
            <span className={styles.nextStepCategory}>
              ★ {isUrdu ? 'تجویز کردہ اگلی مشق' : 'Recommended Next Step'}
            </span>
            <h3 className={styles.nextTaskName}>{nextTaskTitle}</h3>
          </div>
        </div>

        <p className={styles.nextReasonText}>{reasonText}</p>

        <div className={styles.nextActions}>
          <PrimaryButton onClick={onTrySuggested} className={styles.tryNextBtn}>
            {t.trySuggestedBtn} →
          </PrimaryButton>

          <SecondaryButton onClick={onPractiseAgain}>
            {t.practiseAgainBtn}
          </SecondaryButton>

          <SecondaryButton onClick={onChangeConcerns}>
            ⚙️ {t.changeConcernsBtn}
          </SecondaryButton>

          {onOpenExploration && (
            <SecondaryButton onClick={onOpenExploration}>
              🔬 {isUrdu ? 'آزادی سے بٹن آزمائیں (What Happens If?)' : 'Explore "What Happens If?"'}
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
