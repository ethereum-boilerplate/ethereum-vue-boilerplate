<template>
  <div v-if="isAuthenticated" style="width: 85vw; padding: 15px; margin: 0 auto">
      <p style="font-size: 20px; font-weight: 600">ERC20 Transfers</p>
    <a-table style="overflow: hidden" :scroll="{ x: screenWidth < 445 ? 1000 : 100 }" :columns="columns" :data-source="mutatedTransfers" :loading="isLoading" :rowKey="(record) => record.key"/>
  </div>
</template>

<script>
import { getEllipsisTxt } from '../helpers/formatters'
import useMoralis from '../hooks/useMoralis'
import { getERC20Transfers, erc20Transfers, isLoading } from '../hooks/useERC20Transfers'
import { getExplorer } from '../helpers/networks'
import { ref, watchEffect } from 'vue'
export default {

    setup() {

        const { chainId, isAuthenticated } = useMoralis()

        const mutatedTransfers = ref(null)

        const screenWidth = ref(window.innerWidth)

        const columns = [
            { title: 'Token', dataIndex: 'logo', key: 'logo', width: screenWidth.value < 445 ? 50 : 100,
                customRender: (item) => {
                    let url = item.record.logo || "https://etherscan.io/images/main/empty-token.png"
                    return <div style="display: flex; align-items: center">
                        <img src={url} height="25" width="25" />
                        <p style="margin: 0px; margin-left: 0.25em">{item.record.symbol}</p>
                    </div>
                }
            },
            { title: 'Value', dataIndex: 'val', key: 'val', width: screenWidth.value < 445 ? 50 : 100 },

            { title: 'Type', dataIndex: 'type', key: 'type', width: screenWidth.value < 445 ? 50 : 100,
                customRender: (item) => { 
                return item.record.in ? <a-tag color="green" style="width: 45px; text-align: center">IN</a-tag> : <a-tag color="yellow" style="width: 45px; text-align: center">OUT</a-tag>}  
            },

            { title: 'Tx', dataIndex: 'transaction_hash' , key: 'transaction_hash', width: screenWidth.value < 445 ? 50 : 100,
                customRender: (item) => {
                    return <a href={`${getExplorer(chainId.value)}tx/${item.record.transaction_hash}`} target="_blank">{getEllipsisTxt(item.record.transaction_hash)}</a> 
                }
            }
        ]
        

        const mutate = () => {
            if(!chainId.value) return;
            isLoading.value = true
            let key = 0;
            let temp = erc20Transfers.value
            temp.map((transfer) => {
                transfer.key = key.toString()
                key++
            })
            mutatedTransfers.value = temp
            isLoading.value = false
        }

        watchEffect(() => erc20Transfers.value ? mutate() : null)
        
        getERC20Transfers()

        return{
        getERC20Transfers,
        isAuthenticated,
        mutatedTransfers,
        getEllipsisTxt, 
        columns,
        isLoading,
        screenWidth
    }
    }
}
</script>

<style>

</style>