import React from 'react';
import {Dialog} from 'primereact/dialog';

class UserContact extends React.Component {
    render() {
        const { user, visible } = this.props;
        return (
            // <div className='popup'>
            //     <div className='popup_inner'>
            //         <h1>{user.name.first}</h1>
            //     </div>
            // </div>
            <Dialog header="Contact"  
            visible={visible}
            className="dialogue_comp"
            onHide={() => this.setState({visible:false})}>
                <div className="leftBlock">
                    <img className="ucard__avatar__img" src={user.picture.large} alt="image">
                    </img> 
                </div>
                <div className="rightBlock">
                   
                </div>
            </Dialog>
        )
    }
}

export default UserContact