import React from 'react'

export default class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={this.props.imageUrl} />
            </div>
        )
    }
}