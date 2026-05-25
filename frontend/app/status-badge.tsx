type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const styleMap: Record<string, string> = {
    todo: "bg-gray-700 text-white",
    doing: "bg-blue-600 text-white",
    review: "bg-yellow-500 text-black",
    done: "bg-green-600 text-white",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styleMap[status] ?? "bg-gray-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}