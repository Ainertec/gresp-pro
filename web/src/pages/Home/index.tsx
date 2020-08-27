/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';

import { Container, CategoryList, CategoryItemButton } from './styles';
import CategoryBlock, { ICategory } from '../../components/CategoryBlock';

import api from '../../services/api';

const Home: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    api.get('categories/menu').then(response => {
      setCategories(response.data);
      console.log('data backend', response.data);
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const classes = scrollY >= 50 ? 'fixed' : '';

  return (
    <Container>
      <h1>Cardápio</h1>
      <h3>Selecione uma Categoria</h3>
      <nav>
        <CategoryList className={classes}>
          {categories.map((category: ICategory) => (
            <CategoryItemButton
              color={category.color}
              key={category._id}
              href={`#${category.name.replace(/\s/g, '')}`}
            >
              <h4>{category.name}</h4>
            </CategoryItemButton>
          ))}
        </CategoryList>
      </nav>
      <main>
        {categories.map((category: ICategory) => (
          <CategoryBlock key={category._id} categoryInformation={category} />
        ))}
      </main>

      <footer>
        <p>Desenvolvido por Ainertec</p>
      </footer>
    </Container>
  );
};

const categoriesFake = [
  {
    id: 1,
    name: 'Tortas e Bolos',
    products: [
      {
        name: 'Torta de Limão',
        price: 5.0,
        description: 'Torta feita pelo limão da casa é realmente muito boa',
      },
      {
        name: 'Bolo de Aipim',
        price: 5.0,
        description: 'Tradicional da terra e muito gostoso ',
      },
    ],
  },
  {
    id: 2,
    name: 'Bebidas Quentes',
    products: [
      {
        name: 'Chocolate Quente',
        price: 6.0,
        drink: true,
        description:
          'Conhecido como leite com nescau mas esse tem um diferêncial, descubra!',
      },
      {
        name: 'Capuccino',
        price: 4.5,
        drink: true,
        description:
          'Capuccino feito no exato momento com o café moido da casa',
      },
    ],
  },
  {
    id: 3,
    name: 'Bebidas Frias',
    products: [
      {
        name: 'Chocolate Quente',
        price: 6.0,
        drink: true,
        description:
          'Conhecido como leite com nescau mas esse tem um diferêncial, descubra!',
      },
      {
        name: 'Capuccino',
        price: 4.5,
        drink: true,
        description:
          'Cappuccino feito no exato momento com o café moído da casa Cappuccino feito no exato momento com o café moído da casa Cappuccino feito no exato momento com o café moído da casa Cappuccino feito no exato momento com o café moído da casa Cappuccino feito no exato momento com o café moído da casa',
      },
    ],
  },
];

export default Home;
