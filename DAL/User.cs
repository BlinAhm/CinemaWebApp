using System.Data.SqlClient;

namespace CinemaApp.DAL
{
    public class User
    {
        private readonly DbContext _context;

        public User(DbContext context)
        {
            _context = context;
        }

        public Models.User GetById(int id)
        {
            var cmd = "Select * from Users where UserId = @UserId";

            var command = new SqlCommand(cmd, _context.GetConnection())
            {
                CommandType = System.Data.CommandType.Text
            };

            command.Parameters.AddWithValue("@UserId", id);

            var reader = command.ExecuteReader();

            Models.User user = new Models.User();
            if (reader.Read())
            {
                user = new Models.User()
                {
                    Id = int.Parse(reader["UserId"].ToString()),
                    Name = reader["Name"].ToString(),
                    LastName = reader["LastName"].ToString(),
                    Email = reader["Email"].ToString(),
                    Password = reader["Password"].ToString(),
                    Role = int.Parse(reader["Role"].ToString())
                };
            }
            return user;
        }

        public List<Models.User> GetAll()
        {

            List<Models.User> userList = new List<Models.User>();

            using var connection = _context.GetConnection();
            var cmd = "SELECT * FROM Users ORDER BY UserId ASC";
            var command = new SqlCommand(cmd, connection)
            {
                CommandType = System.Data.CommandType.Text
            };

            connection.Open();
            var reader = command.ExecuteReader();
            Models.User user;
            while (reader.Read())
            {
                user = new Models.User()
                {
                    Id = int.Parse(reader["UserId"].ToString()),
                    Name = reader["Name"].ToString(),
                    LastName = reader["LastName"].ToString(),
                    Email = reader["Email"].ToString(),
                    Password = reader["Password"].ToString(),
                    Role = int.Parse(reader["Role"].ToString())
                };
                userList.Add(user);
            }

            return userList;
        }

        public void AddUser(Models.User user)
        {
            var cmd = "Insert into Users (Name,LastName,Email,Password) Values (@Name,@LastName,@Email,@Password)";
            var command = new SqlCommand(cmd, _context.GetConnection())
            {
                CommandType = System.Data.CommandType.Text
            };

            command.Parameters.AddWithValue("@Name", user.Name);
            command.Parameters.AddWithValue("@LastName", user.LastName);
            command.Parameters.AddWithValue("@Email", user.Email);
            command.Parameters.AddWithValue("@Password", user.Password);

            command.ExecuteNonQuery();
        }

        public bool isEmailRegistered(Models.User user)
        {
            var cmd = "Select * from Users where Email = @Email";
            var command = new SqlCommand(cmd, _context.GetConnection())
            {
                CommandType = System.Data.CommandType.Text
            };

            command.Parameters.AddWithValue("@Email", user.Email);

            var reader = command.ExecuteReader();

            if (reader.Read())
            {
                return true;
            }
            else { return false; }
        }

        public int accountExists(string email, string password)
        {
            var cmd = "Select * from Users where Email = @Email and Password = @Password";
            var command = new SqlCommand(cmd, _context.GetConnection())
            {
                CommandType = System.Data.CommandType.Text
            };

            command.Parameters.AddWithValue("@Email", email);
            command.Parameters.AddWithValue("@Password", password);

            var reader = command.ExecuteReader();

            if (reader.Read())
                return int.Parse(reader["UserId"].ToString());
            
            return -1;

        }
    }
}
