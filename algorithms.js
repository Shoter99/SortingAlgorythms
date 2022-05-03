import {updateHeight} from './script.js'

export function bubbleSort(dataset){
    let datasetlen = dataset.length
    while(datasetlen>0){
        for(let i = 0; i < datasetlen-1; i++){
            if(dataset[i+1]<dataset[i]){
                let c = dataset[i]
                dataset[i] = dataset[i+1]
                dataset[i+1] = c

            }
            updateHeight()
            setTimeout(() => {}, 200)
        }
        datasetlen--;
    }

}