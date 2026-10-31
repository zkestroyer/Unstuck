import React from 'react';
import '../styles/phone.css';
import styles from './SimulatedPhone.module.css';

export default function SimulatedPhone({
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
                  onClick={() => onPictureSelect(pic)}
                  aria-label={`Select photo ${pic.label}`}
                >
                  {isDemonstrating && (highlightedControl === 'picture-item' || highlightedControl === pic.id) && pic.id === 'picture-cat' && (
                    <div className="demo-pointer-wrapper">
                      <span className="demo-pointer-hand">👆</span>
                      <span className="demo-pointer-badge">Step 2: Tap Photo</span>
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
            onClick={onAttachmentTap}
            aria-label="Attach picture or file"
            title="Attach file"
          >
            {isDemonstrating && highlightedControl === 'attachment-btn' && (
              <div className="demo-pointer-wrapper">
                <span className="demo-pointer-hand">👆</span>
                <span className="demo-pointer-badge">Step 1: Tap Clip</span>
              </div>
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <div
            className="phone-input-field"
            onClick={() => onWrongTap?.("text-input")}
            style={{ cursor: 'pointer' }}
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
            onClick={onSendTap}
            aria-label="Send message"
            title="Send"
          >
            {isDemonstrating && highlightedControl === 'send-btn' && (
              <div className="demo-pointer-wrapper">
                <span className="demo-pointer-hand">👆</span>
                <span className="demo-pointer-badge">Step 3: Tap Send</span>
              </div>
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
