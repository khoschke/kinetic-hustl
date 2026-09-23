# Kinetic Hustl — Terms and Conditions Google Form

Question set for the form clients complete instead of initialling a printed document.

---

## The thing that makes this work

**A required question only blocks submission if the respondent actually reaches it.** Questions in
sections that branching skips are not enforced at all. So "everything is required" and "not everyone
answers everything" are not in conflict — as long as anything that does not apply to everyone sits in a
section that non-applicable clients never see.

That gives one rule for the whole build:

> If a question applies to **everyone**, it goes in a shared section and is required.
> If it applies to **some**, it goes in a branch section and is still required.

Nothing conditional is ever marked optional. It is simply placed where the wrong people cannot reach it.

## Branch on format, not on all ten agreements

Ten branches is a lot to build and more to maintain. Only three questions genuinely differ by *format* —
the shared-session policies — so branch on the four formats and use a dropdown inside each branch to
capture which specific rate applies.

| Branch | Who lands here | What is different |
| --- | --- | --- |
| 1-on-1 | Weekly and flexi, with or without app | Rate dropdown, sessions per week/fortnight, minimum term |
| 2-on-1 | With or without app | Rate dropdown, training partner, **three shared-session policies**, minimum term |
| 3-on-1 | With or without app | Rate dropdown, training partners, **three shared-session policies**, minimum term |
| Casual | With or without app | Rate dropdown, **no minimum term** |

Four sections to build instead of ten, and the rate a client agrees to is still stated explicitly.

## Section order

Branching fires at the **end** of the section containing the branch question, so the branch question
needs its own section, and every branch target must sit after it.

```
S1   Your details               → continue
S2   Health and medical         → continue
S3   Who is signing?            → BRANCH on adult / guardian
S4   Junior clients             → go to S6          (under 18 only)
S5   Consent to participate     → continue          (18+ only)
S6   Policies (all clients)     → continue
S7   Which format?              → BRANCH on format
S8   1-on-1 branch              → go to S12
S9   2-on-1 branch              → go to S12
S10  3-on-1 branch              → go to S12
S11  Casual branch              → go to S12
S12  Payment and start date     → continue
S13  Your information           → continue
S14  Which photo rules apply?   → BRANCH on adult / under 18
S15  Photos and video           → continue          (18+ only)
S16  Confirmation               → submit
```

Two branch points exist only to route juniors: S3, which sends them to their own terms instead of the
adult consent section, and S14, which sends them past the adult photos section because theirs was already
taken in S4.

The four format branch sections each need their **After section** dropdown set to *Go to section 12*. Miss one
and that client falls through into the next branch and is asked to agree to someone else's rate.

## Settings

| Setting | Why |
| --- | --- |
| **Collect email addresses** → Verified | Ties the response to a real address |
| **Response receipts** → Always | The client gets their own copy — the evidence trail that replaces a signature |
| **Limit to 1 response** → Off | Clients change agreements; you want a new response each time |
| **Link to a spreadsheet** | Becomes your register of signed agreements |

## Before you send it to anyone

Submit the form yourself once per branch — four test runs. Check each one asked only for what that
client should see, and that the response row records the right rate. Reordering sections can silently
break branch targets, so re-test after any structural edit.

---

# S1 — Your details

*All required. Short answer unless stated.*

1. Full name
2. Mobile number
3. Date of birth *(Date)*
4. Home address

> **Emergency contact is not asked here.** It sits in the health screening form
> (`intake/health-screening-form.md`), which every client completes before their first session and
> refreshes yearly. An emergency contact frozen at the date someone signed their agreement is worse
> than one that gets re-confirmed.

---

# S2 — Health and medical

> **Health screening moved out of this form.** It is collected in full by the health screening form
> (`intake/health-screening-form.md`), which uses APSS Stage 1 and is completed before the first
> session by every client, including complimentary ones. Asking the same questions again here would
> give you two health records per client, taken on different dates, that can disagree with each other.
>
> What stays in this form is the pair of things that are contractual rather than clinical: the
> confirmation that the screening was done honestly, and the ongoing obligation to keep it current.

> *Section description:* Your health information is collected separately, in the Kinetic Hustl health
> screening form. These two confirmations are part of your agreement.

*Each a Checkbox question with a single option, Required.*

1. **I have completed the Kinetic Hustl health screening form, and the information I gave was complete, honest and accurate.** → "I confirm"
2. **I will tell Karl immediately if anything about my health, injuries or medications changes.** → "I agree"

