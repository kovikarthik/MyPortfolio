import { toast } from "react-toastify";

const PROMPT = `I want to create an ATS-friendly tailored resume for a specific job. Here is the job description:
[Insert job description]

And here is my current resume:
[Attached]

Please optimize my resume for this job by following these rules:

1. Accuracy Only
   - Do not fabricate or exaggerate anything. Use only what already exists in my resume.

2. Job Alignment
   - Identify the top 5 responsibilities, skills, or values emphasized in the job description.
   - Rewrite my Professional Summary to highlight that I meet those requirements.
   - Create a dedicated "Skills" section that uses the exact keywords from the job description where they truthfully apply.

3. Work Experience Optimization
   - Reorder and emphasize the most relevant experience for this role.
   - Rewrite bullet points with measurable, impact-driven outcomes (e.g., "Improved X by Y%", "Delivered Z ahead of schedule").
   - Align language with the JD (e.g., Agile, project lifecycle, tools, stakeholders).

4. ATS Optimization
   - Use standard, ATS-readable section headers only: "Professional Summary," "Skills," "Work Experience," "Education," "Certifications."
   - Keep formatting simple, text-based, and keyword-rich.
   - Integrate JD keywords naturally throughout, without keyword stuffing.

5. Certifications & Tools
   - Highlight certifications, technical tools, and methodologies from the JD that I already possess in a dedicated section ("Certifications" or "Technical Skills").

6. Deliverable
   - Output as a single-page LaTeX resume.
   - Ensure clean, professional design with no special formatting that breaks ATS parsing.
   - Perfectly fill the first page — no white space at the bottom, and no spillover to a second page. Maintain my current LaTeX structure exactly as is.
   - Final result should be tailored, concise, and immediately job-ready.
`;

export default function PromptTailorResume() {
  const copy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Resume Tailoring Prompt</h1>
      <p className="mt-3 text-sm text-gray-500">
        Free to use. Please don’t fabricate experience—highlight what’s true and relevant.
      </p>

      <div className="mt-6 rounded-2xl border border-cyan-400/50 bg-white/10 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-medium">Copy-ready prompt</span>
          <button
            onClick={copy}
            aria-label="Copy prompt"
            className="rounded-xl border px-3 py-1.5 text-sm transition-all duration-200 hover:border-cyan-400/50 active:scale-75 hover:scale-105 disabled:opacity-90 disabled:cursor-not-allowed"
          >
            Copy
          </button>
        </div>
        <pre className="max-h-[70vh] overflow-auto p-4 text-sm leading-6 whitespace-pre-wrap">
          {String(PROMPT)}
        </pre>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        Tip: Paste the JD and your resume, then only spotlight the specific skills you already have that align with the role.
      </div>
    </main>
  );
}
