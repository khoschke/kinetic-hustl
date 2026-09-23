# Kinetic Hustl — Health Screening Google Form

Question set for the form every client completes **before their first session**, including a
complimentary one. It replaces the old *Kinetic Hustl Waiver Form*.

**Build sheet:** https://claude.ai/artifact/X9fFvvts4fzqfY5pmSsNUx — the same content laid out
section by section for typing into Google Forms.

---

## What this form is, and what it is not

| | |
| --- | --- |
| **Purpose** | Screen for safety, understand the person, and work out where my role stops and someone else's starts |
| **Who completes it** | Everyone, before session one. Complimentary session, paid client, online client, junior. |
| **When** | Before the first session, and again once a year |
| **Contains a release or indemnity?** | **No.** Deliberately. |

The old form ended with one line doing all the legal work: *"I will not hold Kinetic Hustl liable in
any way for any injuries that may occur while I am training."* That line is gone. A blanket
exclusion like it is the kind of term that tends not to survive, and it duplicated the Consent to
Participate in Training that already sits in the T&C form and is drafted properly.

So the split is:

- **This form** collects information and consent to *collect* it.
- **The T&C form** is where anything is agreed to: the rate, the policies, the release.

A client doing a complimentary session fills in this form only. If they sign up, they then fill in
the T&C form. That is the common pathway, and neither form asks them the same thing twice.

## Mechanics worth knowing before you build it

**A required question only blocks submission if the respondent reaches it.** Questions inside skipped
branch sections are not enforced. Same rule as the T&C form: nothing conditional is ever marked
optional, it is just placed where the wrong people cannot reach it.

**Google Forms cannot branch on a date.** So the under-18 gate has to be an explicit multiple choice
question, not the date of birth field.

**Google Forms cannot branch on "did you answer yes to any of these seven".** Branching reads one
question. That is why section 6 exists: a single summary question the respondent answers themselves,
which drives the clearance branch. It is a prompt rather than a hard lock. The real control is you
reading the response before you book them in.

**A branch question needs its own section.** Branching fires at the end of the section containing it,
so sections 2, 6 and 9 end on their branch question.

## Settings

| Setting | Value | Why |
| --- | --- | --- |
| Collect email addresses | **Verified** | Ties the response to a real address |
| Send responders a copy | **Always** | The client holds their own copy of what they disclosed |
| Limit to 1 response | **Off** | You want a fresh screen every year, not one frozen record |
| Progress bar | **On** | It is a long form, show people where they are |
| Link to a spreadsheet | **Yes** | Becomes your screening register |

## Section map

```
 1  About you                      → continue
 2  Who is training                BRANCH on age
 3  Parent or guardian             BRANCH on under 16      (under 18 only)
 4  Under 16: safety requirements  → section 5             (under 16 only)
 5  Pre-exercise screening
 6  Screening summary              BRANCH on yes / no
 7  Before your first session      → section 8             (any yes only)
 8  Your health
 9  Ongoing conditions             BRANCH on yes / no
10  When symptoms flare            → section 11            (fluctuating only)
11  Your care team
12  Where you are now
13  What you want
14  Getting you booked in
15  Privacy and declaration        → submit
```

Google Forms numbers sections sequentially, so there is no "2a" or "3a". Sections 4, 7 and 10 each need
their **After section** dropdown set explicitly to 5, 8 and 11. Miss one and a client falls into a
section that does not apply to them.

**Identity comes before the branching.** An earlier draft opened with the age question and collected
name and emergency contact afterwards, which meant the under-16 section asked for a *second* emergency
contact before the first one had been asked for. Everyone answers section 1, so the primary contact is
always on file before the junior questions are reached.

Google Forms numbers sections sequentially, so there is no "2a". The under-16 section **is** section 3,
and everything after it shifts. Sections 3, 7 and 10 each need their **After section** dropdown set
explicitly to 4, 8 and 11. Miss one and a client falls into a section that does not apply to them.

Sections 6 and 9 each need their **After section** dropdown set explicitly. Miss one and the client
falls through into a section that does not apply to them.

