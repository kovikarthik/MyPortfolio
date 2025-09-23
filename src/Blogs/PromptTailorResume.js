import { useState } from "react";

const PROMPT = `I want to tailor my resume for a specific job. Here is the job description:
[Insert job description or link here]

And here is my current resume:
[Attached]

Please optimize my resume for this job by doing the following:

Do not fabricate anything — do not invent or exaggerate skills, tools, or experience I don’t have. Use only what’s already in my resume.

Identify the top 5 responsibilities, skills, or values the job is emphasizing, and ensure my professional summary reflects that I offer those exact things.

Ensure the work experience section is aligned with the job description:
- Emphasize relevant experience
- Use clear, measurable achievements
- Match my real work to the job's language and structure (e.g., project lifecycle, tools used, stakeholder impact)

Optimize for ATS (Applicant Tracking Systems) — clean formatting, role-relevant keywords, clear section headers.

Highlight any certifications, tools, or methodologies listed in the job that I already possess (e.g., PMP, Jira, Agile, Salesforce).

Keep the resume professional, easy to scan, and job-ready.

Final deliverable: Single Page LaTeX code of optimized resume that truthfully reflects my background and is tailored to this specific job.`

export default function PromptTailorResume() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Resume Tailoring Prompt</h1>
      <p className="mt-3 text-sm text-gray-500">
        Free to use. Please don’t fabricate experience—highlight what’s true and relevant.
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white/60 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-medium">Copy-ready prompt</span>
          <button
            onClick={copy}
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50 active:scale-[0.99]"
          >
            {copied ? "Copied ✅" : "Copy"}
          </button>
        </div>
        <pre className="max-h-[70vh] overflow-auto p-4 text-sm leading-6 whitespace-pre-wrap">
{PROMPT}
        </pre>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        Tip: Paste the JD and your resume, then only **spotlight the specific skills you already have** that align with the role.
      </div>
    </main>
  );
}
