import React from "react"

export function Section({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-balance">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground dark:text-gray-300">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
