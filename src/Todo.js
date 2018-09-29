import React from 'react';

export class Todo extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.description}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.dueDate}</td>
                <td>{this.props.file ? <img alt="" src={this.props.file} /> : <div/>}</td>
            </tr>
        );
    }

}