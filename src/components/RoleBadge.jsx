export default function RoleBadge({ role }) {
  if (role === 'manager') {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-mgr text-gray-900">
        Manager
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-tech text-white">
      Technician
    </span>
  );
}
