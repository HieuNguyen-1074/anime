'use client';

import React from 'react';
import { menuItems } from '../_assets/_images/contants';
import { motion } from 'framer-motion';
import useScreen from '../hooks/useScreen';
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
};

export default function DirectMenu() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState<string | null>();
  const { md } = useScreen();

  const handleShowMenu = (isShow: boolean) => {
    setShowMenu(isShow);
    setCategoryOpen(null);
  };
  return (
    <div className='menu relative flex justify-center items-center gap-4 w-fit '>
      <div
        className=' flex-col gap-2 flex z-30 sm:hidden relative w-[40px] h-[40px] mt-8'
        onClick={() => handleShowMenu(!showMenu)}>
        <p
          className={
            'w-[30px] h-[3px] transition-all  ' +
            (showMenu || !md
              ? 'bg-black   rotate-45 translate-y-[10px]'
              : ' bg-white')
          }></p>
        <p
          className={
            'w-[30px] h-[3px] transition-all  ' +
            (showMenu || !md
              ? 'bg-black -rotate-45 translate-y-1/2'
              : ' bg-white')
          }></p>
      </div>
      <motion.div
        className={`flex justify-center items-center fixed  sm:relative left-0 top-0 sm:left-auto sm:top-auto w-full h-full sm:h-auto z-[20] sm:bg-inherit  bg-white  sm:${
          showMenu || !md
            ? 'flex text-black  sm:flex-row  flex-col'
            : ' sm:block'
        }`}
        animate={showMenu || !md ? 'open' : 'closed'}
        variants={variants}>
        {menuItems.map((menu) => (
          <MenuItem
            categoryOpen={categoryOpen}
            setCategoryOpen={setCategoryOpen}
            handleShowMenu={handleShowMenu}
            key={menu.title}
            menu={menu}
          />
        ))}
      </motion.div>
      {showMenu && md && (
        <button className='btn-connect fixed bottom-0 left-0 z-30  text-black items-center gap-2 rounded-[70px] px-4 py-2 text-[3rem]'>
          Connect
        </button>
      )}
    </div>
  );
}

function MenuItem({
  menu,
  setCategoryOpen,
  categoryOpen,
  handleShowMenu,
}: any) {
  const { title, categories, bottoms, link } = menu;
  const { md: md } = useScreen();

  return (
    <div className=' relative group menu-item sm:w-fit w-full'>
      <div className=' menu-header flex items-center gap-2 group-hover:bg-white/80 rounded-[70px] px-4 py-2'>
        {categories ? (
          <>
            <div
              className='flex items-center gap-2 sm:justify-start justify-between w-full sm:text-[1rem] text-[4rem] '
              onClick={() =>
                md && setCategoryOpen(title === categoryOpen ? null : title)
              }>
              <p className='cursor-default '>{title}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='#5d5e5f'
                aria-hidden='true'
                className='duration-200 sm:size-[15px] size-[4rem] opacity-40 rotate-180 group-hover:rotate-0'>
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'></path>
              </svg>
            </div>
          </>
        ) : (
          <a
            className='text-black'
            onClick={() => handleShowMenu(false)}
            href={link}>
            {title}
          </a>
        )}
      </div>
      {(categoryOpen === title || !md) && (
        <MenuItemCategories
          categories={categories}
          bottoms={bottoms}
        />
      )}
    </div>
  );
}
function MenuItemCategories(props: any) {
  const { categories, bottoms } = props;
  if (categories) {
    return (
      <div className='sm:absolute top-full left-0 pt-3'>
        <div className=' bg-white/80  rounded-lg  opacity-95 p-1  sm:min-w-[300px] sm:hidden group-hover:block  w-full flex flex-col gap-1 '>
          {categories &&
            categories.map(
              ({ categoryName, viewAll, items }: any, index: number) => (
                <div
                  className=''
                  key={index}>
                  {categoryName && (
                    <div className='flex w-full justify-between items-center bg-white rounded-t-md p-[7px] text-[10px] uppercase px-4'>
                      <p>{categoryName}</p>
                      {viewAll && <a href={viewAll}>view all</a>}
                    </div>
                  )}
                  <div className='flex flex-col  rounded-b-md p-2 bg-white mt-[1px] px-4'>
                    {items &&
                      items.map(
                        ({ title, link, image }: any, index: number) => (
                          <div
                            key={title}
                            className={`flex items-center gap-3 py-2 ${
                              index !== items.length - 1
                                ? 'border-b-[1px] border-black/5'
                                : ''
                            } `}>
                            {image && (
                              <img
                                className='w-[25px]'
                                src={image}
                                alt={title}
                              />
                            )}
                            <a
                              className=''
                              href={link}>
                              {title}
                            </a>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )
            )}
          <MenuItemBottom bottoms={bottoms} />
        </div>
      </div>
    );
  }
  return <></>;
}

function MenuItemBottom(props: any) {
  const { bottoms } = props;
  if (bottoms) {
    return (
      <div className='menu-bottom flex flex-col px-4 text-[10px]'>
        {bottoms.map((bottom: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col gap-1  ${
              index !== bottoms.length - 1 ? 'border-b-[1px] pb-1' : 'pt-1'
            } `}>
            {bottom.map(({ link, title }: any) => (
              <a
                key={link}
                href='#'
                target='_blank'>
                {title}
              </a>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return <></>;
}
