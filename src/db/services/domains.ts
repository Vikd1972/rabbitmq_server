/* eslint-disable no-console */
import Domain from '../entities/domains';
import db from '..';
import logger from '../../utils/logger';

export const getLinkId = async (domain: string) => {
  try {
    const currentDomain = await db.domains.findOne({
      where: {
        domain,
      },
    });

    if (currentDomain) {
      logger('INFO', 'db.services.domains.getLinkId', `Domain ${currentDomain.domain} already exists`);
      return currentDomain.id;
    }

    const newItem = new Domain();
    newItem.domain = domain;
    newItem.isChecked = false;
    const newDomain = await db.domains.save(newItem);
    console.log('newDomain', newDomain);

    logger('INFO', 'db.services.domains.getLinkId', `${newDomain.domain} domain record created`);
    return newDomain.id;
  } catch (error) {
    logger('ERROR', 'db.services.domains.getLinkId', 'Database error');
  }
};

export const getLink = async (linkId: number) => {
  try {
    const domain = await db.domains.findOne({
      where: {
        id: linkId,
      },
    });
    logger('INFO', 'db.services.domains.getLink', `id: ${domain.id}, domain: ${domain.domain}`);
    return domain;
  } catch (error) {
    logger('ERROR', 'db.services.domains.getLink', `Domain with id: ${linkId} not found`);
  }
};

export default {
  getLinkId, getLink,
};
