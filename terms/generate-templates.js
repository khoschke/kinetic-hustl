// Generates the Kinetic Hustl client T&C templates.
//   npm install docx
//   node terms/generate-templates.js
// Writes eight .docx files: four formats x with/without app access.
// Edit wording here, not in the .docx files — hand edits are lost on the next run.

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle
} = require('docx');
const fs = require('fs');
const path = require('path');

// Outputs go next to this script, not to the caller's working directory. Running
// `node terms/generate-templates.js` from the repo root used to write eleven files
// into the root and leave terms/ untouched.
const out = (name) => path.join(__dirname, name);

const ABN = "51 607 358 310";
const BIZ = `Kinetic Hustl. — Karl Hoschke  ·  ABN ${ABN}  ·  Fitaz Gym, 101 Main Street, Kangaroo Point QLD 4169  ·  khoschke@gmail.com  ·  0434 869 519`;

const consentBody = [
  "I acknowledge that as a condition of my participation I do so at my own risk. I accept full and complete responsibility for my health, wellness, medical, physical, mental and emotional wellbeing.",
  "I understand that all personal training sessions are completed under the guidance of a registered & qualified trainer with current qualifications subject but not limited to Bachelor of Exercise and Movement Science, First Aid, CPR, and full public and professional indemnity insurance.",
  "I accept all risks and hereby indemnify and release the trainer or any person or body directly and indirectly associated with the trainer against all liability, claims, demands, and proceedings arising out of my participation in this activity. This means I agree to hold the trainer free and harmless of any and all liability for death, injury or health complication that may result from or be aggravated by my participation in personal training or any physical activity under their guidance or from any program provided.",
  "I acknowledge that participation in this activity may involve a risk of serious injury, illness, or in rare circumstances death may occur.",
  "I assume the risk of, and the responsibility for damage to, or loss of property, resulting from my participation in the fitness service.",
  "I recognise the difficulties associated with the activity and attest I am physically fit to participate safely, and that a qualified medical practitioner has not advised me otherwise. In conjunction with this I acknowledge the recommendation that I obtain a doctor's written approval prior to participating in the activity. In the event that I become aware of any medical condition, injury or impairment that will be detrimental to my health my trainer will be immediately informed.",
  "I hereby state that all information I have supplied is complete, honest and whole.",
  "I have disclosed any information that is important in regards to my health, physical and medical condition.",
  "I have read and understand the foregoing. Any questions, which may have occurred to me, have been answered to my satisfaction.",
  "I accept by continuing to participate in this activity I am bound to the terms of this agreement.",
  "I certify that I am 18 years or older and have read this document and fully understand it.",
  "I fully understand that I am forever giving up in advance any right to sue or make claims against the trainer I am releasing, I am not under any physical or emotional duress to sign.",
];


// ------------------------------------------------------------- clause text ---
const POLICIES = {
  sessionCancellation: ["Session cancellation and credits",
    "There is a 24-hour cancellation policy for all training sessions. Sessions cancelled with 24 hours' notice or more are credited to your account. A credit can be used to rebook straight away or held and used later. Sessions cancelled within 24 hours of the booking are forfeited.",
    "Credits expire three months from the date of the cancelled session. A credit may be extended at my discretion. Credits stay usable through your notice period and lapse when this agreement ends. Credits are not refundable and cannot be transferred to another person."],
  directDebit: ["Direct debit cancellation",
    "There is a 30-day cancellation policy for all direct debit agreements. Notice is required by email."],
  gymAccess: ["Gym access",
    "If you train in person at Fitaz Gym, you are responsible for holding your own valid gym access for every session you attend. Gym membership is separate from your training fees and is arranged directly with Fitaz Gym. Speak with Karl or Fitaz Gym front of house for options."],
  attendance: ["Attendance of other participants",
    "Your rate does not change if another participant is unable to attend. The session runs as scheduled for whoever attends, at the rate you have agreed. No adjustment is made in either direction."],
  groupSize: ["Change to group size",
    "If a participant gives notice or leaves, the Trainer will tell you as soon as they know and confirm in writing the rate that would apply to the new group size. You will have at least two weeks' notice before any new rate takes effect, and the Trainer will use that time to look for a replacement. Your rate does not change unless you agree to the new rate in writing. If you would rather not continue at the new rate, you may end this agreement at that point with no further notice period and no fee."],
  separateAgreements: ["Separate agreements",
    "Each participant holds their own agreement and their own payment arrangement. Participants are not jointly responsible for one another's fees."],
};

const INFO_WITH_APP = "To coach you I collect personal details, health and medical information, training records and body composition measurements. This information is used to design and adjust your program and to manage your account. It is stored in the training app and in my own records. The app is operated by a third-party provider, so your information is held on their systems as well as mine.";
const INFO_NO_APP = "To coach you I collect personal details, health and medical information, training records and body composition measurements. This information is used to design and adjust your program and to manage your account. It is stored in my own records.";
const INFO_COMMON = "Your information is not sold, and is not shared with anyone else except where you ask me to (for example with your doctor or physiotherapist) or where I am required to by law. You can ask to see the information I hold about you, ask me to correct it, or ask me to delete it once your training has ended, by emailing khoschke@gmail.com.";
const PHOTOS_PROGRESS = "Progress photos are taken for your own tracking. They are stored with your records and are never shared or published without your consent.";
const PHOTOS_MARKETING = "Separately, I sometimes take photos or video in the gym for social media and marketing. This is entirely optional and does not affect your training in any way. You can withdraw your consent at any time by telling me: I will stop using new material and remove existing material wherever it is practical to do so.";
const PHOTOS_YES = "I consent to photos and video of me, including progress photos, being used in Kinetic Hustl marketing and social media.";
const PHOTOS_NO = "I do not consent.";
const APP_EXCLUDED = "This agreement does not include app access or online programming. If you would like to add it, speak with Karl and a separate agreement will apply.";

