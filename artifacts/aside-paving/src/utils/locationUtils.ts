export function getDescriptionIndex(location: string, service: string): number {
  const hash = (location + service).split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return Math.abs(hash) % 3
}

export function formatLocation(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function locationHref(serviceSlug: string, locationSlug: string) {
  return `/${serviceSlug}/${locationSlug}`
}

export function generateLocationFAQs(
  baseFaqs: { question: string; answer: string }[],
  locationName: string,
  serviceTitle: string,
  relatedServices: { name: string; slug: string }[],
  local: { description: string; county: string; nearby: string[]; landmark?: string }
) {
  const nearby = local.nearby.slice(0, 3).map(formatLocation).join(", ")
  const landmark = local.landmark ? ` around ${local.landmark}` : ""
  return [
    ...baseFaqs.map(faq => ({
      question: `${faq.question.replace(/\?$/, "")} in ${locationName}?`,
      answer: `${faq.answer} For ${serviceTitle.toLowerCase()} in ${locationName} — ${local.description}${landmark} — we price the job from the access, the existing surface, and how water leaves the site. The same crews also cover ${nearby} in Co. ${local.county}.`
    })),
    ...relatedServices.map(s => ({
      question: `Do you provide ${s.name.toLowerCase()} services in ${locationName}?`,
      answer: `Yes. ${s.name} in ${locationName} is booked with the same team that works ${local.description}. Nearby calls in ${nearby} are on the same runs.`
    })),
    {
      question: `Do you provide ${serviceTitle.toLowerCase()} services throughout ${locationName}?`,
      answer: `Yes. Aside Paving covers ${locationName} and the roads out towards ${nearby}. ${local.landmark ? `${local.landmark} is a typical landmark for quotes in this area. ` : ""}Call the Kildare office on +353 45 395 149 or send photos on WhatsApp.`
    }
  ]
}
