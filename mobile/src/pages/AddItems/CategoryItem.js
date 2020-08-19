import React from 'react';

import { CategoryContainer, Title } from './styles';

const CategoryItem = ({ item, handleLoadCategoryProducts }) => {
  return (
    <CategoryContainer
      color={item.color}
      onPress={() => handleLoadCategoryProducts(item._id)}
    >
      <Title>{item.name}</Title>
    </CategoryContainer>
  );
};

export default CategoryItem;