const feesText = (f) => f.casual
  ? "All prices include GST. Casual sessions are paid as booked. Direct deposit or direct debit can be arranged. Card payments carry no surcharge. If you pay by bank account direct debit, Ezidebit charges a transaction fee of $0.99 per debit. It is added to the amounts agreed below and appears on the debit. That fee is set by Ezidebit rather than by Kinetic Hustl and can change."
  : `All prices include GST. Payment is by ${f.cycle === "fortnight" ? "fortnightly" : "weekly"} direct debit through Ezidebit unless otherwise agreed. Direct deposit can be arranged. Card payments are debited at the agreed amount, with no surcharge. If you pay by bank account direct debit, Ezidebit charges a transaction fee of $0.99 per debit. It is added to the amounts agreed below and appears on the debit. That fee is set by Ezidebit rather than by Kinetic Hustl and can change.`;

const appText = (f, appName, appFee) => f.cycle === "fortnight"
  ? `This agreement includes ${appName} at ${appFee} (GST incl.), charged in addition to your session rate. App access is charged per week, so each fortnightly debit includes two weeks of it ($44).`
  : `This agreement includes ${appName} at ${appFee} (GST incl.), charged in addition to your session rate.`;

const appLabels = (f) => f.casual
  ? { name: "online coaching, which includes access to the Kinetic Hustl App,", fee: "$44 per week" }
  : { name: "access to the Kinetic Hustl App", fee: "$22 per week" };

const p = (text, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 120 },
  children: [new TextRun({ text, bold: o.bold, italics: o.italics, size: o.size ?? 19 })],
});

const h = (text) => new Paragraph({
  spacing: { before: 300, after: 150 },
  children: [new TextRun({ text, bold: true, size: 22 })],
});

// Each policy is its own block with its own initial line, rather than a row in a
// dense table. Far harder to scroll past on the way to the signature.
const policy = (title, ...bodies) => ([
  new Paragraph({ spacing: { before: 160, after: 50 },
    children: [new TextRun({ text: title, bold: true, size: 19 })] }),
  ...bodies.map((body) => new Paragraph({ spacing: { after: 70 },
    children: [new TextRun({ text: body, size: 18 })] })),
  new Paragraph({
    spacing: { after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" } },
    children: [
      new TextRun({ text: "Initial to confirm you have read and understood:   ", size: 17, color: "666666" }),
      new TextRun({ text: "____________", size: 19 }),
    ],
  }),
]);

const cell = (text, width, o = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: o.head ? { type: ShadingType.CLEAR, fill: "F2F2F2" } : undefined,
  margins: { top: 90, bottom: 90, left: 120, right: 120 },
  children: [new Paragraph({
    alignment: o.align,
    children: [new TextRun({ text, bold: o.head, size: 18 })],
  })],
});

const table = (widths, rows) => new Table({
  columnWidths: widths,
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  rows: rows.map((cells, i) => new TableRow({
    children: cells.map((c, j) => cell(c, widths[j], {
      head: i === 0, align: j > 0 ? AlignmentType.CENTER : undefined,
    })),
  })),
});

const rule = () => new Paragraph({
  spacing: { before: 100, after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "BBBBBB" } },
  children: [],
});

const fill = (n) => "_".repeat(n);

// ---------------------------------------------------------------- formats ---
const FORMATS = [
  {
    file: "1-on-1-Weekly", subtitle: "Personal Training — 1-on-1, Weekly",
    cycle: "week", shared: false, casual: false,
    tierNote: "Weekly means one session per week or more. There is no upper limit and the same per-session rate applies to every session, so a second, third or fourth session in a week is charged at the same rate as the first. Your rate is set by this agreement. If you move to training less often on an ongoing basis, flexi rates will apply and a new agreement will be issued.",
    schedule: `I ${fill(28)} have agreed to ${fill(6)} 45-minute Personal Training session(s) per week at $${fill(10)} per session (GST incl.).`,
    rateHead: ["Frequency", "Rate per session"],
    widths: [5000, 4000],
    withApp: [["Weekly", "$88"]],
    noApp:   [["Weekly", "$110"]],
  },
  {
    file: "1-on-1-Flexi", subtitle: "Personal Training — 1-on-1, Flexi (fortnightly)",
    cycle: "fortnight", shared: false, casual: false,
    tierNote: "Flexi means a minimum of one session per fortnight, billed fortnightly. Your rate is set by this agreement. Additional sessions are charged at your agreed rate and do not change it. If you decide to train more often on an ongoing basis, weekly rates may apply and a new agreement will be issued.",
    schedule: `I ${fill(28)} have agreed to ${fill(6)} 45-minute Personal Training session(s) per fortnight at $${fill(10)} per session (GST incl.).`,
    rateHead: ["Frequency", "Rate per session"],
    widths: [5000, 4000],
    withApp: [["Flexi (fortnightly)", "$104.50"]],
    noApp:   [["Flexi (fortnightly)", "$126.50"]],
  },
  {
    file: "2-on-1", subtitle: "2-on-1 Training — maximum two participants",
    cycle: "week", shared: true, casual: false, tierNote: null,
    schedule: `I ${fill(28)} have agreed to ${fill(6)} weekly 45-minute 2-on-1 Training session(s) at $${fill(10)} per session (GST incl.).`,
    rateHead: ["", "Rate per person, per session"],
    widths: [5000, 4000],
    withApp: [["2-on-1 set rate", "$66"]],
    noApp:   [["2-on-1 set rate", "$88"]],
    extrasHead: ["Additional session", "Rate"],
    extrasWithApp: [["2-on-1", "$66"], ["1-on-1", "$88"]],
    extrasNoApp:   [["2-on-1", "$88"], ["1-on-1", "$110"]],
  },
  {
    file: "3-on-1", subtitle: "Group Training — maximum three participants",
    cycle: "week", shared: true, casual: false, tierNote: null,
    schedule: `I ${fill(28)} have agreed to ${fill(6)} weekly 45-minute Group Training session(s), maximum three participants, at $${fill(10)} per session (GST incl.).`,
    rateHead: ["", "Rate per person, per session"],
    widths: [5000, 4000],
    withApp: [["3-on-1 set rate", "$55"]],
    noApp:   [["3-on-1 set rate", "$77"]],
    extrasHead: ["Additional session", "Rate"],
    extrasWithApp: [["3-on-1", "$55"], ["2-on-1", "$66"], ["1-on-1", "$88"]],
    extrasNoApp:   [["3-on-1", "$77"], ["2-on-1", "$88"], ["1-on-1", "$110"]],
  },
  {
    file: "Online-Coaching", subtitle: "Online Coaching",
    cycle: "week", shared: false, casual: false, tierNote: null,
    appModes: [true],
    appOverride: "Online coaching is $44 per week (GST incl.) and includes personalised programming, progress tracking and message support through the Kinetic Hustl App. It does not include in-person training sessions; these can be booked separately at the casual rate below.",
    schedule: `I ${fill(28)} have agreed to Online Coaching at $${fill(10)} per week (GST incl.).`,
    rateHead: ["", "Rate"],
    widths: [5000, 4000],
    withApp: [["Online coaching", "$44 per week"]],
    extrasHead: ["Additional session", "Rate"],
    extrasWithApp: [["45-minute Personal Training session", "$121"]],
  },
  {
    file: "Casual", subtitle: "Casual Personal Training",
    cycle: null, shared: false, casual: true, tierNote: null,
    appModes: [false],
    schedule: `I ${fill(28)} have agreed to 45-minute Personal Training sessions on a casual basis at $${fill(10)} per session (GST incl.).`,
    rateHead: ["", "Rate per session"],
    widths: [5000, 4000],
    noApp:   [["Casual session", "$143"]],
  },
];

