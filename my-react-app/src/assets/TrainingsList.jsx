import './TrainingsList.css'
function YourTrainings(){
    let TrainingsList = ["bieganie", 'rower', 'pływanie', 'bieganie']
    return(
        <>
        <h1>TWOJE TRENINGI</h1>
        <div className='YourTrainingsList'>
            <ul>
                {TrainingsList.map(element=>(
                    <li>{element}</li>
                ))}
                
            </ul>
        </div>
        <div>
            
        </div>
        

        </>
    )
}
export default YourTrainings