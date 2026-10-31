# UNSTUCK --- UI/UX, Visual Design, Functional Specification, Technical Implementation & Demo Plan

**Project:** UNSTUCK\
**Document type:** Implementation blueprint for a one-day hackathon
prototype\
**Platform:** Browser-based web application\
**Target build window:** 9:00 AM--5:00 PM\
**Primary outcome:** Demonstrate how a person can identify a digital
difficulty, practise safely, receive personalized guidance, and complete
a similar task with less assistance.

> **Product rule:** Design for the person who is worried about getting
> it wrong---not for the developer who already knows where everything
> is.

This document translates the product proposal into a practical build
plan. It is intentionally focused on the smallest experience that can
communicate the product's value in a two-minute recording.

------------------------------------------------------------------------

# 1. Product Experience at a Glance

## 1.1 What we are building

UNSTUCK is a calm, friendly digital practice space for people who feel
uncertain using everyday technology. It is not a general-purpose
chatbot, a full smartphone emulator, or a dashboard full of statistics.

The experience has five stages:

1.  **Arrive:** The user is welcomed without being asked to sign up.
2.  **Choose:** The user points to what feels difficult using simple
    statements and illustrations.
3.  **Practise:** UNSTUCK recommends a relevant, simulated task.
4.  **Try again with less help:** The user repeats a similar task with
    guidance reduced according to their choice and recent attempt.
5.  **See progress and choose:** The app describes what they practised
    and offers a next step, while the user remains in control.

The Digital Fear Map is the personalization mechanism. It should feel
like a helpful conversation, not a psychological assessment.

## 1.2 The MVP's two learning journeys

Build these two journeys, and make at least one of them polished from
beginning to end.

### Journey A --- Send a picture (primary demo path)

Skills demonstrated: - Finding the picture attachment control. -
Selecting a fictional picture. - Understanding the difference between
selecting and sending. - Recovering from a wrong selection. - Completing
a similar task with fewer hints.

### Journey B --- Check a suspicious message (safety path)

Skills demonstrated: - Identifying an unexpected request for a one-time
password (OTP). - Understanding why the request is risky. - Choosing a
safer response. - Practising with a second fictional message.

**Scope rule:** Do not attempt to simulate a complete phone, WhatsApp,
banking app, or government portal. Create a small fictional interface
that looks familiar enough to understand without copying a real product
exactly.

------------------------------------------------------------------------

# 2. UX Strategy: Make the User Feel in Control

## 2.1 Emotional goals

Every screen should support at least one of these feelings:

-   "I understand what this screen is asking me."
-   "I can take my time."
-   "If I make a mistake, I can recover."
-   "I can ask for help without embarrassment."
-   "I understand why this action matters."
-   "I can choose what I want to learn."

Avoid designs that make users feel tested, watched, rushed, or judged.

## 2.2 Non-negotiable interaction rules

1.  One main question or action per screen.
2.  Use everyday words, not technical labels.
3.  Show one clear primary action; make secondary actions quieter.
4.  Put "Hear again," "Give me a hint," "Back," and "Start again" where
    users can find them consistently.
5.  Never use a countdown for learning.
6.  Never make help disappear permanently.
7.  Do not punish incorrect taps. Explain and allow recovery.
8.  Do not require typing when a selectable option can work.
9.  Do not require speech. Audio must have an equivalent tap-based path.
10. Do not show a confidence percentage or label someone as "bad at
    technology."
11. Tell the user when they are in a simulation.
12. Let users change their learning concerns at any time.

## 2.3 Avoid the "AI-generated app" look

Do not default to the familiar template of a dark gradient, glowing
purple accents, glass cards, floating chatbot orb, generic dashboard,
and repetitive rounded rectangles.

Instead, make the product feel like a thoughtful, practical learning
tool:

-   A warm, light background.
-   Ink-dark text with strong contrast.
-   One calm accent color for important actions.
-   Simple line illustrations with clear meaning.
-   Generous whitespace, but not huge empty hero sections.
-   Realistic fictional phone screens for practice.
-   Plain labels on buttons, not icon-only controls.
-   A persistent, easy-to-find help control.
-   Small, purposeful transitions only when they clarify what happened.
-   No decorative charts, fake metrics, or meaningless AI badges.

The design should feel like a patient person made a clear set of
instructions, not like a generic SaaS landing page.

------------------------------------------------------------------------

# 3. Information Architecture

Keep the navigation shallow. For the prototype, a user should not need
to learn a complicated menu.

## 3.1 Screen map

``` text
Welcome
  ├── Choose language
  ├── Hear what UNSTUCK does
  └── Start
       ↓
Digital Fear Map
  ├── Select concerns
  ├── Hear each option (where supported)
  ├── Skip
  └── Continue
       ↓
Your suggested practice
  ├── Why this was suggested
  ├── Choose another task
  └── Start practice
       ↓
Practice introduction
  ├── “This is only practice”
  ├── Hear instructions
  └── Begin
       ↓
Guided simulation
  ├── Perform action
  ├── Ask “What happens if I tap this?”
  ├── Hear again
  ├── Hint
  ├── Undo/reset where applicable
  └── Complete guided task
       ↓
Try it yourself
  ├── Similar task, fewer hints
  ├── Ask for help at any time
  └── Complete or return to guided mode
       ↓
What you practised
  ├── Plain-language result
  ├── View learning history
  ├── Change concerns
  ├── Practise again
  └── Choose next activity
```