for (const f of FORMATS) {
  for (const app of (f.appModes || [true, false])) {
    const kids = [];
    const { name: appName, fee: appFee } = appLabels(f);

    kids.push(new Paragraph({ spacing: { after: 60 },
      children: [new TextRun({ text: "KINETIC HUSTL.", bold: true, size: 28 })] }));
    kids.push(new Paragraph({ spacing: { after: 40 },
      children: [new TextRun({ text: "TERMS AND CONDITIONS", bold: true, size: 24 })] }));
    kids.push(new Paragraph({ spacing: { after: 100 },
      children: [new TextRun({
        text: f.subtitle + (f.appModes ? "" : (app ? "  ·  With App Access" : "  ·  Without App Access")),
        italics: true, size: 20, color: "555555" })] }));
    kids.push(new Paragraph({ spacing: { after: 140 },
      children: [new TextRun({ text: BIZ, size: 16, color: "666666" })] }));
    kids.push(rule());

    kids.push(h("CONSENT TO PARTICIPATE IN TRAINING"));
    kids.push(p("The Trainer refers to the fully qualified Australian fitness professional trading as Karl Hoschke."));
    kids.push(p("The Activity refers to the participation in personal training, group exercise, and general physical activities."));
    kids.push(p("THIS IS AN IMPORTANT DOCUMENT, WHICH AFFECTS YOUR LEGAL RIGHTS AND OBLIGATIONS", { bold: true }));
    consentBody.forEach((t) => kids.push(p(t)));

    kids.push(h("TRAINING & CANCELLATION POLICIES"));
    kids.push(p("Please initial each of the following to confirm you have read and understood it.", { italics: true, after: 40 }));
    policy(...POLICIES.sessionCancellation).forEach(x => kids.push(x));
    policy(...POLICIES.directDebit).forEach(x => kids.push(x));
    policy(...POLICIES.gymAccess).forEach(x => kids.push(x));
    if (f.shared) {
      policy(...POLICIES.attendance).forEach(x => kids.push(x));
      policy(...POLICIES.groupSize).forEach(x => kids.push(x));
      policy(...POLICIES.separateAgreements).forEach(x => kids.push(x));
    }

    kids.push(h("FEES"));
    kids.push(p(f.casual
      ? "All prices include GST. Casual sessions are paid as booked. Direct deposit or direct debit can be arranged. Card payments carry no surcharge. If you pay by bank account direct debit, Ezidebit charges a transaction fee of $0.99 per debit. It is added to the amounts agreed below and appears on the debit. That fee is set by Ezidebit rather than by Kinetic Hustl and can change."
      : `All prices include GST. Payment is by ${f.cycle === "fortnight" ? "fortnightly" : "weekly"} direct debit through Ezidebit unless otherwise agreed. Direct deposit can be arranged. Card payments are debited at the agreed amount, with no surcharge. If you pay by bank account direct debit, Ezidebit charges a transaction fee of $0.99 per debit. It is added to the amounts agreed below and appears on the debit. That fee is set by Ezidebit rather than by Kinetic Hustl and can change.`));
    if (app) {
      kids.push(p(f.appOverride || appText(f, appName, appFee)));
    } else {
      kids.push(p(APP_EXCLUDED));
    }
    if (f.tierNote) kids.push(p(f.tierNote));

    kids.push(h("YOUR INFORMATION"));
    if (app) {
      kids.push(p(INFO_WITH_APP));
    } else {
      kids.push(p(INFO_NO_APP));
    }
    kids.push(p(INFO_COMMON));

    kids.push(h("PHOTOS AND VIDEO"));
    kids.push(p(PHOTOS_PROGRESS));
    kids.push(p(PHOTOS_MARKETING));
    kids.push(new Paragraph({ spacing: { before: 60, after: 140 }, children: [
      new TextRun({ text: "☐  " + PHOTOS_YES, size: 19 }) ] }));
    kids.push(new Paragraph({ spacing: { after: 140 }, children: [
      new TextRun({ text: "☐  " + PHOTOS_NO, size: 19 }) ] }));

    kids.push(h("AGREEMENT"));
    kids.push(p(f.schedule, { after: 160 }));
    kids.push(table(f.widths, [f.rateHead, ...(app ? f.withApp : f.noApp)]));
    if (app) {
      if (!f.appOverride) kids.push(p(`Plus ${appName} at ${appFee} (GST incl.).`, { after: 120, size: 19 }));
    }
    if (f.extrasHead) {
      kids.push(p("Optional extras, charged as taken:", { bold: true, after: 120 }));
      kids.push(table([5000, 4000], [f.extrasHead, ...(app ? f.extrasWithApp : f.extrasNoApp)]));
    }

    kids.push(new Paragraph({ spacing: { before: 300, after: 140 }, children: [
      new TextRun({ text: f.casual
        ? `Sessions are booked and paid as required. No minimum term applies. Starting ${fill(5)} / ${fill(5)} / ${fill(7)}.`
        : `My ${f.cycle === "fortnight" ? "fortnightly" : "weekly"} payment amount will be $${fill(12)}, starting ${fill(5)} / ${fill(5)} / ${fill(7)} for a minimum of ${fill(5)} weeks.`, size: 19 }) ] }));
    kids.push(p("I understand that the above terms and conditions apply.", { after: 340 }));
    kids.push(new Paragraph({ spacing: { after: 200 }, children: [
      new TextRun({ text: `Client signature: ${fill(30)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 19 }) ] }));
    kids.push(new Paragraph({ spacing: { after: 120 }, children: [
      new TextRun({ text: `Trainer signature: ${fill(29)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 19 }) ] }));

    const doc = new Document({
      styles: { default: { document: { run: { font: "Calibri", size: 19 } } } },
      sections: [{
        properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
        children: kids,
      }],
    });

    const name = `KH-Terms-${f.file}${(!f.appModes && app) ? "-With-App-Access" : ""}.docx`;
    Packer.toBuffer(doc).then((b) => { fs.writeFileSync(out(name), b); console.log("wrote", name); });
  }
}


// ------------------------------------------------------------------ junior ---
// One addendum that attaches to any of the ten rate agreements, plus a
// non-legal agreement the junior signs themselves. Not a fork of the ten:
// the rate agreement is untouched and this sits alongside it.
//
// The line that matters is 16, not 18. The liability policy excludes clients
// under 16 unless six conditions are met, so the supervision and clearance
// clauses below are cover conditions rather than preferences.

const JUNIOR = {
  works: [
    "This addendum attaches to the agreement named above and is read together with it. The two documents form one agreement.",
    "Where the attached agreement is written in the first person as statements by the client, those statements are made by the Guardian, on the Junior's behalf and on their own behalf. Where the attached agreement is signed by the \"Client\", that is the Guardian signing on the Junior's behalf.",
    "Clause 3 below replaces the certification of age in the attached agreement. Clause 9 below replaces the Photos and Video section of the attached agreement in full. Everything else in the attached agreement continues to apply, including the rate, the minimum term, the cancellation policies and the payment arrangement.",
    "The Junior signs a separate Participation Agreement. That document sets out how the Junior takes part in their training. It is not a legal agreement, it does not change anything in this one, and the Guardian receives a copy of it.",
  ],
  declaration: [
    "I am the parent or legal guardian of the Junior named above. I have authority to enter this agreement and the attached agreement on their behalf.",
    "I have read both documents and I understand them. Any questions I had have been answered to my satisfaction. I accept their terms on the Junior's behalf and on my own.",
    "I am not under any physical or emotional duress in signing.",
  ],
  consent: [
    "This clause replaces the certification of age in the attached agreement.",
    "I consent to the Junior participating in personal training, group exercise and general physical activities under the guidance of the Trainer.",
    "I acknowledge that the Junior participates at their own risk, and I accept responsibility on their behalf for their health, wellness, medical, physical, mental and emotional wellbeing in connection with that participation.",
    "I acknowledge that participation may involve a risk of serious injury or illness, and in rare circumstances death may occur.",
    "I accept those risks, and I indemnify and release the Trainer and any person or body directly or indirectly associated with the Trainer against all liability, claims, demands and proceedings arising out of the Junior's participation, to the extent permitted by law.",
    "I understand that all sessions are delivered by a qualified Australian fitness professional holding current qualifications including a Bachelor of Exercise and Movement Science, First Aid and CPR, full public and professional indemnity insurance, and a current Queensland Blue Card.",
  ],
  medical: [
    "The Junior's health information is collected in the Kinetic Hustl health screening form, which I complete on their behalf before their first session. The declarations I make there about honesty, completeness and telling the Trainer when something changes apply to this agreement too, and are not repeated here.",
    "Where the Junior has a surgical history, a diagnosed condition, or an ongoing treating practitioner, written clearance from that practitioner must be provided to the Trainer before the Junior's first loaded training session. An introductory meeting or movement screen may take place before clearance is provided. Loaded training may not.",
    "I acknowledge the recommendation that I obtain a medical practitioner's written approval before the Junior participates.",
  ],
  practitioners: [
    "The Trainer coaches training, movement, habits and confidence. The Trainer does not diagnose, treat or manage medical conditions, and coaching runs alongside any clinical care the Junior receives rather than in place of it.",
    "The Junior's treating practitioners, and my consent for the Trainer to contact them, are recorded in the health screening form. They are not collected again here.",
  ],
  financial: [
    "I am the responsible party for everything the attached agreement requires of the client: the fees, the payment arrangement, the notice periods and the cancellation policies. Those terms are set out in that agreement and are not restated here.",
    "The direct debit authority is signed by me as the account holder. The Junior is the person training; I am the person paying.",
    "I am responsible for ensuring the Junior holds valid gym access for every session they attend.",
  ],
  communication: [
    "Kinetic Hustl does not operate a private messaging channel between a trainer and a client under 18.",
    "Where the Junior is old enough to follow a program independently, they may hold their own app account. In-app messaging is set to one-way: the Trainer can send programming, instructions and notes, and the Junior cannot message the Trainer privately. Where the Junior is not yet training independently, no app account is issued and their programming sits on my account instead.",
    "Between sessions, anything the Junior needs to raise comes to the Trainer through me, or the Junior raises it with the Trainer in person at the gym. In a session, the Junior is encouraged to raise anything directly, and the Trainer will follow up with me where it matters.",
    "I understand the Trainer will communicate with me about the Junior's training, their program, their progress and any concerns.",
  ],
  supervision: [
    "Sessions are conducted on the open gym floor during staffed hours, and never in a closed or unsupervised room.",
    "Where the Junior is under 16, a parent, guardian or other responsible adult must be present for the whole session. This is a condition of the Trainer's insurance, not a preference, and it cannot be waived by agreement.",
    "If no responsible adult is present at the start of a session for a Junior under 16, the session cannot go ahead. It is treated under the cancellation policy in the attached agreement, though the Trainer will use discretion where the circumstances warrant it.",
    "Where the Junior is 16 or 17, I am welcome to attend any session and will attend the first one.",
  ],
  photosLead: [
    "This clause replaces the Photos and Video section of the attached agreement in full.",
    "Progress photos are not taken of clients under 18. This applies regardless of the Junior's goals, including where body composition is one of them. Progress is tracked using measurements, performance markers, and video of movement where it serves the coaching.",
    "Photos and video for marketing or social media require the consent of both the Guardian and the Junior. Consent defaults to no. Where either does not consent, none are taken or used.",
  ],
  photoRules: [
    "No location tagging, and no naming of the gym alongside the Junior.",
    "Nothing that identifies when the Junior trains, including day, time, or any reference to a regular routine.",
    "No posting in real time. Material is posted later than the session it came from.",
    "First name only, or no name.",
    "No comments or captions about the Junior's body, weight or appearance.",
  ],
  photosTail: [
    "The reason for those rules: a post that shows a young person's face, names where they train and implies when they are there is a complete set of instructions for finding them. Consent does not make that safe.",
    "Consent may be withdrawn at any time by either the Guardian or the Junior, by telling the Trainer. New material will not be used and existing material will be removed wherever it is practical to do so.",
  ],
  turningEighteen: [
    "This addendum ends on the Junior's eighteenth birthday.",
    "From that date the client signs the standard agreement for their format in their own name, and takes on the rate, the policies and the payment arrangement themselves. Until they do, this addendum and the attached agreement continue unchanged and I remain the responsible party.",
    "Financial responsibility transfers to the client only once a new agreement and a new direct debit authority are in place in their name. A birthday alone does not move it.",
  ],
  sharedSessions: [
    "Where the Junior trains in a 2-on-1 or 3-on-1 session alongside participants who are not members of our household, I agree to the specific participants in writing before the first shared session.",
    "Where the Junior is under 16, the supervision requirement in clause 8 applies to every shared session as well.",
  ],
  concerns: [
    "The Junior is encouraged to raise anything with the Trainer during a session, and to say so if something hurts, feels wrong, or they would rather not do it.",
    "Nothing the Junior tells the Trainer about their training is kept secret from me. The Trainer will tell me about anything affecting the Junior's training, wellbeing or safety.",
    "If the Trainer becomes concerned about the Junior's safety or welfare, the Trainer will raise it with me. Where the Trainer reasonably believes the Junior is at risk of harm, the Trainer may contact the appropriate authorities, and is not required to seek my agreement first.",
  ],
};

const JUNIOR_POLICIES = [
  ["Medical clearance", "No loaded training takes place before written practitioner clearance is on file, where clause 4 requires it."],
  ["Supervision", "Where the Junior is under 16, a responsible adult is present for the whole session. Without one the session cannot go ahead."],
];
// Cancellation, credits, direct debit notice, gym access and the minimum term are
// initialled in the attached rate agreement. Repeating them here would have the
// guardian initial the same policy twice in one signing.

const numbered = (n, title) => new Paragraph({
  spacing: { before: 280, after: 120 },
  children: [new TextRun({ text: `${n}.  ${title}`, bold: true, size: 21 })],
});

const tick = (text) => new Paragraph({ spacing: { after: 100 },
  children: [new TextRun({ text: "☐  " + text, size: 19 })] });

const bullet = (text) => new Paragraph({ spacing: { after: 70 }, bullet: { level: 0 },
  children: [new TextRun({ text, size: 18 })] });

const initialLine = (title, body) => ([
  new Paragraph({ spacing: { before: 140, after: 50 },
    children: [new TextRun({ text: title, bold: true, size: 19 })] }),
  new Paragraph({ spacing: { after: 70 },
    children: [new TextRun({ text: body, size: 18 })] }),
  new Paragraph({ spacing: { after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" } },
    children: [
      new TextRun({ text: "Guardian initial:   ", size: 17, color: "666666" }),
      new TextRun({ text: "____________", size: 19 }),
    ] }),
]);

{
  const k = [];
  k.push(new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: "KINETIC HUSTL.", bold: true, size: 28 })] }));
  k.push(new Paragraph({ spacing: { after: 40 },
    children: [new TextRun({ text: "JUNIOR CLIENT ADDENDUM", bold: true, size: 24 })] }));
  k.push(new Paragraph({ spacing: { after: 100 },
    children: [new TextRun({ text: "Attaches to the client's rate agreement. Signed by the parent or legal guardian.", italics: true, size: 20, color: "555555" })] }));
  k.push(new Paragraph({ spacing: { after: 140 },
    children: [new TextRun({ text: BIZ, size: 16, color: "666666" })] }));
  k.push(rule());
  k.push(p("THIS IS AN IMPORTANT DOCUMENT, WHICH AFFECTS YOUR LEGAL RIGHTS AND OBLIGATIONS", { bold: true }));

  k.push(table([3400, 5600], [
    ["Client (the Junior)", ""],
    ["Date of birth", ""],
    ["Parent or legal guardian (the Guardian)", ""],
    ["Relationship to the Junior", ""],
    ["Attached agreement", ""],
    ["Agreed rate", ""],
  ]));

  k.push(numbered(1, "How this addendum works"));
  JUNIOR.works.forEach(t => k.push(p(t)));

  k.push(numbered(2, "Guardian declaration and authority"));
  JUNIOR.declaration.forEach(t => k.push(p(t)));

  k.push(numbered(3, "Consent to participate"));
  JUNIOR.consent.forEach(t => k.push(p(t)));

  k.push(numbered(4, "Medical disclosure and clearance"));
  JUNIOR.medical.forEach(t => k.push(p(t)));

  k.push(numbered(5, "Contact with treating practitioners"));
  JUNIOR.practitioners.forEach(t => k.push(p(t)));
  k.push(p("The Guardian ticks one:", { italics: true, after: 80 }));
  k.push(tick("I consent to the Trainer contacting the Junior's treating physiotherapist, surgeon or medical practitioner for the purpose of coordinating their training."));
  k.push(tick("I do not consent."));
  k.push(table([3400, 5600], [["Practitioner name", ""], ["Clinic", ""], ["Contact", ""]]));

  k.push(numbered(6, "Financial responsibility"));
  JUNIOR.financial.forEach(t => k.push(p(t)));

  k.push(numbered(7, "Communication"));
  JUNIOR.communication.forEach(t => k.push(p(t)));
  k.push(table([3400, 5600], [
    ["Junior's app account", "☐ Yes, one-way messaging     ☐ No app access"],
    ["Guardian contact between sessions", ""],
  ]));

  k.push(numbered(8, "Supervision and setting"));
  JUNIOR.supervision.forEach(t => k.push(p(t)));

  k.push(numbered(9, "Photos and video"));
  JUNIOR.photosLead.forEach(t => k.push(p(t)));
  k.push(p("Both parties tick:", { italics: true, after: 80 }));
  k.push(tick("Guardian consents                    ☐  Guardian does not consent"));
  k.push(tick("Junior consents                      ☐  Junior does not consent"));
  k.push(p("Where both consent, the following apply and cannot be waived:", { after: 80 }));
  JUNIOR.photoRules.forEach(t => k.push(bullet(t)));
  JUNIOR.photosTail.forEach(t => k.push(p(t)));

  k.push(numbered(10, "When the Junior turns 18"));
  JUNIOR.turningEighteen.forEach(t => k.push(p(t)));

  k.push(numbered(11, "Shared sessions"));
  JUNIOR.sharedSessions.forEach(t => k.push(p(t)));

  k.push(numbered(12, "Raising a concern"));
  JUNIOR.concerns.forEach(t => k.push(p(t)));

  k.push(numbered(13, "Policies"));
  k.push(p("Please initial each of the following to confirm you have read and understood it.", { italics: true, after: 40 }));
  JUNIOR_POLICIES.forEach(([t, b]) => initialLine(t, b).forEach(x => k.push(x)));

  k.push(p("I understand that the above terms and conditions apply, together with those in the attached agreement.", { after: 340 }));
  k.push(new Paragraph({ spacing: { after: 200 }, children: [
    new TextRun({ text: `Guardian signature: ${fill(28)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 19 }) ] }));
  k.push(new Paragraph({ spacing: { after: 120 }, children: [
    new TextRun({ text: `Trainer signature: ${fill(29)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 19 }) ] }));

  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 19 } } } },
    sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children: k }],
  });
  Packer.toBuffer(doc).then((b) => {
    fs.writeFileSync(out("KH-Terms-Junior-Addendum.docx"), b);
    console.log("wrote KH-Terms-Junior-Addendum.docx");
  });
}