---

# 1 — About you

*All required unless stated. Short answer unless stated.*

1. Full name
2. Preferred name *(Not required · "If it is different to the above.")*
3. Mobile number *(Response validation: regular expression, "Matches", `^(\+?61|0)[2-478][\d\s-]{7,}$` · Error text: "Please enter an Australian mobile number, for example 0412 345 678")*
   *Helper text:* **If the person training does not have their own mobile, enter a parent or guardian's number.**
4. Date of birth *(Date)*
5. Suburb
6. Emergency contact — full name
7. Emergency contact — mobile number
8. Emergency contact — relationship to you

> **Why validation on the mobile field.** In the old form's 25 responses you had `9415783274` (not an
> Australian mobile at all), `411677096` and `434981388` (leading zero dropped), `0433-042-849` and
> `0475 820 641 `. Half of them will not dial from a phone.
>
> **Home address is not asked here.** You only need it for the direct debit agreement, so it stays in
> the T&C form. Collect health information and nothing more than you need alongside it.

---

# 2 — Who is training

*Two questions. The second one branches.*

1. **Who is completing this form?** *(Multiple choice · Required)*
   - The person who will be training
   - A parent or guardian, completing it on their behalf

   > Verified email tells you which account submitted the form, not who typed the answers. A guardian
   > filling in a 12-year-old's screen from their own address is otherwise indistinguishable from the
   > child doing it.

2. **How old is the person who will be training?** *(Multiple choice · Required · **Go to section based on answer**)*
   - 18 or older → *Go to section 5*
   - Under 18 → *Go to section 3*

   > **Two options, not three.** An earlier draft split this into 18+, 16-17 and under 16, but 16-17 and
   > under 16 both routed to the same place, and section 3 asks the under-16 question anyway. One
   > distinction per question.

---

# 3 — Parent or guardian

*Reached by anyone under 18. Ends on a branch question, so no After section setting is needed.*

> *Section description:* If you are under 18, a parent or guardian needs to complete this part.

*All required.*

1. Parent or guardian full name *(Short answer)*
2. Parent or guardian mobile number *(Short answer)*
3. Parent or guardian email *(Short answer)*
4. Relationship to the person training *(Short answer)*
5. **I am the parent or guardian named above. I consent to this person training with Kinetic Hustl, and I have completed or reviewed the health information in this form.** *(Checkbox · Required ·* "I consent"*)*

5. **Is the person training under 16?** *(Multiple choice · Required · **Go to section based on answer**)*

   - Yes → *Go to section 4*
   - No → *Go to section 5*

   > A 16 or 17 year old must not fall through into section 3. Without this branch they are asked the
   > under-16 safety questions, which do not apply to them.

> **Junior clients sign the Junior Athlete T&Cs, not the standard set.** The standard Consent to
> Participate in Training contains "I certify that I am 18 years or older", so a minor cannot sign it.

---

# 4 — Under 16: safety requirements

*Reached only where the answer to 3.5 is Yes. After this section → **Go to section 5**.*

> *Section description:*
>
> A few extra questions for clients under 16. These are not box-ticking. They are the conditions my
> insurance requires before I can train someone under 16, and I would ask them anyway.

1. **Does the person training have asthma, or have they ever been prescribed a reliever inhaler?** *(Multiple choice · Required)*
   - No, never
   - Diagnosed asthma, currently using medication
   - Diagnosed asthma, not currently using medication
   - Has used a reliever in the past but no current diagnosis
   - Not sure

2. **If yes to any of the above: what reliever do they use, do they carry it to training, and what sets an attack off?** *(Paragraph · Not required · "Type N/A if this does not apply.")*

3. **Has the person training ever had an asthma attack that needed immediate medical attention?** *(Multiple choice · Required ·* No / Yes, more than 12 months ago / Yes, in the last 12 months / Not sure*)*

4. **A second emergency contact, other than the parent or guardian above** *(three Short answer questions, all Required: name, mobile, relationship)*

   *Helper text:* **Someone else we could reach if the first two numbers do not answer.**

