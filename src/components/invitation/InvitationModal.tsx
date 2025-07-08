// invitiation modal displays on first visit
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function InvitationModal() {
  const [isOpen, setIsOpen] = useState(false);

  /*Determine if invite has been seen by user*/
  useEffect(() => {
    const hasSeenInvitation = localStorage.getItem("hasSeenInvitation");
    if (!hasSeenInvitation) {
      setIsOpen(true);
    }
  }, []);

  /*Send to guestbook and store invitation status*/
  const handleRSVP = () => {
    localStorage.setItem("hasSeenInvitation", "true");
    setIsOpen(false);
    document
      .getElementById("guestbook")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  /*Set to true upon closing*/
  const handleClose = () => {
    localStorage.setItem("hasSeenInvitation", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue/20 to-blue-dark/20 backdrop-blur-lg rounded-2xl overflow-hidden max-w-md w-full shadow-2xl border-4 border-gold-light relative">
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold-light"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-light"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-light"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold-light"></div>

        {/*Image displayed on modal*/}
        <div className="relative h-96">
          {" "}
          <Image
            src="/images/invite.jpg"
            alt="Wedding Invitation"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 500px"
          />
        </div>

        {/*Container with text and buttons on bottom of modal*/}
        <div className="p-4 text-center bg-gradient-to-t from-white to-white/90">
          <h2 className="text-3xl font-bold mb-2 font-heading text-blue tracking-wide">
            You Are Invited!
          </h2>
          <p className="mb-4 text-lg font-body tracking-wide text-blue-dark">
            We are thrilled to have you join us on our special day
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/*RSVP and redirect to guestbook*/}
            <button
              onClick={handleRSVP}
              className="px-6 py-3 bg-blue text-white rounded-full font-medium hover:bg-blue-dark transition-all font-body tracking-wider shadow-md transform hover:scale-105"
            >
              RSVP & Sign Guestbook
            </button>
            {/*Ignore RSVP and take to home*/}
            <button
              onClick={handleClose}
              className="px-6 py-3 border-2 border-blue rounded-full font-medium text-blue hover:bg-blue/10 transition font-body tracking-wider hover:shadow-inner"
            >
              View Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
