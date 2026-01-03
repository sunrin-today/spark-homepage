export function getPageColor(path: string): string {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const colorMap: { [key: string]: string } = {
    '/': 'white', 
    '/charger' : 'black',
    '/losts' : 'black',
    '/miniroom' : 'black'
  };

  const matchedPath = Object.keys(colorMap).find(key => 
    cleanPath === key || cleanPath.startsWith(`${key}/`)
  );

  return matchedPath ? colorMap[matchedPath] : 'main'; 
}


// (auth)
//
//
// (base)
//