import './DashContact.css';

const DashContact = () => {
    return (
        <div id="contact">
            <form class="form">
                <ul class="commands">
                    <li><button id="deleteBtn">Delete</button></li>
                </ul>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="id">Id</th>
                            <th class="fullN">Full name</th>
                            <th class="email">Email</th>
                            <th class="title">Title</th>
                            <th class="messageBox">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="id">1</td>
                            <td class="fullN">2</td>
                            <td class="email">3</td>
                            <td class="title">4</td>
                            <td class="messageBox">5</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashContact;