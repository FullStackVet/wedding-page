// Guestbook logic
import { db } from "@/lib/firebase";
import { GuestbookEntry, NewGuestbookEntry } from "@/types/guestbook";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  limit,
} from "firebase/firestore";

export const addGuestbookEntry = async (entry: NewGuestbookEntry) => {
  // Validate input
  if (!entry.name.trim() || !entry.message.trim()) {
    throw new Error("Name and message are required");
  }

  try {
    const docRef = await addDoc(collection(db, "guestbook_entries"), {
      ...entry,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error adding entry: ", errorMessage);
    throw new Error(`Failed to add guestbook entry: ${errorMessage}`);
  }
};

export const getGuestbookEntries = async (): Promise<GuestbookEntry[]> => {
  try {
    const q = query(
      collection(db, "guestbook_entries"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as GuestbookEntry[];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching entries: ", errorMessage);
    throw new Error(`Failed to fetch guestbook entries: ${errorMessage}`);
  }
};
