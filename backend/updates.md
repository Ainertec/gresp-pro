### Updates for Gresp

[x] Manipulamento de estoque por ingredients e unitário
[x] Sistema de cortesia em um item, esse item sai 'de graça' sem somar no total, somente usuários admin.
[] Busca por categoria e consequentemente separação por categoria.

No sistema de cortesia, envia-se um campo nos 'items', como no exemplo:

items:{
product:id,
quantity: 2,
courtesy: true | false
}

Se o campo 'courtesy' for true, soma-se zero no total do pedido, caso contrario o valor do produto.
Os frontend devem fazer uma validação para ver se o usuário é ou não um administrador.
Não sendo, deve-se omitir, o negar o acesso a essa funcionalidade.

```js
categoria{

_id,
name,
products:[product_id]
}
[bebidas] [bolos]


categoria.find({_id:id}).populate(products)

const filterCategoria = categoria.map(cat=>{
  return{
    cat.products
  }
})

return filterCategoria



ou

product{
... rest,
categoria_id:
}

product.find({categoria_id:id})
```
