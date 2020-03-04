import React from 'react';
import { Dialog } from 'primereact/dialog';

import { CONFIG } from '../utils/constants'

class UserContact extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: true
        }
        this.hideDialogue = this.hideDialogue.bind(this)
    }

    componentDidMount() {
        this.setState({ visible: this.props.visible })
    }

    hideDialogue() {
        this.setState({ visible: false })
        this.props.setShowDialogueComp(false)
    }

    render() {
        const { visible } = this.state;
        const { user } = this.props;
        return (
            <Dialog header={CONFIG.ContactPage}
                visible={visible}
                className="dialogue_comp"
                modal={false}
                onHide={this.hideDialogue}>
                <div className="leftBlock">
                    <img className="ucard__avatar__img" src={user && user.picture ? user.picture.large : ""} alt="img">
                    </img>
                </div>
                <div className="rightBlock">
                    <form className="address_form">
                        <h2 className="address_h2">{user && user.name ? user.name.last : ""}, {user && user.name ? user.name.first.toString().toUpperCase() : ""}</h2><br />

                        <label className="address_book">
                            <span className="address_span"><b>{CONFIG.Email}</b> {user ? user.email : CONFIG.EmailMsg}</span><br />
                            <span className="address_span"><b>{CONFIG.Phone}</b> {user ? user.phone : CONFIG.PhoneMsg}</span><br />
                            <span className="address_span"><b>{CONFIG.Street}</b> {user ? user.location.street.number : CONFIG.StreetMsgNo}, {user ? user.location.street.name : CONFIG.StreetMsgName}</span><br />
                            <span className="address_span"><b>{CONFIG.City}</b> {user ? user.location.city : CONFIG.CityMsg}</span> <br />
                            <span className="address_span"><b>{CONFIG.State}</b> {user ? user.location.state : CONFIG.StateMsg}</span> <br />
                            <span className="address_span"><b>{CONFIG.Postcode}</b> {user ? user.location.postcode : CONFIG.PostcodeMsg}</span>
                        </label>
                    </form>
                </div>
            </Dialog>
        )
    }
}

export default UserContact