export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-display text-xl font-bold tracking-wide text-forest sm:text-2xl">{children}</h2>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  )
}