A small persistent navigation area may include only: - **Home** - **My
practice** - **Help**

Do not add a full dashboard/sidebar if the prototype has only a handful
of screens.

## 3.2 Navigation labels

Use plain labels: - "Start" - "What feels difficult?" - "Practise
this" - "Show me" - "Try with me" - "Let me try" - "Hear again" - "Give
me a hint" - "Start again" - "Choose another task" - "My practice"

Avoid labels like: - Onboarding - Assessment - Adaptive learning -
Cognitive profile - Mastery analytics - Risk classification

These may be understandable to developers, but they are not appropriate
for the target user.

------------------------------------------------------------------------

# 4. Detailed Screen Specifications

## Screen 1 --- Welcome

### Purpose

Help the user understand the product quickly and begin without anxiety.

### Layout

-   Top: UNSTUCK wordmark and a simple illustrated hand/phone motif.
-   Main heading: **"Let's practise using technology."**
-   Supporting sentence: "Try things here first. Nothing will happen to
    your real phone."
-   A large speaker control labelled **"Hear this message."**
-   Primary button: **"Let's start"**
-   Secondary text button: **"Choose language"**
-   Small reassurance: "No account needed. Take your time."

### Behaviour

-   "Hear this message" reads the heading and supporting sentence using
    browser text-to-speech if available.
-   Language choice changes the supported interface copy and speech
    voice where available.
-   Start moves to the Digital Fear Map.
-   If speech synthesis is unavailable, the text remains visible and the
    app continues to work.

### Avoid

-   Asking for name, age, email, or password.
-   A long onboarding carousel.
-   An AI chat box as the first screen.
-   A forced microphone permission prompt.

------------------------------------------------------------------------

## Screen 2 --- Digital Fear Map

### Purpose

Let users control what they want help with and provide the information
used to personalize practice.

### Heading

**"What would you like to feel more comfortable doing?"**

### Supporting copy

"Choose anything that feels difficult. You can change these choices
later."

### Options

Use large selectable rows or tiles. Each includes an illustration, a
short first-person statement, and a visible selected state.

1.  "I'm afraid I'll press the wrong thing."
2.  "I worry I might delete something."
3.  "I find it hard to find things on my phone."
4.  "I want to learn to send pictures or files."
5.  "Some messages make me unsure."
6.  "I prefer to listen instead of reading."
7.  "The words on my phone are difficult to understand."

Users may choose multiple options. Do not force a single answer.

### Layout details

-   Use a single-column list on narrow screens and a two-column grid
    only when there is enough space.
-   Keep the complete sentence visible; don't hide meaning behind icons.
-   Show a checkmark and clear border for selected items. Do not rely on
    color alone.
-   Provide "Hear options" or a speaker control for each item if time
    permits.
-   Place "Skip for now" and "Continue" at the bottom, with Continue
    visually primary.

### Functional rules

-   Store the selected concern IDs in local app state.
-   Allow deselection and changes later.
-   Do not present a numerical fear score.
-   Do not imply that these choices diagnose anxiety or ability.
-   After selection, choose a recommended activity using transparent
    rules.

### Recommendation mapping

  -----------------------------------------------------------------------
  Selected concern                    Initial recommendation
  ----------------------------------- -----------------------------------
  `wrong_button`                      Explore a simulated phone screen
                                      and learn what common controls do

  `deleting`                          Practise selecting and deleting a
                                      fictional picture, with a safe
                                      reset

  `navigation`                        Find a contact or picture in a
                                      simplified simulated interface

  `sending_picture`                   Attach a fictional picture to a
                                      simulated message

  `message_safety`                    Inspect a fictional suspicious
                                      message

  `prefers_audio`                     Enable or foreground spoken
                                      instructions

  `language_difficulty`               Offer the available language and
                                      plain-language options
  -----------------------------------------------------------------------

If several concerns are selected, use a clear priority rule: prefer the
most directly testable concern for the demo, then offer the other
selected concern as the next task. Do not imply that one concern is more
serious than another.

------------------------------------------------------------------------

## Screen 3 --- Suggested practice

### Purpose

Show that the app listened to the user and explain why it recommends the
next activity.

### Example

Heading: **"Let's practise sending a picture."**

Supporting copy: "You said finding the right button can be difficult.
We'll practise with a pretend message first."

Show: - A simple illustration of the task. - Approximate duration only
if tested; otherwise omit it. - "Nothing will be sent to anyone." -
Primary action: **"Start practice"** - Secondary action: **"Choose
something else"** - Optional action: **"Why this activity?"**

### Behaviour

-   The recommendation must be traceable to a selected concern.
-   "Choose something else" opens the small list of available tasks.
-   "Why this activity?" explains the link in everyday language.
-   Do not use AI-generated personalized text during the MVP. Use
    reviewed templates to avoid confusing or misleading explanations.

------------------------------------------------------------------------

## Screen 4 --- Practice introduction

### Purpose

Make the safety boundary unmistakable before the user interacts with the
simulation.

### Content

Heading: **"This is only a practice phone."**

Supporting copy: "You can try the buttons here. It will not send a real
message or change your phone."

Show a visually distinct "PRACTICE ONLY" badge, but do not rely on the
badge alone; explain the safety boundary in text and audio where
available.

Buttons: - "Show me first" - "Let me explore"

