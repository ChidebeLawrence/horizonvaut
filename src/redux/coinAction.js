// redux/actions/coinActions.js
import {
    FETCH_DEPOSIT_ADDRESS_REQUEST,
    FETCH_DEPOSIT_ADDRESS_SUCCESS,
    FETCH_DEPOSIT_ADDRESS_FAILURE,
  } from "./actions";
  
  export const fetchDepositAddress = (coin) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_DEPOSIT_ADDRESS_REQUEST });
  
      try {
        const token = localStorage.getItem("authToken"); // Get token from local storage
        const response = await fetch(`https://api.fomobitmax.com/wallet/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
          body: JSON.stringify({ coin }), // Pass the selected coin in the request body
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch deposit address");
        }
  
        const data = await response.json();
        dispatch({
          type: FETCH_DEPOSIT_ADDRESS_SUCCESS,
          payload: data, // Assuming the response contains the deposit address
        });
      } catch (error) {
        dispatch({
          type: FETCH_DEPOSIT_ADDRESS_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  