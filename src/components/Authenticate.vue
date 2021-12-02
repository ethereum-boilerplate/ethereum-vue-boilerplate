<template>
<div>
    <div v-if="isAuthenticated">
        <a-tooltip placement="bottom">
            <template #title>
                <span>Disconnect</span>
            </template>
            <a-button @click="logout">
                {{getEllipsisTxt(user.get('ethAddress'), 5)}}
            </a-button>
        </a-tooltip>
    </div>
    <div v-else-if="!isAuthenticated"> 
        <a-button @click="() => authenticate()">
            Connect Wallet
        </a-button>
    </div>
</div>
</template>

<script>
import { getEllipsisTxt } from '../helpers/formatters.js'
import useMoralis from '../composables/useMoralis'
export default {
    components: {
    },
    setup() {

        const { authenticate, logout, isAuthenticated, isAuthenticating, user } = useMoralis()   	

        return {
            getEllipsisTxt,
            authenticate,
            logout,
            isAuthenticated,
            isAuthenticating,
            user
        }
    }
}
</script>

<style>
</style>