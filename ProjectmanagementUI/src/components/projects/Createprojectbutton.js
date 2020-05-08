import React from'react';
import {Link} from 'react-router-dom';
const Createprojectbutton=()=>
{
    return(
 <React.Fragment>       
<Link to="/addproject" className="btn btn-lg btn-info">
 Create a Project
</Link>

</React.Fragment>
    );
}

export default Createprojectbutton;