The user can choose a demonstration or start exploring. This is an
important control point: don't assume every user wants the same level of
guidance.

------------------------------------------------------------------------

## Screen 5 --- Simulated phone / task playground

### Purpose

Give users a familiar visual environment where they can experiment
safely.

### Visual structure

-   Main area: fictional phone screen or messaging window.
-   Persistent top label: **"Practice only --- nothing is being sent."**
-   Main instruction in plain language.
-   Large, obvious action controls.
-   Help strip at the bottom:
    -   "Hear again"
    -   "Give me a hint"
    -   "What happens if I tap this?"
    -   "Start again"

Do not show every help control at equal visual weight. The task should
remain the main focus. Use one clear primary action and keep support
options visible but quieter.

### Task A: Attach a picture

A simple sequence: 1. A fictional conversation is open. 2. User selects
the picture/attachment control. 3. A fictional picture tray opens. 4.
User selects one fictional picture. 5. A preview appears. 6. User
selects "Send" to complete the simulation.

For a seven-hour prototype, it is acceptable to compress the sequence,
but preserve the key learning: choose a picture, understand the preview,
and distinguish preparing a message from sending it.

### Error handling

-   Wrong control: explain what that control does, then allow retry.
-   Repeated wrong choice: offer a hint, not a red failure screen.
-   User requests help: show the next relevant clue.
-   User selects Start again: reset the task to its initial state.
-   User chooses to stop: allow return to the home or practice list
    without penalty.

### "What happens if I tap this?"

When the user selects a control and asks for an explanation: - Explain
the likely result in one or two plain sentences. - Where practical, show
a small visual demonstration. - Do not claim that the behaviour is
identical across all real apps. - For risky actions, explain the risk
before demonstrating a safe fictional example.

Example: "Send shares this message with the person in the conversation.
In this practice screen, it only completes the pretend task."

------------------------------------------------------------------------

## Screen 6 --- Guided practice

### Purpose

Teach the task while allowing the user to perform the actions.

### Behaviour

-   Show one short instruction at a time.
-   Highlight the relevant control with a clear outline and label.
-   Let the user act rather than auto-advancing through the tutorial.
-   If they select the wrong control, explain and allow another attempt.
-   Provide a hint that is more specific than the original instruction.
-   Keep "Hear again" available.
-   Use a simple step indicator such as "Step 2 of 4," with text rather
    than a tiny progress bar alone.

### Hint ladder

1.  **Hint 1:** General clue --- "Look for the button used to add
    something to a message."
2.  **Hint 2:** More specific clue --- "It is near the message box."
3.  **Show me:** Highlight the correct control and demonstrate what
    happens.

Hints should not shame the user or imply they should already know the
answer.

------------------------------------------------------------------------

## Screen 7 --- Independent attempt

### Purpose

Check whether the user can transfer the skill to a similar task with
less assistance.

### Example

The user receives a different fictional picture and a new conversation.

Prompt: **"Can you attach this picture?"**

The correct control is not highlighted initially. Hints remain available
through a clearly visible help button.

### Functional rules

Record: - Whether the task was completed. - Whether a hint was used. -
Whether the full demonstration was requested. - Whether the user chose
to return to guided practice.

Do not record a task as independent if the correct action was
highlighted or a direct demonstration was shown during that attempt.

### Completion states

-   **Completed independently:** "You did that on your own."
-   **Completed with a hint:** "You completed it with a little help."
-   **Returned to guided practice:** "Practising again is a good way to
    learn."

The user should always be able to retry. The app must not treat needing
help as a failure.

------------------------------------------------------------------------

## Screen 8 --- What you practised

### Purpose

Give a meaningful, honest summary and return control to the user.

### Example

Heading: **"Here's what you practised."**

Show a short task record: - "Attached a picture in the practice
screen." - "First attempt: used a hint." - "Second attempt: completed
independently."

Only show events that actually happened in the current prototype
session.

Next suggestion: "You also said unfamiliar messages can be confusing.
Would you like to practise checking one?"

Buttons: - "Practise this again" - "Try the suggested activity" -
"Choose another activity" - "Change what feels difficult"

### Avoid

-   Confidence percentages.
-   Arbitrary badges and scores.
-   A chart with too little data.
-   "You have mastered technology."
-   Competitive comparisons with other users.

------------------------------------------------------------------------

## Screen 9 --- Suspicious-message exercise

### Purpose

Teach one concrete safety principle and let users practise applying it.

### Fictional example

A fictional message says that an account will be blocked unless the
recipient sends an OTP immediately.

Question: **"What would you do?"**

Choices: - "Send the code." - "Stop and check first." - "Ask the sender
to explain."

The app explains that unexpected requests for one-time codes are a
warning sign and that codes should not be shared with people who contact
you unexpectedly. Encourage verification through an independently
obtained official channel.

Do not rely only on spelling mistakes or strange formatting to teach
scam recognition. Real scams may look professional.

### Feedback

If the user chooses to share the code: "Let's pause. A one-time code can
let someone access an account. Don't share it with someone who asks
unexpectedly. Let's practise a safer choice."

If the user chooses to stop and check: "Good choice. You can check
through the service's official app or contact details you find
independently."

Then present a second fictional scenario without showing the answer in
advance.

### Safety boundary

The example is educational and simplified. Do not claim that the app can
identify all fraudulent messages or replace professional security
advice.

------------------------------------------------------------------------

