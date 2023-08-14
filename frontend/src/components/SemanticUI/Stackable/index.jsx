import { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Stackable extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    as={Link} to="/"
                >
                    All F1
                </Menu.Item>

                <Menu.Item
                    name='drivers'
                    active={activeItem === 'drivers'}
                    onClick={this.handleItemClick}
                    as={Link} to="/drivers"
                >
                    Drivers
                </Menu.Item>

                <Menu.Item
                    name='constructors'
                    active={activeItem === 'constructors'}
                    onClick={this.handleItemClick}
                    as={Link} to="/constructors"
                >
                    Constructors
                </Menu.Item>
            </Menu>
        )
    }
}
