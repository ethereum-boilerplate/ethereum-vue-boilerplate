<template>
  <div style="display: grid; justify-content: center">
    <!-- TODO: When Authenticated -> turn into avatar with disconnect button on popup -->
    <Authenticate />

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
export default {
  name: 'App',
  components: {
    Authenticate,
    ERC20Transfers,
    ERC20Balances,
    NativeBalance,
    NativeTransactions,
    Chain
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
