export function getCookie(name: string): string {
  const cookie: string = document.cookie;
  // if(cookie.indexOf(name) === -1) {
  //   return ''
  // }
  const arrCookie: string[] = cookie.split(' ');
  const item: string | undefined = arrCookie.find(i => i.startsWith(name));
  if (!item) {
    return '';
  }
  return item.split('=')[1];
}
