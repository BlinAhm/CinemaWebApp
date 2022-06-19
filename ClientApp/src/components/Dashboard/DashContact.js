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
                            <td class="id">2</td>
                            <td class="fullN">Test test</td>
                            <td class="email">t@gmail.com</td>
                            <td class="title">Testing Contact</td>
                            <td class="messageBox">Testing ContactTesting ContactTesting ContactTesting ContactTesting Contact</td>
                        </tr>
                        <tr>
                            <td class="id">3</td>
                            <td class="fullN">Contacter</td>
                            <td class="email">c@gmail.com</td>
                            <td class="title">Contact title</td>
                            <td class="messageBox">aaaaaaaaaaaasdsadjbhsdajklfhkjsdhkjserj</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default DashContact;