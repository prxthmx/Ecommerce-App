import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";




const Container = styled.div`
display:flex; 
flex-wrap: wrap;
`


const Products = ({cat, filters, sort}) => {

const [products, setProducts] = useState([]);
const [filterProducts, setFilterProducts] = useState([]);

useEffect(() => {
const getProducts = async () => {
  try{
     const res = await axios.get(cat ? `http://localhost:3001/api/products?category=${cat}` : "http://localhost:3001/api/products");
     setProducts(res.data); 
  }catch(err){}
};
getProducts();
},[cat]);


useEffect(() => {
cat && setFilterProducts(products.filter(item => Object.entries(filters).every(([key,value])=>
item[key].includes(value)
))
)
},[products ,cat, filters])


useEffect(()=> {
if(sort==="newest"){
  setFilterProducts(prev=>
    [...prev].sort((a,b)=> a.createdAt - b.createdAt)
    )
}
else if(sort==="asc"){
  setFilterProducts(prev=>
    [...prev].sort((a,b)=> a.prices - b.prices)
    )
}
else{
  setFilterProducts(prev=>
    [...prev].sort((a,b)=> b.price - a.price)
    )
}
},[sort])


  return (

    <Container >
        {cat ? filterProducts.map(item => (
        <Product item={item} key={item.id}/>)) 
        : products.slice(0,8).map(item => (
          <Product item={item} key={item.id}/>))}

    </Container>


  )
}

export default Products