> **Question 1 also enforces the order.** A client cannot honestly tick it without having done the
> screening first, which is where you want them to start anyway.

---

# S3 — Who is signing this agreement?

*One question only. This is the branch point.*

**Who is signing this agreement?** *(Multiple choice · Required · **Go to section based on answer**)*

- I am the client, and I am 18 or older → *Go to section 5*
- I am a parent or guardian signing for a client under 18 → *Go to section 4*

> **This has to come before the consent section.** The Consent to Participate contains "I certify that I
> am 18 years or older", which a junior cannot truthfully agree to and a guardian should not agree to on
> their behalf. Section 4 replaces that certification rather than asking anyone to tick past it.

---

# S4 — Junior clients

*Reached only where a guardian is signing. After this section → **Go to section 6**.*

> *Section description:*
>
> A few things that apply where the client is under 18. Everything else in this form applies to them the
> same as anyone else.
>
> Your child's health information is collected separately, in the health screening form. This section is
> about the agreement itself.

**Guardian details**

*All Short answer, all Required.*

1. Your full name
2. Your relationship to the client
3. Your mobile number
4. The client's full name
5. The client's date of birth *(Date)*

> Collected again here even though the health screening form has them, because a contract has to identify
> its own parties on its own face, and the screen may have been completed months earlier.

**Authority and consent**

*Each a Checkbox question with a single option, Required.*

6. **I am the parent or legal guardian of the client named above, and I have authority to enter this agreement on their behalf.** → "I confirm"

7. **I have read the Consent to Participate in Training, and I accept its terms on the client's behalf and on my own. Where it is written in the first person, those statements are made by me.** → "I accept"

8. **I acknowledge that the client participates at their own risk, and I accept responsibility on their behalf for their health, wellness, medical, physical, mental and emotional wellbeing in connection with that participation. I accept those risks and indemnify and release the Trainer to the extent permitted by law.** → "I accept"

> **This replaces question 2 of section 5 for juniors** ("I confirm I am 18 years of age or older"), which
> is why juniors skip that section entirely.

**Medical clearance**

9. **Where the client has a surgical history, a diagnosed condition, or an ongoing treating practitioner, I understand written clearance from that practitioner must be provided before their first loaded training session. An introductory meeting or movement screen may take place before clearance. Loaded training may not.** *(Checkbox · Required ·* "I understand"*)*

**Supervision**

10. **Where the client is under 16, a parent, guardian or other responsible adult must be present for the whole session. This is a condition of the Trainer's insurance and cannot be waived by agreement.** *(Checkbox · Required ·* "I understand"*)*

11. **If no responsible adult is present at the start of a session for a client under 16, the session cannot go ahead and is treated under the cancellation policy. Karl will use discretion where the circumstances warrant it.** *(Checkbox · Required ·* "I understand"*)*

**Money**

12. **I am the responsible party for everything this agreement requires of the client: the fees, the payment arrangement, the notice periods and the cancellation policies. The direct debit authority is signed by me as the account holder.** *(Checkbox · Required ·* "I agree"*)*

**Communication**

13. **Kinetic Hustl does not operate a private messaging channel between a trainer and a client under 18. Where the client is old enough to follow a program independently they may hold their own app account with one-way messaging, so Karl can send programming and the client cannot message him privately. Between sessions, anything the client needs to raise comes through me or is raised in person at the gym.** *(Checkbox · Required ·* "I have read and understood"*)*

14. **Does the client have their own app account?** *(Multiple choice · Required)*
    - Yes, with one-way messaging
    - No app access
    - Their programming sits on my account

**Photos and video**

15. **Progress photos are not taken of clients under 18. This applies regardless of their goals, including where body composition is one of them. Progress is tracked using measurements, performance markers, and video of movement where it serves the coaching.** *(Checkbox · Required ·* "I have read and understood"*)*

16. **Photos and video for marketing or social media** *(Multiple choice · Required)*
    - I consent, and I have asked the client, who also consents
    - I do not consent
    - The client does not consent

    *Helper text:* Consent defaults to no, and either of you can withdraw it at any time by telling Karl. Where consent is given, none of the following can be waived: no location tagging or naming the gym alongside the client; nothing that identifies when they train; nothing posted in real time; first name only or no name; and no comments or captions about their body, weight or appearance.

