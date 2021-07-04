import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import {
  changeEditedId,
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesError,
} from '../../Reducers/Reducers';
import React, { useEffect } from "react";
import API from "../../API";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { Link, useRouteMatch, } from "react-router-dom";

const api = new API();

const List = styled.ul`
  margin-top: 25px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;

  & .item:nth-of-type(n + 2) {
    margin-top: 15px;
  }

  & .item {
    button {
      margin-left: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`

const fetchServices = async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await api.fetchItems();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch(e) {
    dispatch(fetchServicesError(e.message));
  }
}

const deleteService = async (dispatch, id) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await api.deleteItem(id);;
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch(e) {
    dispatch(fetchServicesError(e.message));
  }
}

export default function ItemsList() {
  const state = useSelector(state => state.myState);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch])


  const handleEdit = async (name, value, id) => {
    dispatch(changeEditedId(+id))
  }

  const handleRemove = async id => {
    await deleteService(dispatch, id)
  }

  return (
   <List>
     {(state.error && <Error/>) || (state.loading ? <Spinner /> : state.list.map(item =>
        <li key={item.id} className="item">
        {item.name} {item.price} <span>₽</span>
        <Link to={`${match.url}/${item.id}`}>
          <button onClick={() => handleEdit(item.name, item.price, item.id)}>✎</button>
        </Link>
        <button onClick={() => handleRemove(item.id)}>✕</button>
        </li>))}
   </List>
  )
}