# 5. Visual Design System

## 5.1 Art direction: "A patient local learning companion"

The interface should feel approachable, practical, and human. It should
not look like a futuristic AI dashboard or a generic startup landing
page.

Visual references to aim for: - Printed instruction cards, translated
into an interactive experience. - A familiar household helper patiently
showing one step at a time. - A simplified phone interface that is
realistic enough to recognize but not cluttered.

Avoid: - Purple/blue AI gradients as the main visual identity. -
Glassmorphism and blurred translucent cards. - Glowing outlines and
animated AI orbs. - Stock photos of smiling seniors. - Tiny labels and
icon-only navigation. - Decorative graphs and meaningless statistics. -
Excessive rounded cards nested inside other rounded cards. - Too many
simultaneous animations.

## 5.2 Suggested color tokens

Use a small, consistent palette. Verify contrast before finalizing.

  -----------------------------------------------------------------------
  Token                   Suggested value         Usage
  ----------------------- ----------------------- -----------------------
  `page-bg`               `#F7F5EF`               Warm off-white page
                                                  background

  `surface`               `#FFFFFF`               Main working surfaces

  `text-primary`          `#202820`               Main text

  `text-secondary`        `#4E5A52`               Supporting text, still
                                                  readable

  `primary`               `#245C4B`               Main actions and
                                                  selected states

  `primary-hover`         `#194638`               Hover/active state

  `border`                `#D7DDD6`               Dividers and control
                                                  borders

  `gentle-highlight`      `#E9F1E9`               Hints and supportive
                                                  notes

  `warning-bg`            `#FFF1D6`               Caution messages

  `warning-text`          `#704400`               Warning text

  `danger-text`           `#8B2D28`               High-risk explanations,
                                                  not punitive error UI

  `focus-ring`            `#0B6E99`               Keyboard focus
                                                  indicator
  -----------------------------------------------------------------------

These are starting values, not a substitute for contrast testing.
Maintain WCAG AA contrast for normal text where feasible.

## 5.3 Typography

Use a highly readable sans-serif font. Prefer a system font stack to
avoid download delays:

