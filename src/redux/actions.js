// Action to update the coins in the state
export const SET_LOADING = 'SET_LOADING';
export const UPDATE_COINS = 'UPDATE_COINS';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const updateCoins = (coins) => ({
  type: "UPDATE_COINS",
  payload: coins,
});

// Thunk action to fetch wallet balances
export const fetchWalletBalances = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from local storage
      const response = await fetch(
        "https://api.horizonvaut.com/wallet/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization token
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result = await response.json(); // Fetch the JSON response

      // Log the returned data to check its structure
      // console.log("Fetched Wallet Balances:", result); // Check the structure

      const balances = Array.isArray(result.data)
        ? result.data
        : result.data.balances || []; // Access balances correctly

      // Transform the data if necessary
      const formattedCoins = balances.map((item) => ({
        Coin: item.wallet_name,
        Address: item.wallet_id, // Assuming you want to use wallet_id as Abbr
        Total: item.balance,
        InOrders: 0, // Set default values for properties not in the API
        Equivalent: 0,
        Deposit: "Deposit",
        Withdraw: "Withdraw",
      }));

      // Dispatch the action to update the coins in the state
      dispatch(updateCoins(formattedCoins));
    } catch (error) {
      console.error("Error fetching wallet balances:", error);
    } finally {
      dispatch(setLoading(false)); // Stop loading
    }
  };
};
