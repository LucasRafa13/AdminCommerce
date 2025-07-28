namespace ProductCatalog.Api.Config;

using Npgsql;
using System.Data;

public class DbConfig
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString = string.Empty;

    public DbConfig(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public IDbConnection CreateConnection()
    {
        return new NpgsqlConnection(_connectionString);
    }
}
