# Kinetic Hustl

Pricing structure, client agreements and business documentation for Kinetic Hustl —
Karl Hoschke, operating from Fitaz Gym, Kangaroo Point QLD.

**Terms and conditions form:** https://forms.gle/tPDFx94HQAFqNQkL6

---

## What is here

| File | What it is | Who it is for |
| --- | --- | --- |
| `pricing-rates-and-terms.md` | **The price list.** Rates of record and client-facing terms | Any project or person that communicates pricing |
| `pricing-strategy-internal.md` | The reasoning behind the prices — the four rules, revenue maths, positioning | **Internal only.** Never send to a client |
| `Kinetic-Hustl-Pricing.pdf` | One-page client price sheet | Attach to an email |
| `terms/client-agreements-complete.md` | Full text of all ten agreements in one file | Add to a Claude project |
| `terms/terms-and-conditions.md` | Clause source, review checklist, how to regenerate | Maintaining the agreements |
| `terms/google-form-questions.md` | Question set for the client T&C form | Maintaining the form |
| `intake/health-screening-form.md` | Question set for the health screening form | Maintaining the form |
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

## Still open

- The ten templates have not been opened in Word since the last regeneration
- The health screening form has not been built in Google Forms yet
- An annual re-screen form is planned: APSS Stage 1 again plus what has changed, combined with a yearly review that captures client feedback. Spec notes at the end of `intake/health-screening-form.md`
- APSS Stage 1 wording must be copied verbatim from the current ESSA/Fitness Australia PDF
- Flare-related cancellations are handled at Karl's discretion and are deliberately not written into any document
- The under-16 supervision clause assumes a responsible adult **other than Karl**. If Guild confirms Karl's own supervision satisfies the condition, clause 8 of the addendum can be relaxed
- The 12-week minimum term, and whether the Privacy Act applies, are both worth one legal review
- Existing clients have not been mapped against the new structure
