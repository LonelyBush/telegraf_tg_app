import { capitalize } from '../../utils/capitalize';

export const generateBreadCrumbsItems = (
  locationPath: string,
): { title: string }[] => {
  return locationPath
    .split('/')
    .filter((elem) => elem !== '')
    .map((el) => {
      return { title: capitalize(el) };
    });
};
