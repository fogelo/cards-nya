import React from 'react';

interface IProfileProps {

}

const Profile: React.FC<IProfileProps> = () => {

    console.log('render profile');
    return (
        <div>
            Profile
        </div>
    );
};

export default Profile;
