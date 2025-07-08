import HeroSection from "@/components/hero/HeroSection";
import GuestbookSection from "@/components/guestbook/GuestbookSection";
import InvitationModal from "@/components/invitation/InvitationModal";
import ErrorBoundary from "@/components/hero/ErrorBoundary";

export default function Home() {
  return (
    <div className="min-h-screen">
      <InvitationModal />
      <ErrorBoundary
        fallback={
          <div className="text-center py-20">
            Error loading page. Please try again later.
          </div>
        }
      >
        <HeroSection />
      </ErrorBoundary>
      <div className="container mx-auto px-4 py-16">
        <section id="guestbook" className="max-w-3xl mx-auto">
          <GuestbookSection />
        </section>

        {/*Details Block @ Bottom of Site*/}
        <section className="mt-24 text-center">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Wedding Details
          </h2>
          <div className="bg-blue-200 bg-opacity-20 backdrop-blur-sm rounded-xl p-8">
            <p className="text-4xl">December 25, 2030 at 9:00 PM EST</p>
            <p className="text-2xl mt-2">J&D Sample Society</p>
            <p className="text-2xl mt-2">Toronto, ON</p>
          </div>
        </section>
        {/*TODO: ADD PERSONAL FOOTER*/}
      </div>
    </div>
  );
}
