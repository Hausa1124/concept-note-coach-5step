// AI-powered grammar polish utility with throttling
// Cache to avoid redundant API calls
const polishCache = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

export async function polishText(text: string): Promise<string> {
  if (!text || text.trim().length < 6) return text;
  
  const trimmed = text.trim();
  
  // Check cache first
  if (polishCache.has(trimmed)) {
    return polishCache.get(trimmed)!;
  }
  
  // Check if request is already pending
  if (pendingRequests.has(trimmed)) {
    return pendingRequests.get(trimmed)!;
  }
  
  // Create new request
  const request = performPolish(trimmed);
  pendingRequests.set(trimmed, request);
  
  try {
    const result = await request;
    polishCache.set(trimmed, result);
    return result;
  } finally {
    pendingRequests.delete(trimmed);
  }
}

async function performPolish(text: string): Promise<string> {
  try {
    // In a real implementation, this would call Bolt's AI API
    // For now, we'll simulate with basic grammar improvements
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let polished = text;
    
    // Basic grammar improvements
    // Capitalize first letter of sentences
    polished = polished.replace(/(^|\. )([a-z])/g, (match, prefix, letter) => 
      prefix + letter.toUpperCase()
    );
    
    // Remove double spaces
    polished = polished.replace(/\s+/g, ' ');
    
    // Fix common grammar issues
    polished = polished.replace(/\bi\b/g, 'I'); // Capitalize "i"
    polished = polished.replace(/\bwont\b/g, "won't"); // Add apostrophe
    polished = polished.replace(/\bcant\b/g, "can't"); // Add apostrophe
    polished = polished.replace(/\bdont\b/g, "don't"); // Add apostrophe
    
    // Ensure sentences end with periods (but not if they end with other punctuation)
    if (polished && !polished.match(/[.!?]$/)) {
      polished += '.';
    }
    
    // Remove trailing spaces
    polished = polished.trim();
    
    return polished;
    
  } catch (error) {
    console.error('Polish API failed:', error);
    return text; // Return original on error
  }
}

// Clear cache periodically to prevent memory leaks
setInterval(() => {
  if (polishCache.size > 100) {
    polishCache.clear();
  }
}, 5 * 60 * 1000); // Clear every 5 minutes if cache gets large