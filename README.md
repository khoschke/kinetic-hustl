# Kinetic Hustl

Pricing structure, client agreements and business documentation for Kinetic Hustl —
Karl Hoschke, operating from Fitaz Gym, Kangaroo Point QLD.

**Health screening form:** https://forms.gle/T8yaRciEND7FJ2mU8 — everyone, before the first session
**Terms and conditions form:** https://forms.gle/EQy9Ly2KgeZmShJe7 — on sign-up

---

## What is here

| File | What it is | Who it is for |
| --- | --- | --- |
| `pricing-rates-and-terms.md` | **The price list.** Rates of record and client-facing terms | Any project or person that communicates pricing |
| `junior-onboarding.md` | The junior flow end to end: booking, the pre-first-session gates, first session, every session, ongoing | Karl's reference |
| `junior-messaging-policy.md` | Two-way messaging for under-18s: the rule, the guardrail, where it is captured | Karl's reference; the client-facing wording lives in the T&C form and the Participation Agreement |
| `pricing-strategy-internal.md` | The reasoning behind the prices — the four rules, revenue maths, positioning | **Internal only.** Never send to a client |
| `Kinetic-Hustl-Pricing.pdf` | One-page client price sheet | Attach to an email |
| `terms/client-agreements-complete.md` | Full text of all ten agreements in one file | Add to a Claude project |
| `terms/terms-and-conditions.md` | Clause source, review checklist, how to regenerate | Maintaining the agreements |
| `terms/google-form-questions.md` | Question set for the client T&C form ([build sheet](https://claude.ai/artifact/LybzL5S7BUuPfAYuMj4VWd)) | Maintaining the form |
| `intake/health-screening-form.md` | Question set for the health screening form ([build sheet](https://claude.ai/artifact/X9fFvvts4fzqfY5pmSsNUx)) | Maintaining the form |
| `terms/KH-Terms-*.docx` | Ten client-ready agreement templates | Send to a client |
| `terms/KH-Terms-Junior-Addendum.docx` | Full junior terms as one readable document | **Reference only.** Clients agree in the form |
| `terms/KH-Junior-Participation-Agreement.docx` | Junior-signed, plain language, **not legally binding** | **Print and hand to the junior.** The one document that is still signed on paper |
| `terms/generate-templates.js` | Builds the ten templates **and** the combined reference | Do not hand-edit the outputs |

## The two client forms

They do different jobs and must not overlap.

| | Health screening | Terms and conditions |
| --- | --- | --- |
| **When** | Before the first session, including a complimentary one | On sign-up |
| **Who** | Everyone | Clients who continue |
| **Collects** | APSS Stage 1, conditions, medications, care team, emergency contact, goals | Rate agreed, policies, the release |
| **Contains a release?** | **No** | Yes, the Consent to Participate in Training |
| **Refreshed** | Yearly | When the agreement changes |

The release exists in one place only. If it needs to change, it changes in
`terms/generate-templates.js` and then in the T&C form, and nowhere else.

## The rates

All prices include GST. Sessions are 45 minutes.

| Format | On the app | Not on the app |
| --- | --- | --- |
| 1-on-1 weekly | $88 per session + $22/week | $110 per session |
| 1-on-1 flexi (fortnightly) | $104.50 per session + $44/fortnight | $126.50 per session |
| 2-on-1 | $66 per person, per session + $22/week | $88 per person, per session |
| 3-on-1 (max three) | $55 per person, per session + $22/week | $77 per person, per session |
| Online coaching | $44 per week; casual sessions $121 | — |
| Casual | — | $143 per session |

These apply to **new clients**. Existing clients remain on their current arrangements until
that gap is closed deliberately — see the strategy document.

## Four rules

Every rate is derived from these, so a new situation has an answer rather than a negotiation.

1. Every price is a round ex-GST figure plus 10%
2. Not being on the app costs $22 more per session; the app costs $22 per week
3. Format ladder: $22 down from 1-on-1 to 2-on-1, then $11 down to 3-on-1
4. Commitment ladder ($16.50 per step) applies to 1-on-1 only

## Regenerating

The ten `.docx` templates and `terms/client-agreements-complete.md` are generated, not written.
Edit `terms/generate-templates.js`, then:

```
npm install docx
node terms/generate-templates.js
```

A hand edit to any generated file is lost on the next run.

The price sheet works the same way: `pricesheet.html` is the source, and the PDF is produced by
printing it to A4 from a browser.

## Policies held outside the repo

Two asthma documents live in Google Drive rather than here, because Drive holds the masters and
copying them in would create a second version to forget about.

| Document | Link | Who sees it |
| --- | --- | --- |
| **Junior Asthma Emergency Procedure** | [Drive](https://docs.google.com/document/d/1eg6UUZSWvMROiByQg7IO1teQgtT7Hsx774G3HQkoWXA/edit) | **Internal only.** Karl. Never linked in anything a client sees |
| **Asthma Safety for Junior Clients** (parent guide) | [Drive](https://docs.google.com/document/d/1or0bHqMoGeP1pQFsOqFkm00kpVdCrIdpE5S4pjkB4_M/view) | Client-facing. Shared by link, readable by anyone with it |

The parent guide is the client-facing version of the master. Both are based on Asthma Australia's
2026 Blue Reliever asthma first aid chart (v13), are reviewed each year at insurance renewal, and
are **updated together**. Changing one without the other is how they drift apart.

The master is the written asthma emergency response procedure required by condition v of the Child
Participation benefit in Guild policy P00329386. It applies to every client under 16, whether they
have asthma or not.

**Only the parent guide link goes in client-facing material.** It is the link in section 4 of the
health screening form. Permissions checked 12 November 2026: the guide is reader-for-anyone-with-link,
the master is owner-only.

---

## Which projects hold which file

Claude projects hold **copies**. Edit a file here and every project still has the old one until it is
re-uploaded. Fill this in and keep it current — it is the only thing standing between a change and a
project quietly reasoning from a stale copy.

| File | Projects holding it | Last uploaded |
| --- | --- | --- |
| `pricing-rates-and-terms.md` | Kinetic Hustl, Kinetic Hustl: Clients | 11 Oct 2026 |
| `pricing-strategy-internal.md` | Kinetic Hustl | 11 Oct 2026 |
| `junior-messaging-policy.md` | not yet uploaded | - |
| `terms/client-agreements-complete.md` | Kinetic Hustl, Kinetic Hustl: Clients | 11 Oct 2026 |
| `Kinetic-Hustl-Pricing.pdf` | Kinetic Hustl, Kinetic Hustl: Clients | 11 Oct 2026 |
| `terms/KH-Junior-Participation-Agreement.docx` | Kinetic Hustl, Kinetic Hustl: Clients | 11 Oct 2026 |

**How to use it.** After re-uploading a file, put today's date in its row. If the repo has a newer commit
touching that file than the date in the row, at least one project is stale.

```
git log -1 --format=%cd --date=short -- pricing-strategy-internal.md
```

**This table exists because the mechanism failed once already.** The October card surcharge work went
into the rates file, the agreements, both forms and the price sheet. `pricing-strategy-internal.md` sat
five weeks behind, still dated 23 August, because nobody re-uploaded it — and it was caught by reading
carefully rather than by any check. A date in a column would have caught it in seconds.

Only the files above belong in projects. The build sheets, the form question sets, the generator
and the emails in `admin/` are working files: useful here, noise in a project.

**The PDF is easy to forget.** It is generated from `pricesheet.html`, so a change to the price sheet
makes the PDF stale, and the PDF is the copy that gets emailed to clients. Regenerate it in the same
pass, then re-upload it.

**`Kinetic Hustl: Clients` does not hold `pricing-strategy-internal.md`**, which is deliberate: it is an
internal reasoning document and that project is for client work.

---

## Still open

- The ten reference templates have not been opened in Word since the 10 October regeneration. `KH-Junior-Participation-Agreement.docx` is the only one printed and handed to a client, and it has no fees section, so the October fee change does not reach it
- An annual re-screen was considered and **parked**. Not a requirement: the policy asks for screening before participation, not annually, and the T&Cs oblige clients to report changes. Reasoning kept at the end of `intake/health-screening-form.md` in case it comes up again
- APSS Stage 1 wording must be copied verbatim from the current ESSA/Fitness Australia PDF
- Flare-related cancellations are handled at Karl's discretion and are deliberately not written into any document
- **Write the asthma emergency response procedure.** Guild requires one for **every** under-16, not only those with a known history, so that Karl knows what to do if any child has an attack. It is a document Karl holds, not a client-facing term, and it does not exist yet. Condition v is not met until it does
- **Confirm what Trainerize retains.** The junior messaging guardrail promises a parent the record of what has been exchanged. Confirm how long message history is kept and whether it survives archiving a client. If it is not indefinite, export each junior thread quarterly and on exit
- **Write the child-safety disclosure procedure.** `junior-messaging-policy.md` carves out disclosures of harm from the ordinary tell-the-guardian rule, because routing one to a guardian who is implicated would be the wrong move. The carve-out is stated; the procedure behind it is not written
- The 12-week minimum term, and whether the Privacy Act applies, are both worth one legal review
- Existing clients have not been mapped against the new structure
