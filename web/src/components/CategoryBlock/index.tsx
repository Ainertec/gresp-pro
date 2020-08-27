/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Container,
  Content,
  Title,
  HeaderContent,
  ItemTitle,
  ItemIcon,
  ItemIconDrink,
  ItemPrice,
  Description,
  ItemInformation,
} from './styles';

interface IProduct {
  name: string;
  description: string;
  price: number;
  drink?: boolean;
}

interface ICategory {
  name: string;
  // id: string;
  products: IProduct[];
}

interface Props {
  categoryInformation: ICategory;
  key?: string;
}

const CategoryBlock: React.FC<Props> = ({ categoryInformation }) => {
  return (
    <Container id={categoryInformation.name.replace(/\s/g, '')}>
      <Title>{categoryInformation.name}</Title>
      <Content>
        {categoryInformation.products.map(product => (
          <ItemInformation key={product.name}>
            <HeaderContent>
              <header>
                {product.drink ? <ItemIconDrink /> : <ItemIcon />}
                <ItemTitle>{product.name}</ItemTitle>
              </header>

              <ItemPrice>{`R$ ${product.price.toFixed(2)}`}</ItemPrice>
            </HeaderContent>
            <Description>{product.description}</Description>
          </ItemInformation>
        ))}
      </Content>
    </Container>
  );
};

export default CategoryBlock;