5. **Name and practice of their GP** *(Short answer · Required)*

6. **I consent to Karl calling an ambulance if he judges it necessary, and I understand ambulance costs are my responsibility.** *(Checkbox · Required ·* "I consent"*)*

7. **I understand that a parent, guardian or other responsible adult must be present for sessions with a client under 16.** *(Checkbox · Required ·* "I understand"*)*

> **Why questions 1 to 3 are here and this specific.** Condition v of the policy's child participation
> clause requires "an asthma management plan including an emergency response plan". You cannot write one
> from a yes/no tick, and asthma is the single most common thing that turns a normal session with a
> 12-year-old into an emergency.
>
> **Question 7 is the supervision condition**, subject to the written answer from Guild on whether Karl
> himself satisfies it. Do not soften this wording until that answer is in.

---

# 5 — Pre-exercise screening

> *Section description:*
>
> These are the standard Australian pre-exercise screening questions. Answer them as accurately as
> you can.
>
> A yes does not mean you cannot train. It means we get the right advice first, and then train
> properly.

*Seven questions, each Yes / No, all Required.*

1. Has your doctor ever told you that you have a heart condition, or have you ever suffered a stroke?
2. Do you ever experience unexplained pains in your chest at rest or during physical activity or exercise?
3. Do you ever feel faint or have spells of dizziness during physical activity or exercise that causes you to lose balance?
4. Have you had an asthma attack requiring immediate medical attention at any time over the last 12 months?
5. If you have diabetes (type 1 or type 2), have you had trouble controlling your blood glucose in the last 3 months?
6. Do you have any diagnosed muscle, bone or joint problems that you have been told could be made worse by participating in physical activity or exercise?
7. Do you have any other medical condition that may make it dangerous for you to participate in physical activity or exercise?

> **For a client under 16, the guardian answers these on their behalf.** Add to the section
> description: "If you are completing this for someone under 16, answer about them, not about
> yourself." APSS Stage 1 is written for adults and a guardian will otherwise answer about themselves.
>
> **Screening must be completed before participation**, not before invoicing. Condition iii of the
> policy's child participation clause says "prior to participation in any exercise program", so the
> submission timestamp is the evidence. Do not let anyone train on a promise to fill it in later.
>
> **Copy the exact wording from the source, do not trust my transcription.** This is Stage 1 of the
> **Adult Pre-Exercise Screening System (APSS)**, the tool developed jointly by Exercise & Sports
> Science Australia, Fitness Australia and Sports Medicine Australia. Download the current PDF and
> paste the questions verbatim. The wording above is close but the point of using a recognised
> standard is that it is *the* standard, word for word.
>
> **Why bother.** Your old list was an ad-hoc set of tick boxes with no consequence attached. Two
> clients ticked *Heart trouble/history* and went straight through to submission with nothing
> triggered. APSS is what your insurer and Fitness Australia expect to see, and it has the clearance
> trigger built in.

---

# 6 — Screening summary

*One question only. This is the branch point.*

**Did you answer yes to any of the seven questions above?** *(Multiple choice · Required · **Go to section based on answer**)*

- No → *Go to section 8*
- Yes → *Go to section 7*

> **Two options only.** A "not sure" here would be someone failing to recall seven answers they gave on the
> previous screen. It adds a branch that means nothing and a column you cannot act on.

---

# 7 — Before your first session

*Reached only by a yes. After this section → **Go to section 8**.*

> *Section description:*
>
> A yes here is common and it is not a barrier. It means I want to hear from your doctor or an allied
> health professional before we start loading things up. Most of the time that is a short conversation
> and we get on with it.

1. **Which ones did you answer yes to?** *(Checkboxes · Required)*
   - Heart condition or stroke
   - Chest pain
   - Faintness or dizziness
   - Asthma attack in the last 12 months
   - Blood glucose control
   - Muscle, bone or joint problem
   - Another medical condition