`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Guidelines: - Main page heading: approximately 30--36 px on desktop. -
Task heading: approximately 26--32 px. - Body instructions:
approximately 18--22 px. - Button text: approximately 18--20 px. -
Supporting text: ideally 16--18 px; avoid smaller text for important
instructions. - Line height: around 1.45--1.6 for body copy. - Use
sentence case, not all caps. - Avoid long italic passages and thin font
weights. - Allow text resizing without clipping.

The "PRACTICE ONLY" label can be uppercase, but should remain readable
and should not carry the safety message alone.

## 5.4 Buttons and touch targets

-   Target at least 48 × 48 CSS pixels for major controls; use larger
    targets where possible.
-   Use explicit text labels with icons as support, not replacement.
-   Primary button: solid accent color with strong text contrast.
-   Secondary button: white or page-colored surface with a clear border.
-   Destructive actions should not be the default primary action.
-   Place related controls together and separate unrelated actions.
-   Keep the location of Back, Help, and Hear again consistent.

## 5.5 Icons and illustrations

Use a consistent set of simple, familiar icons. A phone, picture,
speaker, hand, or shield can support understanding, but every important
action must also have a text label or accessible name.

Prefer: - Simple SVGs. - A small number of custom line illustrations. -
Consistent stroke weight and scale. - Clear, literal visual metaphors.

Avoid: - Emoji as the only label for a critical action. - Mixed icon
styles. - Abstract decorative graphics that do not explain anything.

## 5.6 Motion and feedback

Motion should explain state changes: - A selected option gains a border
and checkmark. - A hint gently highlights a control. - A fictional item
moves into a message preview. - A completed step gets a clear, calm
confirmation.

Avoid bouncing buttons, confetti after every click, looping background
motion, and any animation that makes the user feel rushed.

## 5.7 Responsive layout

Build for desktop browser recording first, but ensure the layout also
works at a narrow width.

Suggested desktop layout: - Main content centered with a maximum width
around 1000--1100 px. - During a practice task, use two areas:
instruction/help on one side and the simulated phone on the other. -
Keep the simulated phone large enough for the screen recording to show
controls clearly. - At narrow widths, stack instructions above the
simulator.

Do not make the simulated phone so small that a viewer cannot see what
is happening in the two-minute video.

------------------------------------------------------------------------

# 6. Language, Audio, and Accessibility

## 6.1 Language support

For a time-limited prototype, prioritize polished English and Urdu
content over many incomplete translations.

Consider Roman Urdu as an alternative text presentation for users who
can speak Urdu but find Urdu script difficult to read. It is not a
substitute for testing language preferences with intended users.

All interface text should be stored in one translation object or file
rather than scattered across components. This makes wording changes fast
and prevents mixed-language screens.

## 6.2 Spoken instructions

Use browser text-to-speech where available: - Speak one instruction at a
time. - Add a visible "Hear again" control. - Avoid reading every
decorative label automatically. - Do not start audio unexpectedly. -
Allow the user to stop or repeat speech. - If the selected voice is
unavailable, keep the text and offer another language choice.

Speech recognition is optional. It should not block the demo or be
required to complete a task.

## 6.3 Accessibility checklist

-   [ ] All controls have visible labels.
-   [ ] Keyboard users can reach interactive elements in a logical
    order.
-   [ ] Focus indicators are clearly visible.
-   [ ] Text and control contrast are checked.
-   [ ] The interface works at 200% zoom without losing key actions.
-   [ ] Buttons are large and spaced apart.
-   [ ] Error feedback explains how to continue.
-   [ ] Audio has an equivalent visible instruction.
-   [ ] The user can pause, repeat, skip, or restart.
-   [ ] Color is never the only way to show status.
-   [ ] The app does not depend on timed interactions.
-   [ ] The language can be changed without losing progress.

------------------------------------------------------------------------

# 7. Functional Specification

This section defines what the prototype must do, rather than merely what
it should look like.

## 7.1 Functional requirements

### FR-01: Start without an account

**Given** a first-time user opens the app,\
**when** the welcome screen appears,\
**then** they can begin without entering personal information.

### FR-02: Select learning concerns

**Given** the user opens the Digital Fear Map,\
**when** they select or deselect concern options,\
**then** the selected concerns update visibly and influence the
recommendation.

### FR-03: Explain the recommendation

**Given** a recommendation is shown,\
**when** the user asks why it was suggested,\
**then** the app gives a short explanation connected to their selected
concern.

### FR-04: Start safe practice

**Given** the user starts a practice task,\
**then** the app clearly identifies the environment as simulated and
uses fictional data only.

### FR-05: Support demonstration and exploration

**Given** the practice introduction appears,\
**when** the user chooses "Show me first" or "Let me explore,"\
**then** the experience follows the selected path.

### FR-06: Respond to an incorrect action

**Given** the user selects an incorrect control,\
**then** the app responds respectfully, explains or hints, and allows
another attempt.

### FR-07: Provide contextual help

**Given** the user requests a hint or "What happens if I tap this?",\
**then** the app presents help relevant to the current task step.

### FR-08: Repeat and reset

**Given** the user chooses "Hear again" or "Start again,"\
**then** the current instruction is repeated or the current task returns
to its initial state.

### FR-09: Reduce assistance for the second attempt

**Given** the user completes guided practice,\
**when** the independent attempt starts,\
**then** the next task is similar but does not reveal the correct
control initially.

### FR-10: Record practice honestly

**Given** the user completes or leaves a task,\
**then** the app records only the outcomes that actually occurred,
including whether hints or a demonstration were used.

### FR-11: Recommend a next activity

**Given** selected concerns and practice history exist,\
**then** the app recommends a relevant next task and explains the reason
in plain language.

### FR-12: Preserve user control

At any point, the user can request help, return to guided practice,
choose another task, change concerns, or restart.

### FR-13: Provide a safety lesson

**Given** the user enters the suspicious-message scenario,\
**then** they can select a response, receive a plain-language
explanation, and try a second fictional scenario.

### FR-14: Work without voice features

**Given** speech synthesis or speech recognition is unavailable,\
**then** all core tasks remain possible using visible text and buttons.

### FR-15: Reset prototype data

The user can clear their local practice history and selected concerns
with a clear confirmation.

## 7.2 Non-functional requirements

-   Core demo path should run without a backend or external API.
-   Reloading should not break navigation.
-   No real messages or transactions should be sent.
-   The app should not require microphone permissions.
-   Core controls should respond immediately under ordinary local
    browser conditions.
-   Layout should remain usable on common desktop and laptop browser
    sizes.
-   The app should display a useful fallback rather than crash if speech
    features are unavailable.
-   The two-minute demo path should be reproducible from a clean state.

## 7.3 Acceptance criteria for the MVP

The MVP is ready to record when: 1. A user can start without signing in.
2. They can select at least two concerns. 3. Their selections change the
recommended activity. 4. They can complete one guided simulated task. 5.
They can ask for a hint or explanation. 6. They can retry after a wrong
action. 7. They can complete a similar task with less assistance. 8.
Their practice result appears on a summary screen. 9. They can start the
suspicious-message exercise. 10. All core interactions work without
speech recognition. 11. The safety boundary is clear throughout
practice. 12. The team can reset the app and reproduce the demo
reliably.

------------------------------------------------------------------------

# 8. Technical Implementation Plan

## 8.1 Choose the stack based on team familiarity

### Option A --- React + Vite

Use this if at least one team member is comfortable with React.

Suggested pieces: - React for UI components and screen state. - Vite for
local development. - CSS or CSS modules for styling. - Plain JavaScript
or TypeScript, depending on team speed. - Browser text-to-speech for
optional spoken instructions. - `localStorage` for simple persistence.

Avoid adding a backend, authentication, global state library, database,
or component library unless the team already has a working setup and a
clear need.

### Option B --- HTML, CSS, and vanilla JavaScript

Use this if the team is unfamiliar with React or needs the fastest
possible setup.

Suggested files: - `index.html` - `styles.css` - `app.js` - `content.js`
for task and translation data, if helpful.

A small state object can control which screen is displayed. For a few
screens and two scenarios, vanilla JavaScript may be the fastest and
least risky option.

**Decision rule:** Choose the stack the team can implement and debug
fastest. Do not spend the first hour learning a new framework.

## 8.2 Suggested component structure for React

``` text
src/
  App.jsx
  data/
    concerns.js
    tasks.js
    translations.js
  components/
    AppHeader.jsx
    PrimaryButton.jsx
    AudioButton.jsx
    PracticeNotice.jsx
    ChoiceCard.jsx
    HintPanel.jsx
    SimulatedPhone.jsx
  screens/
    WelcomeScreen.jsx
    FearMapScreen.jsx
    RecommendationScreen.jsx
    PracticeIntroScreen.jsx
    GuidedPracticeScreen.jsx
    IndependentAttemptScreen.jsx
    PracticeSummaryScreen.jsx
    SafetyScenarioScreen.jsx
  logic/
    recommendTask.js
    practiceReducer.js
    progress.js
  styles/
    tokens.css
    global.css
    components.css
