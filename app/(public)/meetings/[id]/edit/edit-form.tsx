'use client';

import { useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

interface EditMeetingFormProps {
    meeting: SacramentMeeting;
}

export default function EditMeetingForm({ meeting }: EditMeetingFormProps) {
    const initialState: State = { message: null, errors: {} };

    // Bind the meeting ID as the first argument to updateMeeting safely
    const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
    const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

    return (
        <form action={formAction} className="space-y-4 max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

            {/* Date & Meeting Type Dropdown */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Meeting Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={meeting.date}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="date-error"
                    />
                    <div id="date-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.date?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>

                <div>
                    <label htmlFor="meetingType" className="block text-sm font-medium text-slate-700 mb-1">Meeting Type</label>
                    <select
                        id="meetingType"
                        name="meetingType"
                        defaultValue={meeting.meetingType}
                        className="w-full border rounded p-2 bg-white text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="meetingType-error"
                    >
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake Conference</option>
                        <option value="general">General Conference</option>
                        <option value="special">Special</option>
                    </select>
                    <div id="meetingType-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.meetingType?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
            </div>

            {/* Presiding & Conducting Leadership Strings */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="presiding" className="block text-sm font-medium text-slate-700 mb-1">Presiding</label>
                    <input
                        id="presiding"
                        name="presiding"
                        defaultValue={meeting.presiding}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="presiding-error"
                    />
                    <div id="presiding-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.presiding?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>

                <div>
                    <label htmlFor="conducting" className="block text-sm font-medium text-slate-700 mb-1">Conducting</label>
                    <input
                        id="conducting"
                        name="conducting"
                        defaultValue={meeting.conducting}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="conducting-error"
                    />
                    <div id="conducting-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.conducting?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
            </div>

            <hr className="my-2 border-slate-200" />

            {/* Opening Hymn JSON Parsing */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                    <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">Opening Hymn #</label>
                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        defaultValue={meeting.openingHymn?.number}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="openingHymnNumber-error"
                    />
                    <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingHymnNumber?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">Opening Hymn Title</label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        defaultValue={meeting.openingHymn?.title}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="openingHymnTitle-error"
                    />
                    <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingHymnTitle?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-700 mb-1">Opening Prayer By</label>
                <input
                    id="openingPrayer"
                    name="openingPrayer"
                    defaultValue={meeting.openingPrayer}
                    className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                    aria-describedby="openingPrayer-error"
                />
                <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.openingPrayer?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                </div>
            </div>

            {/* Sacrament Hymn JSON Parsing */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                    <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">Sacrament #</label>
                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        defaultValue={meeting.sacramentHymn?.number}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="sacramentHymnNumber-error"
                    />
                    <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.sacramentHymnNumber?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">Sacrament Hymn Title</label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        defaultValue={meeting.sacramentHymn?.title}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="sacramentHymnTitle-error"
                    />
                    <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.sacramentHymnTitle?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
            </div>

            {/* Closing Hymn JSON Parsing */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                    <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-slate-700 mb-1">Closing Hymn #</label>
                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        defaultValue={meeting.closingHymn?.number}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="closingHymnNumber-error"
                    />
                    <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingHymnNumber?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-slate-700 mb-1">Closing Hymn Title</label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        defaultValue={meeting.closingHymn?.title}
                        className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                        aria-describedby="closingHymnTitle-error"
                    />
                    <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingHymnTitle?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-700 mb-1">Closing Prayer By</label>
                <input
                    id="closingPrayer"
                    name="closingPrayer"
                    defaultValue={meeting.closingPrayer}
                    className="w-full border rounded p-2 text-slate-900 focus:ring-2 focus:ring-[#5b6e60] outline-none"
                    aria-describedby="closingPrayer-error"
                />
                <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.closingPrayer?.map((err) => <p key={err} className="text-xs text-red-600 mt-1">{err}</p>)}
                </div>
            </div>

            {/* Stake Business Checkbox */}
            <div className="flex items-center gap-2 py-2">
                <input
                    id="stakeBusiness"
                    name="stakeBusiness"
                    type="checkbox"
                    value="true"
                    defaultChecked={meeting.stakeBusiness}
                    className="h-4 w-4 rounded border-slate-300 text-[#5b6e60] focus:ring-[#5b6e60]"
                />
                <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-700">This meeting includes Stake Business</label>
            </div>

            {state.message && <p className="text-sm font-medium text-red-600 mt-2">{state.message}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#5b6e60] hover:bg-[#4a5a4e] text-white font-semibold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
                {isPending ? 'Updating...' : 'Update Sacrament Meeting'}
            </button>
        </form>
    );
}
