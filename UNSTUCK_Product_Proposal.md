# UNSTUCK --- Product Proposal

## A confidence-first digital learning playground for people who did not grow up with technology

**Document type:** Hackathon product proposal\
**Prototype format:** Browser-based web application\
**Build window:** One day (approximately seven hours)\
**Primary goal:** Help people become more confident and independent when
using everyday digital technology\
**Working name:** UNSTUCK\
**Tagline:** *Explore safely. Learn at your pace. Do it yourself.*

------------------------------------------------------------------------

## 1. Executive Summary

UNSTUCK is a browser-based digital practice environment designed for
people who feel uncertain, anxious, or inexperienced when using everyday
technology. This includes parents, grandparents, and anyone who did not
have the same opportunities to learn digital tools as people who grew up
with them.

Most digital help tools explain what a person should do or attempt to
complete a task for them. UNSTUCK focuses on a different outcome:
helping people become comfortable enough to explore technology,
understand what their actions do, recover from mistakes, and eventually
complete tasks independently.

The product combines a personalized **Digital Fear Map**, a safe
interactive practice environment, simple spoken and visual guidance, and
a gradual reduction of assistance. Users identify the tasks or actions
they feel uncomfortable with. UNSTUCK uses those choices and their
practice history to recommend suitable exercises. Inside a simulated
environment, users can try actions without sending real messages,
changing real settings, or risking personal data. They can ask for a
hint, hear an explanation, watch a demonstration, retry, or attempt a
similar task independently.

For the hackathon, UNSTUCK will be a focused web prototype---not a
complete phone simulator or a production-ready AI assistant. The MVP
will demonstrate one connected learning journey, supported by a small
number of scenarios. A browser is suitable because it is quick to build,
easy to record, and requires no installation or deployment for a
two-minute demonstration.

**The central promise:** UNSTUCK does not aim to become the user's
permanent digital helper. It aims to help the user need less help over
time.

------------------------------------------------------------------------

## 2. The Problem

Technology is often designed around assumptions that users already
understand common interface patterns, technical language, app
navigation, security warnings, and digital etiquette. People who did not
grow up using these tools may not share those assumptions.

A person may know how to open a messaging app but feel unsure about
attaching a picture. They may avoid a button because they fear deleting
something. They may not understand whether a message asking for a
one-time password is legitimate. They may repeatedly ask a younger
family member for help---or quietly avoid the task altogether.

The problem is not a lack of intelligence. It is often a combination of
limited practice, unfamiliar interface conventions, language barriers,
reading difficulty, fear of consequences, and embarrassment about making
mistakes.

### Why a typical guide is not enough

A guide can explain the steps to complete one task, but it may not help
a learner understand how an interface works more generally. A chatbot
can answer questions, but receiving an answer does not guarantee that
the user can perform the task independently next time.

If a tool always supplies the next button to press, the user may
complete the task while remaining dependent on guidance.

### The opportunity

Give people a safe environment where they can experiment, ask what an
action does, practise repeatedly, and learn from mistakes without
real-world consequences. Pair this environment with a learning journey
that responds to the person's chosen difficulties and observed practice
needs.

------------------------------------------------------------------------

## 3. Product Vision

**Vision:** A world where people can approach unfamiliar technology with
curiosity rather than fear.

**Mission:** Make everyday digital skills easier to learn through safe
exploration, understandable explanations, accessible guidance, and
independent practice.

### Product principles

1.  **Independence over dependence:** Help users learn to do tasks, not
    just receive answers.
2.  **Practice over passive instruction:** Users should interact with
    realistic simulations.
3.  **Safety before realism:** Practice must not expose real accounts,
    messages, money, or personal information.
4.  **Respect over judgment:** Mistakes are a normal part of learning;
    no shaming, countdowns, or punitive failure screens.
5.  **User control:** Users choose what they want to learn, how much
    assistance they want, and when they want to retry or stop.
6.  **Accessibility by default:** Large controls, plain language, audio
    support, clear visual cues, and minimal steps.
7.  **Honest progress:** Show what the user practised and how much
    assistance was needed; do not claim to measure a person's inner
    confidence scientifically.

------------------------------------------------------------------------

## 4. Target Users

### Primary audience

Adults who feel less comfortable with digital technology, including
older adults, parents, grandparents, and people with limited experience
of smartphones or online services.

