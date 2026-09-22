import CreateMeetingForm from './create-form';

export default function Page() {
  return (
    <div className="py-8">
      {/* Changed text-white to text-[#2c302e] so the title is clearly visible against the light background */}
      <h1 className="text-2xl font-bold text-center mb-6 text-[#2c302e] uppercase tracking-wider">
        Schedule Sacrament Meeting
      </h1>
      <CreateMeetingForm />
    </div>
  );
}
