import { useEffect, useState } from 'react';
import { RemoteMenuItem } from '../models/RemoteMenuItem';
import { IMenuItem } from '../models/IMenuItem';
import { BaseMenuItem } from '../models/BaseMenuItem';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const result = await fetch('https://tinyurl.com/4zpypmbu');
      const menuItems = await result.json();

      setMenuItems(
        menuItems.map((item: RemoteMenuItem) => {
          return new BaseMenuItem(item);
        }),
      );
    };

    fetchMenuItems();
  }, []);

  return { menuItems };
};
