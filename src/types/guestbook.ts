// Guestbook interface/definition

// Add/remove fields to meet needs
// Ensure firebase has same
export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export type NewGuestbookEntry = Omit<GuestbookEntry, "id" | "timestamp">;
