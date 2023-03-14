import Link from '../entities/links';
import db from '..';
import logger from '../../utils/logger';

export const getLinkId = async (domen: string) => {
  try {
    const link = await db.links.findOne({
      where: {
        path: domen,
      },
    });

    if (link) {
      logger('INFO', 'db.services.links.addLink', `id: ${link.id}, path: ${link.path}`);
      return link.id;
    }

    const newItem = new Link();
    newItem.title = 'root path';
    newItem.path = domen;

    const newLink = await db.links.save(newItem);
    logger('INFO', 'db.services.links.addLink', `id: ${newLink.id}, path: ${newLink.path}`);
    return newLink.id;
  } catch (error) {
    logger('ERROR', 'db.services.links.addLink', 'Database error');
  }
};

export const getLink = async (linkId: number) => {
  try {
    const link = await db.links.findOne({
      where: {
        id: linkId,
      },
    });
    logger('INFO', 'db.services.links.getLink', `id: ${link.id}, path: ${link.path}`);
    return link;
  } catch (error) {
    logger('ERROR', 'db.services.links.getLink', `Link with id: ${linkId} not found`);
  }
};

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
  getLinkId,
  getLink,
  addOrUpdateLink,
};