### Example persona for design purposes

**Name:** Ayesha (fictional example)\
**Age:** 62\
**Technology use:** Uses a smartphone for calls and basic messaging, but
avoids unfamiliar features.\
**Needs:** Wants to send pictures, understand unfamiliar messages, and
use phone features without asking family members every time.\
**Barriers:** Small text, unfamiliar icons, confusing English
terminology, fear of pressing the wrong button, and worry about scams.\
**Motivation:** Wants to stay connected and handle everyday tasks with
more independence.\
**Preferred support:** Spoken instructions in a familiar language, large
visual targets, patient guidance, repeatable demonstrations, and the
ability to practise privately.

This persona is a working hypothesis, not research evidence. The team
should speak to at least one intended user during the hackathon if
possible and update the assumptions based on what they say. The pitch
must distinguish actual observations from assumptions.

### Accessibility needs to consider

-   Users who prefer speaking instead of typing.
-   Users who cannot comfortably read long instructions.
-   Users who understand Urdu better than English.
-   Users who prefer Roman Urdu to Urdu script.
-   Users who need larger text and touch targets.
-   Users who need more time, repeated instructions, or predictable
    navigation.
-   Users who are comfortable reading but unfamiliar with digital
    conventions.

UNSTUCK should not assume that age alone determines ability. The
experience should adapt to the person's preferences and needs.

------------------------------------------------------------------------

## 5. The Proposed Solution

UNSTUCK is a **personalized digital playground**. Its key differentiator
is the relationship between a user's Digital Fear Map and their practice
journey.

### 5.1 Digital Fear Map --- start with the person

Instead of presenting a generic list of tutorials, UNSTUCK begins by
letting users identify what makes them uncomfortable. This can be done
through large illustrated choices, with audio labels where supported.

Potential concern areas include:

-   **I am afraid of pressing the wrong button.**
-   **I worry I might delete or lose something.**
-   **I don't know where to find things on my phone.**
-   **I struggle to send pictures or documents.**
-   **I don't understand unfamiliar messages.**
-   **I worry about scams or requests for codes.**
-   **I find instructions difficult to read.**
-   **I prefer someone to speak the instructions aloud.**

Users can select more than one area, skip the setup, or change their
choices later. These selections are not diagnoses or judgments; they are
the user's own stated preferences.

The app uses the selected concerns to recommend a first practice
activity. For example, someone who worries about deleting things may
begin with a safe exercise that demonstrates the difference between
opening, selecting, and deleting a fictional item.

### 5.2 Safe Sandbox --- practice without real-world consequences

The sandbox contains simplified, simulated screens and tasks. The user
can tap buttons and explore without interacting with their actual phone
or external accounts.

The prototype may include a simulated messaging interface, a fictional
photo-selection flow, and a suspicious-message scenario. The sandbox
should clearly state that it is a practice environment.

It must not send real messages, open real banking sessions, change
device settings, or request real credentials.

### 5.3 "What Happens If I Tap This?" --- learn consequences

When a learner is unsure about an action, the experience should help
them understand the likely consequence in plain language or through a
visual demonstration.

Example:

**User action:** Selects a simulated Delete button.\
**Guidance:** "This would remove the selected picture. Let's try it with
a pretend picture first."\
**Practice:** The user sees a fictional item disappear and can learn how
the simulation's undo or recovery action works, if available.

This feature teaches the meaning of interface actions rather than only
telling users which button to press. Consequence previews should be
designed carefully: they are explanations within the simulation, not
guarantees about every real app.

### 5.4 Training Wheels --- assistance that can be reduced gradually

Each learning task supports three assistance levels:

1.  **Show me:** Demonstrate the task and explain the steps.
2.  **Try with me:** Let the user perform the task with hints available.
3.  **Let me try:** Offer a similar task with fewer or no hints.

The user should be able to ask for help at any time and return to a more
guided level. Progress should never lock the user out of assistance.

The application can record whether a task was completed independently,
with hints, or after a demonstration. This provides a practical learning
signal and helps curate the next activity. It is not a clinical or
scientific measurement of confidence.

### 5.5 No-Shame Learning

UNSTUCK treats mistakes as expected and useful.

-   No red-cross failure screen as the primary feedback.
-   No timer or penalty for taking longer.
-   Repeat instructions and retry options remain available.
-   Feedback uses respectful language such as "Let's try another way."
-   Users can stop, restart, or choose a different task.
-   Progress is about practice and skill development, not competition
    with other users.

