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
S1  Your details            → continue
S2  Health and medical      → continue
S3  Consent to participate  → continue
S4  Policies (all clients)  → continue
S5  Which format?           → GO TO SECTION BASED ON ANSWER
S6  1-on-1 branch           → go to S10
S7  2-on-1 branch           → go to S10
S8  3-on-1 branch           → go to S10
S9  Casual branch           → go to S10
S10 Payment                 → continue
S11 Your information        → continue
S12 Photos and video        → continue
S13 Confirmation            → submit
```

The four branch sections each need their **After section** dropdown set to *Go to section 10*. Miss one
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
5. Emergency contact — name
6. Emergency contact — mobile number
7. Emergency contact — relationship to you

---

# S2 — Health and medical

> *Section description:* This information is used to design a program that is safe and appropriate for
> you. It is never shared without your permission except where required by law.

1. **Has a doctor or medical practitioner ever advised you not to exercise, or to exercise only under supervision?** *(Yes / No · Required)*
2. **Please list any medical conditions, injuries, surgeries, medications or physical limitations I should know about.** *(Paragraph · Required · "Type None if there are none.")*
3. **Are you currently pregnant, or have you given birth in the last 12 months?** *(Yes / No / Prefer not to say · Required)*
4. **Is there anything else about your health, physically or mentally, that would help me train you well?** *(Paragraph · Not required)*
5. **I agree to tell Karl immediately if any of the above changes.** *(Checkbox · Required ·* "Yes, I agree"*)*

---

# S3 — Consent to participate in training

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

# S4 — Policies

*Applies to every client. Each a Checkbox question with a single option, Required. The policy wording
sits in the question itself, so the tick is against the wording rather than a heading.*

1. **Session cancellation.** There is a 24-hour cancellation policy for all training sessions. Sessions cancelled with 24 hours' notice or more will be rescheduled where possible. Sessions cancelled within 24 hours of the booking will be forfeited. → "I have read and understood"

2. **Direct debit cancellation.** There is a 30-day cancellation policy for all direct debit agreements. Notice is required by email. → "I have read and understood"

3. **Gym access.** If I train in person at Fitaz Gym, I am responsible for holding my own valid gym access for every session I attend. Gym membership is separate from training fees and is arranged directly with Fitaz Gym. → "I have read and understood"

*Conditional wording matters: an online coaching client does not train at Fitaz, so an unqualified statement would be untrue for them — and it is a required tick.*

---

# S5 — Which format are you training in?

*One question only. This is the branch point.*

**Which format are you training in?** *(Multiple choice · Required · **Go to section based on answer**)*

- 1-on-1 → *Go to section 6*
- 2-on-1, training with one other person → *Go to section 7*
- 3-on-1, small group of up to three → *Go to section 8*
- Casual, booked as needed → *Go to section 9*

> **No "not sure" option.** A respondent who takes it would skip every agreement section and still reach the
> confirmation, producing a submission that looks complete but records no format and no rate. If a client does
> not know their format, the form should not be in their hands yet.

---

# S6 — 1-on-1

*After this section → **Go to section 10**.*

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

# S7 — 2-on-1

*After this section → **Go to section 10**.*

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

# S8 — 3-on-1

*After this section → **Go to section 10**. Identical to S7 with these changes:*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - With app access — $55 per person, per session, plus $22 per week
   - Without app access — $77 per person, per session

3. **Who are you training with?** *(Short answer · Required)*

7. **Additional sessions: 3-on-1 $55 or $77, 2-on-1 $66 or $88, 1-on-1 $88 or $110, depending on app access.** *(Checkbox · Required ·* "Noted"*)*

*Questions 2, 4, 5, 6 and 8 are word for word the same as S7.*

---

# S9 — Casual

*After this section → **Go to section 10**. No minimum-term question here — none applies.*

1. **Which rate applies to you?** *(Dropdown · Required)*
   - With app access — $121 per session, and I hold online coaching at $44 per week
   - Without app access — $143 per session

2. **I agree to the rate I have selected above. All prices include GST.** *(Checkbox · Required ·* "I agree"*)*

3. **Casual sessions are booked and paid as required. No minimum term applies.** *(Checkbox · Required ·* "I have read and understood"*)*

---

# S10 — Payment and start date

*Wording here has to work for all four branches, including casual. The billing cycle itself is confirmed
inside each branch, so it is deliberately not repeated here.*

1. **Payment is by direct debit through Ezidebit unless we have agreed otherwise. Ezidebit transaction fees are charged in addition to the amounts above and appear on the debit.** *(Checkbox · Required ·* "I have read and understood"*)*

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

# S11 — Your information

> *Section description:* To coach you I collect personal details, health and medical information,
> training records and body composition measurements. This is used to design and adjust your program and
> to manage your account. It is stored in my own records, and — if you have app access — in the training
> app, which is operated by a third-party provider. Your information is never sold. It is shared only
> where you ask me to, or where I am required to by law. You can ask to see it, correct it, or have it
> deleted once your training has ended, by emailing khoschke@gmail.com.

1. **I have read and understood how my information is collected, stored and used.** *(Checkbox · Required)*

---

# S12 — Photos and video

> *Section description:* Progress photos are taken for your own tracking and are never shared or
> published without your consent. Separately, I sometimes take photos or video in the gym for social
> media and marketing. This is entirely optional and does not affect your training. You can withdraw
> consent at any time by telling me — I will stop using new material and remove existing material
> wherever practical.

1. **Photos and video for marketing and social media** *(Multiple choice · Required)*
   - I consent to photos and video of me, including progress photos, being used in Kinetic Hustl marketing and social media
   - I do not consent

---

# S13 — Confirmation

1. **Type your full name to confirm you accept these terms and conditions.** *(Short answer · Required)*
2. **Today's date** *(Date · Required)*
3. **Anything you would like to ask or flag before we start?** *(Paragraph · Not required)*

> *Confirmation message:* Thanks — that's everything. You'll get a copy of your answers by email. I'll be
> in touch to confirm your first session and set up your payment.
