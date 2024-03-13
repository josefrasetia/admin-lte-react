/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IMenuItem } from '@app/modules/main/menu-sidebar/MenuSidebar';

const MenuItem = ({dataMenu}: {dataMenu: IMenuItem[]} ) => {
  const initArr: number[] = [];
  const initArrString: string[] = [];
  const [t] = useTranslation();
  const [indexExpanded, setIndexExpanded] = useState(initArr);
  const [activeParent, setActiveParent] = useState(initArrString);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (menuItem: IMenuItem) => {
    if(!menuItem.parent) {
      // menu item tidak ada parent
      if(indexExpanded.includes(menuItem.menuId)) {
        setIndexExpanded(indexExpanded.filter((i) => i !== menuItem.menuId));
      } else {
        setIndexExpanded([...indexExpanded, menuItem.menuId]);
      }
    } else {
      // menu item ada parent
      if (indexExpanded.includes(menuItem.menuId)) {
        setIndexExpanded(indexExpanded.filter((i) => i !== menuItem.menuId));
      } else {
          setIndexExpanded([...indexExpanded, menuItem.menuId]);
      }
    }

  };

  const handleMainMenuAction = (menuItem: IMenuItem) => {    
    if (menuItem.children) {
      toggleMenu(menuItem);
      return;
    }
    navigate(menuItem.path ? menuItem.path : '/');
    
    if (!menuItem.parent) {
      setIndexExpanded([]);
      setActiveParent([]);
    }
  };

  useEffect(() => {    
    const getActiveParent = (dataMenu: IMenuItem[]) => {
      dataMenu.forEach((menuItem: IMenuItem, i: number) => {
        if(menuItem.children) {
          menuItem.children.forEach((child: IMenuItem, j: number) => {
            if(location.pathname === child.path) {
              setActiveParent([menuItem.name]);
              setIndexExpanded([menuItem.menuId]);
            }
            if(child.children) {
              child.children.forEach((subChild: IMenuItem, k: number) => {
                if(location.pathname === subChild.path) {
                  // @ts-ignore
                  setActiveParent([child.parent, child.name]);
                  setIndexExpanded([menuItem.menuId, child.menuId]);
                }
              });
            }
          });
        }
      });
    }
    getActiveParent(dataMenu);
  }, [location]);

  const getMenu = (dataMenu: IMenuItem[]) => {
    return dataMenu.map((menuItem: IMenuItem, i: number) => {
      return (
        <li key={i} className={`nav-item${indexExpanded.includes(menuItem.menuId) && menuItem.children ? ' menu-open' : ''}`}>
          <a
            className={`nav-link${
              location.pathname === menuItem.path || (location.pathname != menuItem.path && indexExpanded.includes(menuItem.menuId) && activeParent.includes(menuItem.name) && menuItem.children) ? ' active' : ''
            }`}
            role="link"
            onClick={() => {handleMainMenuAction(menuItem)}}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${menuItem.icon}`} />
            <p>{t(menuItem.name)}</p>
            {menuItem.children ? <i className="right fas fa-angle-left" /> : null}
          </a>

          {menuItem.children && (
            <ul className="nav nav-treeview">
              {getMenu(menuItem.children)}
            </ul>
          )}
        </li>
      )
    });
  }

  return <>{ getMenu(dataMenu)}</>;
};

export default MenuItem;
