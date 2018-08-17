import React from 'react';

const BidsListComponent = ({ bids }) => {
    if (bids.length === 0) {
        return (
            <div>You don't have acceptable bids, when a bid will be accepted he will show here.</div>
        )
    }
}

export default BidsListComponent;