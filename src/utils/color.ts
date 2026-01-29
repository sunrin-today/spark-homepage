
export function getPageColor(path: string, isScrolled?: boolean): string {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const colorMap: Record<string, string> = {
    '/': '#FFFFFF', 
    '/charger': '#000000',
    '/losts': '#0D0D0D',
    '/miniroom': '#000000'
  };

  const matchedPath = Object.keys(colorMap).find(key => 
    cleanPath === key || cleanPath.startsWith(`${key}/`)
  );

  return matchedPath ? colorMap[matchedPath] : '#FF805C';
}