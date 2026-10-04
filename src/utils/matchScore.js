// Frontend matching simulation
// TODO: Replace with backend ML-based matching when ready

export function calculateMatchScore(userA, userB) {
  if (!userA || !userB) return 0;

  let score = 0;
  let maxScore = 0;

  // Matching skills (weight: 40)
  maxScore += 40;
  const commonSkills = userA.skills?.filter(s => userB.skills?.includes(s)) || [];
  const skillRatio = Math.min(commonSkills.length / Math.max(userB.skills?.length || 1, 1), 1);
  score += Math.round(skillRatio * 40);

  // Common interests (weight: 25)
  maxScore += 25;
  const commonInterests = userA.interests?.filter(i => userB.interests?.includes(i)) || [];
  const interestRatio = Math.min(commonInterests.length / Math.max(userB.interests?.length || 1, 1), 1);
  score += Math.round(interestRatio * 25);

  // Same department (weight: 20)
  maxScore += 20;
  if (userA.department === userB.department) score += 20;

  // Year compatibility (weight: 15 - closer years score higher)
  maxScore += 15;
  const yearDiff = Math.abs((userA.year || 0) - (userB.year || 0));
  const yearScore = Math.max(0, 15 - yearDiff * 5);
  score += yearScore;

  // Ensure 60-98 range for UI realism
  const normalized = Math.round((score / maxScore) * 100);
  return Math.min(98, Math.max(60, normalized));
}

export function calculateProjectMatch(user, project) {
  if (!user || !project) return 0;
  const matchingSkills = project.requiredSkills?.filter(s => user.skills?.includes(s)) || [];
  const ratio = matchingSkills.length / Math.max(project.requiredSkills?.length || 1, 1);
  const base = Math.round(ratio * 100);
  return Math.min(98, Math.max(60, base));
}

export function getMatchReasons(userA, userB) {
  if (!userA || !userB) return [];
  const reasons = [];
  const commonSkills = userA.skills?.filter(s => userB.skills?.includes(s)) || [];
  const commonInterests = userA.interests?.filter(i => userB.interests?.includes(i)) || [];
  if (commonSkills.length > 0)
    reasons.push(`${commonSkills.length} matching skill${commonSkills.length > 1 ? 's' : ''}`);
  if (commonInterests.length > 0)
    reasons.push('Similar interests');
  if (userA.department === userB.department)
    reasons.push('Same department');
  const yearDiff = Math.abs((userA.year || 0) - (userB.year || 0));
  if (yearDiff <= 1)
    reasons.push('Compatible year');
  return reasons;
}
