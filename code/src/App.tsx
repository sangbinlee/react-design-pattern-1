import React from 'react';
import './App.css';

// ch1 용
import { Item } from './ch1/types';
import PriceListView from './ch1/common-anti-patterns/complicated-logic/PriceListView';
import UserProfile from './ch1/common-anti-patterns/data-transform-in-component/UserProfile';
import ActiveList from './ch1/common-anti-patterns/duplication/ActiveList';
import AdminList from './ch1/common-anti-patterns/duplication/AdminList';
import ShoppingCart from './ch1/common-anti-patterns/lack-of-tests/ShoppingCart';
import SearchableList from './ch1/common-anti-patterns/props-drilling/SearchableList';
// ch4 용
import { Page, Header, Sidebar, Main } from './ch4/combined/Page';
// ch5 용
// ch6 용
// ch7 용
import { PizzaShopApp } from './ch7/App';
// ch8 용
// ch9 용
import ShoppingApplicationNew from './ch9/CQRS/ShoppingApplicationNew';
import { ShoppingCartProvider } from './ch9/CQRS/ShoppingCartContext';
// ch4 용

function App() {
  const header = (
    <Header
      title="React Design Pattern"
      subtitle="Chapter 4 Example"
      onClick={() => alert('Header clicked!')}
    />
  );

  const sidebar = (
    <Sidebar
      links={['Home', 'About', 'Contact']}
      onLinkClick={(link) => alert(`Clicked ${link}`)}
    />
  );

  const main = (
    <Main isLoading={true} content={<p>여기에 본문 내용이 표시됩니다.</p>} />
  );

  // ch1 data
  const items: Item[] = [
    { id: '1', name: 'Laptop', price: 1200 },
    { id: '2', name: 'Headphones', price: 80 },
    { id: '3', name: 'Smartphone', price: 950 },
    { id: '4', name: 'Book', price: 25 },
  ];

  const userId = 'sangbinlee9';
  // data ch1
  const users1 = [
    { isActive: true, name: '홍길동' },
    { isActive: false, name: '김철수' },
  ];
  const users2 = [
    { name: 'Alice', isAdmin: true },
    { name: 'Bob', isAdmin: false },
  ];

  type Item2 = { id: string; name: string };

  const items2: Item2[] = [{ id: '1', name: 'Laptop' }];

  return (
    <div>
      <div className="app" data-testid="applicationContainer">
        <ShoppingCartProvider>
          <ShoppingApplicationNew />
        </ShoppingCartProvider>
      </div>
      <h1>ch1</h1>
      <h2>ch1-1</h2>
      <PriceListView items={items} />
      <h2>ch1-2</h2>
      <UserProfile userId={userId} />

      <h2>ch1-3</h2>
      <ActiveList users={users1} />
      <AdminList users={users2} />
      <h2>ch1-4</h2>
      <ShoppingCart />
      <SearchableList
        items={items2}
        onItemClick={(id) => console.log('clicked:', id)}
      />

      <h2>ch1-3</h2>
      <h2>ch1-3</h2>
      <h2>ch1-3</h2>
      <h2>ch1-3</h2>
      <h2>ch1-3</h2>

      <h1>ch4</h1>
      <Page header={header} sidebar={sidebar} main={main} />
      <h1>ch7</h1>
      <PizzaShopApp />
    </div>
  );
}

export default App;
