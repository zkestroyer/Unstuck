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
  const [photoDeleted, setPhotoDeleted] = useState(false);
  const [galleryTab, setGalleryTab] = useState('all'); // 'all' | 'trash'
  const [photoRestored, setPhotoRestored] = useState(false);

  // Sync state with step progressions
  const isMapsSearchActive = mapsSearched || currentStep >= 1;
  const isMapsSheetActive = mapsSheetOpen || currentStep >= 2;
  const isPhotoInTrash = (photoDeleted || currentStep >= 1) && !photoRestored;
  const activeGalleryTab = (currentStep >= 1 && !photoRestored) || galleryTab === 'trash' ? 'trash' : 'all';

  return (
    <div className="phone-chassis">
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>10:30</span>
          <span>●●● WiFi 100%</span>
        </div>

        {/* Demonstration Mode Live Banner */}
        {isDemonstrating && (
          <div className="demo-banner-top">
            <span>🎥 Watch: UNSTUCK is showing what to tap</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK A: MESSAGING (Send a Picture)
           ══════════════════════════════════════════════════════════ */}
        {taskId === 'send-picture' && (
          <>
            {/* Contact Header */}
            <div className="phone-chat-header">
              <div className="phone-avatar">{contactInitials}</div>
              <div className="phone-contact-info">
                <span className="phone-contact-name">{contactName}</span>
                <span className="phone-contact-status">Online (Practice Sandbox)</span>
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
                  <div className="chat-timestamp">{msg.time || "10:28 AM"}</div>
                </div>
              ))}
            </div>

            {/* Picture Tray (Simulated Gallery) */}
            {pictureTrayOpen && (
              <div className="picture-tray" role="region" aria-label="Photo gallery tray">
                <div className="picture-tray-header">
                  <span>📷 Select a photo to attach:</span>
                </div>
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
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Input & Attachment Bar */}
            <div className="phone-input-bar">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
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
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Attached: {selectedPicture.label}</span>
                  </div>
                ) : (
                  <span>{inputPlaceholder}</span>
                )}
              </div>

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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK B: GOOGLE MAPS & LOCATION SHARING
           ══════════════════════════════════════════════════════════ */}
        {taskId === 'explore-maps' && (
          <div className="maps-container">
            {/* Top Search Bar */}
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
                <span style={{ fontSize: 18 }}>🔍</span>
                <span className="maps-search-text">
                  {isMapsSearchActive ? "City Pharmacy (Destination Found)" : "Search destination here..."}
                </span>
                <span style={{ fontSize: 16 }}>📍</span>
              </div>
            </div>

            {/* Vector Map Canvas */}
            <div className="maps-canvas">
              <div className="maps-river" />
              <div className="maps-park" />

              {/* Pin marker (shows when destination searched) */}
              {isMapsSearchActive && (
                <div className="maps-pin-marker">
                  <div className="maps-pin-bubble">City Pharmacy · Open 24/7</div>
                  <div className="maps-pin-icon">📍</div>
                </div>
              )}
            </div>

            {/* Bottom Location Details Card */}
            {isMapsSearchActive && (
              <div className="maps-card-bottom">
                <div>
                  <div className="maps-card-title">City Pharmacy</div>
                  <div className="maps-card-sub">Main Boulevard · 1.2 km away · Open 24 Hours</div>
                </div>

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
                  <span>📍</span>
                  <span>Share Location</span>
                </button>
              </div>
            )}

            {/* Bottom Modal: Location Sharing Confirmation */}
            {isMapsSheetActive && (
              <div className="maps-sheet-modal">
                <div className="maps-sheet-content">
                  <div className="maps-sheet-title">Share Live Location (Safe Sandbox)</div>
                  <div className="maps-sheet-recipient">
                    <span style={{ fontSize: 24 }}>🛡️</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#1E293B' }}>Sara (Daughter)</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Sharing for 15 minutes · Real-time GPS</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`maps-confirm-btn ${highlightedControl === 'maps-confirm-btn' ? 'control-highlighted' : ''}`}
                    onClick={isDemonstrating ? undefined : onSendTap}
                  >
                    {isDemonstrating && highlightedControl === 'maps-confirm-btn' && (
                      <div className="demo-pointer-wrapper">
                        <span className="demo-pointer-hand">👆</span>
                        <span className="demo-pointer-badge">Step 3: Auto-confirming Send</span>
                      </div>
                    )}
                    <span>Send Location to Family ✈️</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TASK C: SAFE DELETION & RECOVERY (Photo Gallery)
           ══════════════════════════════════════════════════════════ */}
        {taskId === 'safe-delete' && (
          <div className="gallery-container">
            {/* Gallery Top Tabs */}
            <div className="gallery-tabs">
              <button
                type="button"
                className={`gallery-tab ${activeGalleryTab === 'all' ? 'active' : ''}`}
                onClick={() => setGalleryTab('all')}
              >
                📷 All Photos (3)
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
                🗑️ Recently Deleted {isPhotoInTrash ? "(1)" : "(0)"}
              </button>
            </div>

            {/* Gallery Grid: All Photos View */}
            {activeGalleryTab === 'all' && (
              <div className="gallery-grid">
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0' }}>
                  Tap trash to test deleting. Nothing is ever lost!
                </div>

                {!isPhotoInTrash && (
                  <div className="gallery-card">
                    <img src="/images/photo_cat.svg" alt="Test Blur Photo" className="gallery-img-thumb" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Blurry Test Photo</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>1.4 MB · Accidental photo</div>
                    </div>
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
                      <span>🗑️ Delete</span>
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
                      <span>↺ Restore</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🗑️</div>
                    <p style={{ fontWeight: 600 }}>Trash Bin is Empty</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
