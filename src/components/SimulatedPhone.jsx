import React, { useState } from 'react';
import '../styles/phone.css';

export default function SimulatedPhone({
  taskId = 'send-picture',
  currentStep = 0,
  messages = [],
  highlightedControl = null,
  pictureTrayOpen = false,
  selectedPicture = null,
  isDemonstrating = false,
  onAttachmentTap,
  onPictureSelect,
  onSendTap,
  onWrongTap,
  contactName = "Sara (Daughter)",
  contactInitials = "S",
  inputPlaceholder = "Type a message..."
}) {
  const samplePictures = [
    { id: "picture-cat", label: "My Cat", src: "/images/photo_cat.svg" },
    { id: "picture-family", label: "Family Trip", src: "/images/photo_family.svg" },
    { id: "picture-garden", label: "Garden Flowers", src: "/images/photo_garden.svg" }
  ];

  // Local state for maps and safe-delete tasks
  const [mapsSearched, setMapsSearched] = useState(false);
  const [mapsSheetOpen, setMapsSheetOpen] = useState(false);
  const [mapsDuration, setMapsDuration] = useState('15m'); // '15m' | '1h'
  const [isLocationSharingLive, setIsLocationSharingLive] = useState(false);
  const [sharingStoppedToast, setSharingStoppedToast] = useState(null);

  const [photoDeleted, setPhotoDeleted] = useState(false);
  const [galleryTab, setGalleryTab] = useState('all'); // 'all' | 'trash'
  const [photoRestored, setPhotoRestored] = useState(false);

  // Guarantee activeTaskId is always a valid interactive module (defaults to 'send-picture')
  const activeTaskId = (taskId === 'explore-maps' || taskId === 'safe-delete') ? taskId : 'send-picture';

  // Sync state with step progressions
  const isMapsSearchActive = mapsSearched || currentStep >= 1;
  const isMapsSheetActive = (mapsSheetOpen || currentStep >= 2) && !isLocationSharingLive;
  const isPhotoInTrash = (photoDeleted || currentStep >= 1) && !photoRestored;
  const activeGalleryTab = (currentStep >= 1 && !photoRestored) || galleryTab === 'trash' ? 'trash' : 'all';

  const handleConfirmLocationShare = () => {
    setIsLocationSharingLive(true);
    setMapsSheetOpen(false);
    setSharingStoppedToast(null);
    onSendTap?.();
  };

  const handleStopLocationShare = () => {
    setIsLocationSharingLive(false);
    setSharingStoppedToast("Location sharing stopped. No one can see your location anymore.");
  };

  return (
    <div className="phone-chassis">
      <div className="phone-screen">
        {/* Authentic Smartphone Status Bar */}
        <div className="phone-status-bar">
          <span className="status-time">10:30</span>
          <div className="status-icons">
            {/* 4-Bar Cellular Signal SVG */}
            <svg viewBox="0 0 18 14" width="15" height="12" fill="currentColor">
              <rect x="0" y="10" width="3" height="4" rx="0.5" />
              <rect x="4" y="7" width="3" height="7" rx="0.5" />
              <rect x="8" y="4" width="3" height="10" rx="0.5" />
              <rect x="12" y="1" width="3" height="13" rx="0.5" />
            </svg>

            {/* Authentic Wi-Fi Wave SVG */}
            <svg viewBox="0 0 16 14" width="15" height="12" fill="currentColor">
              <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a6 6 0 0 1 8.48 0 .8.8 0 1 0 1.13-1.13 7.6 7.6 0 0 0-10.74 0 .8.8 0 1 0 1.13 1.13zm-2.83-2.83a10 10 0 0 1 14.14 0 .8.8 0 1 0 1.13-1.13 11.6 11.6 0 0 0-16.4 0 .8.8 0 1 0 1.13 1.13z" />
            </svg>

            {/* Authentic Battery Level SVG */}
            <div className="status-battery-wrap">
              <span className="status-battery-pct">100%</span>
              <svg viewBox="0 0 24 12" width="20" height="10" fill="none">
                <rect x="1" y="1" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="3" width="15" height="6" rx="1" fill="#22C55E" />
                <path d="M21 4.5v3a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Demonstration Mode Live Banner */}
        {isDemonstrating && (
          <div className="demo-banner-top">
            <span>🎥 Watch: UNSTUCK is showing what to tap</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK A: MESSAGING (Send a Picture in WhatsApp)
           ══════════════════════════════════════════════════════════ */}
        {activeTaskId === 'send-picture' && (
          <>
            {/* Authentic WhatsApp Contact Header */}
            <div className="phone-chat-header">
              <div className="phone-chat-header-left">
                {/* Back Arrow */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}>
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <div className="phone-avatar">{contactInitials}</div>
                <div className="phone-contact-info">
                  <span className="phone-contact-name">{contactName}</span>
                  <span className="phone-contact-status">online</span>
                </div>
              </div>

              {/* Authentic WhatsApp Top Action Icons (Video, Phone, Menu) */}
              <div className="phone-chat-header-actions">
                {/* Video Call */}
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                  <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
                {/* Phone Call */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
                {/* 3-Dot Menu */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </div>
            </div>

            {/* Conversation Message Area */}
            <div className="phone-messages-area">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.isSender ? 'chat-bubble-sent' : 'chat-bubble-received'}`}
                >
                  <div>{msg.text}</div>
                  {msg.imageSrc && (
                    <img
                      src={msg.imageSrc}
                      alt={msg.imageAlt || "Sent attachment"}
                      className="chat-bubble-image"
                    />
                  )}
                  <div className="chat-timestamp">
                    {msg.time || "10:28 AM"}
                    {msg.isSender && (
                      <span className="whatsapp-double-tick"> ✓✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Picture Tray: Authentic WhatsApp Attachment Drawer */}
            {pictureTrayOpen && (
              <div className="picture-tray" role="region" aria-label="Photo gallery tray">
                {/* Authentic WhatsApp 6 Attachment Shortcuts */}
                <div className="whatsapp-attachment-categories">
                  <div className="attachment-cat-item">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#7F66FF' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                      </svg>
                    </div>
                    <span>Document</span>
                  </div>

                  <div className="attachment-cat-item">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#EC407A' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <circle cx="12" cy="12" r="3.2" />
                        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      </svg>
                    </div>
                    <span>Camera</span>
                  </div>

                  <div className="attachment-cat-item active-gallery">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#AC44CF' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="2" fill="#AC44CF" />
                        <polygon points="5,19 11,13 14,16 17,12 21,19" fill="#AC44CF" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, color: '#AC44CF' }}>Gallery</span>
                  </div>

                  <div className="attachment-cat-item">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#FF9800' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
                      </svg>
                    </div>
                    <span>Audio</span>
                  </div>

                  <div className="attachment-cat-item">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#20C659' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      </svg>
                    </div>
                    <span>Location</span>
                  </div>

                  <div className="attachment-cat-item">
                    <div className="attachment-cat-circle" style={{ backgroundColor: '#009688' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Photo Grid Preview */}
                <div className="picture-tray-grid">
                  {samplePictures.map((pic) => (
                    <button
                      key={pic.id}
                      type="button"
                      className={`picture-tray-item ${selectedPicture?.id === pic.id ? 'selected' : ''} ${
                        highlightedControl === 'picture-item' || highlightedControl === pic.id
                          ? 'control-highlighted'
                          : ''
                      }`}
                      onClick={isDemonstrating ? undefined : () => onPictureSelect(pic)}
                      aria-label={`Select photo ${pic.label}`}
                    >
                      {isDemonstrating && (highlightedControl === 'picture-item' || highlightedControl === pic.id) && pic.id === 'picture-cat' && (
                        <div className="demo-pointer-wrapper">
                          <span className="demo-pointer-hand">👆</span>
                          <span className="demo-pointer-badge">Step 2: Auto-selecting Photo</span>
                        </div>
                      )}
                      <img src={pic.src} alt={pic.label} className="picture-thumbnail" />
                      <span className="picture-card-label">{pic.label}</span>
                      {selectedPicture?.id === pic.id && (
                        <div className="picture-check-badge">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Input & Attachment Bar */}
            <div className="phone-input-bar">
              {/* WhatsApp Emoji Icon */}
              <button type="button" className="whatsapp-icon-btn" aria-label="Emoji" tabIndex={-1}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#8696A0" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                </svg>
              </button>

              <div
                className="phone-input-field"
                onClick={isDemonstrating ? undefined : () => onWrongTap?.("text-input")}
                style={{ cursor: isDemonstrating ? 'default' : 'pointer' }}
              >
                {selectedPicture ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={selectedPicture.src} alt={selectedPicture.label} style={{ width: 28, height: 28, borderRadius: 4, objectFit: 'contain' }} />
                    <span style={{ fontWeight: 600, color: '#008069' }}>Attached: {selectedPicture.label}</span>
                  </div>
                ) : (
                  <span>{inputPlaceholder}</span>
                )}
              </div>

              {/* Authentic WhatsApp Paperclip Attachment Button */}
              <button
                type="button"
                className={`phone-action-btn ${highlightedControl === 'attachment-btn' ? 'control-highlighted' : ''}`}
                onClick={isDemonstrating ? undefined : onAttachmentTap}
                aria-label="Attach picture or file"
                title="Attach file"
              >
                {isDemonstrating && highlightedControl === 'attachment-btn' && (
                  <div className="demo-pointer-wrapper">
                    <span className="demo-pointer-hand">👆</span>
                    <span className="demo-pointer-badge">Step 1: Auto-tapping Clip</span>
                  </div>
                )}
                {/* WhatsApp Paperclip SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, transform: 'rotate(-45deg)' }}>
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              {/* Camera Icon */}
              <button type="button" className="whatsapp-icon-btn" aria-label="Camera" tabIndex={-1}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#8696A0">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
              </button>

              {/* Authentic WhatsApp Green Send Button */}
              <button
                type="button"
                className={`phone-send-btn ${highlightedControl === 'send-btn' ? 'control-highlighted' : ''}`}
                onClick={isDemonstrating ? undefined : onSendTap}
                aria-label="Send message"
                title="Send"
              >
                {isDemonstrating && highlightedControl === 'send-btn' && (
                  <div className="demo-pointer-wrapper">
                    <span className="demo-pointer-hand">👆</span>
                    <span className="demo-pointer-badge">Step 3: Auto-tapping Send</span>
                  </div>
                )}
                {/* Authentic WhatsApp Send Paper Plane SVG */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK B: GOOGLE MAPS & PRIVACY-AWARE LOCATION SHARING
           ══════════════════════════════════════════════════════════ */}
        {activeTaskId === 'explore-maps' && (
          <div className="maps-container">
            {/* Top Live Sharing Status Banner */}
            {isLocationSharingLive && (
              <div style={{ backgroundColor: '#DCFCE7', borderBottom: '1.5px solid #86EFAC', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#166534' }}>
                  <span style={{ animation: 'pulse 1s infinite' }}>🟢</span>
                  <span>Location sharing is active (Sara · {mapsDuration})</span>
                </div>
                <button
                  type="button"
                  onClick={handleStopLocationShare}
                  style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                >
                  🛑 Stop Sharing
                </button>
              </div>
            )}

            {sharingStoppedToast && (
              <div style={{ backgroundColor: '#FEF3C7', borderBottom: '1px solid #FCD34D', padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#92400E', textAlign: 'center', zIndex: 40 }}>
                ✓ {sharingStoppedToast}
              </div>
            )}

            {/* Authentic Google Maps Top Search Bar with Google "G" & Mic */}
            <div className="maps-search-wrapper">
              <div
                className={`maps-search-box ${highlightedControl === 'maps-search-bar' ? 'control-highlighted' : ''}`}
                onClick={isDemonstrating ? undefined : () => {
                  setMapsSearched(true);
                  onAttachmentTap();
                }}
              >
                {isDemonstrating && highlightedControl === 'maps-search-bar' && (
                  <div className="demo-pointer-wrapper">
                    <span className="demo-pointer-hand">👆</span>
                    <span className="demo-pointer-badge">Step 1: Auto-tapping Search</span>
                  </div>
                )}
                {/* Authentic 4-color Google G Icon */}
                <svg viewBox="0 0 24 24" width="20" height="20" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>

                <span className="maps-search-text">
                  {isMapsSearchActive ? "City Pharmacy (Destination Found)" : "Search destination here..."}
                </span>

                {/* Google Mic Icon */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#4285F4" style={{ flexShrink: 0 }}>
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </div>
            </div>

            {/* Vector Map Canvas */}
            <div className="maps-canvas">
              <div className="maps-river" />
              <div className="maps-park" />

              {/* Authentic Google Maps Red Teardrop Destination Pin */}
              {isMapsSearchActive && (
                <div className="maps-pin-marker">
                  <div className="maps-pin-bubble">City Pharmacy · Open 24/7</div>
                  <svg viewBox="0 0 32 44" width="32" height="44" className="maps-pin-svg">
                    <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 28 16 28s16-16 16-28c0-8.84-7.16-16-16-16z" fill="#EA4335" />
                    <circle cx="16" cy="15" r="6" fill="#FFFFFF" />
                    <circle cx="16" cy="15" r="3" fill="#B91C1C" />
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Location Details Card with Authentic Actions */}
            {isMapsSearchActive && !isMapsSheetActive && !isLocationSharingLive && (
              <div className="maps-card-bottom">
                <div>
                  <div className="maps-card-title">City Pharmacy</div>
                  <div className="maps-card-sub">Main Boulevard · 1.2 km away · Open 24 Hours</div>
                </div>

                <div className="maps-actions-row">
                  {/* Authentic Blue Directions Button */}
                  <div className="maps-directions-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Directions</span>
                  </div>

                  {/* Authentic Mobile Share Button with Android 3-Node Connected Share Icon */}
                  <button
                    type="button"
                    className={`maps-share-btn ${highlightedControl === 'maps-share-btn' ? 'control-highlighted' : ''}`}
                    onClick={isDemonstrating ? undefined : () => {
                      setMapsSheetOpen(true);
                      onPictureSelect?.({ id: 'location-pin' });
                    }}
                  >
                    {isDemonstrating && highlightedControl === 'maps-share-btn' && (
                      <div className="demo-pointer-wrapper">
                        <span className="demo-pointer-hand">👆</span>
                        <span className="demo-pointer-badge">Step 2: Auto-tapping Share</span>
                      </div>
                    )}
                    {/* Authentic Android 3-Node Share SVG Icon */}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Share Location</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Modal: Location Sharing Confirmation with Privacy Sequence */}
            {isMapsSheetActive && (
              <div className="maps-sheet-modal">
                <div className="maps-sheet-content">
                  <div className="maps-sheet-title">Share Live Location (Safe Sandbox)</div>

                  {/* Privacy Safety Advice Banner */}
                  <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', padding: '8px 10px', borderRadius: 8, fontSize: 11, color: '#92400E', lineHeight: 1.35 }}>
                    🛡️ <strong>Safety Principle:</strong> Your location reveals where you are in real-time. Only share it with people you know and trust.
                  </div>

                  {/* Recipient Choice & Review */}
                  <div className="maps-sheet-recipient">
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1E293B' }}>
                      S
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#1E293B' }}>Sara (Daughter)</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Trusted Family Contact · Selected Recipient</div>
                    </div>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 12 }}>✓ Verified</span>
                  </div>

                  {/* Duration Selector */}
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                      Choose Sharing Duration:
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => setMapsDuration('15m')}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          backgroundColor: mapsDuration === '15m' ? 'var(--color-primary)' : '#F1F5F9',
                          color: mapsDuration === '15m' ? '#FFF' : '#334155',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        15 minutes (Safer)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapsDuration('1h')}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          backgroundColor: mapsDuration === '1h' ? 'var(--color-primary)' : '#F1F5F9',
                          color: mapsDuration === '1h' ? '#FFF' : '#334155',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        1 hour
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`maps-confirm-btn ${highlightedControl === 'maps-confirm-btn' ? 'control-highlighted' : ''}`}
                    onClick={isDemonstrating ? undefined : handleConfirmLocationShare}
                  >
                    {isDemonstrating && highlightedControl === 'maps-confirm-btn' && (
                      <div className="demo-pointer-wrapper">
                        <span className="demo-pointer-hand">👆</span>
                        <span className="demo-pointer-badge">Step 3: Auto-confirming Send</span>
                      </div>
                    )}
                    {/* Share Icon SVG */}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Start Sharing Location ({mapsDuration})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK C: SAFE DELETION & RECOVERY (Photo Gallery)
           ══════════════════════════════════════════════════════════ */}
        {activeTaskId === 'safe-delete' && (
          <div className="gallery-container">
            {/* Gallery Top Tabs with Authentic Photo & Trash Icons */}
            <div className="gallery-tabs">
              <button
                type="button"
                className={`gallery-tab ${activeGalleryTab === 'all' ? 'active' : ''}`}
                onClick={() => setGalleryTab('all')}
              >
                {/* Authentic Photos Gallery Icon SVG */}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
                <span>All Photos (3)</span>
              </button>

              <button
                type="button"
                className={`gallery-tab ${activeGalleryTab === 'trash' ? 'active' : ''} ${
                  highlightedControl === 'recently-deleted-btn' ? 'control-highlighted' : ''
                }`}
                onClick={isDemonstrating ? undefined : () => {
                  setGalleryTab('trash');
                  onPictureSelect?.({ id: 'trash-tab' });
                }}
              >
                {isDemonstrating && highlightedControl === 'recently-deleted-btn' && (
                  <div className="demo-pointer-wrapper">
                    <span className="demo-pointer-hand">👆</span>
                    <span className="demo-pointer-badge">Step 2: Auto-opening Trash</span>
                  </div>
                )}
                {/* Authentic Mobile Trash Can SVG Icon */}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
                <span>Recently Deleted {isPhotoInTrash ? "(1)" : "(0)"}</span>
              </button>
            </div>

            {/* Gallery Grid: All Photos View */}
            {activeGalleryTab === 'all' && (
              <div className="gallery-grid">
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0' }}>
                  Tap Delete to test. Nothing is ever lost permanently!
                </div>

                {!isPhotoInTrash && (
                  <div className="gallery-card">
                    <img src="/images/photo_cat.svg" alt="Test Blur Photo" className="gallery-img-thumb" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Blurry Test Photo</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>1.4 MB · Accidental photo</div>
                    </div>
                    {/* Authentic Trash Can Delete Button */}
                    <button
                      type="button"
                      className={`gallery-trash-btn ${highlightedControl === 'photo-trash-btn' ? 'control-highlighted' : ''}`}
                      onClick={isDemonstrating ? undefined : () => {
                        setPhotoDeleted(true);
                        onAttachmentTap();
                      }}
                    >
                      {isDemonstrating && highlightedControl === 'photo-trash-btn' && (
                        <div className="demo-pointer-wrapper">
                          <span className="demo-pointer-hand">👆</span>
                          <span className="demo-pointer-badge">Step 1: Auto-tapping Trash</span>
                        </div>
                      )}
                      {/* Mobile Trash Can Icon */}
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                <div className="gallery-card">
                  <img src="/images/photo_family.svg" alt="Family Trip" className="gallery-img-thumb" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Family Trip</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>2.8 MB · Safe photo</div>
                  </div>
                </div>

                <div className="gallery-card">
                  <img src="/images/photo_garden.svg" alt="Garden Flowers" className="gallery-img-thumb" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Garden Flowers</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>3.1 MB · Safe photo</div>
                  </div>
                </div>
              </div>
            )}

            {/* Trash Bin View */}
            {activeGalleryTab === 'trash' && (
              <div className="gallery-grid">
                <div style={{ padding: '8px 12px', backgroundColor: '#FEF3C7', borderRadius: 8, fontSize: 12, color: '#92400E', border: '1px solid #FCD34D' }}>
                  ℹ️ <strong>Safety Net:</strong> Items stay in Recently Deleted for 30 days. You can restore them anytime!
                </div>

                {isPhotoInTrash ? (
                  <div className="gallery-card" style={{ borderColor: '#86EFAC', backgroundColor: '#F0FDF4' }}>
                    <img src="/images/photo_cat.svg" alt="Blurry Photo in Trash" className="gallery-img-thumb" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Blurry Test Photo</div>
                      <div style={{ fontSize: 12, color: '#15803D' }}>In Trash · 29 days left</div>
                    </div>
                    {/* Authentic Restore Curved Arrow Button */}
                    <button
                      type="button"
                      className={`trash-restore-btn ${highlightedControl === 'restore-photo-btn' ? 'control-highlighted' : ''}`}
                      onClick={isDemonstrating ? undefined : () => {
                        setPhotoRestored(true);
                        onSendTap();
                      }}
                    >
                      {isDemonstrating && highlightedControl === 'restore-photo-btn' && (
                        <div className="demo-pointer-wrapper">
                          <span className="demo-pointer-hand">👆</span>
                          <span className="demo-pointer-badge">Step 3: Auto-restoring Photo</span>
                        </div>
                      )}
                      {/* Curved Restore Arrow SVG */}
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      <span>Restore Photo</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="#CBD5E1" style={{ marginBottom: 8 }}>
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                    <p style={{ fontWeight: 600 }}>Trash Bin is Empty</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Authentic Android Mobile 3-Button System Navigation Bar at Bottom */}
        <div className="phone-system-nav">
          {/* Back Triangle */}
          <button type="button" className="system-nav-btn" tabIndex={-1} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <polygon points="16,4 7,12 16,20" />
            </svg>
          </button>
          {/* Home Circle */}
          <button type="button" className="system-nav-btn" tabIndex={-1} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="8" />
            </svg>
          </button>
          {/* Recents Square */}
          <button type="button" className="system-nav-btn" tabIndex={-1} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
