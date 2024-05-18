import React from 'react';


const SettingsList = ({ friends, onEditFriend, onDeleteFriend }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {friends.map((friend) => (
          <div key={friend.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{friend.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{friend.dob}</h6>
                <p className="card-text">{friend.textarea}</p>
                <p className="card-text"><strong>Number:</strong> {friend.number}</p>
                <button 
                  className="btn btn-primary mr-2" 
                  onClick={() => onEditFriend(friend)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => onDeleteFriend(friend.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
