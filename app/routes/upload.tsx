import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file)
  }

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
    setIsProcessing(true);

    setStatusText('Uploading the file...');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('Error: Failed to upload file');

    setStatusText('Converting to image...');
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

    setStatusText('Uploading the image...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Error: Failed to upload image');

    setStatusText('Preparing data...');
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName, jobTitle, jobDescription,
      feedback: '',
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing...');

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    )
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText('Analysis complete, redirecting...');
    console.log(data);
    navigate(`/resume/${uuid}`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  }

  return (
    <main style={{
      backgroundImage: "url('/images/bg-main.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif"
    }}>
      <Navbar />

      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 24px",
        textAlign: "center"
      }}>
        <div style={{ padding: "64px 0" }}>
          <h1 style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "16px"
          }}>
            Smart feedback for your dream job
          </h1>

          {isProcessing ? (
            <>
              <h2 style={{ fontSize: "20px", color: "#4b5563", marginBottom: "24px" }}>
                {statusText}
              </h2>
              <img
                src="/images/resume-scan.gif"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
                }}
              />
            </>
          ) : (
            <h2 style={{ fontSize: "20px", color: "#6b7280" }}>
              Drop your resume for an ATS score and improvement tips
            </h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "32px",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="company-name" style={{ fontWeight: 600, color: "#374151" }}>
                  Company Name
                </label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                  style={{
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="job-title" style={{ fontWeight: 600, color: "#374151" }}>
                  Job Title
                </label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                  style={{
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="job-description" style={{ fontWeight: 600, color: "#374151" }}>
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                  style={{
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="uploader" style={{ fontWeight: 600, color: "#374151" }}>
                  Upload Resume
                </label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
                  marginTop: "12px",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
export default Upload
