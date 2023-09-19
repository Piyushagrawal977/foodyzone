import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./Components/SearchResults";
export const BASE_URL="http://localhost:9000";


const App = () => {
  const [data,setdata]=useState(null);
  const [filterdata,setfilterdata]=useState(null);
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState(null);
  const [selectedbutton,setselectedbutton]=useState("all");

  useEffect(()=>{
    const fetchfooddata=async ()=>{
      setloading(true);
      const response=await fetch(BASE_URL);
      const json=await response.json();
      try {
        setfilterdata(json);
        setdata(json);
        setloading(false);
      } catch (error) {
        seterror("Unable to fetch data");
      }
    };
   
  
    fetchfooddata();
  },[] );
  

  const searchFood =(e)=>{
    const searchvalue=e.target.value;
    // console.log(searchvalue);
    if(searchvalue== ""){
      setfilterdata(null);
    }
    const filter=data?.filter((food)=> food.name.toLowerCase().includes(searchvalue.toLowerCase()));
    setfilterdata(filter);
  }
  const filterFood = (type) => {
    if (type === "all") {
      setfilterdata(data);
      setselectedbutton("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilterdata(filter);
    setselectedbutton(type);
  };
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  
  if(error)return <div>{error}</div>;
  if(loading) return <div>loading....</div>;
 
  return (
    <>
    <Container>
      <Topcontainer>
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>
          <input className="search" onChange={searchFood}
          placeholder="Search Food..."/>
        
      </Topcontainer>
      <Filtercontainer>
      {filterBtns.map((value) => (
            <Button
              isSelected={selectedbutton === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
      </Filtercontainer>
      
    </Container>
    <SearchResults data={filterdata}/>
    </>
)
};


export default App;
export const Container=styled.div`
  max-width:1200px;
  margin:0 auto;
  /* border: 1px solid white; */
`;
const Topcontainer=styled.section`
  
  display:flex;
  justify-content:space-between;
  padding: 16px;
  min-height:140px;
  align-items:center;
  .search{
    background-color:transparent;
    height:40px;
    border:1px solid red ;
    border-radius:5px;
    color:white;
    font-size:16px;
    padding:0 10px;

    
  }
`
const Filtercontainer=styled.section`
  display:flex;
  justify-content:center;
  gap:12px;
  padding-bottom:40px;
`;
export const Button=styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  background: #FF4343;
  padding: 6px 12px;
  border:none;
  color:white;
  cursor: pointer;
  &:hover{
    background-color:#f22f2f;
  }
`;

