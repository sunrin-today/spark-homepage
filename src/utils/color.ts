export type PageColor = 'main' | 'white' | 'black';

export function getPageColor(path: string): PageColor {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  const colorMap: Record<string, PageColor> = {
    '/': 'white', 
    '/charger': 'black',
    '/losts': 'black',
    '/miniroom': 'black'
  };

  const matchedPath = Object.keys(colorMap).find(key => 
    cleanPath === key || cleanPath.startsWith(`${key}/`)
  );

  return matchedPath ? colorMap[matchedPath] : 'main';
}

export const textColorMap = {
  main: "text-main",
  white: "text-white",
  black: "text-black",
} as const;