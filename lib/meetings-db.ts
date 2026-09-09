// lib/meetings-db.ts
import { SacramentMeeting } from './types';

// In-memory data store seeded with 5 meetings
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop David Nielsen',
    conducting: 'Brother Mark Taylor',
    announcements: [
      'Youth temple trip this coming Wednesday at 5:00 PM.',
      'Ward clean-up service project on Saturday morning at 8:00 AM.'
    ],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Sarah Jenkins',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 196, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [], // Fast Sunday
    closingHymn: { number: 2, title: 'The Spirit of God' },
    closingPrayer: 'Brother Alan Vance'
  },
  {
    id: 2,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop David Nielsen',
    conducting: 'Brother Chris Evans',
    announcements: ['Stake Conference will be held next weekend, no local ward meetings.'],
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Brother Samuel Wright',
    wardBusiness: [
      { description: 'Sister Emily Cowley was sustained as a Primary Teacher.' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Sister Melissa Benson', topic: 'Faith in Times of Trial', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Be Still, My Soul', type: 'musical-number' },
      { name: 'Brother Thomas Lee', topic: 'The Power of the Book of Mormon', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister Chloe Martinez'
  },
  {
    id: 3,
    date: '2026-09-20',
    meetingType: 'stake',
    presiding: 'President Keith R. Edwards',
    conducting: 'President Keith R. Edwards',
    announcements: ['General Conference broadcast details will be distributed via email.'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Robert Vance',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Sister Linda Peterson', topic: 'Covenant Keeping', type: 'speaker' },
      { name: 'President Craig Nelson', topic: 'Strengthening the Home', type: 'speaker' }
    ],
    closingHymn: { number: 241, title: 'Count Your Blessings' },
    closingPrayer: 'Sister Rachel Young'
  },
  {
    id: 4,
    date: '2026-09-27',
    meetingType: 'regular',
    presiding: 'Bishop David Nielsen',
    conducting: 'Brother Mark Taylor',
    announcements: ['Tithing declaration sign-up sheets are posted on the clerk office door.'],
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Hannah Scott',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 184, title: 'Upon the Cross of Calvary' },
    speakers: [
      { name: 'Elder Joshua Smith', topic: 'Missionary Work', type: 'speaker' },
      { name: 'Brother James & Sister Maria Hall', topic: 'The Spirit of Elijah', type: 'musical-number' },
      { name: 'Sister Amanda Miller', topic: 'Temple Blessings', type: 'speaker' }
    ],
    closingHymn: { number: 100, title: 'Nearer, My God, to Thee' },
    closingPrayer: 'Brother Donald Clark'
  },
  {
    id: 5,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'President Russell M. Nelson',
    conducting: 'The Council of the Twelve',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'General Authority Seventy',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: 'Memories of Galilee' },
    speakers: [
      { name: 'Sustaining of Church Officers', topic: 'Church Business', type: 'speaker' },
      { name: 'Tabernacle Choir', topic: 'Come, Follow Me', type: 'musical-number' }
    ],
    closingHymn: { number: 294, title: 'Love One Another' },
    closingPrayer: 'General Officer of the Church'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter(m => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find(m => m.id === id);
}

export function getCurrentOrNextMeeting(): SacramentMeeting | undefined {
  if (meetings.length === 0) return undefined;
  const today = new Date().toISOString().split('T')[0];
  const sorted = [...meetings].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.find(m => m.date >= today);
  return upcoming || sorted[sorted.length - 1]; // Fallback to last meeting if all are in past
}
