import './DashUsers.css';

const DashUsers = () => {
    return (
        <div className="contents">
            <form className="form">
                <ul className="commands">
                    <li><button id="insertBtn">Insert</button></li>
                    <li><button id="editBtn">Edit</button></li>
                    <li><button id="deleteBtn">Delete</button></li>
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashUsers;