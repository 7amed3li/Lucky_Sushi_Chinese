/** Pure helpers shared by server and client admin components. */

/** "sushi-sets" -> "Sushi Sets" */
export function prettyCategory(id) {
  return String(id ?? '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function prettyRole(role) {
  return role === 'developer' ? 'Developer' : role === 'owner' ? 'Owner' : 'Admin';
}