> **Why the junior's own consent is asked through the guardian.** The guardian holds the authority, so
> theirs is the consent that counts. Asking them to confirm they have asked the client is a safeguarding
> practice rather than a legal one, and it means nobody's image is published over their objection.

**When the client turns 18**

17. **This section ends on the client's eighteenth birthday. From that date they sign the standard agreement in their own name. Until they do, this agreement continues unchanged and I remain the responsible party. Financial responsibility transfers only once a new agreement and a new direct debit authority are in place in their name.** *(Checkbox · Required ·* "I understand"*)*

**Shared sessions**

18. **Where the client trains 2-on-1 or 3-on-1 alongside participants outside our household, I agree to the specific participants in writing before the first shared session. Where the client is under 16, the supervision requirement applies to shared sessions too.** *(Checkbox · Required ·* "I agree"*)*

**Raising a concern**

19. **The client is encouraged to raise anything with Karl during a session. Nothing the client tells Karl about their training is kept secret from me. If Karl becomes concerned about the client's safety or welfare he will raise it with me, and where he reasonably believes the client is at risk of harm he may contact the appropriate authorities without seeking my agreement first.** *(Checkbox · Required ·* "I have read and understood"*)*

> **The Junior Participation Agreement is separate and stays on paper.** The client signs it, Karl
> counter-signs it, the guardian receives a copy and does not sign. It carries no legal weight, and
> putting it in this form would make it look as though it does.

---

# S5 — Consent to participate in training

*Reached only where the client is signing for themselves. Guardians take section 4 instead.*

> *Section description — paste verbatim. Reproduced from the agreement documents; if the wording
> there changes, change it here too.*
>
> **CONSENT TO PARTICIPATE IN TRAINING**
>
> The Trainer refers to the fully qualified Australian fitness professional trading as Karl Hoschke.
>
> The Activity refers to the participation in personal training, group exercise, and general physical activities.
>
> **THIS IS AN IMPORTANT DOCUMENT, WHICH AFFECTS YOUR LEGAL RIGHTS AND OBLIGATIONS**
>
> I acknowledge that as a condition of my participation I do so at my own risk. I accept full and complete responsibility for my health, wellness, medical, physical, mental and emotional wellbeing.
>
> I understand that all personal training sessions are completed under the guidance of a registered & qualified trainer with current qualifications subject but not limited to Bachelor of Exercise and Movement Science, First Aid, CPR, and full public and professional indemnity insurance.
>
> I accept all risks and hereby indemnify and release the trainer or any person or body directly and indirectly associated with the trainer against all liability, claims, demands, and proceedings arising out of my participation in this activity. This means I agree to hold the trainer free and harmless of any and all liability for death, injury or health complication that may result from or be aggravated by my participation in personal training or any physical activity under their guidance or from any program provided.
>
> I acknowledge that participation in this activity may involve a risk of serious injury, illness, or in rare circumstances death may occur.
>
> I assume the risk of, and the responsibility for damage to, or loss of property, resulting from my participation in the fitness service.
>
> I recognise the difficulties associated with the activity and attest I am physically fit to participate safely, and that a qualified medical practitioner has not advised me otherwise. In conjunction with this I acknowledge the recommendation that I obtain a doctor's written approval prior to participating in the activity. In the event that I become aware of any medical condition, injury or impairment that will be detrimental to my health my trainer will be immediately informed.
>
> I hereby state that all information I have supplied is complete, honest and whole.
>
> I have disclosed any information that is important in regards to my health, physical and medical condition.
>
> I have read and understand the foregoing. Any questions, which may have occurred to me, have been answered to my satisfaction.
>
> I accept by continuing to participate in this activity I am bound to the terms of this agreement.
>
> I certify that I am 18 years or older and have read this document and fully understand it.
>
> I fully understand that I am forever giving up in advance any right to sue or make claims against the trainer I am releasing, I am not under any physical or emotional duress to sign.

*Each a Checkbox question with a single option, Required.*

1. **I have read and understood the Consent to Participate in Training above, and I accept the risks it describes.** → "I accept"
2. **I confirm I am 18 years of age or older.** → "I confirm"
3. **I confirm that all information I have provided is complete, honest and accurate.** → "I confirm"

---

# S6 — Policies

*Applies to every client. Each a Checkbox question with a single option, Required. The policy wording
sits in the question itself, so the tick is against the wording rather than a heading.*

