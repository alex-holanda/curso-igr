import http from '../utils/http';

export const getAnnouncements = () => {
  http
    .get('https://www.bitmex.com/api/v1/announcement')
    .then(res => console.log(res));
}