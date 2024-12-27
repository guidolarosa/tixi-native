import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ea2ffyy2', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name (usually 'production')
  useCdn: true, // Use CDN for faster reads (set to false for real-time updates)
  apiVersion: 'v2021-10-21',
  token: 'sk3P7VqGNwu167lyC7xpSXFtieMG2aqm3AFGJrO7wxp0ktGFXFz3IYf6sgoIImQwHInOiOD2gKHcPUo65gl871NcGHm3bsTb2gN1Nb9BuFKICodvFLiW4XMJ4vHPjpQuyS0bC91jKnY0FbUbf21ymaCT6pz8OIJDmHkJxSsuwKpeFtmqVUD4'
});

export default client;