// Guestbook page, form and entries
"use client";

import { useState, useEffect } from "react";
import { addGuestbookEntry, getGuestbookEntries } from "@/services/guestbook";
import type { GuestbookEntry } from "@/types/guestbook";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import DOMPurify from "dompurify";

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // get existing entries/error
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getGuestbookEntries();
        setEntries(data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };

    fetchEntries();
  }, []);

  // user guestbook entry button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // client-side validation
    // name req: >=2
    if (!name.trim() || name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    // message req: >= 5
    if (!message.trim() || message.trim().length < 5) {
      setError("Message must be at least 5 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // sanitize inputs
      const cleanName = DOMPurify.sanitize(name);
      const cleanMessage = DOMPurify.sanitize(message);

      // authenticate anonymous !!ensure enabled in firebase
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      // submit sanitized entry
      await addGuestbookEntry({
        name: cleanName,
        message: cleanMessage,
      });

      // refresh entries to display new
      const updatedEntries = await getGuestbookEntries();
      setEntries(updatedEntries);

      // form reset with error handler
      setName("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit entry";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="guestbook"
      className="bg-white guestbook-container  rounded-2xl p-8 shadow-xl border-2 border-blue/70"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-black font-heading tracking-wide drop-shadow-lg">
        Guest Book
      </h2>
      {/*User inputs*/}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-3xl font-bold mb-2 text-black drop-shadow-md"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 border border-blue/50 rounded-xl focus:ring-2 focus:ring-blue focus:outline-none shadow-inner"
              placeholder="John & Jane Doe"
              maxLength={50}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-3xl font-bold mb-2 text-black drop-shadow-md"
            >
              Your Message For The Couple
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 border border-blue/50 rounded-xl focus:ring-2 focus:ring-blue focus:outline-none shadow-inner"
              placeholder="Wishing you a lifetime of happiness..."
              rows={2}
              required
              maxLength={200}
            />
          </div>
        </div>
        {/*Submit button*/}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className={`px-8 py-3 rounded-full font-medium transition-all shadow-lg ${
              isSubmitting || !message.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue text-white hover:bg-blue-dark"
            } font-body tracking-wide`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Submitting...
              </span>
            ) : (
              "Sign Guestbook"
            )}
          </button>
          {/*Submission status message*/}
          <div className="min-h-[24px]">
            {error && (
              <p className="text-red-500 text-2xl font-bold">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-lg font-medium">
                Thank you for your message!
              </p>
            )}
          </div>
        </div>
      </form>
      {/*Guestbook Entries*/}
      <div className="border-t border-blue/50 pt-8">
        <h3 className="text-3xl font-extrabold mb-6 text-black font-heading tracking-wide drop-shadow-lg">
          Messages from Guests
        </h3>
        {/*If no entries*/}
        {entries.length === 0 ? (
          <div className="text-center py-10 bg-white/20 rounded-xl border border-blue/30">
            <p className="text-black font-body text-2xl drop-shadow-xl">
              Be the first to leave a message!
            </p>
          </div>
        ) : (
          /*If >0 entries*/
          <div className="space-y-5 max-h-[500px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue/50 scrollbar-track-blue/10 scrollbar-thumb-rounded-full">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-5 rounded-xl border border-blue/30 shadow-sm backdrop-blur-sm"
              >
                <div className="flex justify-between items-start">
                  <p className="font-bold text-black font-body tracking-wide">
                    {entry.name || "Anonymous Guest"}
                  </p>
                  <span className="text-xs text-black font-bold">
                    {entry.timestamp.toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="mt-3 text-black font-bold font-body text-lg">
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