1. **Session cancellation and credits.** There is a 24-hour cancellation policy for all training sessions. Sessions cancelled with 24 hours' notice or more are credited to my account, and a credit can be used to rebook straight away or held and used later. Sessions cancelled within 24 hours of the booking are forfeited. Credits expire three months from the date of the cancelled session, may be extended at Karl's discretion, stay usable through my notice period, and lapse when my agreement ends. → "I have read and understood"

2. **Professional conduct and boundaries.** Sessions are conducted on the open gym floor during staffed hours and never in a closed or unsupervised room. Hands-on cueing is used only where it helps my technique, only with my agreement, and I can decline it at any time. If anything in a session makes me uncomfortable I can say so and it stops, or email khoschke@gmail.com. → "I have read and understood"

3. **Direct debit cancellation.** There is a 30-day cancellation policy for all direct debit agreements. Notice is required by email. → "I have read and understood"

4. **Gym access.** If I train in person at Fitaz Gym, I am responsible for holding my own valid gym access for every session I attend. Gym membership is separate from training fees and is arranged directly with Fitaz Gym. → "I have read and understood"

*Conditional wording matters: an online coaching client does not train at Fitaz, so an unqualified statement would be untrue for them — and it is a required tick.*

---

# S7 — Which format are you training in?

*One question only. This is the branch point.*

**Which format are you training in?** *(Multiple choice · Required · **Go to section based on answer**)*

- 1-on-1 → *Go to section 8*
- 2-on-1, training with one other person → *Go to section 9*
- 3-on-1, small group of up to three → *Go to section 10*
- Casual, booked as needed → *Go to section 11*

> **No "not sure" option.** A respondent who takes it would skip every agreement section and still reach the
> confirmation, producing a submission that looks complete but records no format and no rate. If a client does
> not know their format, the form should not be in their hands yet.

---

# S8 — 1-on-1

*After this section → **Go to section 12**.*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - Weekly, with app access — $88 per session plus $22 per week
   - Weekly, without app access — $110 per session
   - Flexi (fortnightly), with app access — $104.50 per session plus $44 per fortnight
   - Flexi (fortnightly), without app access — $126.50 per session

2. **I agree to the rate I have selected above. All prices include GST.** *(Checkbox · Required ·* "I agree"*)*

3. **How many sessions, and how often?** *(Short answer · Required · e.g. "2 per week" or "1 per fortnight")*

4. **Weekly means one session a week or more, with no upper limit — every session is charged at the same rate. Flexi means a minimum of one session per fortnight, billed fortnightly. My tier is set by this agreement, not by how many sessions happen to fall in a given fortnight. Additional or rescheduled sessions are charged at my agreed rate and do not change it. If my ongoing pattern changes, a new agreement will be issued from that point forward.** *(Checkbox · Required ·* "I have read and understood"*)*

5. **A minimum term of 12 weeks applies unless agreed otherwise in writing.** *(Checkbox · Required ·* "I agree"*)*

---

# S9 — 2-on-1

*After this section → **Go to section 12**.*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - With app access — $66 per person, per session, plus $22 per week
   - Without app access — $88 per person, per session

2. **I agree to the rate I have selected above. All prices include GST.** *(Checkbox · Required ·* "I agree"*)*

3. **Who are you training with?** *(Short answer · Required)*

4. **Attendance of other participants.** My rate does not change if another participant is unable to attend. The session runs as scheduled for whoever attends, at the rate I have agreed. No adjustment is made in either direction. *(Checkbox · Required ·* "I have read and understood"*)*

5. **Change to group size.** If a participant leaves permanently, I continue at my agreed rate for two weeks while a replacement is sought. Karl will then confirm in writing the rate for the new group size. My rate will not change unless I agree to it in writing, and I may end the agreement at that point without further notice period or fee. *(Checkbox · Required ·* "I have read and understood"*)*

6. **Separate agreements.** Each participant holds their own agreement and their own payment arrangement. Participants are not responsible for one another's fees. *(Checkbox · Required ·* "I have read and understood"*)*

7. **Additional sessions are charged at my agreed rate: 2-on-1 $66 or $88, 1-on-1 $88 or $110, depending on app access.** *(Checkbox · Required ·* "Noted"*)*

8. **A minimum term of 12 weeks applies unless agreed otherwise in writing.** *(Checkbox · Required ·* "I agree"*)*

---

# S10 — 3-on-1