2. **Have you already talked to a doctor or allied health professional about exercising with this?** *(Multiple choice · Required)*
   - Yes
   - No
   - Not yet, but I am seeing someone soon

3. **If yes, what did they advise?** *(Paragraph · Not required)*

4. **I understand Karl may ask me to get clearance from my doctor or an allied health professional before we start.** *(Checkbox · Required ·* "I understand"*)*

---

# 8 — Your health

*All Paragraph and Required unless stated. Every "list" question takes* "Type None if there are none."

1. **Please list any medical conditions you have been diagnosed with.**
2. **Please list any injuries, current or past, that still affect you.** *("Roughly when it happened, and whether it was treated.")*
3. **Have you had surgery in the last two years, or any surgery that still affects how you move?**
4. **Please list any medications or supplements you take regularly.** *("This matters more than people expect. Some medications change how your heart rate responds to exercise, which changes how I program.")*
5. **Are you currently pregnant, or have you given birth in the last 12 months?** *(Multiple choice · Required)*
   - No
   - Yes, currently pregnant
   - Yes, given birth in the last 12 months
   - Not applicable
   - Prefer not to say
6. **If you answered yes, is there anything you have been advised to avoid?** *(Paragraph · Not required)*
7. **Do you smoke or vape?** *(Multiple choice · Required ·* No / Occasionally / Daily / I quit in the last 12 months*)*
8. **Is there anything about your mental health that would help me train you well?** *(Paragraph · Not required · "Only what you are comfortable sharing.")*

> **What changed from the old form.** The old health question was a checkbox list with `None` sitting
> in the same list as the conditions, so a client could tick both. One response came through as a
> single space character and the form accepted it, because the question was not required. And
> *"Are you pregnant?"* was asked of every respondent with only Yes and No available, including men
> and a client born in 1957. All 25 answered No, which tells you the question was doing nothing.

---

# 9 — Ongoing conditions

*One question only. This is the branch point.*

> *Section description:* Some things are constant. Others come and go, and those are the ones that
> are hard to program around without knowing more.

**Do you have a condition that comes and goes, or affects some days more than others?** *(Multiple choice · Required · **Go to section based on answer**)*

*Help text: For example asthma, migraine, endometriosis, arthritis, IBS, chronic fatigue, back pain, anxiety, an autoimmune condition, or a long-term injury that flares up.*

- Yes → *Go to section 10*
- No → *Go to section 11*

---

# 10 — When symptoms flare

*Reached only by a yes. After this section → **Go to section 11**.*

> *Section description:*
>
> A tick box tells me a condition exists. It does not tell me what to do on a bad week. This bit does.

1. **Which condition are you answering about?** *(Short answer · Required · "If there is more than one, answer about the one that affects training most and mention the others at the end.")*

2. **Roughly how many days a month do you lose to symptoms?** *(Multiple choice · Required)*
   - None at the moment
   - 1 to 2
   - 3 to 5
   - 6 to 10
   - More than 10
   - It varies a lot

3. **What does a flare look like for you?** *(Paragraph · Required · "What you notice first, how long it usually lasts, and how it affects your energy, sleep or movement.")*

4. **Is there anything that reliably sets it off, and anything that reliably helps?** *(Paragraph · Required)*

5. **When a flare hits, what would you want me to do?** *(Checkboxes · Required · include Other)*
   - Train as planned, I will tell you if I need to change something
   - Keep the session but drop the intensity
   - Swap to movements that do not aggravate it
   - Shorten the session
   - Move to mobility and recovery work only
   - Message me first so we decide together
   - Let you know as early as I can so we can work out what to do

6. **Is there anything I should avoid entirely?** *(Paragraph · Required · "Type None if there is nothing.")*

7. **Any other conditions like this I should know about?** *(Paragraph · Not required)*

> **Deliberately no promise about fees here.** An option reading "reschedule the session" would imply
> the 24-hour forfeit rule does not apply, which is not what any document says. Flare-related
> cancellations are handled at Karl's discretion, case by case, and are not written into the
> agreements as an entitlement. The wording above captures what the client would want without
> promising an outcome.

