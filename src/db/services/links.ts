import type Link from '../entities/links';
import db from '..';
import logger from '../../utils/logger';

export const setLink = async (newItem: Link) => {
  try {
    const link = await db.links.findOne({
      where: {
        path: newItem.path,
      },
    });

    const newLink = await db.links.save({
      ...link,
      ...newItem,
    });

    logger('INFO', 'db.services.links.setLink', `Link ${newLink.path} is saved`);
    return newLink;
  } catch (error) {
    logger('ERROR', 'db.services.links.setLink', 'Database error');
  }
};

export default {
  setLink,
};
