import Link from '../entities/links';
import db from '..';
import showMessage from '../../utils/showMessage';

export const getNewLinkId = async (domen: string) => {
  try {
    const link = await db.Links.findOne({
      where: {
        path: domen,
      },
    });

    if (link) {
      showMessage('INFO', 'db.services.links.addLink', `id: ${link.id}, path: ${link.path}`);
      return link.id;
    }

    const newItem = new Link();
    newItem.title = 'root path';
    newItem.path = domen;

    const newLink = await db.Links.save(newItem);
    showMessage('INFO', 'db.services.links.addLink', `id: ${newLink.id}, path: ${newLink.path}`);
    return newLink.id;
  } catch (error) {
    showMessage('ERROR', 'db.services.links.addLink', 'Database error');
  }
};

export const getLink = async (linkId: number) => {
  try {
    const link = await db.Links.findOne({
      where: {
        id: linkId,
      },
    });
    showMessage('INFO', 'db.services.links.getLink', `id: ${link.id}, path: ${link.path}`);
    return link;
  } catch (error) {
    showMessage('ERROR', 'db.services.links.getLink', `Link with id: ${linkId} not found`);
  }
};

export const addOrUpdateLink = async (newItem: Link) => {
  try {
    const link = await db.Links.findOne({
      where: {
        path: newItem.path,
      },
    });

    let newLink = new Link();

    if (!link) {
      newLink = await db.Links.save({
        ...newItem,
      });

      showMessage('INFO', 'db.services.links.updateLink', `Link ${newLink.path} is added`);
      return newLink;
    }

    newLink = await db.Links.save({
      ...link,
      ...newItem,
    });

    showMessage('INFO', 'db.services.links.updateLink', `Link ${newLink.path} is updated`);
    return newLink;
  } catch (error) {
    showMessage('ERROR', 'db.services.links.addLink', 'Database error');
  }
};

export default {
  getNewLinkId,
  getLink,
  addOrUpdateLink,
};