// --------------------------------------------------- participation agreement ---
// Signed by the Junior. Countersigned by the Trainer. Deliberately not signed
// by the Guardian, who receives a copy. Carries no legal weight and must never
// be drafted or presented as a waiver.

const PARTICIPATION = [
  ["I'm choosing to do this.",
   "Nobody is making me train. I want to be here."],
  ["I'll say something when it doesn't feel right.",
   "If something hurts, feels wrong, or doesn't feel right afterwards, I'll tell my coach. During the session or after it. I won't push through and hope it sorts itself out."],
  ["I'll show up, or I'll let my coach know.",
   "If I can't make a session, I'll tell my coach rather than leaving them wondering."],
  ["I can ask why.",
   "Any exercise, any time. If I don't know why I'm doing something, I can ask, and I'll get a straight answer."],
  ["I can say no.",
   "If I don't want to do an exercise, I can say so. We'll find another way to get the same thing done."],
  ["I know my coach talks to my parent or guardian.",
   "About my training, how I'm going, and anything they're worried about. Nothing I tell my coach about my training is a secret from them."],
];

{
  const k = [];
  k.push(new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: "MY TRAINING AGREEMENT", bold: true, size: 34 })] }));
  k.push(new Paragraph({ spacing: { after: 160 },
    children: [new TextRun({ text: "Kinetic Hustl.", bold: true, size: 24, color: "555555" })] }));
  k.push(rule());
  k.push(p("This is not a contract. Your parent or guardian has signed that part. This one is between you and your coach, and it is about how we work together.", { after: 240, size: 23 }));

  k.push(new Paragraph({ spacing: { after: 200 }, children: [
    new TextRun({ text: `My name: ${fill(40)}`, size: 24 }) ] }));
  k.push(new Paragraph({ spacing: { after: 300 }, children: [
    new TextRun({ text: `My coach: ${fill(39)}`, size: 24 }) ] }));

  PARTICIPATION.forEach(([head, body]) => {
    k.push(new Paragraph({ spacing: { before: 190, after: 50 },
      children: [new TextRun({ text: head, bold: true, size: 24 })] }));
    k.push(new Paragraph({ spacing: { after: 50 },
      children: [new TextRun({ text: body, size: 22 })] }));
  });

  k.push(new Paragraph({ spacing: { before: 280, after: 110 },
    children: [new TextRun({ text: "What I want out of this:", bold: true, size: 24 })] }));
  k.push(p(fill(72), { after: 190, size: 22 }));
  k.push(p(fill(72), { after: 300, size: 22 }));

  k.push(new Paragraph({ spacing: { after: 200 }, children: [
    new TextRun({ text: `Me: ${fill(32)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 22 }) ] }));
  k.push(new Paragraph({ spacing: { after: 200 }, children: [
    new TextRun({ text: `My coach: ${fill(26)}     Date: ${fill(5)} / ${fill(5)} / ${fill(7)}`, size: 22 }) ] }));
  k.push(p("A copy of this goes to your parent or guardian. They don't sign it. It's yours.", { italics: true, size: 22 }));

  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 800, left: 1100, right: 1100 } } }, children: k }],
  });
  Packer.toBuffer(doc).then((b) => {
    fs.writeFileSync(out("KH-Junior-Participation-Agreement.docx"), b);
    console.log("wrote KH-Junior-Participation-Agreement.docx");
  });
}

// ---------------------------------------------------------------- markdown ---
// One self-contained file carrying every agreement's text, for adding to a
// Claude project. Generated from the same clause constants as the .docx files.
{
  const L = [];
  const variantName = (f, app) => f.appModes ? f.subtitle : `${f.subtitle}${app ? " · With App Access" : " · Without App Access"}`;
  const rateLines = (f, app) => (app ? f.withApp : f.noApp).map(([a, b]) => `| ${a || "Rate"} | ${b} |`).join("\n");

  L.push("# Kinetic Hustl — Client Agreements (complete text)");
  L.push("");
  L.push("> **Generated file — do not edit by hand.** Produced by `generate-templates.js` from the same");
  L.push("> clause text as the ten `.docx` templates, so this file and the documents clients sign always match.");
  L.push("> Change wording in the script and re-run it.");
  L.push("");
  L.push("Everything a client agrees to, across all ten agreements, in one file. Safe to quote to a client.");
  L.push("Rates here mirror `pricing-rates-and-terms.md`; if the two ever disagree, the rates file wins.");
  L.push("");
  L.push("**Health screening form** (everyone, before the first session)**:** https://forms.gle/T8yaRciEND7FJ2mU8");
  L.push("");
  L.push("**Terms and conditions form** (on sign-up)**:** https://forms.gle/EQy9Ly2KgeZmShJe7");
  L.push("");
  L.push("Clients accept these terms and confirm their rate by completing that form. It records their details,");
  L.push("health information, consent, policy acknowledgements and agreed rate, and emails them a copy.");
  L.push("");
  L.push(`**${BIZ}**`);
  L.push("");
  L.push("---");
  L.push("");
  L.push("## Which agreement applies");
  L.push("");
  L.push("| Agreement | Rate |");
  L.push("| --- | --- |");
  for (const f of FORMATS) {
    for (const app of (f.appModes || [true, false])) {
      const rates = (app ? f.withApp : f.noApp).map(([, b]) => b).join(", ");
      const suffix = f.appOverride ? ", casual sessions $121"
        : (app ? (f.cycle === "fortnight" ? " per session, plus $44 per fortnight" : " per session, plus $22 per week")
               : " per session");
      L.push(`| ${variantName(f, app)} | ${rates}${f.appOverride ? suffix : suffix} |`);
    }
  }
  L.push("");
  L.push("A client's tier is set by their agreement, not by how many sessions fall in a given fortnight.");
  L.push("Additional and rescheduled sessions are charged at the agreed rate and do not change it.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## Terms common to every agreement");
  L.push("");
  L.push("### Consent to participate in training");
  L.push("");
  L.push("*The Trainer* refers to the fully qualified Australian fitness professional trading as Karl Hoschke.");
  L.push("");
  L.push("*The Activity* refers to the participation in personal training, group exercise, and general physical activities.");
  L.push("");
  L.push("**THIS IS AN IMPORTANT DOCUMENT, WHICH AFFECTS YOUR LEGAL RIGHTS AND OBLIGATIONS**");
  L.push("");
  consentBody.forEach((c) => { L.push(c); L.push(""); });
  L.push("### Training and cancellation policies");
  L.push("");
  L.push("The client initials each of these individually.");
  L.push("");
  ["sessionCancellation", "directDebit", "gymAccess"].forEach((k) => {
    const [title, ...bodies] = POLICIES[k];
    L.push(`**${title}.** ${bodies[0]}`); L.push("");
    bodies.slice(1).forEach((b) => { L.push(b); L.push(""); });
  });
  L.push("**Shared formats only (2-on-1 and 3-on-1):**");
  L.push("");
  ["attendance", "groupSize", "separateAgreements"].forEach((k) => {
    const [title, ...bodies] = POLICIES[k];
    L.push(`**${title}.** ${bodies[0]}`); L.push("");
    bodies.slice(1).forEach((b) => { L.push(b); L.push(""); });
  });
  L.push("### Your information");
  L.push("");
  L.push("*With app access:* " + INFO_WITH_APP);
  L.push("");
  L.push("*Without app access:* " + INFO_NO_APP);
  L.push("");
  L.push(INFO_COMMON);
  L.push("");
  L.push("### Photos and video");
  L.push("");
  L.push(PHOTOS_PROGRESS);
  L.push("");
  L.push(PHOTOS_MARKETING);
  L.push("");
  L.push(`The client ticks one: “${PHOTOS_YES}” or “${PHOTOS_NO}”`);
  L.push("");
  L.push("### Minimum term and signatures");
  L.push("");
  L.push("A minimum term of 12 weeks applies unless otherwise agreed in writing. Casual agreements carry no minimum term.");
  L.push("");
  L.push("Every agreement is signed by both the client and the trainer, each dated.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## The ten agreements");
  L.push("");

  for (const f of FORMATS) {
    for (const app of (f.appModes || [true, false])) {
      const { name: appName, fee: appFee } = appLabels(f);
      L.push(`### ${variantName(f, app)}`);
      L.push("");
      L.push(`\`KH-Terms-${f.file}${(!f.appModes && app) ? "-With-App-Access" : ""}.docx\``);
      L.push("");
      L.push(`| ${f.rateHead[0] || "Item"} | ${f.rateHead[1]} |`);
      L.push("| --- | --- |");
      L.push(rateLines(f, app));
      L.push("");
      L.push(app ? (f.appOverride || appText(f, appName, appFee)) : APP_EXCLUDED);
      L.push("");
      if (f.tierNote) { L.push(f.tierNote); L.push(""); }
      L.push(feesText(f));
      L.push("");
      if (f.extrasHead) {
        L.push("Optional extras, charged as taken:");
        L.push("");
        L.push(`| ${f.extrasHead[0]} | ${f.extrasHead[1]} |`);
        L.push("| --- | --- |");
        L.push((app ? f.extrasWithApp : f.extrasNoApp).map(([a, b]) => `| ${a} | ${b} |`).join("\n"));
        L.push("");
      }
      if (f.shared) { L.push("The three shared-format policies above apply to this agreement."); L.push(""); }
      L.push("---");
      L.push("");
    }
  }
  // ---- junior clients ----
  L.push("# Junior clients (under 18)");
  L.push("");
  L.push("Junior clients pay the standard rates above. There is no junior rate and no junior version of");
  L.push("the ten agreements. A junior signs up on whichever format suits, and the **Junior Client Addendum**");
  L.push("attaches to that agreement. The two are read as one document.");
  L.push("");
  L.push("The minimum age is 12. The line that matters legally is 16, not 18: the liability policy excludes");
  L.push("clients under 16 unless six conditions are met, which is why supervision and clearance below are");
  L.push("cover conditions rather than preferences.");
  L.push("");
  L.push("| Document | Signed by | Legally binding |");
  L.push("| --- | --- | --- |");
  L.push("| The rate agreement for their format | Guardian, on the Junior's behalf | Yes |");
  L.push("| Junior Client Addendum | Guardian | Yes |");
  L.push("| Junior Participation Agreement | The Junior, countersigned by the Trainer | **No, and it must never be presented as though it is** |");
  L.push("");
  L.push("## Junior Client Addendum");
  L.push("");
  const jsec = (n, title, paras) => {
    L.push(`### ${n}. ${title}`); L.push("");
    paras.forEach((t) => { L.push(t); L.push(""); });
  };
  jsec(1, "How this addendum works", JUNIOR.works);
  jsec(2, "Guardian declaration and authority", JUNIOR.declaration);
  jsec(3, "Consent to participate", JUNIOR.consent);
  jsec(4, "Medical disclosure and clearance", JUNIOR.medical);
  jsec(5, "Contact with treating practitioners", JUNIOR.practitioners);
  L.push("The Guardian ticks one: consent to the Trainer contacting the Junior's treating physiotherapist, surgeon or medical practitioner for the purpose of coordinating their training, or does not consent. Practitioner name, clinic and contact are recorded.");
  L.push("");
  jsec(6, "Financial responsibility", JUNIOR.financial);
  jsec(7, "Communication", JUNIOR.communication);
  jsec(8, "Supervision and setting", JUNIOR.supervision);
  jsec(9, "Photos and video", JUNIOR.photosLead);
  L.push("Both the Guardian and the Junior tick consent or no consent. Where both consent, the following apply and cannot be waived:");
  L.push("");
  JUNIOR.photoRules.forEach((t) => L.push(`- ${t}`));
  L.push("");
  JUNIOR.photosTail.forEach((t) => { L.push(t); L.push(""); });
  jsec(10, "When the Junior turns 18", JUNIOR.turningEighteen);
  jsec(11, "Shared sessions", JUNIOR.sharedSessions);
  jsec(12, "Raising a concern", JUNIOR.concerns);
  L.push("### 13. Policies");
  L.push("");
  L.push("The Guardian initials each of these individually.");
  L.push("");
  JUNIOR_POLICIES.forEach(([t, b]) => { L.push(`**${t}.** ${b}`); L.push(""); });
  L.push("Signed by the Guardian and counter-signed by the Trainer.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("## Junior Participation Agreement");
  L.push("");
  L.push("> Signed by the Junior. Countersigned by the Trainer. Deliberately **not** signed by the Guardian,");
  L.push("> who receives a copy. This document carries no legal weight and must not be drafted or presented");
  L.push("> as a waiver. It exists because handing a junior the decision, rather than managing them through");
  L.push("> it, changes engagement and adherence.");
  L.push("");
  L.push("**MY TRAINING AGREEMENT**");
  L.push("");
  L.push("This is not a contract. Your parent or guardian has signed that part. This one is between you and your coach, and it is about how we work together.");
  L.push("");
  PARTICIPATION.forEach(([head, body]) => { L.push(`**${head}**`); L.push(""); L.push(body); L.push(""); });
  L.push("Then: *What I want out of this*, signed and dated by the Junior, counter-signed by the Trainer.");
  L.push("");
  L.push("---");
  L.push("");
  L.push("*Generated from `generate-templates.js`. Last built alongside the twelve `.docx` templates.*");
  fs.writeFileSync(out("client-agreements-complete.md"), L.join("\n"));
  console.log("wrote client-agreements-complete.md");
}
