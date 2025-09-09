import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ActivityToTimeChart from './ActivityToTimeChart';
function ChartsPanel({activitesList,trainingOptions}){
    return(
        <>
        <h1>Analizuj Twoje postępy!</h1>
        <ActivityToTimeChart trainingOptions={trainingOptions}/>
        </>
    )
}
export default ChartsPanel