```

This is a suggested organization, not a reason to create dozens of files
under time pressure. If the team works faster with fewer files, combine
related components.

## 8.3 State model

A simple state object could contain:

``` js
const initialState = {
  screen: "welcome",
  language: "en",
  selectedConcerns: [],
  currentTaskId: null,
  currentAttemptMode: "guided",
  currentStep: 0,
  hintsUsed: 0,
  demonstrationUsed: false,
  attemptHistory: [],
  completedTaskIds: []
};
```

Store only the information needed to support the experience. Add
properties only when a real interaction requires them.

### Practice attempt record

``` js
{
  taskId: "send-picture-guided",
  outcome: "completed",
  mode: "guided",
  hintsUsed: 2,
  demonstrationUsed: true,
  completedIndependently: false
}
```

For an independent attempt, `completedIndependently` should be true only
when the user completes the task without hints or direct demonstration
during that attempt. If a hint is used, record that accurately.

## 8.4 Recommendation function

Keep personalization explicit and deterministic:

``` js
function recommendTask(selectedConcerns, attemptHistory) {
  if (selectedConcerns.includes("message_safety")) {
    return "check-message";
  }

  if (selectedConcerns.includes("deleting")) {
    return "safe-delete";
  }

  if (selectedConcerns.includes("sending_picture")) {
    return "send-picture";
  }

  if (selectedConcerns.includes("navigation")) {
    return "find-contact";
  }

  return "explore-phone";
}
```

This is a starting example. In the actual implementation, account for
more than one concern and use recent attempt history to suggest a
sensible next activity. Keep the rules easy to explain to the judges.

Example rule: - Concern selected: `message_safety`. - Recommendation:
`check-message`. - Explanation: "You said unfamiliar messages can be
confusing, so let's practise checking one safely."

Do not say the app "understands the user's emotions" or "detects their
fears." It uses the user's stated choices and practice actions.

## 8.5 Practice state machine

Keep the task flow explicit so the demo does not get stuck.

Example states:

``` text
intro
  -> demonstrate
  -> guided_attempt
  -> guided_complete
  -> independent_attempt
  -> independent_complete
  -> summary
