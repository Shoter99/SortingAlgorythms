let data = []
let elements = []
const container = document.querySelector(".container")
const shuffleBtn = document.querySelector(".shuffle")
const startBtn = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const datasetInput = document.querySelector("#dataset")
console.log(datasetInput.value);
let DATA_LENGTH = datasetInput.value
let running = false
const speed = document.querySelector('#speed')

for(let i = 0; i<DATA_LENGTH; i++) data.push(i+1)
createDataSet(data, elements, container)
updateHeight()

speed.addEventListener('change', (e)=>{
    if(e.target.value > 20 ) e.target.value = 20
    if(e.target.value < 1 ) e.target.value = 1
})
datasetInput.addEventListener("change", (e) => {
    if(e.target.value > 200) e.target.value = 200
    if(e.target.value < 10) e.target.value = 10
    data = []
    elements = []
    console.log(e.target.value);
    DATA_LENGTH = e.target.value
    for(let i = 0; i<DATA_LENGTH; i++) data.push(i+1)
    createDataSet(data, elements, container)
    updateHeight()
})

shuffleBtn.addEventListener("click", () => {
    shuffleArray(data)
    updateHeight(DATA_LENGTH, data, elements)
})

startBtn.addEventListener("click", () => {
    
    running = true
    let algoInput = document.querySelector("#algo").value || "Bubble Sort"
    let speed = document.querySelector('#speed').value
    speed = 100/speed
    switch(algoInput){
        case "Bubble Sort":
            bubbleSort(speed)
            break
        case "Insertion Sort":
            insertionSort(speed)
            break
        case "Selection Sort":
            selectionSort(speed)
            break
        default:
            bubbleSort(speed)
            break
    }
    document.querySelector("#algo").value = ""
})
stopBtn.addEventListener("click", () => {
    running = false
})

export function updateHeight(){
    for(let i = 0; i < DATA_LENGTH; i++){
        elements[i].style.height = `calc(${data[i]/DATA_LENGTH}* 100%)`
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function createDataSet(dataset,elements,container){
    container.innerHTML = ""
    dataset.forEach(
        elem => { 
            let col = document.createElement('div')
            col.classList.add("col")
            elements.push(col)
            container.appendChild(col)        
        }
    )
}
const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
  });
async function  bubbleSort(speed){
    let datasetlen = data.length
    while(datasetlen>0){
        for(let i = 0; i < datasetlen-1; i++){
            if(!running) return
            if(data[i+1]<data[i]){
                elements[i].classList.add('current')
                let c = data[i]
                data[i] = data[i+1]
                data[i+1] = c
                await delay(speed)
                elements[i].classList.remove('current')
            }
            updateHeight()
            
        }
        datasetlen--;
    }

}

async function insertionSort(speed){ 
    let i,j
    let datasetlen = data.length
    for(i = 1; i < datasetlen; i++){
        if(!running) return
        j = i
        while(j>0 && data[j]<data[j-1]){
            elements[j].classList.add('current')
            let c = data[j]
            data[j] = data[j-1]
            data[j-1] = c
            await delay(speed)
            updateHeight()
            elements[j].classList.remove('current')
            j--
        }
    }
}
async function selectionSort(speed){
    let i,j,min
    let datasetlen = data.length
    for(i = 0; i < datasetlen-1; i++){
        if(!running) return
        min = i
        for(j = i+1; j < datasetlen; j++){
            if(data[j]<data[min]){
                min = j
            }
            elements[j].classList.add('current')
            await delay(speed)
            elements[j].classList.remove('current')
            updateHeight()
        }
        if(min != i){
            let c = data[i]
            data[i] = data[min]
            data[min] = c
        }
        updateHeight()
    }
}