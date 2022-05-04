import './DashAdmin.css';

const DashAdmin = () => {
    return (
        <div id="admin">
            <form class="form">
                <ul class="commands">
                    <li><button id="insertBtn">Add</button></li>
                    <li><button id="deleteBtn">Remove</button></li>
                </ul>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Admin Id</th>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Last name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
                <table class="activity">
                    <thead>
                        <th>Id</th>
                        <th>Activity</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1234</td>
                            <td class="act">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashAdmin;