//lib/actions.ts

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeetingInDb, deleteMeetingFromDb } from './meetings-db';

// Zod Schema to validate un-typed text elements submitted from client forms
const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Meeting date is required.'),
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"], {
  message: "Please select a valid meeting type (testimony, regular, stake, general, or special)."}),
  presiding: z.string().min(1, 'Presiding authority is required.'),
  conducting: z.string().min(1, 'Conducting coordinator is required.'),
  openingHymnNumber: z.coerce.number().int().positive('Hymn must be a positive number.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(1, 'Opening prayer assignee is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Hymn must be a positive number.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Hymn must be a positive number.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(1, 'Closing prayer assignee is required.'),
  stakeBusiness: z.preprocess((val) => val === 'true', z.boolean()),
});

export type State = {
  errors?: { [K in keyof z.infer<typeof MeetingFormSchema>]?: string[] };
  message?: string | null;
};

// Create Action
export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to schedule meeting.',
    };
  }

  const data = validatedFields.data;

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: [], // Handled or appended separately if needed
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      speakers: [],
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    // Log the error to server console and throw user-friendly message
    console.error('Database Error inside createMeeting action:', error);
    throw new Error('Database Error: Unable to save your sacrament meeting schedule.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

// Update Action
export async function updateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to update meeting agenda.',
    };
  }

  const data = validatedFields.data;

  try {
    await updateMeetingInDb(id, {
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
      openingPrayer: data.openingPrayer,
      stakeBusiness: data.stakeBusiness,
      sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
      closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    // Log the error to server console and throw user-friendly message
    console.error(`Database Error inside updateMeeting action for ID ${id}:`, error);
    throw new Error('Database Error: Unable to update this sacrament meeting agenda.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

// Delete Action
export async function deleteMeeting(id: number) {
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    // Log the error to server console and throw user-friendly message
    console.error(`Database Error inside deleteMeeting action for ID ${id}:`, error);
    throw new Error('Database Error: Unable to remove this sacrament meeting record.');
  }
  
  revalidatePath('/meetings');
}


