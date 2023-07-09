import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from '../utils/firebase.config';
import { FaPowerOff, FaSearch } from "react-icons/fa";
import axios from "axios";
import ConfettiExplosion from 'react-confetti-explosion';


export default function Navbar({ isScroll }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [search, setSearch] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const Navigate = useNavigate();
  const links = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "TV Shows",
      link: "/tvshows"
    },
    {
      name: "Movies",
      link: "/movies"
    },
    {
      name: "My Lists",
      link: "/mylists"
    }
  ];


  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&query=${search}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    if (search) {
      fetchSearchResults();
    }
  }, [search]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      Navigate("/login");
    }
  });
  const goDetails=(id)=>{
    Navigate(`/details/${id}`)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const selectedResult = searchResults[0]; // Assuming you want to navigate to the first search result
      Navigate(`/details/${selectedResult.id}`);
    }
  };
  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 100,
    width: 1000,
    colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4'],
  };

  return (
    <Container>
      <nav className={`${isScroll ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <Link to="/" aria-label="Home">
            <button className="brand flex a-center j-center">
              <img src={logo} alt="Logo" className="" />
            </button>
          </Link>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name} className="shadow-sm">
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className=" w-full flex-cols">
            <div
              className={`search ${showSearch ? "show-search" : ""}`}
              aria-expanded={showSearch}
            >
              <button
                onFocus={() => setShowSearch(true)}
                onBlur={() => {
                  if (!inputHover) {
                    setShowSearch(false);
                  }
                }}
                aria-label="Toggle Search"
                title="Toggle Search"
              >
                <FaSearch />
              </button>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search"
                  onMouseEnter={() => setInputHover(true)}
                  onMouseLeave={() => setInputHover(false)}
                  onBlur={() => {
                    setShowSearch(false);
                    setInputHover(false);
                  }}
                  value={search}
                  onChange={handleSearch}
                  aria-label="Search"
                />
              </form>
            </div>
            {showSearch && (
              <div className="absolute w-48 truncate">
                <ul className="text-black">
                  {searchResults.slice(0, 5).map((r) => (
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      key={r.id}
                      onClick={() => goDetails(r.id)}
                    >
                      <Link to={`/details/${r.id}`}>
                        {r.title || r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => signOut(firebaseAuth)}
            aria-label="Sign Out"
            title="Sign Out"
            className="sign-out-button"
          >
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    
    .left {
      gap: 2rem;
      
      .brand {
        img {
          height: 4rem;
        }
      }
      
      .links {
        list-style-type: none;
        gap: 2rem;
        
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    
    .right {
      gap: 1rem;
      
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        
        &:focus {
          outline: none;
        }
        
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        
        button {
          background-color: transparent;
          border: none;
          
          &:focus {
            outline: none;
          }
          
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          
          &:focus {
            outline: none;
          }
        }
      }
      
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
  
  // Media query for responsive design
  @media (max-width: 768px) {
    nav {
      padding: 0 2rem;
      
      .left {
        .brand {
          img {
            height: 3rem;
          }
        }
        
        .links {
          display: none;
        }
      }
      
      .right {
        .search {
          display: none;
        }
        
        .show-search {
          border: none;
          background-color: transparent;
        }
      }
    }
  }
`;