### 5.6 Personalized next steps

The Digital Fear Map and practice history work together.

For the MVP, personalization can use transparent rules rather than AI.
For example:

-   If the user selects "I worry about deleting something," recommend a
    safe action-consequence exercise.
-   If the user needs several hints during navigation, offer another
    guided practice before the independent attempt.
-   If the user completes a task independently, recommend a slightly
    different task using the same skill.
-   If the user exits or asks for help repeatedly, offer a simpler
    version and let them choose whether to continue.

The user should be able to see why an activity is recommended and change
the recommendation. The app should not label a user as incapable or
permanently assign them a low skill level.

------------------------------------------------------------------------

## 6. Core Learning Loop

Every supported task follows the same cycle:

### 1. Understand

The user selects or states a goal in their own words, using large visual
choices or supported voice input.

### 2. Watch

UNSTUCK shows a short visual demonstration and/or speaks one simple
instruction at a time.

### 3. Practise

The user interacts with a simulated interface. They can explore, request
hints, replay instructions, and retry.

### 4. Reflect

The app briefly explains what happened and why. The tone is supportive
and non-judgmental.

### 5. Do it independently

The user receives a similar but not identical task with less guidance.

### 6. Choose what comes next

UNSTUCK records the practice outcome and suggests a next step based on
the user's selected concerns and recent activity. The user remains in
control.

This cycle is the product's central mechanism. The simulator is the
practice space; the Digital Fear Map and adaptive learning loop are what
make the experience personal.

------------------------------------------------------------------------

## 7. Proposed Hackathon MVP

The seven-hour build window requires a narrow, reliable scope. The goal
is to demonstrate the full learning loop, not to build a complete
digital literacy platform.

### MVP feature list

#### Feature 1: Accessible welcome screen

-   Working name and short, reassuring explanation.
-   Large buttons and high-contrast text.
-   Language preference for the prototype.
-   Option to hear supported instructions.
-   No mandatory account creation.

#### Feature 2: Digital Fear Map

-   A short selection screen with illustrated concern options.
-   Users can select multiple concerns or skip.
-   Selections influence which practice activity is recommended.
-   Users can revisit or change selections.

#### Feature 3: Practice playground

-   A simplified, simulated phone or messaging interface.
-   Large interactive controls.
-   Clear "practice only" notice.
-   A reset or start-again option.

#### Feature 4: Learning journey --- everyday task

Recommended task: **Practise attaching a fictional picture to a
message.** - A demonstration. - A guided attempt with contextual
hints. - A less-guided attempt using a similar scenario. - Progress
recorded based on assistance needed.

#### Feature 5: Learning journey --- online safety

Recommended task: **Recognize a suspicious message asking for an
OTP.** - Show a fictional message. - Let the user choose what to do. -
Explain why sharing a one-time code with someone who contacts them
unexpectedly is dangerous. - Let the user try a different scenario. -
Encourage verification through an independently obtained official
channel.

#### Feature 6: Personal progress view

-   Show which activities have been practised.
-   Show whether the user completed each with a demonstration, hints, or
    independently.
-   Recommend a next exercise based on selected concerns and results.
-   Avoid unsupported claims such as "Your confidence increased by 80%."

#### Feature 7: Basic accessibility

-   Large touch targets and readable text.
-   Simple wording and one main action per screen.
-   Spoken instructions using browser text-to-speech where supported.
-   Optional speech input only if it can be implemented reliably.
-   Keyboard access and visible focus indicators.
-   Do not rely on color alone to communicate outcomes.

### Explicitly out of scope for the hackathon

-   Full smartphone operating-system simulation.
-   Live integration with WhatsApp, banks, government portals, or real
    accounts.
-   Access to users' messages, contacts, SMS, or device settings.
-   A general-purpose AI chatbot.
-   Cloud accounts and family monitoring.
-   Multiple advanced languages and dialects beyond what can be tested.
-   Claims that the system can detect every scam.
-   Long-term evidence of improved confidence without user testing over
    time.

------------------------------------------------------------------------

## 8. Example User Journey for the Demo

The two-minute video should show one coherent journey rather than a
disconnected feature montage.

### Scene 1 --- The user's concern

