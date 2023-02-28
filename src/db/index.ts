import dataSource from './dataSource';
import Link from './entities/links';

const Links = dataSource.getRepository(Link);

export default {
  Links,
};
