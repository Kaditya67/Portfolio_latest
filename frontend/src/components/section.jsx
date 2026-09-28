import React from "react"

export function Section({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:py-10">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-balance">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground dark:text-gray-300">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
