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

        public List<Models.User> GetAll(){

            List<Models.User> userList = new List<Models.User>();

            var cmd = "Select * from Users";
            var command = new SqlCommand(cmd, _context.GetConnection())
            {
                CommandType = System.Data.CommandType.Text
            };

            var reader = command.ExecuteReader();
            var user = new Models.User();
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
    }
}
