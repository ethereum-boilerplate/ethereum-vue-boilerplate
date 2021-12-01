import Moralis from '../plugins/moralis'


export default function useMoralisWeb3API () {
    const Web3Api = Moralis.Web3API
    const account = Web3Api.account
    const native = Web3Api.native
    const token = Web3Api.token
    const resolve = Web3Api.resolve
    const defi = Web3Api.defi
    return Web3Api, { native, account, token, resolve, defi }
}