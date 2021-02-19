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
  _id: string;
  description: string;
  price: number;
  drink?: boolean;
}

export interface ICategory {
  name: string;
  _id: string;
  color: string;
  products: IProduct[];
}

interface Props {
  categoryInformation: ICategory;
}

const CategoryBlock: React.FC<Props> = ({ categoryInformation }) => {
  return (
    <Container id={categoryInformation.name.replace(/\s/g, '')}>
      <Title>{categoryInformation.name}</Title>
      <Content>
        {categoryInformation.products.map((product: IProduct) => (
          <ItemInformation key={product._id}>
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
