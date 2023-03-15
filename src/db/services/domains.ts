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

    logger('INFO', 'db.services.domains.getLinkId', `${newDomain.domain} domain record created`);
    return newDomain.id;
  } catch (error) {
    logger('ERROR', 'db.services.domains.getLinkId', 'Database error');
  }
};

export const getDomain = async (id: number) => {
  try {
    const domain = await db.domains.findOne({
      where: {
        id,
      },
    });
    logger('INFO', 'db.services.domains.getDomain', `id: ${domain.id}, domain: ${domain.domain}`);
    return domain;
  } catch (error) {
    logger('ERROR', 'db.services.domains.getDomain', `Domain with id: ${id} not found`);
  }
};

export const updateDomain = async (id: number) => {
  try {
    const domain = await db.domains.findOne({
      where: {
        id,
      },
    });
    domain.isChecked = true;
    const currentDomain = await db.domains.save(domain);
    logger('INFO', 'db.services.domains.updateDomain', `Domain: ${currentDomain.domain} is checked`);
    return currentDomain;
  } catch (error) {
    logger('ERROR', 'db.services.domains.updateDomain', `Domain with id: ${id} not found`);
  }
};

export default {
  getLinkId,
  getDomain,
  updateDomain,
};
