import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className='max-w-7xl mx-auto px-8 w-full'>{children}</div>
  );
}

export default Layout;
