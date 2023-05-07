

export const shuffleArray = (array : any[]) => {
        // the array can be of any data type, but is will be an array, so -> any[]
        [...array].sort(() => Math.random() - 0.5)
        
}