import {CheckCircleOutline, HighlightOff, RemoveCircleOutline} from '@mui/icons-material';

const symbolSize = '50px'; //Default size of the win, loss and draw symbol

// Win Icon
export function WinIcon() {
    return (
        <div>
            <CheckCircleOutline style={{color: 'green', fontSize: symbolSize}} />
            <p style={{margin: '0px'}}>Win</p>
        </div>
    )
}

// Loss Icon
export function LossIcon() {
    return (
        <div>
            <HighlightOff style={{color: 'red', fontSize: symbolSize}} />
            <p style={{margin: '0px'}}>Loss</p>
        </div>
    )    
}

// Draw Icon
export function DrawIcon() {
    return (
        <div>
            <RemoveCircleOutline style={{ color: 'blue', fontSize: symbolSize}} />
            <p style={{margin: '0px'}}>Draw</p>
        </div>
    )        
}