export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="grid place-items-center py-24 text-center">
      <div>
        <h1 className="bg-gradient-to-r from-[#9B5FFF] to-[#4DD0FF] bg-clip-text text-3xl font-extrabold text-transparent">
          {title}
        </h1>
        {description && <p className="mt-3 text-white/70">{description}</p>}
        <p className="mt-4 text-sm text-white/50">
          Ask to generate this page’s full content next.
        </p>
      </div>
    </div>
  );
}