---

# 11 — Your care team

> *Section description:*
>
> If someone else is already looking after part of this, I want to work alongside them rather than
> guess. Knowing who they are means I can send you back to the right person instead of stepping into
> something that is not mine.

1. **Who else is involved in your health care?** *(Checkboxes · Required · include Other)*
   - GP
   - Physiotherapist
   - Exercise physiologist
   - Osteopath or chiropractor
   - Specialist
   - Dietitian or nutritionist
   - Psychologist or counsellor
   - Remedial massage therapist
   - Nobody at the moment

2. **For each person you ticked, give me their name, their discipline, and whether they are actively managing something or you just see them occasionally.** *(Paragraph · Required)*

   *Help text:* Example: *Dr Brown, GP, I see her every three months for thyroid. Alex at my physio clinic, actively treating my shoulder right now.*

   > Keep example names generic and do not name a real practice or suburb. The first draft used a
   > plausible doctor's name at a real Brisbane suburb, which could have read as a real person.

3. **Is anyone currently treating or managing something that training could affect?** *(Multiple choice · Required ·* Yes / No / Not sure*)*

4. **If we needed to, would you be happy for me to contact them about your training?** *(Multiple choice · Required)*
   - Yes, you can contact them
   - Ask me first each time
   - No
   - Not applicable

> **Question 4 is a consent, not a preference.** Health information is sensitive information. Do not
> contact anyone's practitioner without it, and treat *"Ask me first each time"* as literal.

---

# 12 — Where you are now

> *Section description:* No right answers here. This is the bit that tells me how to pitch the
> starting point.

1. **What does your training look like at the moment?** *(Multiple choice · Required)*
   - Nothing structured right now
   - Just starting, or starting again
   - Training on and off
   - Training consistently, want to train better
   - Training consistently and working towards something specific

2. **Have you trained regularly before? What worked, and what did not?** *(Paragraph · Required)*

3. **When training has stopped in the past, what got in the way?** *(Checkboxes · Required · include Other)*
   - Time
   - Work hours
   - Kids or caring responsibilities
   - Fatigue or sleep
   - Injury or pain
   - Motivation dropped off
   - Not knowing what to do
   - Cost
   - Travel
   - Nothing in particular

4. **Of those, which is the biggest one right now?** *(Short answer · Required)*

5. **How are you sleeping at the moment?** *(Multiple choice · Required ·* Well most nights / Mixed / Poorly most nights / It varies a lot*)*

> **Questions 3 and 4, with the confidence question now in section 14, replace *"How important is it for you to achieve your goals?"***, which
> scored 4 to 10 across 25 responses and mostly 8 to 10. Nobody rates their own goals a 2, so the
> question separates nobody.
>
> Confidence does have variance, and it is the more useful number: someone who wants four days and is
> a 4 on confidence is telling you the load is too heavy before they have started. That is a Law 2
> problem, and the fix is to take plates off the sled rather than to sell them four days.

---

# 13 — What you want

1. **What are you hoping to get out of training?** *(Checkboxes · Required · include Other)*
   - Reduce body fat
   - Weight loss
   - Build muscle
   - Improve muscle tone
   - Get stronger
   - Improve cardiovascular fitness
   - Sports conditioning
   - Move without pain
   - Rehabilitation
   - Stress management
   - General health and energy

2. **If we get this right, what is different in 12 months?** *(Paragraph · Required)*

3. **Is there an event or date you are working towards? If so, what and when?** *(Short answer · Required · "Type No if there isn't one.")*

4. **What made you get in touch now?** *(Paragraph · Required)*

5. **What would make your first session worth your time?** *(Paragraph · Required)*

> **Question 4 is the one the old form was missing entirely**, and it is the most useful question on
> the page. Something changed recently or they would have got in touch last year.
>
> **Question 2 replaces *"When would you like to achieve these results?"***, which produced `NA`,
> `Progressively`, `ASAP lol` and one blank. Asking what is different instead of when gets you an
> answer you can actually coach towards.
>
> **Question 5 was optional in the old form and 17 of 25 left it blank.** Required, and asked in
> plainer words, it should fill in.

