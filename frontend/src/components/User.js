const User = ({user}) => {
    return (
      <div className="card background-card">
        <div className="card-body">
           <h5 className="card-title"> { user.email} </h5>
           <p className="card-text">             
            

             <b>full name: </b> {user.name.firstName} {user.name.lastName}   
             
             </p>

           <a href="#" className="btn btn-primary">more</a>
        </div>
      </div>       
    );
}
export default User;