```

Allowed transitions: - Any active practice state -\> help requested. -
Any active practice state -\> restart current task. - Guided attempt -\>
guided retry. - Guided complete -\> independent attempt. - Independent
attempt -\> retry, request help, or return to guided mode. - Any
non-destructive state -\> leave practice.

Avoid building a complex general-purpose state machine. A reducer,
simple state object, or a few well-defined functions are sufficient.

## 8.6 Data and persistence

For the hackathon: - Keep state in memory during the session. - Use
`localStorage` only if the team needs the user's selections and progress
to survive a page refresh. - Provide a reset button. - Do not store
actual messages, contacts, credentials, or personal free text. - Avoid
external analytics.

If progress persists in the browser, the interface should explain how to
reset it. Do not imply that data is synced across devices.

## 8.7 Audio implementation

Use browser speech synthesis as an enhancement:

``` js
function speak(text, lang = "en-US") {
  if (!("speechSynthesis" in window)) return false;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
  return true;
}
```

This is a small example, not a complete production implementation. Check
whether the desired voice exists and provide visible text regardless.
Browser speech support and Urdu voice quality vary by device.

Do not make speech recognition a dependency. If it works reliably and
time remains, it can be added as an optional feature with a clear
permission explanation and a tap-based alternative.

## 8.8 Simulated phone implementation

The phone is an interactive fictional interface, not a real device
mirror.

Implementation approach: - Build the phone frame and app screen using
ordinary HTML elements. - Use buttons for controls, not unlabelled
clickable images. - Store the current simulation step in state. - Render
the relevant fictional screen based on that step. - Use fictional
contact names and pictures. - Provide a reset function that returns to
the first step.

Do not implement drag-and-drop unless it is essential. It is harder to
use with keyboards and may waste build time. Simple, large tap targets
are sufficient for the demo.

## 8.9 Error handling

-   If speech is unsupported, keep instructions visible.
-   If local storage is unavailable, continue in memory.
-   If no concern is selected, recommend a simple introductory task.
-   If a task ID is invalid, return to the task list with a helpful
    message.
-   If the user resets, clear the current task state and only the
    intended prototype data.
-   Do not let an error or unsupported browser feature block the core
    journey.

------------------------------------------------------------------------

# 9. Team Workflow and Ownership

Assign roles based on actual strengths. Avoid having everyone edit the
same file at once.

Suggested division for a four-person team:

### Person 1 --- Product and UX

-   Keep the scope aligned with the problem statement.
-   Define task wording and the recommendation rules.
-   Build the Digital Fear Map and recommendation screen, or maintain
    the UI specification.
-   Check plain language and accessibility.

### Person 2 --- Core frontend

-   Set up the app and navigation.
-   Implement shared components and screen layout.
-   Maintain the overall app structure.

### Person 3 --- Practice interactions

-   Implement the simulated phone.
-   Build guided and independent task states.
-   Implement hints, explanations, retry, and reset.

### Person 4 --- Safety scenario, content, and demo

-   Build the fictional suspicious-message task.
-   Write and test language content and audio.
-   Test the complete user journey.
-   Prepare the recording and presentation narrative.

If team skills differ, swap responsibilities. One person should own
integration and decide which version of each file is final.

### Collaboration rules

-   Agree on screen names, state properties, and task IDs before
    parallel coding.
-   Commit or back up a working version frequently.
-   Integrate early, not at the end.
-   Keep a known-good version that can be restored if a late change
    breaks the demo.
-   Do not add a feature unless it supports the main learning journey or
    a judging criterion.

------------------------------------------------------------------------

# 10. Seven-Hour Build Plan

The plan below assumes work begins at 9:00 AM and the final recording
must be ready by 5:00 PM. Adjust it to the actual remaining time.

## 9:00--9:15 --- Quick user evidence

-   Speak to one intended user if available.
-   Ask about one real digital task they find uncomfortable.
-   Ask what kind of help they prefer.
-   Record only relevant observations and ask permission before quoting
    them.

**Deliverable:** One validated or revised design assumption.

## 9:15--9:35 --- Scope and flow lock

-   Choose the primary demo journey.
-   Agree on the concern IDs and recommendation rules.
-   Draw the screen flow.
-   Choose the stack based on team familiarity.
-   Decide who owns each part.

**Deliverable:** No unresolved core product decisions.

## 9:35--10:15 --- Skeleton and welcome

-   Create the project.
-   Build navigation between screens.
-   Implement the welcome screen and language preference.
-   Add the practice-only notice component.

**Deliverable:** App opens and the user can reach the Fear Map.

## 10:15--11:00 --- Digital Fear Map

-   Build selectable concern rows.
-   Store choices in state.
-   Implement the recommendation function.
-   Show the reason for the recommendation.

**Deliverable:** At least two different concern selections lead to
different suggested activities.

## 11:00--12:00 --- Primary simulator

-   Build the fictional messaging screen.
-   Implement the picture attachment sequence.
-   Add a wrong-action response.
-   Add reset and back navigation.

**Deliverable:** A complete basic task can be performed.

## 12:00--12:45 --- Learning loop

-   Add Show me, Try with me, and Let me try.
-   Implement contextual hints.
-   Record hint usage and completion mode.
-   Add the independent attempt.

**Deliverable:** The app can demonstrate guided learning followed by a
less-guided attempt.

## 12:45--1:15 --- Break and integration

-   Test the full flow from a clean state.
-   Fix broken navigation.
-   Back up the working version.

**Deliverable:** A recoverable, runnable baseline.

## 1:15--2:00 --- Progress and personalization

-   Build the practice summary.
-   Display only actual task outcomes.
-   Recommend a next task based on concerns and history.
-   Add change-concerns and reset controls.

**Deliverable:** The user can see what happened and choose the next
step.

## 2:00--2:40 --- Safety scenario

-   Add a fictional OTP request.
-   Implement safe and risky choices.
-   Explain the warning sign without blame.
-   Add a second scenario.

**Deliverable:** A working safety exercise.

## 2:40--3:15 --- Accessibility and language

-   Increase button sizes and text readability.
-   Check keyboard focus and contrast.
-   Add spoken instructions where supported.
-   Verify the tap-only path works.
-   Review English and Urdu wording if Urdu is included.

**Deliverable:** No core task depends on voice recognition or tiny
controls.

## 3:15--3:50 --- Test and fix

-   Test all acceptance criteria.
-   Run through the demo with a fresh session.
-   Fix only high-impact defects.
-   Remove unfinished buttons and placeholder content.

**Deliverable:** Stable demo build.

## 3:50--4:20 --- Record first take

-   Record the full two-minute journey.
-   Review legibility, pacing, and audio.
-   Note the most important corrections.

**Deliverable:** A complete fallback recording.

## 4:20--4:45 --- Final take and edit

-   Re-record only if necessary.
-   Trim pauses and dead time.
-   Add simple captions if useful.
-   Export in the required format.

**Deliverable:** Final video file.

## 4:45--5:00 --- Submission check

-   Play the exported video from beginning to end.
-   Confirm duration and resolution.
-   Check audio and text legibility.
-   Save a backup copy.
-   Ensure the app still runs in case judges ask for a live
    demonstration.

**Deliverable:** Submission-ready video and a runnable local prototype.

### If behind schedule

Cut features in this order: 1. Optional speech recognition. 2.
Additional language variants beyond the one polished alternative. 3.
Extra practice scenarios. 4. Decorative animation. 5. Persistent history
across refreshes.

Do not cut: - Digital Fear Map influencing a recommendation. - One
complete guided task. - A less-guided attempt. - Honest progress
feedback. - The safety boundary and reset behaviour.

------------------------------------------------------------------------

# 11. Testing Checklist

## Product flow

-   [ ] Welcome screen leads to the Fear Map.
-   [ ] Multiple concerns can be selected and deselected.
-   [ ] Skip works.
-   [ ] Recommendation changes when concerns change.
-   [ ] The reason for the recommendation is understandable.
-   [ ] User can change concerns later.

## Practice

-   [ ] Practice-only notice is visible.
-   [ ] Fictional task can be completed.
-   [ ] Wrong actions receive respectful feedback.
-   [ ] Hints are relevant to the current step.
-   [ ] Hear again works where speech is supported.
-   [ ] Restart returns to a clean task state.
-   [ ] Independent attempt does not reveal the answer initially.
-   [ ] Asking for help is always possible.

## Progress

-   [ ] Hint count is accurate.
-   [ ] Demonstration use is recorded accurately.
-   [ ] Independent completion is not falsely awarded.
-   [ ] Summary matches what happened.
-   [ ] Next recommendation is explainable.
-   [ ] Reset removes the intended local prototype data.

## Safety and privacy

-   [ ] No real credentials are requested.
-   [ ] No real messages are sent.
-   [ ] The safety scenario uses fictional data.
-   [ ] The app explains the limits of simulation.
-   [ ] Progress is not shared with anyone.
-   [ ] No personal data is required to start.

## Accessibility

-   [ ] Text is readable at normal desktop size.
-   [ ] Buttons are large and clearly labelled.
-   [ ] Keyboard navigation works for core controls.
-   [ ] Focus is visible.
-   [ ] Color is not the only status indicator.
-   [ ] Instructions remain visible if audio fails.
-   [ ] The interface does not use time pressure.
-   [ ] The layout works at a narrower browser width.

------------------------------------------------------------------------

# 12. Two-Minute Recording Plan

## Recording objective

Show the product's distinctive mechanism, not every screen. The viewer
should understand in two minutes that UNSTUCK uses the user's stated
concerns to personalize safe practice and then helps the user attempt a
task more independently.

### 0:00--0:12 --- Problem

Voice-over: "Many people avoid digital tasks because they're afraid of
pressing the wrong button or falling for a scam. Another tutorial
doesn't always help them feel confident."

Visual: A fictional phone screen with an unfamiliar action; the user
hesitates.

### 0:12--0:32 --- Digital Fear Map

Voice-over: "UNSTUCK begins by asking what the person finds difficult.
Their choices shape what they practise next."

Visual: - Select "I'm afraid I'll press the wrong thing." - Select "Some
messages make me unsure." - Show a relevant recommended task.

### 0:32--0:48 --- Safety boundary

Voice-over: "Practice happens in a safe simulation. No real messages are
sent and no account is changed."

Visual: Show the practice-only notice, then open the simulated task.

### 0:48--1:10 --- Guided practice

Voice-over: "The user can explore, ask what an action does, or request a
hint. Mistakes are treated as part of learning."

Visual: - Select an incorrect control. - Show the calm explanation. -
Request a hint. - Complete the guided action.

### 1:10--1:32 --- Less assistance

Voice-over: "After practising, the user tries a similar task with less
guidance. Help is still available whenever they need it."

Visual: - Start independent attempt. - Complete it without a hint, if
that is what the prototype actually demonstrates.

### 1:32--1:48 --- Honest progress

Voice-over: "UNSTUCK records the practice outcome and recommends a next
activity based on the person's choices and attempts."

Visual: Show the real practice summary and suggested next task.

### 1:48--2:00 --- Closing

Voice-over: "UNSTUCK doesn't just tell people what to do. It helps them
learn to do it themselves---at their own pace."

Visual: Product name and tagline: **UNSTUCK --- Explore safely. Learn at
your pace. Do it yourself.**

## Recording rules

-   Record at the target display resolution and keep the browser zoom
    consistent.
-   Close notifications and unrelated tabs.
-   Use a clean, predictable demo state.
-   Make text and button labels large enough to read in the exported
    video.
-   Move the cursor deliberately; do not hover randomly.
-   Record voice-over separately if live narration makes interaction
    difficult.
-   Use captions if narration is hard to hear.
-   Avoid long title animations and stock footage.
-   Do not show fake testimonials or invented research results.
-   If a feature is mocked or not functional, label it as a concept
    rather than presenting it as a working feature.

------------------------------------------------------------------------

# 13. Final Definition of Done

UNSTUCK is ready for submission when:

-   [ ] The app opens locally without errors.
-   [ ] A new user can begin without signing up.
-   [ ] The Digital Fear Map accepts and remembers selections during the
    session.
-   [ ] The recommendation is visibly connected to those selections.
-   [ ] The user can complete one guided simulated task.
-   [ ] The user can request a hint or explanation.
-   [ ] Wrong actions lead to understandable recovery.
-   [ ] A similar independent attempt is available.
-   [ ] The summary reflects the actual attempt.
-   [ ] The suspicious-message exercise works.
-   [ ] Core functionality works without speech recognition.
-   [ ] The interface is readable and navigable.
-   [ ] The two-minute video shows the full differentiating loop.
-   [ ] The exported video has been watched end-to-end.
-   [ ] A backup of the working code and video exists.

------------------------------------------------------------------------

# 14. Product and Build North Star

When the team has to choose between another feature and a clearer
learning experience, choose clarity.

When deciding between a flashy animation and a helpful recovery action,
choose recovery.

When deciding between an AI-generated answer and a simple, tested
explanation, choose the explanation.

When deciding between a score that looks impressive and an honest record
of what the user did, choose honesty.

**The final test is simple: Can someone who is uncertain about
technology understand the screen, feel safe enough to try, recover from
a mistake, and leave knowing a little more than before?**

If the answer is yes, the prototype is doing its job.