A user opens UNSTUCK and selects "I worry about pressing the wrong
button" and "I find unfamiliar messages confusing."

### Scene 2 --- Personalized recommendation

The app recommends a safe practice activity. The user sees that it is a
simulation and that nothing will be sent or changed in a real account.

### Scene 3 --- Explore and learn

The user encounters a fictional message asking for a one-time code. They
select a risky action or ask what it means. UNSTUCK responds
respectfully, explains the warning sign in simple language, and offers a
retry.

### Scene 4 --- Guided practice

The user hears or reads a short explanation and tries again with a hint.

### Scene 5 --- Independent attempt

A different fictional message appears. The user identifies the
suspicious request without being shown the answer first.

### Scene 6 --- Progress and control

The progress screen shows that the user practised the skill and
completed the final scenario independently. UNSTUCK suggests another
relevant activity, while allowing the user to choose what comes next.

### Demo message

The video should make the change visible: the product does not merely
answer the user's question; it creates an opportunity to practise and
then tests whether the user can apply the lesson independently.

Do not stage fake user research or present fictional persona details as
real testimonials. If the video uses a scripted persona, treat it as a
demonstration scenario.

------------------------------------------------------------------------

## 9. Technical Approach

### Recommended format: Browser-based web prototype

A web app is the most practical format for this hackathon because it can
be built quickly, recorded directly from a desktop browser, and
demonstrated without installation or deployment. It also makes it easy
to iterate on screen layout and interactions.

### Suggested stack

Choose the simplest stack the team already knows.

**Preferred option if the team is comfortable with React:** - React for
screens and reusable components. - CSS for the accessible interface and
simulated phone. - JavaScript for the learning flow, scenario logic,
progress tracking, and recommendation rules. - Browser `speechSynthesis`
for spoken instructions where supported. - Browser speech recognition
only as an optional enhancement, not a requirement.

**Alternative if the team is more comfortable with basic web
development:** - HTML, CSS, and vanilla JavaScript. - A small number of
screens controlled by JavaScript. - Local state and optional
`localStorage` for progress.

A backend, database, external AI API, and authentication are not
necessary for the MVP. Prewritten scenarios and rule-based
recommendations are more reliable for a time-limited demonstration.

### Suggested data model

A minimal local model could contain:

-   `selectedConcerns`: concern identifiers selected by the user.
-   `preferredLanguage`: selected language.
-   `taskAttempts`: task identifier, completion outcome, and assistance
    level.
-   `completedTasks`: tasks the user has completed.
-   `recommendedNextTask`: derived from concerns and practice history.

Only collect data required for the prototype. Avoid storing sensitive
free-text descriptions or actual messages. Include a clear reset option.
If `localStorage` is used, explain that the demo's progress may remain
on the same browser/device until reset or cleared.

### Recommendation logic example

1.  If `selectedConcerns` includes `fear_of_deleting`, recommend the
    simulated action-consequence task.
2.  If it includes `message_safety`, recommend the suspicious-message
    exercise.
3.  If the latest attempt needed a demonstration, offer guided practice
    next.
4.  If the latest attempt succeeded with hints, offer a similar task
    with fewer hints.
5.  If the user completed the task independently, offer a related
    challenge.
6.  Always let the user choose another task or request more help.

This logic is transparent, explainable, testable, and sufficient to
demonstrate personalization. AI can be considered later if user testing
shows a clear benefit.

------------------------------------------------------------------------

## 10. Trust, Safety, and Privacy

Trust is central because the product is designed for people who may
already be uncertain about digital safety.

### Safety rules

-   The app is a practice environment, not a real banking or messaging
    service.
-   Never ask for a real password, PIN, OTP, bank account number, or
    other sensitive credential.
-   Use fictional names, contacts, messages, and data.
-   Do not send messages or make external transactions.
-   Explain risky actions without frightening or blaming the learner.
-   Encourage users to verify suspicious claims through an official
    channel they find independently, rather than using a link or phone
    number supplied in a suspicious message.

### Privacy rules

-   No account is required for the MVP.
-   Keep prototype progress locally where practical.
-   Explain what progress is recorded and how to reset it.
-   Do not collect real personal messages or contact lists.
-   Do not share a user's progress with family members by default.
-   Make the user's selected learning concerns editable and resettable.

### Limits and responsible claims

-   A simulation cannot guarantee that a person will be safe in every
    real-world situation.
