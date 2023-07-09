import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { fetchDataByGenre } from '../store'

export default function SelectGenre({genres, type}) {
    const dispatch = useDispatch();

  return (
    <Select className='flex' onChange={
        (e) => {
            dispatch(fetchDataByGenre({ type: type, genre: e.target.value }))
        }
    }>
    {genres.map((genre) => {
        return (
            <option value={genre.id} key={genre.id}>{genre.name}</option>
        );
    }
    )}
    </Select>
  )
}

const Select = styled.select`
    width: 40wh;
    height: 2.5rem;
    border-radius: 0.2rem;
    border: solid 1px white;
    padding-left: 1rem;
    font-size: 1.2rem;
    background-color: #000000b0;
    color: white;
    option {
        background-color: black;
        color: white;
    }
`
