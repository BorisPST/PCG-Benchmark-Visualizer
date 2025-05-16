import React from 'react';
import './ControlHub.css';

interface Props {
    onGenerateBattles: () => void;
}

function ControlHub(props: Props) {
    const simulateBattleButtonHandler = async () => {
        props.onGenerateBattles();
    }

    return (
        <div className="control-hub">
        <div 
        className="hub-button main-button"
        onClick={simulateBattleButtonHandler}>
            Generate Battles
        </div>
        </div>
    );
}
export default ControlHub;