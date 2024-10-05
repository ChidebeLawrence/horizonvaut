export const SET_LOADING = "SET_LOADING";
export const UPDATE_COINS = "UPDATE_COINS";

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const updateCoins = (coins) => ({
  type: "UPDATE_COINS",
  payload: coins,
});

export const fetchWalletBalances = () => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true at the start
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch(
        "https://api.horizonvaut.com/wallet/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result = await response.json();

      const balances = Array.isArray(result.data)
        ? result.data
        : result.data.balances || [];

      const formattedCoins = balances.map((item) => ({
        Coin: item.wallet_name,
        Address: item.wallet_id,
        Total: item.balance,
        InOrders: 0,
        Equivalent: 0,
        Deposit: "Deposit",
        Withdraw: "Withdraw",
      }));

      dispatch(updateCoins(formattedCoins));
    } catch (error) {
      console.error("Error fetching wallet balances:", error);
    } finally {
      dispatch(setLoading(false)); // Set loading to false after completion
    }
  };
};
