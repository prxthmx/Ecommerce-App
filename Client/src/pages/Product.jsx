import { Add, Remove} from "@material-ui/icons";
import styled from "styled-components";
import Announcements from "../Components/Announcements";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {publicRequest} from "../requestMethods";
import { addProduct } from "../Redux/cartRedux";
import { addProductw } from "../Redux/wishlistRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
`;

const Wrapper = styled.div`
padding:50px;
display:flex;
`;

const ImgContainer = styled.div`
flex:1;
`;

const Image = styled.img`
width:100%;
height:80vh;
object-fit:cover;
`;


const InfoContainer = styled.div`
flex:1;
padding: 0px 50px;
`;


const Title = styled.div`
font-weight:600;
font-size:40px;
`;

const Desc = styled.div`
font-size:20px;
margin:20px 0px;
letter-spacing:3px;
`;

const Price = styled.div`
font-weight:300;
font-size:40px;
`;
const FilterContainer =styled.div`
display:flex;
justify-content:space-between;
width:60%;
margin: 40px 10px;
`;
const Filter =styled.div`
display:flex;
align-items:center;
`;
const FilterTitle =styled.span`
font-size:30px;
font-weight:200;
`;
const FilterColor =styled.div`
width:20px;
height:20px;
border-radius:50%;
border:1px solid black;
background-color:${props=>props.color};
margin:0px 5px;
cursor:pointer;

`;
const FilterSize =styled.select`
margin-left:10px;
padding:10px;
font-size:20px;
`;
const FilterSizeOption =styled.option`
height:100px;
width:100px;
`;
const AddContainer =styled.div`
display:flex;
width:90%;
`;
const AmountContainer =styled.div`
display:flex;
align-items:center;
font-weight:700;
`;
const Amount =styled.span`
width:45px;
height:45px;
font-size:20px;
border-radius:10px;
border:1px solid teal;
display:flex;
align-items:center;
justify-content:center;
margin:0px 5px;
`;
const Button =styled.button`
padding:15px;
border:2px solid teal;
background-color:white;
cursor:pointer;
font-weight:500;
font-size:20px;
margin-left:20px;
&:hover{
  background-color: teal;
}
`;
const ImageContainer =styled.div`
display:flex; 
flex-wrap:wrap;
margin-left:50px;
`;
const ImageContainerImg = styled.img`
height:650px;
width:620px;
margin-right:70px;
margin-bottom:50px;
`;

const Product = () => {
  const location = useLocation ();
  const id = location.pathname.split("/")[2];

  const [product , setProduct] = useState({});
  const [quantity , setQuantity] = useState(1);
  const [color , setColor] = useState("");
  const [size , setSize] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
     const getProduct = async ()=>{
      try{
        const res = await publicRequest.get("/products/find/"+id)
        setProduct (res.data);
      }catch{
      }
     }
getProduct()
  },[id])

  const handleQuantity = (type) => {
    if(type === "dec"){
     quantity > 1 && setQuantity(quantity-1)
    }
    else{
      setQuantity(quantity+1)
    }
  }

  const handleClick = ()=> {
   dispatch( addProduct({...product, quantity, color ,size}))
  }
  const handleClickw = ()=> {
    dispatch( addProductw({...product, quantity, color ,size}))
   }
   
  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>

            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>{'\u20B9'} {product.price}</Price>

                <FilterContainer>
                  <Filter>
                    <FilterTitle>Color :</FilterTitle>
                    {product.color?.map((c) => (
                    <FilterColor color={c} key={c} onClick={()=> setColor(c)}/>
                  ))}
                  </Filter>

                  <Filter>
                    <FilterTitle>Size :</FilterTitle>
                    <FilterSize onChange={(e) => setSize(e.target.value)}>
                    {product.size?.map((s) => (
                      <FilterSizeOption key="s">UK {s}</FilterSizeOption>
                      ))}
                    </FilterSize>
                  </Filter>
                </FilterContainer>
                <AddContainer>
                  <AmountContainer>
                    <Remove onClick={()=> handleQuantity("dec")} />
                    <Amount>{quantity}</Amount>
                    <Add onClick={()=> handleQuantity("inc")} />
                  </AmountContainer>
                  <Button onClick={handleClick}>ADD TO CART</Button>
                  <Button onClick={handleClickw}>ADD TO WISHLIST</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <ImageContainer>
            <ImageContainerImg src={product.bimg1}/>
            <ImageContainerImg src={product.bimg2}/>
            <ImageContainerImg src={product.bimg3}/>
            <ImageContainerImg src={product.bimg4}/>
            <ImageContainerImg src={product.bimg5}/>
        </ImageContainer>

        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product