"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Flag, BarChart3 } from "lucide-react"

const LINKS = [
  { href: "/", label: "STANDINGS", icon: Trophy },
  { href: "/matches", label: "MATCHES", icon: Flag },
  { href: "/stats", label: "STATS", icon: BarChart3 },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export function Nav() {
  const pathname = usePathname()

  return (
    <>
      {/* Top bar */}
      <header className="bg-forest text-parchment">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:px-6">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link href="/" className="font-display text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
              Trent <span className="text-gold">vs.</span> Trey
            </Link>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold-soft">
              Every Hole Has a Price
            </p>
          </div>

          {/* Desktop links */}
          <nav className="hidden gap-8 md:flex">
            {LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-2 text-sm font-semibold tracking-[0.18em]"
                  style={{ color: active ? "var(--color-gold)" : "var(--color-parchment)" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-gold transition-transform duration-200"
                    style={{ transform: active ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-gold/30 bg-forest md:hidden">
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href)
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 py-3 text-[0.65rem] font-semibold tracking-widest"
              style={{ color: active ? "var(--color-gold)" : "var(--color-parchment)" }}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.75} />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