-   The app should not claim to detect every scam.
-   The app's progress indicators describe observed practice
    performance, not a psychological assessment.
-   Voice features depend on browser and device support; provide a
    usable non-voice alternative.
-   Guidance for real services can vary by app version, device,
    language, and region. The MVP should avoid claiming that a simulated
    interface exactly matches every real application.

------------------------------------------------------------------------

## 11. Accessibility and Interface Principles

The UI plan will be developed separately, but the product proposal
establishes these non-negotiable principles:

1.  **One main decision per screen.**
2.  Large, clearly labelled buttons with generous spacing.
3.  Plain, conversational language.
4.  Spoken instructions where supported.
5.  Visual demonstrations that do not require reading long paragraphs.
6.  Repeat, hint, back, and start-again controls that are easy to find.
7.  Consistent placement of navigation controls.
8.  High contrast and readable type.
9.  No flashing effects, unnecessary animation, or time pressure.
10. Do not use red/green color alone to communicate meaning.
11. Respectful feedback after every attempt.
12. Language and assistance preferences should remain under user
    control.

For the first prototype, English and Urdu are sensible priorities. The
team should test the actual text, pronunciation, and directionality of
Urdu content instead of assuming that translation alone makes the
experience accessible. Roman Urdu may be offered as an alternative text
format.

------------------------------------------------------------------------

## 12. User Research and Validation

The target-user rubric rewards evidence, so the team should validate
assumptions quickly.

### Short interview

If possible, speak to a parent, grandparent, or another person who
sometimes finds technology difficult. Ask:

1.  What digital task have you avoided or needed help with recently?
2.  What worried you about doing it yourself?
3.  What do you usually do when you get stuck?
4.  Would you rather read instructions, listen to them, watch a
    demonstration, or practise?
5.  What would make a practice environment feel safe and respectful?

Do not assume every older adult has the same challenges. Record the
person's words accurately, with permission, and avoid collecting
unnecessary personal information.

### Prototype test

Give the user a simple simulated task without explaining the answer.
Observe where they hesitate, what they tap, and what language they use
to describe the problem. Then let them try the guided experience and
complete a different but related task.

### Useful indicators

-   Can the user identify a relevant concern on the Digital Fear Map?
-   Can the user understand the task and begin without verbal help from
    the team?
-   Can they recover from a wrong selection?
-   Do they understand that the environment is simulated?
-   Can they complete the final scenario with less assistance than the
    guided attempt?
-   Which instructions or controls cause confusion?

One short test is formative feedback, not proof of effectiveness for all
users. The pitch should report what was actually observed and avoid
invented statistics.

------------------------------------------------------------------------

## 13. Hackathon Execution Plan

A proposed schedule for a 9 AM--5 PM build window:

  -----------------------------------------------------------------------
  Time                    Work                    Expected result
  ----------------------- ----------------------- -----------------------
  9:00--9:15              Interview a target user A small amount of real
                          and note the main       user evidence
                          difficulty              

  9:15--9:35              Agree on MVP and map    Frozen scope
                          the demo journey        

  9:35--10:15             Set up project and      Navigation and basic
                          build welcome screen    layout

  10:15--11:00            Build Digital Fear Map  Selections saved in app
                                                  state

  11:00--12:00            Build simulated task    Core playground works
                          and scenario            
                          interactions            

  12:00--12:45            Implement hints,        Complete guided
                          explanations, and       learning loop
                          retries                 

  12:45--1:15             Break and integration   Stable working version
                          check                   

  1:15--2:00              Implement independent   Learning outcome
                          attempt and progress    visible

  2:00--2:40              Add personalization     Recommended next task
                          rules and spoken        and audio
                          instructions            

  2:40--3:20              Add second scenario and Safety scenario and
                          accessibility           clearer UI
                          refinements             

  3:20--4:00              Test the complete       Reliable demo flow
                          journey and fix major   
                          bugs                    

  4:00--4:30              Record or rehearse the  Clear demonstration
                          two-minute video        

  4:30--5:00              Final retakes and       Submission-ready video
                          contingency buffer      
  -----------------------------------------------------------------------

This is a target plan, not a guarantee. If the implementation falls
behind, protect the complete path from concern selection to practice,
independent attempt, and progress. Reduce the number of scenarios before
sacrificing that path.

