import * as React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export class Banner extends React.Component<{ user: string, authenticated: boolean, logout: (event: any) => void }> {
    constructor(props: { user: string, authenticated: boolean, logout: (event: any) => void }) {
        super(props);
    }

    public render() {
        let navItems = [] as JSX.Element[];
        if (this.props.authenticated) {
            navItems.push(<NavItem eventKey={1} href="#logout" onClick={this.props.logout}>Logout</NavItem>);
        } else {
            navItems.push(<NavItem eventKey={1} href="#login">Login</NavItem>);
            navItems.push(<NavItem eventKey={1} href="#createAccount">Create Account</NavItem>);
        }

        return (
            <Navbar>
                {/* <div className="pull-left">
                    Welcome {this.props.user}
                </div> */}
                <Nav>
                    {navItems}


                    <NavItem eventKey={1} href="#home">
                        Home
                    </NavItem>
                    <NavItem eventKey={1} href="#photos/view">
                        Photos
                    </NavItem>
                    <NavItem eventKey={1} href="#recipes">
                        Recipes
                    </NavItem>
                    <NavItem eventKey={1} href="#inventory">
                        Inventory
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}