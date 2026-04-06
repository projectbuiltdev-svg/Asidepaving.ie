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

export function generateLocationFAQs(
  baseFaqs: { question: string; answer: string }[],
  locationName: string,
  serviceTitle: string,
  relatedServices: { name: string; slug: string }[]
) {
  return [
    ...baseFaqs.map(faq => ({
      question: `${faq.question.replace('?','')} in ${locationName}?`,
      answer: `${faq.answer} Contact our ${locationName} team today for a free quote.`
    })),
    ...relatedServices.map(s => ({
      question: `Do you provide ${s.name.toLowerCase()} services in ${locationName}?`,
      answer: `Yes — we also offer professional ${s.name.toLowerCase()} in ${locationName}.`
    })),
    {
      question: `Do you provide ${serviceTitle.toLowerCase()} services throughout ${locationName}?`,
      answer: `Yes, Aside Paving covers all areas of ${locationName} and surrounding towns. Call us or request a free quote online.`
    }
  ]
}
