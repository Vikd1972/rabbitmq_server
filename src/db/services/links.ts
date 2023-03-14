import Link from '../entities/links';
import db from '..';
import logger from '../../utils/logger';

export const addOrUpdateLink = async (newItem: Link) => {
  try {
    const link = await db.links.findOne({
      where: {
        path: newItem.path,
      },
    });

    let newLink = new Link();

    if (!link) {
      newLink = await db.links.save({
        ...newItem,
      });

      logger('INFO', 'db.services.links.addOrUpdateLink', `Link ${newLink.path} is added`);
      return newLink;
    }

    newLink = await db.links.save({
      ...link,
      ...newItem,
    });

    logger('INFO', 'db.services.links.addOrUpdateLink', `Link ${newLink.path} is updated`);
    return newLink;
  } catch (error) {
    logger('ERROR', 'db.services.links.addOrUpdateLink', 'Database error');
  }
};

export default {
  addOrUpdateLink,
};
