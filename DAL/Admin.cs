using System.Data.SqlClient;

namespace CinemaApp.DAL
{
    public class Admin
    {
        private readonly DbContext _context;

        public Admin(DbContext context)
        {
            _context = context;
        }

        public List<Models.Admin> GetAll()
        {

            List<Models.Admin> adminList = new List<Models.Admin>();

            using var connection = _context.GetConnection();
            var cmd = "SELECT a.AdminId, u.UserId, u.Name, u.LastName FROM Users u, Admin a WHERE u.UserId = a.UserId ORDER BY a.AdminId ASC";
            var command = new SqlCommand(cmd, connection)
            {
                CommandType = System.Data.CommandType.Text
            };

            connection.Open();
            var reader = command.ExecuteReader();
            Models.Admin admin;
            while (reader.Read())
            {
                admin = new Models.Admin()
                {
                    Id = int.Parse(reader["AdminId"].ToString()),
                    UserId = int.Parse(reader["UserId"].ToString()),
                    Name = reader["Name"].ToString(),
                    LastName = reader["LastName"].ToString(),
                };
                adminList.Add(admin);
            }

            return adminList;
        }
    }
}