------------------------------------------------------------------------

## 14. Two-Minute Video Structure

**0:00--0:15 --- The problem**\
Show a person hesitating over an unfamiliar phone action. Explain that
the issue is not intelligence; it is fear, unfamiliarity, and lack of
safe practice.

**0:15--0:35 --- Digital Fear Map**\
Show the user selecting concerns and receiving a tailored practice
recommendation.

**0:35--1:05 --- Safe playground**\
Demonstrate a simulated task or suspicious-message scenario. Show a
mistake being handled respectfully and explained in simple language.

**1:05--1:30 --- Training Wheels**\
Show the user moving from a guided attempt to a less-guided attempt.

**1:30--1:50 --- Progress and control**\
Show the practice record, a personalized next suggestion, and the user's
ability to choose another task or ask for help.

**1:50--2:00 --- Closing message**\
End with: **"UNSTUCK doesn't just tell people what to do. It helps them
learn to do it themselves."**

Record the actual working prototype wherever possible. If a screen is a
mockup or a planned feature, label it honestly rather than implying it
is functional.

------------------------------------------------------------------------

## 15. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  The project feels like a generic    Center the demonstration on the
  chatbot or tutorial                 Digital Fear Map, consequence
                                      exploration, adaptive assistance,
                                      and independent attempt.

  Scope becomes too large             Build two scenarios at most and
                                      prioritize one complete learning
                                      loop.

  Voice input fails in the demo       Make all core tasks usable through
                                      large selectable buttons; treat
                                      speech recognition as optional.

  Simulated actions are confused with Display a persistent "Practice
  real actions                        only" indicator and use fictional
                                      data.

  Personalization feels patronizing   Let users edit concerns, request
                                      more help, skip tasks, and choose
                                      the next activity.

  Progress scores imply unsupported   Report task outcomes and assistance
  psychological claims                levels, not a numerical confidence
                                      diagnosis.

  UI is attractive but difficult to   Test with a real intended user and
  use                                 observe where they hesitate.

  The team runs out of time           Freeze the scope early, test the
                                      demo path repeatedly, and leave a
                                      buffer for recording.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 16. Future Possibilities

These are future directions, not promises for the hackathon MVP:

-   More everyday learning scenarios, such as video calls, document
    downloads, online forms, and privacy settings.
-   Additional local languages and dialects.
-   More flexible speech-based interaction.
-   Carefully reviewed, version-specific guidance for real applications.
-   Optional family-supported learning, controlled by the learner and
    designed to protect their privacy.
-   More sophisticated recommendation logic based on repeated practice
    patterns.
-   Longer-term evaluation of whether the product improves task
    independence and users' reported confidence.

Any future AI features should serve the learning experience rather than
replace it. For example, AI might help simplify an explanation or
generate additional fictional practice scenarios, but the core learning
flow should remain safe and understandable.

------------------------------------------------------------------------

## 17. Why UNSTUCK Is Different

UNSTUCK is not differentiated simply by being multilingual, having voice
input, or using a simulated phone. Those are useful capabilities that
other products may also offer.

Its intended differentiator is the **personalized, confidence-first
learning loop**:

-   The user identifies what feels difficult.
-   The app uses those choices to recommend practice.
-   The user explores a safe simulation and learns what actions do.
-   The app responds to observed attempts by offering more or less
    guidance.
-   The user tries a similar task independently.
-   The user chooses what to learn next and can always ask for help.

This design turns a generic tutorial into a user-controlled practice
journey. It aims to help people move from avoiding technology to
exploring it with greater understanding.

The value proposition is not that UNSTUCK knows every answer. It is that
UNSTUCK gives people a place to learn, at their own pace, without the
pressure of getting everything right immediately.

------------------------------------------------------------------------

## 18. Final Product Statement

**UNSTUCK is a personalized digital practice playground for people who
feel uncomfortable using everyday technology. Through a Digital Fear
Map, safe simulations, consequence-based learning, accessible guidance,
and gradually reduced assistance, it helps users practise tasks and
build the skills to complete them more independently.**

**Tagline:** *Explore safely. Learn at your pace. Do it yourself.*

**Hackathon MVP success criterion:** A user can identify a difficulty,
receive a relevant practice recommendation, complete a guided simulated
task, try a similar task with less assistance, and see an honest record
of their practice---all in a simple browser-based experience.
