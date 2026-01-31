
export function getPageColor(path: string, isScrolled?: boolean): {buttonColor: string, textColor: string} {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const colorMap: Record<string, {buttonColor: string, textColor: string}> = {
    '/': {buttonColor: '#0D0D0D', textColor: '#FFFFFF' }, 
    '/charger': {buttonColor: '#F9F9F9', textColor: '#0D0D0D'},
    '/losts': {buttonColor: '#F9F9F9', textColor: '#0D0D0D'},
    '/meeting-room': {buttonColor: '#F9F9F9', textColor: '#0D0D0D'},
    '/notice': {buttonColor: '#F9F9F9', textColor: '#0D0D0D'},
    '/about': {buttonColor: '#0D0D0D', textColor: '#FFFFFF'},
  };

  const matchedPath = Object.keys(colorMap).find(key => 
    cleanPath === key || cleanPath.startsWith(`${key}/`)
  );

  return matchedPath ? colorMap[matchedPath] : {buttonColor: '#F9F9F9', textColor: '#FF805C'};
}