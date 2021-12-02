import Moralis from '../plugins/moralis'
import { ref, watchEffect } from 'vue'

const isInitialized = ref(false)
const hasAuthError = ref(false)
const authError = ref(false)
const user = ref(null)
const web3 = ref(null)
const web3Error = ref(null)
const chainId = ref(null)
const isWeb3Enabled = ref(false)
const isAuthenticated = ref(false)
const isAuthenticating = ref(false)

watchEffect(() => authError.value ? hasAuthError.value = true : hasAuthError.value = true)

let web3Utils = new Moralis.Web3()
const utils = web3Utils.utils;

const enableWeb3 = async () => {
        try {
                web3.value = await Moralis.enableWeb3()    
        } catch (error) {
                web3Error.value = error
        }
}

const currentUser = Moralis.User.current();

if(currentUser) {
        user.value = currentUser
        isAuthenticated.value = true
}
const isWeb3Active = Moralis.ensureWeb3IsInstalled()
if (isWeb3Active) {
        Moralis.getChainId().then((id) => chainId.value = utils.toHex(id))
} else {
        Moralis.enableWeb3().then((res) => {
                web3.value = res
                Moralis.getChainId().then((id) => chainId.value = utils.toHex(id))
        }).catch(() => web3Error.value = true);
}

if(window.ethereum) {
        window.ethereum.on('chainChanged', (chain) => {
                console.log(utils.toHex(chain))
                chainId.value = utils.toHex(chain)
        })
}

export default function useMoralis () {

        const authenticate = async (options = {}) => {
                try {                        
                        user.value = await Moralis.authenticate(options)  
                        web3.value = await Moralis.enableWeb3(options.provider ? { provider: "walletconnect" } : {})
                        isAuthenticating.value = false
                        isAuthenticated.value = true
                } catch (error) {
                        authError.value = error
                        isAuthenticating.value = false
                }
        }

        const signin = async (username, password) => {
                try {
                        isAuthenticating.value = true
                        user.value = await Moralis.User.logIn(username, password, { usePost: true });
                        isAuthenticating.value = false
                } catch (error) {
                        authError.value = error
                }
        }

        const signup = async (email, password) => {
                const user = new Moralis.User();
                user.set('username', email);
                user.set('email', email);
                user.set('password', password);
                try {
                        await user.signUp();
                } catch (error) {
                        authError.value = error
                }
        };

        const logout = async () => {
                isAuthenticating.value = true
                isAuthenticated.value = false
                user.value = null
                isAuthenticating.value = false
                Moralis.User.logOut()
        }


        return { Moralis, isInitialized, authenticate, logout, signup, signin, authError, isAuthenticated, isAuthenticating, hasAuthError, user, enableWeb3, web3, web3Error, isWeb3Enabled, chainId, utils, isWeb3Active }
}