*After this section → **Go to section 12**. Identical to S9 with these changes:*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - With app access — $55 per person, per session, plus $22 per week
   - Without app access — $77 per person, per session

3. **Who are you training with?** *(Short answer · Required)*

7. **Additional sessions: 3-on-1 $55 or $77, 2-on-1 $66 or $88, 1-on-1 $88 or $110, depending on app access.** *(Checkbox · Required ·* "Noted"*)*

*Questions 2, 4, 5, 6 and 8 are word for word the same as S7.*

---

# S11 — Casual

*After this section → **Go to section 12**. No minimum-term question here — none applies.*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - With app access — $121 per session, and I hold online coaching at $44 per week
   - Without app access — $143 per session

2. **I agree to the rate I have selected above. All prices include GST.** *(Checkbox · Required ·* "I agree"*)*

3. **Casual sessions are booked and paid as required. No minimum term applies.** *(Checkbox · Required ·* "I have read and understood"*)*

---

# S12 — Payment and start date

*Wording here has to work for all four branches, including casual. The billing cycle itself is confirmed
inside each branch, so it is deliberately not repeated here.*

1. **Payment is by direct debit through Ezidebit unless we have agreed otherwise. Card payments are debited at the agreed amount, with no surcharge. If you pay by bank account direct debit, any Ezidebit bank account fee is charged in addition to the amounts above and appears on the debit.** *(Checkbox · Required ·* "I have read and understood"*)*

2. **Start date — the date of your first session, or the date you'd like your online coaching to begin** *(Date · Required)*
   *Helper text:* If we haven't locked in a time yet, put the date we've discussed and I'll confirm it with you.

3. **Payments start from the week of your first session. I will confirm your exact debit date with you before the first payment comes out.** *(Checkbox · Required ·* "I have read and understood"*)*

> **Why not "preferred start date".** *Preferred* invites a wish rather than a commitment, and this date
> is doing real work — it is what the first debit is calculated from. A client who reads it as
> provisional, then starts a week later, creates an argument about when billing should have begun.
> *Date of your first session* is a fact the client knows and controls. Question 3 then makes explicit
> that billing follows from it, which is the gap that would otherwise be left open.
>
> It stays in the shared section rather than moving into the branches: every client has a first session,
> casual included, and the wording above is true for all of them.

---

# S13 — Your information

> *Section description:* To coach you I collect personal details, health and medical information,
> training records and body composition measurements. This is used to design and adjust your program and
> to manage your account. It is stored in my own records, and — if you have app access — in the training
> app, which is operated by a third-party provider. Your information is never sold. It is shared only
> where you ask me to, or where I am required to by law. You can ask to see it, correct it, or have it
> deleted once your training has ended, by emailing khoschke@gmail.com.

1. **I have read and understood how my information is collected, stored and used.** *(Checkbox · Required)*

---

# S14 — Which photo rules apply?

*One question only. This is the branch point.*

**Photos and video are handled differently for clients under 18. Which applies?** *(Multiple choice · Required · **Go to section based on answer**)*

- The client is 18 or older → *Go to section 15*
- The client is under 18 → *Go to section 16*

> **Yes, this repeats something section 3 already knows.** Google Forms branching reads one question at a
> time and cannot remember an earlier answer, so a second branch is the only way to route juniors past
> the adult photos section. Worded as a photos question rather than a repeat of "how old are you", it
> reads as part of the section it introduces.
>
> Junior photo consent is collected in section 4, questions 15 and 16.

---

# S15 — Photos and video

> *Section description:* Progress photos are taken for your own tracking and are never shared or
> published without your consent. Separately, I sometimes take photos or video in the gym for social
> media and marketing. This is entirely optional and does not affect your training. You can withdraw
> consent at any time by telling me — I will stop using new material and remove existing material
> wherever practical.

1. **Photos and video for marketing and social media** *(Multiple choice · Required)*
   - I consent to photos and video of me, including progress photos, being used in Kinetic Hustl marketing and social media
   - I do not consent

---

# S16 — Confirmation

1. **Type your full name to confirm you accept these terms and conditions.** *(Short answer · Required)*
2. **Today's date** *(Date · Required)*
3. **Anything you would like to ask or flag before we start?** *(Paragraph · Not required)*

> *Confirmation message:* Thanks — that's everything. You'll get a copy of your answers by email. I'll be
> in touch to confirm your first session and set up your payment.
