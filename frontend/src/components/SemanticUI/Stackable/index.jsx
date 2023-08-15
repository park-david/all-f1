import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Header } from 'semantic-ui-react'

export default class Stackable extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu className='navBar' stackable>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    as={Link} to="/"
                >
                    <Header as='h2'>All F1</Header>
                </Menu.Item>

                <Menu.Item
                    name='drivers'
                    active={activeItem === 'drivers'}
                    onClick={this.handleItemClick}
                    as={Link} to="/drivers"
                >
                    <Header as='h3'>Drivers</Header>
                </Menu.Item>

                <Menu.Item
                    name='constructors'
                    active={activeItem === 'constructors'}
                    onClick={this.handleItemClick}
                    as={Link} to="/constructors"
                >
                    <Header as='h3'>Constructors</Header>
                </Menu.Item>
            </Menu>
        )
    }
}
