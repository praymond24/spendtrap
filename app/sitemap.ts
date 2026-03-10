import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://spendtrap.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://spendtrap.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://spendtrap.com/blog/27-subscriptions-you-dont-need', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://spendtrap.com/blog/how-to-find-hidden-subscriptions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://spendtrap.com/blog/what-subscriptions-do-i-have', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
