import dataSource from './dataSource';
import Link from './entities/links';
import Domain from './entities/domains';

export default {
  links: dataSource.getRepository(Link),
  domains: dataSource.getRepository(Domain),
};
