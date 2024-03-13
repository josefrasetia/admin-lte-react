
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IMenuItem {
  menuId: number;
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
  parent?: string;
}

export type testProps = {
  string1: string,
  string2: string,
  string3: string,
}

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;


const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  const [menu, setMenu] = useState<IMenuItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:9002/api/menu').then((response) => {
      setMenu(response.data);
    });
  }, []);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`} style={{position: 'fixed'}}>
      <Link to="/" className="brand-link bg-success">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={27.5}
          height={27.5}
          rounded
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>
      <div className="sidebar" >
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch dataMenu={menu} />
        </div>

        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
              {menu.length > 0 ? (<MenuItem dataMenu={menu} />) : (<Skeleton count={15} height={30} style={{marginBottom: '7px'}} />)}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
