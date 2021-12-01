<template>
  <div style="display: grid; justify-content: center">
    <!-- TODO: When Authenticated -> turn into avatar with disconnect button on popup -->
    <Authenticate />
    
    <Coin :address="shibaInuAddress" :chain="chainId"/>

    <!-- TODO: Add logo and styling to Current Chain -->
    <Chain />
    
    <!-- TODO: Styling -->
    <NativeBalance />

    <!-- Ready2Go, TODO: Router/Switch -->
    <ERC20Transfers />
    <ERC20Balances />
    <NativeTransactions />
  </div>
</template>

<script>
import Authenticate from './components/Authenticate.vue'
import ERC20Transfers from './components/ERC20Transfers.vue'
import ERC20Balances from './components/ERC20Balances.vue'
import NativeBalance from './components/NativeBalance.vue'
import NativeTransactions from './components/NativeTransactions.vue'
import Chain from './components/Chain.vue'
import Coin from './components/Coin.vue'
import useMoralis from './hooks/useMoralis'
export default {
  name: 'App',
  components: {
    Authenticate,
    ERC20Transfers,
    ERC20Balances,
    NativeBalance,
    NativeTransactions,
    Chain,
    Coin
  },
  setup() {
    const  { chainId } = useMoralis()
    const shibaInuAddress = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
    return {
      chainId,
      shibaInuAddress
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
