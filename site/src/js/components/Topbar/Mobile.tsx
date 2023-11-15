import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import Container from '../reusable/Container';
import { Route } from '../../utils/routes';
import { MENU_ENTRIES } from '../Topbar';
import Link from './Link';

import BurgerMenu from './BurgerMenu';

import Logo from '../../../assets/images/logo-alt.webp';
import Socials from './Socials';
import Hr from '../reusable/Hr';

const Mobile = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [lastPathname, setLastPathname] = React.useState(pathname);
  const [isOpen, setIsOpen] = React.useState(false);

  const goHome = () => {
    router.push(Route.url(Route.HOME));
  };

  React.useEffect(() => {
    setLastPathname(pathname);

    if (pathname !== lastPathname) {
      setIsOpen(false);
    }
  }, [pathname, lastPathname]);

  const entries = MENU_ENTRIES.map((entry) => {
    if (entry.route) {
      return (
        <Link.RouterLink key={entry.name} to={Route.url(entry.route)}>
          {entry.name}
        </Link.RouterLink>
      );
    } else if (entry.url) {
      return (
        <Link.NavLink key={entry.name} href={entry.url} target="_blank">
          {entry.name}
        </Link.NavLink>
      );
    } else {
      <></>;
    }
  });

  return (
    <div className="h-[80px] items-center bg-brand hidden sm:flex left-0 gap-4 justify-start py-2 px-4 absolute top-0 w-full z-40 shadow-lg">
      <Container.Flex className="flex-1">
        <Image
          src={Logo}
          alt="logo"
          className="cursor-pointer"
          loading="eager"
          width={48}
          height={48}
          onClick={goHome}
        />
      </Container.Flex>
      <BurgerMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
        {entries}
        <Hr />
        <Socials />
      </BurgerMenu>
    </div>
  );
};

export default Mobile;
