import React from'react';
import {Link} from 'react-router-dom';
import Add from '../../../Add.png';

const CreateProjectTaskButton=()=>
{
    return(
 <React.Fragment>       
<Link to="/addprojecttask" className="btn btn-lg btn-info">
    {/* <img src={Add} ></img> */}
 Create Project Task
</Link>

</React.Fragment>
    );
}

export default CreateProjectTaskButton;