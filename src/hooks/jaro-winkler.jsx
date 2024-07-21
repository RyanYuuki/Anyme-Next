// Helper function to calculate Jaro-Winkler distance
export const jaroWinklerDistance = (s1, s2) => {
    if (s1 === s2) return 1;
  
    const maxLength = Math.max(s1.length, s2.length);
    const matchWindow = Math.floor(maxLength / 2) - 1;
  
    const matches = []; // Array to store matching characters
    const s1Matches = new Array(s1.length).fill(false); // Flags to track matching characters in s1
    const s2Matches = new Array(s2.length).fill(false); // Flags to track matching characters in s2
  
    // Find matching characters
    for (let i = 0; i < s1.length; i++) {
      const start = Math.max(0, i - matchWindow);
      const end = Math.min(i + matchWindow + 1, s2.length);
  
      for (let j = start; j < end; j++) {
        if (!s2Matches[j] && s1[i] === s2[j]) {
          s1Matches[i] = true;
          s2Matches[j] = true;
          matches.push(s1[i]);
          break;
        }
      }
    }
  
    if (matches.length === 0) return 0;
  
    // Calculate transpositions
    let t = 0;
    let k = 0;
    for (let i = 0; i < s1.length; i++) {
      if (s1Matches[i]) {
        while (!s2Matches[k]) k++;
        if (s1[i] !== s2[k]) t++;
        k++;
      }
    }
  
    // Calculate Jaro similarity
    const m = matches.length;
    const jaroSimilarity = (m / s1.length + m / s2.length + (m - t) / m) / 3;
  
    // Calculate prefix scale
    let l = 0;
    while (s1[l] === s2[l] && l < 4) l++;
  
    const jaroWinklerDistance = jaroSimilarity + l * 0.1 * (1 - jaroSimilarity);
  
    return jaroWinklerDistance;
  };
  