---

# 14 — Getting you booked in

1. **How many days a week do you want to train in total?** *(Multiple choice · Required ·* 1 to 7*)*
2. **Of those, how many would be with me?** *(Multiple choice · Required ·* 1 / 2 / 3 / 4 / Not sure yet*)*
3. **How long do you want each session to be?** *(Multiple choice · Required ·* 30 minutes / 45 minutes / 60 minutes / Not sure *· Help text: "Standard Kinetic Hustl sessions are 45 minutes.")*
4. **Which days suit you?** *(Checkboxes · Required ·* Monday to Sunday*)*
5. **Which times suit you?** *(Checkboxes · Required)*
   - Early morning, before 7am
   - Morning, 7am to 10am
   - Midday, 10am to 2pm
   - Afternoon, 2pm to 5pm
   - Evening, after 5pm
   - Flexible
6. **How confident are you that you can stick to that?** *(Linear scale 1 to 10 · Required · "Not confident" to "Very confident")*

7. **Anything else about your schedule I should know?** *(Paragraph · Not required)*

> **This question used to sit two sections earlier**, where it asked about "the number of days you are
> about to tell me about". Forward-referencing an answer the client has not given yet reads as badly as
> it sounds. Asked straight after they have picked days and times, it makes sense and gets a truer answer.

> **This section is four questions shorter than the old one.** The old form asked total training days,
> then *"for strength programming purposes"* days, then preferred days, then strength days again.
> Five people answered `N/a` to the second set and one contradicted herself. One pair is enough.
>
> **Session length is now multiple choice.** As free text it produced seventeen different spellings of
> three answers, including `45-60 months` and `TBC`.

---

# 15 — Privacy and declaration

> *Section description — this is your collection notice. Adjust the email address.*
>
> **How I handle this information**
>
> What you have given me includes health information, so I want to be clear about what happens to it.
>
> I collect it to screen you safely, to design a program that suits you, and to know who to refer you
> back to if something is outside what I do. I store it in Google Workspace and I am the only person
> with access. I do not share it with anyone without your permission, except where the law requires it
> or in a medical emergency.
>
> You can ask to see it, correct it, or have it deleted at any time. Email me at karl@kinetichustl.com.au.

*Each a Checkbox question with a single option, Required.*

1. **I have read the above and I consent to Kinetic Hustl collecting and holding this health information for the purposes described.** → "I consent"
2. **The information I have given is complete, honest and accurate to the best of my knowledge.** → "I confirm"
3. **I will tell Karl as soon as anything about my health, injuries or medications changes.** → "I agree"

4. **Please type your full name.** *(Short answer · Required · "This is your signature on the information above.")*

> **Note what is not here.** No release, no indemnity, no exclusion of liability. All of that lives in
> the T&C form and nowhere else, so there is one version of it rather than two that can drift apart.
>
> **Set the option text to a real assent.** In the old form the checkbox option was literally
> `Please check box`, so your register of 25 signed waivers records the words "Please check box" next
> to every client's name. An instruction, not an agreement.

---

# Confirmation message

> Thanks, that is everything I need.
>
> I read every one of these properly before we train, so if anything you have told me needs a
> conversation first, I will be in touch before your session rather than on the day.
>
> A copy of your answers has been emailed to you. If anything changes between now and when we train,
> just let me know.

---

# Before you send it to anyone

1. **Test submit five times:** over 18 with no yes answers, over 18 with a yes, a 16 year old, a 12 year old, and someone with a fluctuating condition. Check each run asks only what it should. The classic failure is a 16 year old landing in section 4 and being asked the under-16 questions, which means the section 3 branch is wired wrong.
2. **Re-test after any structural edit.** Reordering sections silently breaks branch targets.
3. **Check sections 4, 7 and 10 have their After section dropdown set** to sections 5, 8 and 11 respectively.
4. **Diarise a yearly re-screen.** Health changes, and a screen from 2025 is not a screen.
