export function getPageColor(path: string): string {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const colorMap: { [key: string]: string } = {
    '/': '#ffffff', 
    '/events': '#F8F9FA',
    '/lost': '#F8F9FF', 
  };

  const matchedPath = Object.keys(colorMap).find(key => 
    cleanPath === key || cleanPath.startsWith(`${key}/`)
  );

  return matchedPath ? colorMap[matchedPath] : 'orange'; 
}


// (auth)
//
//
// (base)
//