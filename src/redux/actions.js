import {CommonAPI} from "@/api/CommonAPI";

export const SET_LOADING = "SET_LOADING";
export const UPDATE_COINS = "UPDATE_COINS";
export const UPDATE_MARKET = "UPDATE_MARKET";

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const updateCoins = (coins) => ({
  type: "UPDATE_COINS",
  payload: coins,
});

export const updateMarket = (market) => ({
  type: "UPDATE_MARKET",
  payload: market,
});

export const fetchWalletBalances = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
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
        Total: item.total,
        InOrders: 0,
        Equivalent: item.balance,
        Deposit: "Deposit",
        Withdraw: "Withdraw",
        usdAmount: item.balance,
      }));

      dispatch(updateCoins(formattedCoins));
    } catch (error) {
      console.error("Error fetching wallet balances:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchCryptos = (pageNum = 1) => async (dispatch) => {
  dispatch(setLoading(true));
  try {

    const common = new CommonAPI()
    const response  = await common.GetMarketPrices()
    console.log(response)
    dispatch(updateMarket(response));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  dispatch(setLoading(false));
};
