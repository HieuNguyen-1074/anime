import React from 'react';
import { menuItems } from '../_assets/_images/contants';

export default function DirectMenu() {
  return (
    <div className='menu flex justify-center items-center gap-4 w-fit'>
      {menuItems.map((menu) => (
        <MenuItem
          key={menu.title}
          menu={menu}
        />
      ))}
    </div>
  );
}

function MenuItem(props: any) {
  const { title, categories, bottoms, link } = props.menu;

  return (
    <div className=' relative group menu-item'>
      <div className=' menu-header flex items-center gap-2 group-hover:bg-white/80 rounded-[70px] px-4 py-2'>
        {categories ? (
          <>
            <p className='cursor-default'>{title}</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='#5d5e5f'
              aria-hidden='true'
              className='duration-200 w-[15px] h-[15px] opacity-40 rotate-180 group-hover:rotate-0'>
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'></path>
            </svg>
          </>
        ) : (
          <a href={link}>{title}</a>
        )}
      </div>
      <MenuItemCategories
        bottoms={bottoms}
        categories={categories}
      />
    </div>
  );
}
function MenuItemCategories(props: any) {
  const { categories, bottoms } = props;
  if (categories) {
    return (
      <div className='absolute top-full left-0 hidden group-hover:block pt-3'>
        <div className=' bg-white/80  rounded-lg  opacity-95 p-1  min-w-[300px] flex flex-col gap-1 '>
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
