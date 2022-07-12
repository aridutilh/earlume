import { Link } from "../components/Link";
import { Input } from "../components/Input";
import { FilePicker } from "../components/FilePicker";
import { Button } from "../components/Button";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import { sleep } from "../util/sleep";

export default function Home() {
  const [voiceID, setVoiceID] = useState<string>();
  const [bookPDF, setBookPDF] = useState<File>();

  const [loading, setLoading] = useState<boolean>();

  const [blobURL, setBlobURL] = useState<string>();

  const downloadLinkRef = useRef(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData();

    data.append("bookPDF", bookPDF);
    data.append("voiceID", voiceID);

    setLoading(true);

    try {
      const result = await axios.post("/api/handleSubmit", data);

      if (result.status === 200 && result.data.data.url) {
        setLoading(false);

        const downloadUrl = result.data.data.url;
        const blob = await (await fetch(downloadUrl)).blob();

        setBlobURL(window.URL.createObjectURL(blob));

        toast.success(
          "Your AudioBook is being downloaded! Don't see it? Make sure to allow downloads from this browser and try again.",
          {
            position: "top-right",
          }
        );

        downloadLinkRef.current.click();
      }
    } catch (e) {
      const message =
        e.response?.data?.errorCode === "missing_fields"
          ? "Please complete all steps."
          : "Something went wrong. Please try again.";

      toast.error(message, {
        position: "top-right",
      });
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen w-screen grid place-items-center bg-black text-white p-10">
        <form
          className="flex flex-col gap-7 max-w-[35rem]"
          onSubmit={handleSubmit}
        >
          <Header />

          <div className="flex flex-col gap-10">
            {/* Step One */}
            <Step title={"Add Voice Sample"} number={1}>
              <span className="">
                Click <Link href={"https://descript.com"} text={"here"} /> to
                create your voice sample. You will shortly recieve a "Voice ID"
                via email. Please enter that here.
              </span>

              <Input
                placeholder="Enter Voice Id"
                className="w-[85%]"
                name="voiceID"
                value={voiceID}
                onChange={(e) => setVoiceID(e.target.value)}
              />
            </Step>

            {/* Step Two */}
            <Step title={"Upload Story"} number={2}>
              <span className="">
                Upload your story in a PDF format (Must be under 1000
                characters).
              </span>

              <FilePicker
                name="story_pdf"
                accept="application/pdf"
                className="w-[85%]"
                onChange={(e) => setBookPDF(e.target.files[0])}
              />
            </Step>

            {/* Step Three */}
            <Step title={"Generate"} number={3}>
              <span className="">
                Usually takes anywhere from 0.5 to 5 seconds. Click the button.
              </span>

              <Button
                className={`bg-pink-500 focus:ring-indigo-600 w-[17rem] text-white ${loading &&
                  "cursor-not-allowed bg-pink-500 opacity-90 hover:opacity-90"
                  }`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader />
                    Processing
                  </div>
                ) : (
                  "Make My AudioBook!"
                )}
              </Button>
            </Step>
          </div>
        </form>
      </div>

      <Toaster />
      <a
        className="hidden"
        href={blobURL}
        download="MomsBack_Audio_Book"
        ref={downloadLinkRef}
      />
    </>
  );
}

export const Step = ({ number, title = "", children }) => {
  return (
    <div className="flex gap-[1.5rem]">
      {/* Indicator */}
      <div className="rounded-full bg-pink-500 grid place-items-center h-[2.5rem] w-[2.5rem] text-white text-[1.2rem] select-none">
        {number}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-[calc(100%-4.5rem)]">
        {title && <h3 className="text-[1.3rem]">{title}</h3>}
        <div className="text-[#8d8d8d] text-[0.9rem] flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};
