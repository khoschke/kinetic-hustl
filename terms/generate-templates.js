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
  sessionCancellation: ["Session cancellation",
    "There is a 24-hour cancellation policy for all training sessions. Sessions cancelled with 24 hours' notice or more will be rescheduled where possible. Sessions cancelled within 24 hours of the booking will be forfeited."],
  directDebit: ["Direct debit cancellation",
    "There is a 30-day cancellation policy for all direct debit agreements. Notice is required by email."],
  gymAccess: ["Gym access",
    "If you train in person at Fitaz Gym, you are responsible for holding your own valid gym access for every session you attend. Gym membership is separate from your training fees and is arranged directly with Fitaz Gym. Speak with Karl or Fitaz Gym front of house for options."],
  attendance: ["Attendance of other participants",
    "Your rate does not change if another participant is unable to attend. The session runs as scheduled for whoever attends, at the rate you have agreed. No adjustment is made in either direction."],
  groupSize: ["Change to group size",
    "If a participant leaves permanently, you will continue at your agreed rate for two weeks while a replacement is sought. Before that period ends the Trainer will confirm to you in writing the rate that would apply to the new group size. Your rate will not change unless you agree to the new rate in writing. If you would prefer not to continue at that rate, you may end this agreement at that point without further notice period or fee."],
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
  ? "All prices include GST. Casual sessions are paid as booked. Direct deposit or direct debit can be arranged. Card payments carry no surcharge. If you pay by bank account direct debit, any Ezidebit bank account fee is charged in addition to the amounts agreed below."
  : `All prices include GST. Payment is by ${f.cycle === "fortnight" ? "fortnightly" : "weekly"} direct debit through Ezidebit unless otherwise agreed. Direct deposit can be arranged. Card payments are debited at the agreed amount, with no surcharge. If you pay by bank account direct debit, any Ezidebit bank account fee is charged in addition to the amounts agreed below and will appear on the debit.`;

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
const policy = (title, body) => ([
  new Paragraph({ spacing: { before: 160, after: 50 },
    children: [new TextRun({ text: title, bold: true, size: 19 })] }),
  new Paragraph({ spacing: { after: 70 },
    children: [new TextRun({ text: body, size: 18 })] }),
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
      ? "All prices include GST. Casual sessions are paid as booked. Direct deposit or direct debit can be arranged. Card payments carry no surcharge. If you pay by bank account direct debit, any Ezidebit bank account fee is charged in addition to the amounts agreed below."
      : `All prices include GST. Payment is by ${f.cycle === "fortnight" ? "fortnightly" : "weekly"} direct debit through Ezidebit unless otherwise agreed. Direct deposit can be arranged. Card payments are debited at the agreed amount, with no surcharge. If you pay by bank account direct debit, any Ezidebit bank account fee is charged in addition to the amounts agreed below and will appear on the debit.`));
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
  L.push("**Terms and conditions form:** https://forms.gle/tPDFx94HQAFqNQkL6");
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
    L.push(`**${POLICIES[k][0]}.** ${POLICIES[k][1]}`); L.push("");
  });
  L.push("**Shared formats only (2-on-1 and 3-on-1):**");
  L.push("");
  ["attendance", "groupSize", "separateAgreements"].forEach((k) => {
    L.push(`**${POLICIES[k][0]}.** ${POLICIES[k][1]}`); L.push("");
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
  L.push("*Generated from `generate-templates.js`. Last built alongside the ten `.docx` templates.*");
  fs.writeFileSync(out("client-agreements-complete.md"), L.join("\n"));
  console.log("wrote client-agreements-complete.md");
}
